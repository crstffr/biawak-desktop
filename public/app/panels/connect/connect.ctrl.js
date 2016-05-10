module.exports = Controller;

Controller.$inject = ['$localStorage', 'connectionService'];

function Controller($localStorage, server) {

    var _this = this;

    _this.failed = false;
    _this.connect = _connect;
    _this.clearAlerts = _clearAlerts;
    _this.disconnect = server.disconnect;

    if (_this.ip = $localStorage.autoConnect) {
        _this.autoConnect = true;
        _connect(_this.ip);
    } else {
        _this.ip = window.location.hostname;
    }

    function _connect(serverAddress) {

        _this.clearAlerts();

        server.connect(serverAddress).then(function (socket, rpc) {

            if (_this.autoConnect) {
                $localStorage.autoConnect = serverAddress;
            } else {
                delete $localStorage.autoConnect;
            }
            
        }).catch(function (e) {
            _this.failed = true;
        });

    }

    function _clearAlerts() {
        _this.failed = false;
    }


}