var electron = require('electron');
var { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 300,
      height: 500,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: { backgroundThrottling: false },
    });

    this.loadURL(url);
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
