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

        /*
        globalDeps: {
            'lodash': 'window._',
            'jquery': 'window.jQuery',
            'angular': 'window.angular',
            'moment': 'window.moment',
            'moment-timezone': 'window.moment.tz'
        },

        config: {
            meta: {
                angular: {
                    exports: 'window.angular',
                    format: 'global',
                    build: false
                },
                jquery: {
                    exports: 'window.jQuery',
                    format: 'global',
                    build: false
                },
                lodash: {
                    exports: 'window._',
                    format: 'global',
                    build: false
                },
                moment: {
                    exports: 'window.moment',
                    format: 'global',
                    build: false
                },
                'moment-timezone': {
                    exports: 'window.moment.tz',
                    format: 'global',
                    build: false
                }
            }
        }
        */
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