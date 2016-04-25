var socketio = require('socketio');
var wildcard = require('socketio-wildcard');
var feathers = require('./vendor/feathers');
var upsert = require('./utils/upsert');

module.exports = AppController;

AppController.$inject = ['$timeout'];

function AppController($timeout) {

    var _this = this;

    this.sensors = [];
    this.hardware = [];

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

    _this.connect();

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

        var sensor = app.service('sensor');
        var hardware = app.service('hardware');

        hardware.on('created', function(item){
            // console.log('created', item);
            _this.hardware.push(item);
            $timeout();
        });

        hardware.on('updated', function(item){
            // console.log('updated', item);
            upsert(_this.hardware, {_id: item._id}, item);

            console.log(_this.hardware.length);
            $timeout();
        });
        
        hardware.find({}).then(function (items) {
            _this.hardware = items;
            $timeout();
        });

        sensor.on('created', function (item) {
            // console.log('created', item);
            _this.sensors.push(item);
            $timeout();
        });

        sensor.on('updated', function (item) {
            // console.log('updated', item);
            upsert(_this.sensors, {_id: item._id}, item);
            $timeout();
        });

        sensor.find({}).then(function (items) {
            _this.sensors = items;
            $timeout();
        });

        

        return socket;

    }


}

