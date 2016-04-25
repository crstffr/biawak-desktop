var socketio = require('socketio');
var wildcard = require('socketio-wildcard');
var feathers = require('./vendor/feathers');
var upsert = require('./utils/upsert');

module.exports = AppController;

AppController.$inject = ['$timeout'];

function AppController($timeout) {

    var _this = this;

    this.items = [];
    this.socket = false;
    this.connected = false;

    this.port = 8660;
    this.ip = window.location.hostname;

    this.connect = function () {

        var socket = _connectToServer(_this.ip, _this.port);

        socket.on('connect', function () {

            _this.connected = true;
            $timeout();

        }).on('connect_error', function (e) {

            console.error('connection error', e);
            socket.disconnect();

        }).on('disconnect', function () {

            console.log('disconnected');
            _this.connected = false;

        });

    };

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
        var socket = _this.socket = socketio(url, opts);
        var patch = wildcard(socketio.Manager);
        patch(socket);

        socket.on('*', $timeout);

        var app = feathers()
            .configure(feathers.hooks())
            .configure(feathers.socketio(socket));

        var sensors = app.service('sensors');

        sensors.on('created', function (item) {
            _this.items.push(item);
            $timeout();
        });

        sensors.on('updated', function (item) {
            upsert(_this.items, {Identifier: item.Identifier}, item);
            $timeout();
        });

        sensors.find({}).then(function (items) {
            _this.items = items;
            $timeout();
        });

        return socket;

    }


}

