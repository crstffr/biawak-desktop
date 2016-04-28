// Use of Gulp Help requires passing Gulp to the
// gulp-help plugin.  This is also where we
// specify the global Gulp Help options.

var gulp = require('gulp-help')(require('gulp'), {
    hideEmpty: true,
    hideDepsMessage: true
});

var _electron; // running instance of electron
var settings = require('./settings');
var sequence = require('run-sequence').use(gulp);

/***********************
 * PATHS
 ***********************/

var _root = __dirname + '/';
var _public = _root + 'public/';

var paths = {
    
    root: _root,
    public: _public,
    
    config: {
        npm: _root + 'package.json',
        jspm: _public + 'jspm_packages/',
        system: _public + 'config.js',
        bundle: _root + 'bundle.config.js',
        settings: _root + 'settings.js'
    },

    css: _public + 'style/css/',
    sass: _public + 'style/scss/',
    modules: _public + 'app/modules/',
    components: _public + 'app/components/',
    bundles: _public + 'bundles/',
    desktop: _root + 'desktop/',
    server: _root + 'server/'

};

/***********************
 * GLOBS
 ***********************/

var globs = {

    public: {

        sass: {
            main: [

                // Files that are watched and then rebuilt into
                // main.min.css when they are modified.

                paths.sass + 'main.scss',
                paths.sass + '_settings.scss'
            ],
            comp: [

                // Files that are watched and then rebuilt into
                // their own respective folders when modified.

                paths.components + '**/*.scss',
                paths.modules + '**/*.scss',
                paths.sass + '_settings.scss'
            ],
            vendor: [

                // Files that are watched and then rebuilt into
                // vendor.min.css when they are modified.

                paths.sass + 'theme.scss'
            ]
        }
    },

    desktop: {
        js: paths.desktop + '**/*.js'
    },

    server: {
        js: paths.server + '**/*.js'
    }

};


/***********************
 * MAIN TASKS
 ***********************/

gulp.task('default', ['help']);

gulp.task('clean', 'Remove all static build files.', function (done) {
    sequence(
        'clean-css',
        'clean-bundles',
        'unbundle',
        done
    );
});

gulp.task('sass', 'Compile Sass into CSS', function (done) {
    sequence(
        'build-main-css',
        'build-comp-css',
        'build-vendor-css',
        done
    );
});

gulp.task('dist', 'Prepare app for distribution', function(done) {
    sequence(
        'clean',
        'build',
        'bundle',
        done
    );
});

gulp.task('server', 'Start simple server, reload source files on change', function (done) {
    sequence(
        'sass',
        'sass:watch',
        'build:server',
        done
    );
});

gulp.task('desktop', 'Launch Electron, reload on source changes', function (done) {
    sequence(
        'electron:watch',
        done
    );
});


/***********************
 * CLEAN
 ***********************/

gulp.task('clean-css', function () {
    var del = require('del');
    return del([
        _public + '**/*.min.css',
        _public + '**/*.min.css.map'
    ]);
});

gulp.task('clean-bundles', function () {
    var del = require('del');
    return del(paths.bundles + '**/*');
});

/***********************
 * BUILD public
 ***********************/

gulp.task('build-main-css', function () {

    var sass = require('gulp-sass');
    var rename = require('gulp-rename');
    var minifyCSS = require('gulp-clean-css');
    var sourcemaps = require('gulp-sourcemaps');
    var sassJspm = require('sass-jspm-importer');

    return gulp.src(globs.public.sass.main)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [paths.sass],
            functions: sassJspm.resolve_function(paths.config.jspm),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
});

gulp.task('build-comp-css', function () {

    var sass = require('gulp-sass');
    var rename = require('gulp-rename');
    var minifyCSS = require('gulp-clean-css');
    var sourcemaps = require('gulp-sourcemaps');
    var sassJspm = require('sass-jspm-importer');

    return gulp.src(globs.public.sass.comp, {base: './'})
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [paths.sass],
            functions: sassJspm.resolve_function(paths.config.jspm),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});

gulp.task('build-vendor-css', function () {

    var sass = require('gulp-sass');
    var rename = require('gulp-rename');
    var minifyCSS = require('gulp-clean-css');
    var sourcemaps = require('gulp-sourcemaps');
    var sassJspm = require('sass-jspm-importer');

    return gulp.src(globs.public.sass.vendor)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [paths.sass],
            functions: sassJspm.resolve_function(paths.config.jspm),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
});

/***********************
 * BUNDLE
 ***********************/

gulp.task('bundle', 'Compile static bundles, takes optional -g argument', function () {
    var minimist = require('minimist');
    var options = minimist(process.argv.slice(2));
    var config = require(paths.config.bundle);
    var Bundler = require('jspm-bundler');
    var bundler = new Bundler(config);
    return bundler.bundle(options.g).catch(function (e) {
        throw e;
    });
});

gulp.task('unbundle', 'Removes static bundles, takes optional -g argument', function () {
    var minimist = require('minimist');
    var options = minimist(process.argv.slice(2));
    var config = require(paths.config.bundle);
    var Bundler = require('jspm-bundler');
    var bundler = new Bundler(config);
    return bundler.unbundle(options.g).catch(function (e) {
        throw e;
    });
});

/***********************
 * BROWSER SYNC
 ***********************/

gulp.task('sass:watch', function () {

    // Watch public SASS files for changes, rebuild as needed

    gulp.watch(globs.public.sass.main, ['build-main-css']);
    gulp.watch(globs.public.sass.comp, ['build-comp-css']);
    gulp.watch(globs.public.sass.vendor, ['build-vendor-css']);
    
});

gulp.task('build:server', function (done) {

    var opn = require('opn');

    // Starts a BrowserSync server that watches both
    // public and Docs and reloads on changes.

    var port = 8100;
    var browserSync = require('browser-sync');

    browserSync.create().init({
        port: port,
        open: false,
        ui: { port: port + 1 },
        server: paths.public,
        notify: false,
        logLevel: 'info',
        ghostMode: false,
        timestamps: false,
        logFileChanges: false,
        files: [
            _public + '**/*.html',
            _public + '**/*.css',
            _public + '**/!(*spec).js'
        ]
    });

    opn('http://' + settings.server.ip + ':' + port);
    done();
});


/***********************
 * ELECTRON DESKTOP
 ***********************/

gulp.task('electron:start', function(done){
    var electron = require('electron-prebuilt');
    var proc = require('child_process');
    _electron = proc.spawn(electron, ['.']);
    _electron.on('exit', function(){
        done();
    }).on('error', function(e){
        console.log(e);
    }).stdout.on('data', function(data) {
        console.log(data.toString());
    });
});

gulp.task('electron:stop', function(done) {
    if (_electron) {
        _electron.on('exit', function () {
            _electron = false;
            done();
        }).kill('SIGINT');
    } else {
        done();
    }
});

gulp.task('electron:watch', function(done) {
    var watch = require('gulp-watch');
    watch([
        globs.server.js,
        globs.desktop.js,
        paths.config.settings
    ], function() {
        sequence(
            'electron:stop',
            'electron:start'
        )
    });
    if (!_electron) {
        sequence('electron:start');
    }
});
