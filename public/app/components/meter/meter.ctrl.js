module.exports = Controller;

Controller.$inject = ['$scope', '$element'];

function Controller($scope, $element) {

    var _this = this;

    var $bar = $($element).find('.progress-bar');

    var _min = _this.min || 0;
    var _max = _this.max || 100;

    var settings = {
        use_percentage: false,
        display_text: 'center',
        transition_delay: 100,
        refresh_speed: 10
    };

    switch(_this.type.toLowerCase()) {

        case 'voltage':
            settings.amount_format = function(cur, max, min){
                return cur + ' V';
            };
            break;

        case 'clock':
            settings.amount_format = function(cur, max, min){
                return cur + ' MHz';
            };
            break;

        case 'temp':
            settings.amount_format = function(cur, max, min){
                return cur + ' °C';
            };
            break;

        case 'fan':
            settings.amount_format = function(cur, max, min){
                return Number(cur).toLocaleString() + ' RPM';
            };
            break;

        case 'load':
        case 'control':
        case 'level':
            settings.use_percentage = true;
            break;

    }

    $bar.attr('aria-valuemin', _min)
        .attr('aria-valuemax', _max)
        .progressbar(settings);

    $scope.$watch(function(){
        return _this.value;
    }, function(newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            $bar.attr('data-transitiongoal', newVal).progressbar();
        }
    });

}