var gulp = require('gulp');
var args = require('yargs').argv;
var gutil = require('gulp-load-utils')(['colors', 'env', 'log', 'pipeline']);
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync');
const reload = browserSync.reload;

require('web-component-tester').gulp.init(gulp);

// Watch files for changes & reload
gulp.task('serve', ['jshint'], function() {
  browserSync({
    port: 5000,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.'],
      middleware: [historyApiFallback()],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(['src/**/*.html'], ['jshint', reload]);
  gulp.watch(['src/{scripts,elements}/**/{*.js,*.html}'], ['jshint']);
  gulp.watch(['src/images/**/*'], reload);
});

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
