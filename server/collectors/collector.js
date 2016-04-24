var NeDB = require('nedb');
var wmi = require('node-wmi');
var settings = require('../../settings');
var FeatherDB = require('feathers-nedb');
var FeatherApp = require('../webserver');

module.exports = Collector;

function Collector(opts) {

    console.log('new collector', opts);

    var _this = this;

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

        _this.database.persistence.setAutocompactionInterval(5000);

        if (opts.name) {
            
            FeatherApp.use(opts.name, FeatherDB({Model: _this.database}));
            
            _this.service = FeatherApp.service(opts.name);

            _this.service.before({
                create: _timestamp,
                update: _timestamp
            });
            
        }
    }

    function _timestamp(hook) {
        hook.data.timestamp = new Date();
        return hook;
    }

    /**
     *
     */
    this.collect = function() {
        return _this.get().then(_this.save);
    };

    /**
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
                    console.log('got data');
                    console.log(data);
                    resolve(data);
                }
            });
        });
    };

    /**
     *
     * @param {Array|Object} data
     */
    this.save = function(data) {

        console.log('save data');
        console.log(data);

        if (opts.database.overwrite) {
            var id = 1;
            return _this.service.get(id).then(function(item){

                return _this.service.update(id, data);
            }).catch(function(){
                data._id = id;

                console.log('item doesnt exist');
                return sensors.create(data);
            });
        } else {

            console.log('create new record', data);

            return _this.service.create(data);
        }
    };


}