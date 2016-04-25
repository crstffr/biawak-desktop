var _ = require('lodash');
var NeDB = require('nedb');
var wmi = require('node-wmi');
var settings = require('../../settings');
var MemoryDB = require('feathers-memory');
var FeatherDB = require('feathers-nedb');
var webserver = require('../webserver');

module.exports = Collector;

function Collector(opts) {

    var _this = this;

    _this.name = opts.name;

    if (opts.wmi) {

        _this.query = wmi.Query();

        if (opts.wmi.namespace) {
            _this.query = _this.query.namespace(opts.wmi.namespace);
        }

        if (opts.wmi.class) {
            _this.query = _this.query.class(opts.wmi.class);
        }
    }

    if (opts.database) {
        
        _this.database = new NeDB({
            autoload: true,
            filename: settings.database.location + opts.database.file
        });

        _this.database.persistence.setAutocompactionInterval(opts.interval || 5000);

        if (opts.name) {

            _this.db = FeatherDB({Model: _this.database});
            _this.service = webserver.app.service(opts.name, _this.db);

            _this.service.before({
                create: _timestamp,
                update: _timestamp
            });

            _this.service.before({
                create: _setId,
                update: _setId
            });
        }
    }

    function _setId(hook) {
        if (hook.data.Identifier) {
            hook.data._id = hook.data.Identifier;
        }
        return hook;
    }

    function _timestamp(hook) {
        hook.data.timestamp = new Date();
        return hook;
    }

    /**
     * Start collecting at a regular interval.
     */
    this.start = function() {
        _this.stop();
        _this.collect();
        _this.interval = setInterval(_this.collect, opts.interval || 1000);
        console.log('- Start collecting data from', _this.name);
    };

    /**
     * Stop collecting at an interval.
     */
    this.stop = function() {
        if (_this.interval) {
            clearInterval(_this.interval);
            console.log('- Stop collecting data from', _this.name);
        }
    };

    /**
     * Get data from the WMI and save it to the database.
     */
    this.collect = function() {
        return _this.get().then(_this.save);
    };

    /**
     * Get data from the WMI.
     *
     * @returns {Promise}
     */
    this.get = function() {
        return new Promise(function(resolve, reject){
            _this.query.exec(function(err, data){
                if (err) {
                    reject(err);
                    console.log('Error fetching WMI');
                    console.log(_this.query);
                    console.log(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    /**
     * Save data to the database.
     *
     * @param {Array|Object} data
     */
    this.save = function(data) {

        if (opts.database.overwrite) {
            if (_.isArray(data)) {
                return Promise.all(_.map(data, _this.save));
            }
        }

        return _this.service.create(data).catch(function(err){
            if (err.errorType === 'uniqueViolated') {
                return _this.service.update(data.Identifier, data);
            } else {
                console.log('Error saving data', err);
                return Promise.reject(err);
            }
        });
    };

}