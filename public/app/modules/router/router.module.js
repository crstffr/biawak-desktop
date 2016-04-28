var angular = require('angular');

require('ui-router');
require('ui-router-extras');

var routerModule = angular
    .module('app.router', [
        'ui.router',
        'ct.ui.router.extras',
        require('../../routes/index.route'),
        require('../../routes/dashbaord/dashboard.route')
    ])
    .service('router', require('./router.service'))
    .config(RouterConfig)
    .run(RouterInit);

module.exports = routerModule.name;

RouterConfig.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider'
];

function RouterConfig($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise(function ($injector) {
        $injector.get('$state').go('index');
    });

}


RouterInit.$inject = ['$rootScope', '$state', 'router'];

function RouterInit($rootScope, $state, router) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        if (toState.redirectTo) {
            event.preventDefault();
            $state.go(toState.redirectTo, toParams);
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams){
        router.entered(toState, toParams);
        router.exited(fromState, fromParams);
    });



}
