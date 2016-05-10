
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
            namespace: 'root/OpenHardwareMonitor',
            query: 'SELECT * FROM Sensor'
        }
    });

}