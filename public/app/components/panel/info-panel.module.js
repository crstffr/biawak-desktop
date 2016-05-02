var angular = require('angular');

module.exports = angular
    .module('infoPanel', [])
    .directive('infoPanel', function () {
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
            template: require('./info-panel.html!text')
        };
    }).name;

function InfoPanelController() {

    this.type = this.type || 'default';

}