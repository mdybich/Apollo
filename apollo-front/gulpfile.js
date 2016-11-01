'use-strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('styles', function() {
  gulp.src('sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch-styles',function() {
  gulp.watch('sass/**/*.sass', ['styles']);
});

gulp.task('connect', function() {
  connect.server({
    port: 4000
  })
});

gulp.task("default", ["connect", "watch-styles"]);