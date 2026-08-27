var App = {};
App.states = {};

App.config = {
  WIDTH: Number(readConfig('WIDTH', 0.5)) || 0.5,
  HEIGHT: Number(readConfig('HEIGHT', 0.6)) || 0.6,
  STEP_X: Number(readConfig('STEP_X', 40)) || 40,
  STEP_Y: Number(readConfig('STEP_Y', 30)) || 30,
  MIN_WIDTH: 400,
  MIN_HEIGHT: 300
};

App.isEqual = function (g1, g2) {
  if (!g1 || !g2) return false;
  return g1.x === g2.x && g1.y === g2.y && g1.width === g2.width && g1.height === g2.height;
};

App.toggle = function () {
  var win = workspace.activeWindow;
  if (!win || !win.resizeable) return;

  var id = win.internalId;
  var currentGeo = win.frameGeometry;
  var state = App.states[id];

  if (state && App.isEqual(currentGeo, state.applied)) {
    win.frameGeometry = state.original;
    delete App.states[id];
    return;
  }

  var area = workspace.clientArea(KWin.MaximizeArea, win);
  var width = Math.floor(area.width * App.config.WIDTH);
  var height = Math.floor(area.height * App.config.HEIGHT);
  var x = area.x + Math.floor((area.width - width) / 2);
  var y = area.y + Math.floor((area.height - height) / 2);

  var targetGeo = { x: x, y: y, width: width, height: height };

  App.states[id] = {
    original: { x: currentGeo.x, y: currentGeo.y, width: currentGeo.width, height: currentGeo.height },
    applied: targetGeo
  };

  win.frameGeometry = targetGeo;
};

App.resizeFromCenter = function (direction) {
  var win = workspace.activeWindow;
  if (!win || !win.resizeable) return;

  var id = win.internalId;
  var area = workspace.clientArea(KWin.MaximizeArea, win);
  var currentGeo = win.frameGeometry;

  var centerX = currentGeo.x + Math.floor(currentGeo.width / 2);
  var centerY = currentGeo.y + Math.floor(currentGeo.height / 2);

  var newWidth = currentGeo.width + (App.config.STEP_X * 2 * direction);
  var newHeight = currentGeo.height + (App.config.STEP_Y * 2 * direction);

  newWidth = Math.max(App.config.MIN_WIDTH, Math.min(newWidth, area.width));
  newHeight = Math.max(App.config.MIN_HEIGHT, Math.min(newHeight, area.height));

  var newX = centerX - Math.floor(newWidth / 2);
  var newY = centerY - Math.floor(newHeight / 2);

  if (newX < area.x) newX = area.x;
  if (newY < area.y) newY = area.y;
  if (newX + newWidth > area.x + area.width) newX = area.x + area.width - newWidth;
  if (newY + newHeight > area.y + area.height) newY = area.y + area.height - newHeight;

  win.frameGeometry = { x: newX, y: newY, width: newWidth, height: newHeight };
  delete App.states[id];
};

App.expand = function () { App.resizeFromCenter(1); };
App.shrink = function () { App.resizeFromCenter(-1); };

App.main = function () {
  registerShortcut('toggle', 'kdeFloat: Center / Restore', 'Meta+C', App.toggle);
  registerShortcut('expand', 'kdeFloat: Expand Center', 'Ctrl+Alt+J', App.expand);
  registerShortcut('shrink', 'kdeFloat: Shrink Center', 'Ctrl+Alt+K', App.shrink);

  workspace.windowRemoved.connect(function (win) {
    if (win) delete App.states[win.internalId];
  });
};

App.main();
