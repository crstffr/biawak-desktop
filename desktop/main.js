var electron = require('electron');
var settings = require('../settings');
var server = require('../server/index');

var app = electron.app;
var Menu = electron.Menu;
var Tray = electron.Tray;
var BrowserWindow = electron.BrowserWindow;

var appIcon = null;
var mainWindow = null;

app.on('window-all-closed', function () {});

app.on('ready', function () {

    var icon = (settings.env.isWin)
        ? settings.desktop.icon.win.tray
        : settings.desktop.icon.mac.tray;

    appIcon = new Tray(icon);

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

    var icon = (settings.env.isWin)
        ? settings.desktop.icon.win.wind
        : settings.desktop.icon.mac.wind;

    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: icon
    });

    mainWindow.toggleDevTools();
    // mainWindow.setMenu(null);

    mainWindow.loadURL('http://' + settings.webserver.ip + ':' + settings.webserver.port);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

}