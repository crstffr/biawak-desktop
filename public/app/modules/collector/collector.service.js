
module.exports = CollectorService;

CollectorService.$inject = ['$q', 'connectionService'];

function CollectorService($q, server) {

    var _this = this;

    var get = require('lodash/get');
    var pull = require('lodash/pull');
    var assign = require('lodash/assign');
    var forEach = require('lodash/forEach');
    var upsert = require('../../utils/upsert');

    this.rpc = {};
    this.streams = {};
    this.services = {};
    this.collectors = {};
    var _onCollect = [];
    var _promises = {};

    server.onConnect(function(conn){
        _this.rpc = conn.rpc;
        _this.rpc.service('collectors').find({}).then(_registerCollectors);
    });

    server.onDisconnect(function(){
        _this.streams = {};
        _this.services = {};
        _this.collectors = {};
    });

    this.onCollect = function(cb) {
        _onCollect.push(cb);
    };

    this.getStream = function(name, cb){
        _this.onCollect(function(collector){
            if (collector.name === name) {
                cb(collector.items);
            }
        })
    };

    function _registerCollectors(collectors) {

        forEach(collectors, function(collector) {

            var name = collector._id;
            var service = _this.rpc.service(name);
            
            _this.streams[name] = {};
            _this.services[name] = service;

            var query = {};

            service.find({query: query}).then(function(items) {
                forEach(items, function(item) {
                    _this.streams[name][item._id] = item;
                });
                _exec(_onCollect, {name: name, items: _this.streams[name]});
            });

            service.on('created', function(item) {
                _this.streams[name][item._id] = item;
            });

            service.on('updated', function(item) {
                assign(_this.streams[name][item._id], item);
            });

            service.on('removed', function(item) {
                delete _this.streams[name][item._id];
            });

        });

    }

    function _exec(collection, payload) {
        forEach(collection, function(cb){
            cb.bind(_this)(payload);
        });
    }

}