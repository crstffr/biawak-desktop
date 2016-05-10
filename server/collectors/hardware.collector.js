
var Datastore = require('../datastores/nedb');
var Collector = require('../models/collector.model');

module.exports = HardwareCollector;

function HardwareCollector() {

    return new Collector({

        name: 'hardware',

        interval: 1000 * 60 * 60 * 24,

        datastore: new Datastore({
            id: 'Identifier',
            inMemoryOnly: true
        }),

        wmi: {
            namespace: 'root/OpenHardwareMonitor',
            query: 'SELECT * FROM Hardware'
        }
    });

}