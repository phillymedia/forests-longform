module.exports = function (gulp, plugins) {
    return function () {
      return gulp.src('.tmp/css/*.css')
        .pipe(plugins.uncss({
            html: ['.tmp/templates/main-body.html', ".tmp/templates/partials/*.html"]
        }))
        .pipe(gulp.dest('css'));
    };
};
