var server = require('./webserver');
var services = require('./services');
var settings = require('../settings');

if (settings.env.isWin) {

    var SensorCollector = require('./collectors/sensor/sensor.collector');
    var sensors = new SensorCollector();
    sensors.collect();

} else {

    console.log('- Warning ---------------------------------');
    console.log('- Hardware monitoring only works in Windows');
    console.log();

}

server.listen(settings.webserver.port);
console.log('- Web Server Started ----------------------');
console.log('- Running at http://' + settings.webserver.ip + ':' + settings.webserver.port);

