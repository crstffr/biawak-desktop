(function() {
    
    function load(script) {
        document.write('<' + 'script src="' + script + '" type="text/javascript"><' + '/script>');
    }

    load('jspm_packages/system.js');
    load('config.js');
    load('bundle.js');
    load('bootstrap.js');

})();
