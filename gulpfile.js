var gulp = require('gulp');
var gulpWebServer = require('gulp-webserver');
var sourceStream = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('server', function() {
  gulp.src('./')
    .pipe(gulpWebServer({
      livereload: true,
      port: 8001,
      fallback: 'test.html',
      open: true
    }));
});

gulp.task('build', function() {
  browserify({
    entries: ['./src/*.js']
  })
    .bundle()
    .pipe(sourceStream('bundle.js'))
    .pipe(gulp.dest('savannah'))
});

gulp.task('default', ['build']);
