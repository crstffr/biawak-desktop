
var angular = require('angular');

var route = angular
    .module('route.dashboard', [
        require('angular-dragula')(angular),
        require('app/panels/connect/connect.module'),
        require('app/panels/cpu-temp/cpu-temp.module'),
        require('app/panels/cpu-load/cpu-load.module'),
        require('app/panels/fan-speed/fan-speed.module')
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

