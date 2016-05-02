var angular = require('angular');



module.exports = angular
    .module('connectPanel', [
        require('../../../modules/connection/connection.module')
    ])
    .directive('connectPanel', function () {
        return {
            restrict: 'E',
            template: require('./connect-panel.html!text'),
            controller: require('./connect-panel.ctrl'),
            controllerAs: 'connectCtrl',
            bindToController: true
        };
    }).name;