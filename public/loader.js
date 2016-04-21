'use strict';

var electron = require('electron');
var ipc = electron.ipcRenderer;
var app = {};

ipc.send('sensors');

ipc.on('sensors', function(e, a){
    console.log(e, a);
});

app.reload = function(){
    ipc.send('reload');
};