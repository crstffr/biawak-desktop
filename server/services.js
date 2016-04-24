
var _ = require('lodash');
var NeDB = require('nedb');
var service = require('feathers-nedb');

var services = {};

var tables = {
    sensors: {
        autoload: true,
        filename: './storage/sensors.db'
    },
    hardware: {
        autoload: true,
        filename: './storage/hardware.db'
    },
    userprefs: {
        autoload: true,
        filename: './storage/userprefs.db'
    }
};

/*
_.forEach(tables, function(options, name){

    var db = new NeDB(options);

    db.persistence.setAutocompactionInterval(5000);

    services[name] = service({
        Model: db
    });
});

*/

module.exports = services;