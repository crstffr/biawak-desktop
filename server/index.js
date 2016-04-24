var server = require('./webserver');
var Monitor = require('./monitor');
var settings = require('../settings');

if (settings.env.isWin) {

    var monitor = new Monitor();
    monitor.start();
    /*
    var SensorCollector = require('./collectors/sensor/sensor.collector');
    var sensors = new SensorCollector();
    sensors.collect();
    */

} else {

    console.log('- Warning ---------------------------------');
    console.log('- Hardware monitoring only works in Windows');
    console.log();

}

server.listen(settings.webserver.port);
console.log('- Web Server Started ----------------------');
console.log('- Running at http://' + settings.webserver.ip + ':' + settings.webserver.port);

