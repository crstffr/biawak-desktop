var ip = require('ip');
var electron = require('electron');
var server = require('../server/index');

var app = electron.app;
var ipc = electron.ipcMain;
const Menu = electron.Menu;
const Tray = electron.Tray;
var BrowserWindow = electron.BrowserWindow;

var appIcon = null;
var mainWindow = null;
var iconImage = __dirname + '/icons/greenguy';

app.on('window-all-closed', function () {});

app.on('ready', function () {

    appIcon = new Tray(iconImage + '-18.png');

    appIcon.setToolTip('Biawak Monitor');

    appIcon.setContextMenu(Menu.buildFromTemplate([
        {label: 'Show', click: _show},
        {label: 'Exit', click: app.quit}
    ]));
});

function _show() {

    if (mainWindow) {
        mainWindow.focus();
        return;
    }

    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: iconImage + '.icns'
    });

    mainWindow.toggleDevTools();
    // mainWindow.setMenu(null);
    mainWindow.loadURL('http://' + ip.address() + ':8660');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

}