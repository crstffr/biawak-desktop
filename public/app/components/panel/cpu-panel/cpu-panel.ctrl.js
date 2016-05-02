module.exports = CPUPanelController;

CPUPanelController.$inject = ['connectionService', 'collectorService'];

function CPUPanelController(server, collector) {
    
    var _this = this;
    
    var find = require('lodash/find');
    var extend = require('lodash/extend');
    var forEach = require('lodash/forEach');

    this.cpu = {
        temps: {},
        loads: {},
        clocks: {},
        sensors: {}
    };

    server.onConnect(function (conn) {
        console.log(conn.rpc.services);
    });

    collector.getStream('hardware', function (data) {
        
        console.log('hardware data', data);

        var cpu = find(data, {HardwareType: 'CPU'});

        extend(_this.cpu, {
            id: cpu.Identifier,
            model: cpu.Name
        });

        collector.getStream('sensor', function (sensors) {

            console.log('sensor data', sensors);

            forEach(sensors, function(sensor){

                if (sensor.Parent === _this.cpu.id) {

                    _this.cpu.sensors[sensor._id] = sensor;

                    if (sensor._id.indexOf('/temperature/') > 0) {
                        _this.cpu.temps[sensor._id] = sensor;
                    }

                    if (sensor._id.indexOf('/load/') > 0) {
                        _this.cpu.loads[sensor._id] = sensor;
                    }

                    if (sensor._id.indexOf('/clock/') > 0) {
                        _this.cpu.clocks[sensor._id] = sensor;
                    }

                }

                
            });

            console.log('cpu details', _this.cpu);

        });


        console.log('cpu hardware data', cpu);
        console.log('cpu details', _this.cpu);
        
    });

    collector.getStream('cpu', function (cpu) {

        cpu = cpu[Object.keys(cpu)[0]]; // Get the first CPU in the object

        extend(_this.cpu, {
            fullName: cpu.Name || '',
            numCores: cpu.NumberOfCores,
            manufacturer: cpu.Manufacturer,
            maxClockSpeed: cpu.MaxClockSpeed,
            numProcessors: cpu.NumberOfLogicalProcessors,
        });
        
        console.log('cpu data', cpu);
        console.log('cpu details', _this.cpu);


    });

}