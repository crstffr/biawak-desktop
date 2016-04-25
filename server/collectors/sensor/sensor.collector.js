
var Collector = require('../collector');

module.exports = SensorCollector;

function SensorCollector() {

    var _this = this;

    Collector.call(this, {

        name: 'sensors',
        interval: 1000,

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