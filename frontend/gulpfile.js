'use strict';

var browserSync = require('browser-sync'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    proxyMiddleware = require('http-proxy-middleware'),
    source  = require('vinyl-source-stream'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    exorcist = require('exorcist'),
    browserify = require('browserify');

// Watchify args contains necessary cache options to achieve fast incremental bundles.
// See watchify readme for details. Adding debug true for source-map generation.
watchify.args.debug = true;
// Input file.
var bundler = watchify(browserify('./src/webapp/app.jsx', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src/webapp'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('src/webapp/dist/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./src/webapp/dist'))
        .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

gulp.task('serve', ['bundle'], function () {
    browserSync.instance = browserSync.init({
        startPath: '/',
        server: {
            baseDir: 'src',
            middleware: [
                proxyMiddleware('/py', {
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                    pathRewrite: {'^/py' : ''},
                    ws: true,
                    logLevel: 'debug'
                }),
            ],
        },
        logLevel: 'debug',
        browser: 'default'
    });
});
