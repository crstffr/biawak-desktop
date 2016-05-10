var $ = require('jquery');
var angular = require('angular');

require('./meter.min.css!');
require('bootstrap-progressbar');

module.exports = angular
    .module('meter', [])
    .directive('livemeter', function () {
        return {
            scope: {
                type: '@',
                value: '=',
                min: '=',
                max: '=',
                info: '@',
                danger: '@',
                warning: '@'
            },
            restrict: 'E',
            bindToController: true,
            controllerAs: 'meterCtrl',
            controller: require('./meter.ctrl'),
            template: require('./meter.html!text')
        };
    }).name;