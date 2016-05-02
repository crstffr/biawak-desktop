
var angular = require('angular');

module.exports = angular.module('clockspeed.filter', [])
    .filter('clockspeed', ClockSpeedFilter)
    .name;

function ClockSpeedFilter() {

    return function(input) {
        
        var suff = ' MHz';
        var value = parseInt(input, 10);
        
        if (value > 1000) {
            suff = ' GHz';
            value = Math.round(value) / 1000;
        } else {
            value = Math.round(value);
        }
        
        return String(value) + suff;

    };
}