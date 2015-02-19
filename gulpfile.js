var gulp = require('gulp');
var merge = require('merge-stream');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rjs = require('gulp-requirejs');
var server = require('gulp-express');

gulp.task('assets', function() {
    console.log('Copying assets...');
    var html = gulp.src('./src/*.html')
        .pipe(gulp.dest('./release'));

    var data = gulp.src('./src/data/*')
        .pipe(gulp.dest('./release/data'));

    var libs = gulp.src([
        './src/lib/jquery/jquery.js',
        './src/lib/jspath/lib/jspath.js',
        './src/lib/qunit/qunit/qunit.js',
        './src/lib/requirejs/require.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./release/lib'));

    var css = gulp.src([
        './src/lib/qunit/qunit/qunit.css'
    ])
        .pipe(minifyCSS())
        .pipe(gulp.dest('./release/css'));
    
    return merge(html, data, libs, css);
});

gulp.task('js', function() {
    console.log('Compiling app...');
    var app = rjs({
        baseUrl: './src/blocks',
        paths: {
            external: '../lib'
        },
        out: 'bw.js',
        name: '../bw'
    })
        .pipe(uglify())
        .pipe(gulp.dest('./release/'));

    console.log('Compiling tests...');
    var tests = rjs({
        baseUrl: './src/blocks',
        paths: {
            external: '../lib'
        },
        out: 'bwtests.js',
        name: '../bwtests'
    })
        .pipe(uglify())
        .pipe(gulp.dest('./release/'));
    
    return merge(app, tests);
});

gulp.task('less', function () {
    console.log('Compiling LESS...');
    return gulp.src('./src/blocks/main/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./release/css'));
});

gulp.task('release', ['assets', 'js', 'less']);

gulp.task('serve', ['release'], function() {
    server.run({
        file: './app.js'
    });

    gulp.watch('./src/blocks/**/*.less', ['less']);
    gulp.watch('./src/*.html', ['assets']);
});

gulp.task('default', ['serve']);