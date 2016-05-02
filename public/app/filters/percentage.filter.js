
var angular = require('angular');

module.exports = angular.module('percentage.filter', [])
    .filter('percentage', PercentageFilter)
    .name;

function PercentageFilter() {

    return function(input) {

        return String(Math.round(input)) + '%';

    };
}