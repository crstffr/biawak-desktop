var _ = require('lodash');
var cors = require('cors');
var feathers = require('feathers');
var nedb = require('feathers-nedb');
var rest = require('feathers-rest');
var defer = require('promise-defer');
var hooks = require('feathers-hooks');
var favicon = require('serve-favicon');
var compress = require('compression');
var memory = require('feathers-memory');
var bodyParser = require('body-parser');
var socketio = require('feathers-socketio');
var error = require('feathers-errors/handler');
var settings = require('../settings');

var _ready = defer();

var _oc = []; // onConnect callbacks
var _od = []; // onDisconnect callbacks

var _server = {
    io: {},
    app: {},
    clients: 0,

    start: function() {
        this.app.listen(settings.webserver.port);
        return _ready.promise;
    },

    whenReady: function(){
        return _ready.promise;
    },

    onConnect: function(cb){
        if (_.isFunction(cb)) {
            _oc.push(cb);
        }
    },

    onDisconnect: function(cb) {
        if (_.isFunction(cb)) {
            _od.push(cb);
        }
    }
};

module.exports = _server;

_server.app = feathers()
    .use(compress())
    .options('*', cors())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(favicon(settings.desktop.icon.win.tray))
    .use('/', feathers.static('./public/'))
    .use(error())
    .configure(rest())
    .configure(hooks())
    .configure(socketio(function (io) {

        _server.io = io;

        io.on('connection', function (socket) {

            _server.clients++;

            _.forEach(_oc, function(cb){
                cb(socket);
            });

            socket.on('disconnect', function(){

                _server.clients--;

                _.forEach(_od, function(cb){
                    cb();
                });
            });
        });

    }))
    .configure(function(){

        _ready.resolve(_server);

    });