module.exports = Service;

Service.$inject = ['collectorService'];

function Service (collector) {

    var _this = this;

    var find = require('lodash/find');
    var extend = require('lodash/extend');
    var forEach = require('lodash/forEach');

    extend(this, {
        temps: {}, loads: {}, clocks: {}, sensors: {}
    });

    collector.getStream('hardware', function (data) {

        var cpu = find(data, {HardwareType: 'CPU'});

        extend(_this, {
            id: cpu.Identifier, model: cpu.Name
        });

        collector.getStream('sensor', function (sensors) {
            forEach(sensors, function (sensor) {
                if (sensor.Parent === _this.id) {
                    
                    _this.sensors[sensor._id] = sensor;

                    if (sensor._id.indexOf('/temperature/') > 0) {
                        _this.temps[sensor._id] = sensor;
                    }

                    if (sensor._id.indexOf('/load/') > 0 && sensor.Name.indexOf('Total') === -1) {
                        _this.loads[sensor._id] = sensor;
                    }

                    if (sensor._id.indexOf('/clock/') > 0) {
                        _this.clocks[sensor._id] = sensor;
                    }
                }
            });
        });
    });

    collector.getStream('cpu', function (cpu) {

        cpu = cpu[Object.keys(cpu)[0]]; // Get the first CPU in the object

        extend(_this, {
            fullName: cpu.Name || '',
            numCores: cpu.NumberOfCores,
            manufacturer: cpu.Manufacturer,
            maxClockSpeed: cpu.MaxClockSpeed,
            numLogicalProcessors: cpu.NumberOfLogicalProcessors,
        });
    });

}