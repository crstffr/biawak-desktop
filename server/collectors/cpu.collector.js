
var Datastore = require('../datastores/nedb');
var Collector = require('../models/collector.model');

module.exports = BiosCollector;

function BiosCollector() {

    return new Collector({

        name: 'cpu',

        interval: 1000 * 60 * 60 * 24,

        datastore: new Datastore({
            id: 'ProcessorId',
            inMemoryOnly: true
        }),

        wmi: {
            class: 'Win32_Processor'
        }
    });

}