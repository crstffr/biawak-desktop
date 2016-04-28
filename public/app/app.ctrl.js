var socketio = require('socketio');
var wildcard = require('socketio-wildcard');
var feathers = require('./vendor/feathers');
var upsert = require('./utils/upsert');

require('./vendor/photon/common');

module.exports = AppController;

AppController.$inject = ['$timeout', '$state'];

function AppController($timeout, $state) {

    var _this = this;

    this.$state = $state;

    this.app = {};
    this.streams = {};
    this.services = {};
    this.socket = false;
    this.connected = false;

    this.port = 8660;
    this.ip = '192.168.66.24'; // window.location.hostname;

    var _queries = {
        process: {
            $limit: 10,
            $sort: { ThreadCount: -1 }
        }
    };
    /**
     *
     */
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
        _this.socket = _this.socket = socketio(url, opts);
        wildcard(socketio.Manager)(_this.socket); // allows use of wildcards

        _this.socket.on('*', $timeout);

        _this.app = feathers()
            .configure(feathers.hooks())
            .configure(feathers.socketio(_this.socket));

        var collectors = _this.app.service('collectors');

        collectors.find({}).then(_registerCollectors);

        return _this.socket;

    }


    function _registerCollectors(items) {

        var pull = require('lodash/pull');
        var forEach = require('lodash/forEach');

        forEach(items, function(item){

            var name = item._id;
            var service = _this.app.service(name);

            forEach(service.events, function(event){
                //service.on(event, $timeout);
            });

            _this.streams[name] = [];
            _this.services[name] = service;

            var query = _queries[name] || {};

            service.find({query: query}).then(function(items) {
                _this.streams[name] = items;
            });

            service.on('created', function(item) {
                _this.streams[name].push(item);
            });

            service.on('updated', function(item) {
                upsert(_this.streams[name], {_id: item._id}, item);
            });

            service.on('removed', function(item) {
                pull(_this.streams[name], item);
            });

        })

    }

}

