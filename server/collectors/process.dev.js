
var Datastore = require('../datastores/nedb');
var Collector = require('../models/collector.model');

module.exports = ProcessCollector;

function ProcessCollector() {

    return new Collector({

        name: 'process',

        interval: 1000 * 10,

        datastore: new Datastore({
            id: 'IDProcess',
            inMemoryOnly: true
            //filename: 'process.db'
        }),

        wmi: {
            query: 'Select IDProcess, Name, ThreadCount FROM Win32_PerfFormattedData_PerfProc_Process'
        }
    });

}

