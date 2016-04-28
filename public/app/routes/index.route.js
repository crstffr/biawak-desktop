var route = require('angular')
    .module('route.index', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state({
            url: '/',
            name: 'index',
            redirectTo: 'dashboard'
        });
    }]);

module.exports = route.name;
