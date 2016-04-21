module.exports = {

    baseURL: 'public',
    dest: 'bundles',
    file: 'bundles.js',
    
    bust: true,

    builder: {
        sfx: false,
        minify: true,
        mangle: true,
        sourceMaps: true,
        separateCSS: true,
        lowResSourceMaps: true
    },

    bundles: {
        libs: {
            items: [
                'angular',
                'lodash'
            ]
        },
        socket: {
            combine: true,
            items: [
                'socketio',
                'socketio-wildcard',
                'app/vendor/feathers'
            ]
        },
        app: {
            exclude: ['libs', 'socket'],
            items: {
                'app/app.module': 'app'
            }
        }
    }
};