
require('./app.style');

var app = require('angular')
    .module('biawak.module', [
        require('./modules/router/router.module')
    ])
    .controller('AppController', require('./app.ctrl'))
    .run(function($state){

        console.log('app bootstrapped', $state);

    });

module.exports = app.name;