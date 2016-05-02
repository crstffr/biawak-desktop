var angular = require('angular');

module.exports = angular
    .module('cpuInfoPanel', [])
    .directive('cpuInfoPanel', function () {
        return {
            restrict: 'E',
            template: require('./cpu-panel.html!text'),
            controller: require('./cpu-panel.ctrl'),
            controllerAs: 'cpuCtrl',
            bindToController: true
        };
    }).name;