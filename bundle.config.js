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
        lowResSourceMaps: true
    },

    bundles: {
        libs: {
            items: [
                'angular',
                'jquery',
                'lodash'
            ]
        },
        socket: {
            combine: true,
            items: [
                'socketio',
                'socketio-wildcard',
                'vendor/feathers'
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