var angular = require('angular');
var controller = require('./app.ctrl');

module.exports = angular
    .module('biawak.module', [])
    .controller('AppController', controller);