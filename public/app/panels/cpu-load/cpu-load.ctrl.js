module.exports = Controller;

Controller.$inject = ['cpuHardware'];

function Controller (cpu) {
    
    this.loads = cpu.loads;
    
}