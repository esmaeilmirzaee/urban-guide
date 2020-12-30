var path = require('path');
var electron = require('electron');
var TimerTray = require('./app/timer_tray');
var MainWindow = require('./app/main_window');
const { app, ipcMain } = electron;

var mainWindow;
var tray;

app.on('ready', function startApp() {
  app.dock.hide();
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
  // mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  // mainWindow.on('blur', function disappear() {
  // mainWindow.hide();
  // });
  var iconName =
    process.platform == 'darwin' ? 'iconTemplate.png' : 'windows-icons.png';
  var icon = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(icon, mainWindow);
});

ipcMain.on('timer:update', function updateTimer(event, timeLeft) {
  tray.setTitle(timeLeft);
});
