var os = require('os');
var ip = require('ip');

module.exports = {

    env: {
        isWin: os.platform() === 'win32',
        isMac: os.platform() === 'darwin'
    },

    webserver: {
        ip: ip.address(),
        port: 8660
    },
    
    database: {
        location: __dirname + '/storage/'
    },

    desktop: {
        icon: {
            mac: {
                tray: './desktop/icons/greenguy-20.png',
                wind: './desktop/icons/greenguy-48.png'
            },
            win: {
                tray: './desktop/icons/greenguy.ico',
                wind: './desktop/icons/greenguy.ico'
            }
        }
    }
};