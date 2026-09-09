# kwin-center-window

A KWin script for KDE Plasma 6 to quickly center, resize, and restore windows via keyboard shortcuts.

## Features

- **`Meta + C` (Toggle Center / Restore):** Centers and resizes the active window to a focused view. Pressing it again restores the window to its previous position and size.
- **`Ctrl + Alt + J` (Expand from Center):** Increases window size proportionally while keeping it centered.
- **`Ctrl + Alt + K` (Shrink from Center):** Decreases window size proportionally while keeping it centered.

## Configuration

You can customize dimensions and steps with **System Settings > Window Management > KWin Scripts**:

## Installation

### KDE Store

Search for **kwin-center-window** and click to **Install**

*(You can also download the `.kwinscript` package directly from https://store.kde.org/p/2370941).*

### From Source

Clone the repository directly into your local KWin scripts directory:

```bash
git clone https://github.com/emirhtek/kwin-center-window.git ~/.local/share/kwin/scripts/kwin-center-window
```

Enable the script under System Settings > Window Management > KWin Scripts, or reload KWin from the terminal:

```bash
qdbus org.kde.KWin /KWin org.kde.KWin.reconfigure
```

**After installing**, you can customize the default keybindings under System Settings > Shortcuts > KWin (search for kwin-center-window).

## About the Project

kwin-center-window started out as a simple script I built for myself, specifically the need to quickly pop a window into the center to focus on it, and then instantly return it back to where it was.

While there are already great window-centering scripts for KWin, some are not built for keyboard shortcuts and others don't include a toggle/restore feature. So, I decided to write my own and eventually share it.

> **Note:** This has primarily been developed and tested on my current single-monitor setup. It hasn't been tested across different Linux distributions or multi-monitor configurations yet, so edge cases or bugs may occur.

If you encounter any issues or have suggestions, please feel free to open an **Issue**!
