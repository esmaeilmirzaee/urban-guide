var electron = require('electron');
var { Tray, Menu, app } = electron;

class TimerTray extends Tray {
  constructor(icon, mainWindow) {
    super(icon);
    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');
    this.on('click', this.showOrHide.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  showOrHide(event, bounds) {
    // Click event bounds
    let { x, y } = bounds;

    // Window height and window
    let { width, height } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: process.platform == 'darwin' ? y : y - height,
        width,
        height,
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    var menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: function exitApp() {
          app.quit();
        },
      },
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
