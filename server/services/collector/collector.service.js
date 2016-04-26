
var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var server = require('../../webserver');
var Datastore = require('../../datastores/nedb');

module.exports = new CollectorService();

function CollectorService() {

    var _this = this;
    var _path = '../../collectors/';
    var _collectors = {};
    var _files = [];

    var _datastore = new Datastore({inMemoryOnly: true});
    _this.service = server.app.service('collectors', _datastore.db);

    glob('server/collectors/**/*.collector.js', function(err, files){
        _.forEach(files, function(file){
            _files.push(path.basename(file));
        });
    });

    this.load = function() {

        return Promise.all(_.map(_files, function(file) {

            var filepath = _path + file;

            try {

                var Collector = require(filepath);
                var collector = new Collector();

                _collectors[collector.name] = collector;
                _this.service.create({_id: collector.name});

                console.log('  --', collector.name);
                return Promise.resolve(collector);

            } catch(e) {
                console.log('Error loading collector module');
                console.log(e);
                return Promise.reject(e);
            }

        }));
    };

    this.start = function() {
        console.log('- Starting all of the collectors ----------');
        _.invokeMap(_collectors, 'start');
    };

    this.stop = function() {
        console.log('- Stopping all of the collectors ----------');
        _.invokeMap(_collectors, 'stop');
    };
}

