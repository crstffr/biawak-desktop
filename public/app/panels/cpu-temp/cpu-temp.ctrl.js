module.exports = Controller;

Controller.$inject = ['cpuHardware'];

function Controller (cpu) {

    this.temps = cpu.temps;
    
}