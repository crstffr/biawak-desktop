(function() {
    
    function load(script) {
        document.write('<' + 'script src="' + script + '" type="text/javascript"><' + '/script>');
    }

    load('https://npmcdn.com/feathers-client@1.1.0/dist/feathers.js');
    load('jspm_packages/system.js');
    load('config.js');
    load('bundle.js');
    load('bootstrap.js');

})();

