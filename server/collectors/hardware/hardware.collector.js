
var Collector = require('../collector');
var Datastore = require('../../datastores/nedb.datastore');

module.exports = HardwareCollector;

function HardwareCollector() {

    return new Collector({

        name: 'hardware',

        interval: 60000,

        datastore: new Datastore({
            // inMemoryOnly: true
            filename: 'hardware.db'
        }),

        wmi: {
            class: 'Hardware',
            namespace: 'root/OpenHardwareMonitor'
        }
    });

}