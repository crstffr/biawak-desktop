var _ = require('lodash');
var NeDB = require('nedb');
var wmi = require('node-wmi');
var WmiClient = require('wmi-client');

var settings = require('../../settings');
var MemoryDB = require('feathers-memory');
var FeatherDB = require('feathers-nedb');
var server = require('../webserver');

module.exports = CollectorModel;

function CollectorModel(opts) {

    var _this = this;

    _this.opts = opts;
    _this.name = _this.opts.name;

    /**
     *
     */
    if (_this.opts.wmi) {

        _this.wmi = new WmiClient({
            host: settings.server.ip,
            namespace: _this.opts.wmi.namespace
        });

        var query = _this.opts.wmi.query || 'Select *';
        _this.query = query + ' FROM ' + _this.opts.wmi.class;
    }

    /**
     *
     */
    if (_this.opts.datastore) {
        if (_this.opts.name) {
            _this.service = server.app.service(_this.opts.name, _this.opts.datastore.db);
            _this.service.before({
                create: _setId,
                update: _setId
            });
        }
    }

    /**
     *
     * @param hook
     * @returns {*}
     * @private
     */
    function _setId(hook) {
        var id = _this.opts.datastore.opts.id;
        if (hook.data[id]) {
            hook.data._id = _getId(hook.data[id]);
        }
        return hook;
    }

    /**
     *
     * @param id
     * @returns {string}
     * @private
     */
    function _getId(id) {
        return _this.opts.name + ':' + id;
    }

    /**
     * Start collecting at a regular interval.
     */
    this.start = function () {
        _this.stop();
        setTimeout(_this.collect, 500);
        _this.interval = setInterval(_this.collect, _this.opts.interval || 1000);
        console.log('- Start collecting data from', _this.name);
    };

    /**
     * Stop collecting at an interval.
     */
    this.stop = function () {
        if (_this.interval) {
            console.log('- Stop collecting data from', _this.name);
            clearInterval(_this.interval);
            delete _this.interval;
        }
    };

    /**
     * Get data from the WMI and save it to the datastore.
     */
    this.collect = function () {
        return _this.get().then(_this.save);
    };

    /**
     * Get data from the WMI.
     *
     * @returns {Promise}
     */
    this.get = function () {
        return new Promise(function (resolve, reject) {
            _this.wmi.query(_this.query, function (err, data) {
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
     * Save data to the datastore.
     *
     * @param {Array|Object} data
     */
    this.save = function (data) {

        if (_.isArray(data)) {
            return Promise.all(_.map(data, _this.save));
        }

        return _this.service.create(data).catch(function (err) {
            if (err.errorType === 'uniqueViolated') {
                return _this.service.update(_getId(data.Identifier), data);
            } else {
                console.log('Error saving data', err);
                return Promise.reject(err);
            }
        }).then(function(item){
            return item;
        });
    };

}