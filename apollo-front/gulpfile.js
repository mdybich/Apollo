'use-strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');


gulp.task('connect', function() {
  connect.server({
    port: 4000
  })
});

gulp.task("default", ["connect"]);