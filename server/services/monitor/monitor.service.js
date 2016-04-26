var path = require('path');
var proc = require('child_process');

module.exports = new MonitorService();

function MonitorService() {

    var _this = this;
    var _retries = 0;
    var _maxRetry = 5;

    this.path = path.join(__dirname, '../../../monitor/OpenHardwareMonitor.exe');

    /**
     *
     * @returns {*}
     */
    this.start = function() {

        _this.proc = proc.spawn(_this.path, []);

        return new Promise(function(resolve, reject) {

            _this.proc.on('close', function(code) {

                if (code === 0 && _retries < _maxRetry) {
                    _retries++;
                    _this.start();
                } else if (_retries >= _maxRetry) {
                    console.log('- Restarted monitor the max number of retries');
                }

            }).on('error', function(e){
                console.log('Error opening Monitor', e);
                reject(e);
            });

            setTimeout(function(){
                resolve(_this.proc);
            }, 2000);

        });

    };

    /**
     *
     */
    this.kill = function() {
        _this.proc.kill('SIGINT');
    }

}

