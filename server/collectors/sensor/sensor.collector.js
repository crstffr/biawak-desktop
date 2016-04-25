
var Collector = require('../collector');
var Datastore = require('../../datastores/nedb.datastore');

module.exports = SensorCollector;

function SensorCollector() {

    return new Collector({

        name: 'sensor',

        interval: 1000,

        datastore: new Datastore({
            inMemoryOnly: true
            //filename: 'sensors.db'
            //timestampData: true
        }),
        
        wmi: {
            class: 'Sensor',
            namespace: 'root/OpenHardwareMonitor'
        }
    });

}