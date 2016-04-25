var find = require('lodash/find');
var indexOf = require('lodash/indexOf');

module.exports = function (arr, key, newval) {
    var match = find(arr, key);
    if(match){
        var index = indexOf(arr, find(arr, key));
        arr.splice(index, 1, newval);
    } else {
        arr.push(newval);
    }
};