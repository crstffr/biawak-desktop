var angular = require('angular');

module.exports = angular
    .module('gpuInfoPanel', [])
    .directive('gpuInfoPanel', function () {
        return {
            restrict: 'E',
            template: require('./gpu-panel.html!text'),
            controller: require('./gpu-panel.ctrl'),
            controllerAs: 'gpuCtrl',
            bindToController: true
        };
    }).name;