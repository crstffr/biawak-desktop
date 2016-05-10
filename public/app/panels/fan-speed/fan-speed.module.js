var angular = require('angular');

module.exports = angular
    .module('fanSpeedPanel', [
        require('app/components/panel/panel.module'),
        require('app/components/meter/meter.module'),
        require('app/hardware/fan/fan.module')
    ])
    .directive('fanSpeedPanel', function () {
        return {
            restrict: 'E',
            template: require('./fan-speed.html!text'),
            controller: require('./fan-speed.ctrl'),
            controllerAs: 'fanSpeed',
            bindToController: true
        };
    }).name;