
var _ = require('lodash');
var path = require('path');

module.exports = new Collectors();

function Collectors() {

    var _this = this;

    var _collectors = {};

    var _path = './collectors/';

    var _files = [
        'sensor/sensor.collector'
    ];

    this.load = function() {

        _.forEach(_files, function(file) {

            var filepath = _path + file;

            try {

                var Collector = require(filepath);
                var collector = new Collector();
                _collectors[collector.name] = collector;
                console.log('- --', collector.name);

            } catch(e) {
                console.log('Error loading collector module');
                console.log(e);
            }

        });
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

