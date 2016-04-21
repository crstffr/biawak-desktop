
var socketio = require('socketio');
var wildcard = require('socketio-wildcard');
var feathers = require('vendor/feathers');

module.exports = AppController;

AppController.$inject = ['$timeout'];

function AppController($timeout) {

    var _this = this;

    var socket = socketio('http://192.168.66.224:8660');
    var patch = wildcard(socketio.Manager);
    patch(socket);

    socket.on('*', function(thing){
        console.log('socket event', thing);
        $timeout(function(){});
    });

    var app = feathers()
        .configure(feathers.hooks())
        .configure(feathers.socketio(socket));

    var sensors = app.service('sensors');

    sensors.on('created', function(item) {
        console.log('data created', item);
        _this.items.push(item);
    });

    sensors.find({query: {$limit: 4}}).then(function(items){
        _this.items = items;
        $timeout(function(){});
    });

    this.add = function() {
        sensors.create({
            name: 'newthing'
        });
    };

}