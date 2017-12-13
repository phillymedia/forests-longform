module.exports = function (gulp, plugins) {
      return function () {
         return gulp.src(['app/scss/*.scss', '!app/scss/philly-styles/**/*.scss']) // Gets all files ending with .scss in app/scss
           .pipe(plugins.sass())
      //      .pipe(plugins.uncss({
      //       html: ['app/index.html', 'app/templates/partials/*.html']
      //   }))
           .pipe(gulp.dest('.tmp/css'))
           .pipe(plugins.browserSync.reload({
             stream: true
           }))
      };
  };
