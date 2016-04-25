var server = require('./webserver');
var Monitor = require('./monitor');
var settings = require('../settings');
var collectors = require('./collectors');

server.start().then(function(){
    console.log('- Web Server Started ----------------------');
    console.log('- Running at http://' + settings.webserver.ip + ':' + settings.webserver.port);
});

if (settings.env.isWin) {

    var monitor = new Monitor();

    monitor.start().then(function() {
        console.log('- Open Hardware Monitor successfully opened');
        console.log('- Loading Collectors ----------------------');
        collectors.load();
    });

    server.onConnect(function(socket){
        if (server.clients === 1) {
            collectors.start();
        }
    });

    server.onDisconnect(function(socket){
        if (server.clients === 0) {
            collectors.stop();
        }
    });

} else {

    console.log('- Warning ---------------------------------');
    console.log('- Hardware monitoring only works in Windows');
    console.log();

}






