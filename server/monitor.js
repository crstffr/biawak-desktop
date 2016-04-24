var path = require('path');
var proc = require('child_process');

module.exports = Monitor;

function Monitor() {

    var _this = this;
    var _retries = 0;

    this.path = path.join(__dirname, '../monitor/OpenHardwareMonitor.exe');

    /**
     *
     * @returns {*}
     */
    this.start = function() {

        _this.proc = proc.spawn(_this.path, []);

        return new Promise(function(resolve, reject) {

            _this.proc.on('message', function(thing) {

                console.log('message', thing);

            }).on('close', function(code) {
                if (code === 0 && _retries < 5) {
                    _retries++;
                    _this.start();
                    console.log('Restarting Monitor...');
                }
            }).on('error', function(e){
                console.log('Error opening Monitor', e);
                reject(e);
            });

        });

    };

    /**
     *
     */
    this.kill = function() {
        _this.proc.kill('SIGINT');
    }

}

