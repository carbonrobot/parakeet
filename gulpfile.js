const gulp = require('gulp');
const nodemon = require('nodemon');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const runsequence = require('run-sequence');
const clean = require('gulp-clean');
const webpack = require('webpack-stream');

// The default task, called when gulp is executed without a task name
gulp.task('default', ['build']);

// build task
gulp.task('build', function(done){
    runsequence('clean', ['content', 'vendor', 'app'], done);
});

// dev server
gulp.task('serve', function(done){
    runsequence('build', 'run', 'watch', done); 
});

// clean public dir
gulp.task('clean', function(){
    return gulp.src('public', {read: false}).pipe(clean());
});

// vendor js
// TODO: convert to webpack as well?
gulp.task('vendor', function() {
    return gulp.src([
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts'));
});

// build js, using webpack
gulp.task('app', function() {
    const tsconfig = ts.createProject('tsconfig.json');
    return gulp.src('src/app/client/main.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('public/scripts'));
});

// Copies all server side html content to the output folder
gulp.task('content', function() {
    return gulp.src(['src/app/**/*.html', 'src/app/**/*.css'])
        .pipe(gulp.dest('public'));
});

// Starts the development server and restarts automatically when changes are made
gulp.task('run', function() {
    nodemon({
        script: 'index.js',
        watch: ['src/*'],
        ext: 'js',
        ignore: ['src/app/*'], // ignore files that are changed by the build
        env: { NODE_ENV: 'development', DEBUG: true }
    });
});

// Watches the given file paths, and if it detects changes, re-runs the specified gulp tasks 
gulp.task('watch', function() {
    gulp.watch('src/app/**/*.js', ['app']);
    gulp.watch('src/app/**/*.ts', ['app']);
    gulp.watch('src/app/**/*.html', ['content']);
});