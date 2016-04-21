var cors = require('cors');
var feathers = require('feathers');
var nedb = require('feathers-nedb');
var rest = require('feathers-rest');
var hooks = require('feathers-hooks');
var favicon = require('serve-favicon');
var compress = require('compression');
var memory = require('feathers-memory');
var bodyParser = require('body-parser');
var socketio = require('feathers-socketio');
var error = require('feathers-errors/handler');

module.exports = feathers()
    .use(compress())
    .options('*', cors())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(favicon('./desktop/icons/greenguy.ico'))
    .use('/', feathers.static('./public/'))
    .use(error())
    .configure(socketio())
    .configure(hooks())
    .configure(rest());