'use strict';

const gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');


gulp.task('uglify', ['build:webpack'], function () {
	gulp.src('./dist/mobs.js')
	.pipe(uglify())
	.pipe(rename('mobs.min.js'))
	.pipe(gulp.dest('./dist'))
});