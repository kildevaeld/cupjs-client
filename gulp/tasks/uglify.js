'use strict';

const gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

const config = require('../config')

gulp.task('uglify', ['build:webpack'], function () {
	gulp.src('./dist/'+ config.buildFile)
	.pipe(uglify())
	.pipe(rename('moby.min.js'))
	.pipe(gulp.dest('./dist'))
});