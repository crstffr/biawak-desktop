
var _ = require('lodash');
var NeDB = require('nedb');
var service = require('feathers-nedb');

var services = {};

var tables = {
    sensors: {
        autoload: true,
        filename: './database/sensors.db'
    },
    hardware: {
        autoload: true,
        filename: './database/hardware.db'
    },
    userprefs: {
        autoload: true,
        filename: './database/userprefs.db'
    }
};

_.forEach(tables, function(options, name){
    services[name] = service({
        Model: new NeDB(options)
    });
});

module.exports = services;