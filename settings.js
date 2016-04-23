var os = require('os');
var ip = require('ip');

module.exports = {

    env: {
        isWin: os.platform() === 'win32',
        isMac: os.platform() === 'darwin'
    },

    app: {
        icon: {
            mac: {
                tray: './desktop/icons/greenguy-16.png',
                wind: './desktop/icons/greenguy-48.png'
            },
            win: {
                tray: './desktop/icons/greenguy.ico',
                wind: './desktop/icons/greenguy.ico'
            }
        }
    },

    server: {
        ip: ip.address(),
        port: 8660
    }

};