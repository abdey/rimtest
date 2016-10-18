'use strict';

var browserSync = require('browser-sync'),
    gulp = require('gulp'),
    proxyMiddleware = require('http-proxy-middleware');


gulp.task('serve', function () {
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
