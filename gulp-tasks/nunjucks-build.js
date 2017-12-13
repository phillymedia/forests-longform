module.exports = function (gulp, plugins) {
    return function () {
       gulp.src('app/**/*.+(html|nunjucks)')
      .pipe(plugins.nunjucksRender({
           path: ['app/templates']
        }))
        .pipe(plugins.removeCode({
           tmp: true
        }))
      .pipe(gulp.dest('.tmp'))
      .pipe(plugins.browserSync.reload({
        stream: true
      }))
    };
};
