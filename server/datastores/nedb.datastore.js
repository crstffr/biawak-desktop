var NeDB = require('nedb');
var path = require('path');
var FeatherDB = require('feathers-nedb');
var settings = require('../../settings');

module.exports = NeDBDatastore;

function NeDBDatastore(opts) {

    this.opts = opts;

    if (opts.filename && !path.isAbsolute(opts.filename)) {
        opts.filename = settings.database.location + opts.filename;
        opts.autoload = true;
    }

    var datastore = new NeDB(opts);

    datastore.persistence.setAutocompactionInterval(opts.interval || 5000);

    this.db = FeatherDB({
        Model: datastore
    });

}

