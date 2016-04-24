
var _ = require('lodash');
var Collector = require('../collector');

module.exports = SensorCollector;

function SensorCollector() {

    Collector.call(this, {

        name: 'sensors',

        database: {
            file: 'sensors.db',
            overwrite: true
        },
        
        wmi: {
            class: 'Sensor',
            namespace: 'root/OpenHardwareMonitor'
        }
    });

}