var socketio = require('socketio');
var forEach = require('lodash/forEach');
var wildcard = require('socketio-wildcard');
var feathers = require('../../vendor/feathers');

module.exports = ConnectionService;

ConnectionService.$inject = ['$q', '$timeout'];

function ConnectionService($q, $timeout) {

    var _this = this;
    
    this.ip = window.location.hostname;
    this.port = 8660;

    this.rpc = false;
    this.socket = false;
    this.connected = false;

    var _onConnect = [];
    var _onDisconnect = [];

    this.onConnect = function(cb) {
        _onConnect.push(cb);
    };

    this.onDisconnect = function(cb) {
        _onDisconnect.push(cb);
    };

    /**
     *
     */
    this.disconnect = function() {
        if (_this.socket) {
            _this.socket.disconnect();
        }
    };

    /**
     *
     * @param ip
     * @param port
     * @returns {*}
     */
    this.connect = function(ip, port) {

        ip = ip || _this.ip;
        port = port || _this.port;

        var socket = _connectToServer(ip, port);

        var rpc = feathers()
            .configure(feathers.hooks())
            .configure(feathers.socketio(socket));

        socket.on('*', $timeout);

        return $q(function(resolve, reject){

            socket.on('connect', function () {

                _this.ip = ip;
                _this.port = port;
                _this.connected = true;
                _this.socket = socket;
                _this.rpc = rpc;
                $timeout();

                var payload = {socket: socket, rpc: rpc};
                _exec(_onConnect, payload);
                resolve(payload);

            }).on('connect_error', function (e) {

                socket.disconnect();
                reject(e);

            }).on('disconnect', function () {

                _this.connected = false;
                _this.socket = false;
                _this.rpc = false;

                _exec(_onDisconnect);

            });

        });

    };

    /**
     *
     * @param ip
     * @param port
     * @returns {*}
     * @private
     */
    function _connectToServer(ip, port) {

        if (_this.socket) {
            _this.socket.disconnect();
            _this.socket = false;
        }

        var opts = {
            timeout: 2000,
            reconnection: false
        };

        var url = 'http://' + ip + ':' + port;
        var socket = socketio(url, opts);
        wildcard(socketio.Manager)(socket); // allows use of wildcards

        return socket;

    }

    function _exec(collection, payload) {
        forEach(collection, function(cb){
            cb.bind(_this)(payload);
        });
    }

}