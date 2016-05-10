var angular = require('angular');

module.exports = angular
    .module('hardware.fan', [
        require('app/modules/collector/collector.module')
    ])
    .service('fanHardware', require('./fan.service'))
    .name;