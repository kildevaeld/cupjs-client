'use strict';

const gulp = require('gulp'),
  child = require('child_process');

gulp.task('jspm:link', function (done) {
  child.exec('jspm link -y', done);
})

gulp.task('watch', ['build'], function () {
  gulp.watch('./src/**/*.ts', ['build', 'jspm:link']);
});