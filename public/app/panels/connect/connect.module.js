var angular = require('angular');

require('ngstorage');

module.exports = angular
    .module('panel.connect', [
        'ngStorage',
        require('app/modules/connection/connection.module')
    ])
    .directive('connectPanel', function () {
        return {
            restrict: 'E',
            template: require('./connect.html!text'),
            controller: require('./connect.ctrl'),
            controllerAs: 'connectCtrl',
            bindToController: true
        };
    }).name;