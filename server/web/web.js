var wmi = require('node-wmi');
var StaticServer = require('node-static');

module.exports = {

    init: function() {

        var server = new StaticServer.Server('./public');
        var io = require('socket.io')(server);

        require('http').createServer(function (request, response) {
            request.addListener('end', function () {
                server.serve(request, response);
            }).resume();
        }).listen(8662);

    }

};

/*

wmi.Query().namespace('root/OpenHardwareMonitor').class('Sensor', function (err, data) {

});

 wmi.Query().class('Win32_BIOS', logit);

 wmi.Query().class('Win32_LogicalDisk', logit);

 wmi.Query().class('Win32_Processor', logit);

 wmi.Query().class('Win32_VideoController', logit);

 wmi.Query().class('Win32_DesktopMonitor', logit);

 wmi.Query().class('Win32_NetworkAdapter', logit);

 wmi.Query().class('Win32_SCSIController', logit);

 wmi.Query().class('Win32_PhysicalMemory', logit);

 wmi.Query().class('Win32_PointingDevice', logit);

 wmi.Query().class('Win32_SoundDevice', logit);

 wmi.Query().class('Win32_USBController', logit);

 wmi.Query().class('Win32_PerfFormattedData_PerfProc_Process', logit);

 wmi.Query().namespace('root/OpenHardwareMonitor').class('Sensor', logit);

 wmi.Query().namespace('root/OpenHardwareMonitor').class('Hardware', logit);

 */