var angular = require('angular');

module.exports = angular
    .module('fanInfoPanel', [])
    .directive('fanInfoPanel', function () {
        return {
            restrict: 'E',
            template: require('./fan-panel.html!text'),
            controller: require('./fan-panel.ctrl'),
            controllerAs: 'fanCtrl',
            bindToController: true
        };
    }).name;