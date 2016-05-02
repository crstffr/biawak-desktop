
var angular = require('angular');

var route = angular
    .module('route.dashboard', [
        require('angular-dragula')(angular),
        require('../../filters/clockspeed.filter'),
        require('../../filters/percentage.filter'),
        require('../../modules/collector/collector.module'),
        require('../../components/panel/info-panel.module'),
        require('../../components/panel/connect-panel/connect-panel.module'),
        require('../../components/panel/cpu-panel/cpu-panel.module'),
        require('../../components/panel/fan-panel/fan-panel.module'),
        require('../../components/panel/gpu-panel/gpu-panel.module')
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state({
            sticky: true,
            name: 'dashboard',
            url: '/dashboard/',
            views: {
                'dashboard': {
                    template: require('./dashboard.html!text'),
                    controller: require('./dashboard.ctrl'),
                    controllerAs: 'ctrl'
                }
            }
        });
    }]);

module.exports = route.name;

