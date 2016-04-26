
var Datastore = require('../datastores/nedb');
var Collector = require('../models/collector.model');

module.exports = SensorCollector;

function SensorCollector() {

    return new Collector({

        name: 'sensor',

        interval: 1000,

        datastore: new Datastore({
            id: 'Identifier',
            inMemoryOnly: true
        }),
        
        wmi: {
            class: 'Sensor',
            namespace: 'root/OpenHardwareMonitor'
        }
    });

}