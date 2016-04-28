var route = require('angular')
    .module('route.dashboard', [])
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

