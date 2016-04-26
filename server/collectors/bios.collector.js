
var Datastore = require('../datastores/nedb');
var Collector = require('../models/collector.model');

module.exports = BiosCollector;

function BiosCollector() {

    return new Collector({

        name: 'bios',

        interval: 1000 * 60 * 60 * 24,

        datastore: new Datastore({
            id: 'SerialNumber',
            filename: 'bios.db'
        }),

        wmi: {
            class: 'Win32_BIOS'
        }
    });

}