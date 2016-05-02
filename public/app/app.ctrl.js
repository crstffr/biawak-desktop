module.exports = AppController;

AppController.$inject = [
    '$state',
    'connectionService',
    'collectorService'
];

function AppController($state, server, collectors) {

    this.$state = $state;
    this.server = server;
    this.collectors = collectors;

}

