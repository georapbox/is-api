var gulp = require('gulp');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var banner = ['/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' *',
  ' * @version <%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @homepage <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('build', function () {
  'use strict';

  return gulp.src('./src/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'));
});
