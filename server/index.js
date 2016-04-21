
var app = require('./feathers/app');
var services = require('./db/db.services');


app.listen(8660);

app.use('sensors', services['sensors']);

var sensors = app.service('sensors');

sensors.on('created', function(data) {
    console.log('created', data);
});