
module.exports = Controller;

Controller.$inject = ['fanHardware'];

function Controller(fan) {

    this.fans = fan.fans;
    
}