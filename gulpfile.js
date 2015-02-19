var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rjs = require('gulp-requirejs');
var server = require('gulp-express');

gulp.task('assets:html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./release'));
});

gulp.task('assets:data', function() {
    return gulp.src('./src/data/*')
        .pipe(gulp.dest('./release/data'));
});

gulp.task('assets:libs', function() {
    return gulp.src([
        './src/lib/jquery/jquery.js',
        './src/lib/jspath/lib/jspath.js',
        './src/lib/qunit/qunit/qunit.js',
        './src/lib/requirejs/require.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./release/lib'));
});

gulp.task('assets:css', function() {
    return gulp.src([
        './src/lib/qunit/qunit/qunit.css'
    ])
        .pipe(minifyCSS())
        .pipe(gulp.dest('./release/css'));
});

gulp.task('assets', ['assets:html', 'assets:data', 'assets:libs', 'assets:css']);

gulp.task('js', function() {
    rjs({
        baseUrl: './src/blocks',
        paths: {
            external: '../lib'
        },
        out: 'bw.js',
        name: '../bw'
    })
        .pipe(uglify())
        .pipe(gulp.dest('./release/'));

    rjs({
        baseUrl: './src/blocks',
        paths: {
            external: '../lib'
        },
        out: 'bwtests.js',
        name: '../bwtests'
    })
        .pipe(uglify())
        .pipe(gulp.dest('./release/'));
});

gulp.task('less', function () {
    return gulp.src('./src/blocks/main/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./release/css'));
});

gulp.task('release', ['assets', 'js', 'less']);

gulp.task('serve', ['release'], function() {
    server.run(['./app.js']);

    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/blocks/**/*.less', ['less']);
    gulp.watch('./src/*.html', ['assets:html']);
});

gulp.task('default', ['serve']);