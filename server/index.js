var server = require('./webserver');
var services = require('./services');
var settings = require('../settings');

server.listen(settings.server.port);
console.log('Webserver at http://' + settings.server.ip + ':' + settings.server.port);

server.use('sensors', services['sensors']);

var sensors = server.service('sensors');

sensors.on('created', function(data) {
    console.log('created', data);
});