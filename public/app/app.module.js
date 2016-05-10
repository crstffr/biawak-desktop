
var angular = require('angular');

require('vendor/bootstrap');
require('./app.style');

var app = angular
    .module('biawak.module', [
        require('./modules/router/router.module')
    ])
    .controller('AppController', require('./app.ctrl'))
    .run(function(){
        
    });

module.exports = app.name;