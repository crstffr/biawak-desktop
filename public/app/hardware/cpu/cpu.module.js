var angular = require('angular');

module.exports = angular
    .module('hardware.cpu', [
        require('app/modules/collector/collector.module')
    ])
    .service('cpuHardware', require('./cpu.service'))
    .name;