var gulp = require('gulp');
var gulpWebServer = require('gulp-webserver');
var sourceStream = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('webServer', function() {
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
    entries: ['./src/savanna.js']
  })
    .bundle()
    .pipe(sourceStream('savanna.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
gulp.task('server', ['webServer', 'build', 'watch']);
