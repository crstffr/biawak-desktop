var angular = require('angular');

module.exports = angular
    .module('collector.module', [])
    .service('collectorService', require('./collector.service'))
    .name;