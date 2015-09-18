'use strict';

const gulp = require('gulp'),
  typescript = require('gulp-typescript'),
  merge = require('merge2');

const webpack = require('gulp-webpack')


const project = typescript.createProject('tsconfig.json', {
  declaration: true
});

gulp.task('build:typescript', function () {
  let result = project.src('./src/**/*.ts')
  .pipe(typescript(project))

  return merge([
    result.js.pipe(gulp.dest('lib')),
    result.dts.pipe(gulp.dest('lib'))
  ]);

});

gulp.task('build:webpack', ['build:typescript'], function () {
  return gulp.src('./lib/index.js')
  .pipe(webpack({
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ]
    },
    output: {
      filename: 'mobs.js',
      libraryName: 'mobs',
      libraryTarget: 'umd',
      umdNamedDefine: 'moby'
    }
  }))
  .pipe(gulp.dest('./dist'));
})


gulp.task('build', ['build:typescript', 'build:webpack']);