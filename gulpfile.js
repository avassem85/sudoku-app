var gulp = require('gulp');
var args = require('yargs').argv;
var gutil = require('gulp-load-utils')(['colors', 'env', 'log', 'pipeline']);
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

require('web-component-tester').gulp.init(gulp);

gulp.task('default', ['test:local'], function() {
  gulp.watch(['elements/**', 'test/**'], ['test:local']);
});

gulp.task('jshint', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint.extract())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

/*jshint latedef:nofunc */
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        gutil.log(gutil.colors.blue(msg[item]));
      }
    }
  } else {
    gutil.log(gutil.colors.blue(msg));
  }
}
