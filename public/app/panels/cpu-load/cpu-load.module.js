var angular = require('angular');

module.exports = angular
    .module('panel.cpu-load', [
        require('app/components/panel/panel.module'),
        require('app/components/meter/meter.module'),
        require('app/hardware/cpu/cpu.module')
    ])
    .directive('cpuLoadPanel', function () {
        return {
            restrict: 'E',
            template: require('./cpu-load.html!text'),
            controller: require('./cpu-load.ctrl'),
            controllerAs: 'cpuLoad',
            bindToController: true
        };
    }).name;