var server = require('./webserver');
var settings = require('../settings');
var monitor = require('./services/monitor/monitor.service');
var collectors = require('./services/collector/collector.service');

module.exports = server;

if (settings.env.isWin) {

    monitor.start().then(function () {

        console.log('- Open Hardware Monitor successfully opened');
        console.log('- Loading Collectors ----------------------');

        collectors.load().then(function () {

            console.log('- Collectors Loaded -----------------------');

            server.start().then(function () {
                console.log('- Web Server Started ----------------------');
                console.log('- Running at http://' + settings.server.ip + ':' + settings.server.port);
            });

        }).catch(function (e) {
            console.log('- Error loading collector -----------------');
            console.log(e);
        });

    });

    server.onConnect(function (socket) {
        if (server.clients === 1) {
            collectors.start();
        }
    });

    server.onDisconnect(function (socket) {
        if (server.clients === 0) {
            collectors.stop();
        }
    });

} else {

    console.log('- Warning ---------------------------------');
    console.log('- Hardware monitoring only works in Windows');
    console.log();

}






