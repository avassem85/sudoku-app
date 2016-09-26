var gulp = require('gulp');
require('web-component-tester').gulp.init(gulp);

gulp.task('default', ['test:local'], function() {
  gulp.watch(['elements/**', 'test/**'], ['test:local']);
});
