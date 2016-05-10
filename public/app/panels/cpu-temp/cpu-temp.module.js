var angular = require('angular');

module.exports = angular
    .module('panel.cpu-temp', [
        require('app/components/panel/panel.module'),
        require('app/components/meter/meter.module'),
        require('app/hardware/cpu/cpu.module')
    ])
    .directive('cpuTempPanel', function () {
        return {
            restrict: 'E',
            template: require('./cpu-temp.html!text'),
            controller: require('./cpu-temp.ctrl'),
            controllerAs: 'cpuTemp',
            bindToController: true
        };
    }).name;