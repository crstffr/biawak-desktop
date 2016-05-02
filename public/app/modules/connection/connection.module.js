var angular = require('angular');

module.exports = angular
    .module('connection.module', [])
    .service('connectionService', require('./connection.service'))
    .name;