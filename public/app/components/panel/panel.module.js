var angular = require('angular');

require('./panel.min.css!');

module.exports = angular
    .module('panel', [])
    .directive('panel', function () {
        return {
            scope: {
                type: '@',
                heading: '@'
            },
            restrict: 'E',
            transclude: true,
            bindToController: true,
            controllerAs: 'panelCtrl',
            controller: InfoPanelController,
            template: require('./panel.html!text')
        };
    }).name;

function InfoPanelController() {

    this.type = this.type || 'default';

}