'use strict';
const gulp = require('gulp');
const bump = require('gulp-bump');

gulp.task('bump:patch', function () {
	gulp.src(['package.json','bower.json'])
	.pipe(bump())
	.pipe(gulp.dest('.'));
});

gulp.task('bump:minor', function () {
	gulp.src(['package.json','bower.json'])
	.pipe(bump({type:'minor'}))
	.pipe(gulp.dest('.'));
});

gulp.task('bump:major', function () {
	gulp.src(['package.json','bower.json'])
	.pipe(bump({type:'major'}))
	.pipe(gulp.dest('.'));
});