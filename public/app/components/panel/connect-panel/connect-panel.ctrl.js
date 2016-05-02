module.exports = ConnectPanelController;

ConnectPanelController.$inject = ['$timeout', 'connectionService'];

function ConnectPanelController($timeout, server) {

    var _this = this;

    this.failed = false;

    this.ip = window.location.hostname;

    this.disconnect = server.disconnect;

    this.connect = function (serverAddress) {

        _this.clearAlerts();

        server.connect(serverAddress).then(function (socket, rpc) {
            console.log('connected to the thing', socket, rpc);
        }).catch(function (e) {
            _this.failed = true;
        });

    };

    this.clearAlerts = function () {
        _this.failed = false;
    };


}