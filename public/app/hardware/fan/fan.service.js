module.exports = Service;

Service.$inject = ['collectorService'];

function Service (collector) {

    var _this = this;

    var extend = require('lodash/extend');
    var forEach = require('lodash/forEach');

    extend(this, {fans: {}});

    collector.getStream('sensor', function (sensors) {

        forEach(sensors, function (sensor) {
            if (sensor.SensorType === 'Fan') {
                _this.fans[sensor._id] = sensor;
            }
        });

    });

}