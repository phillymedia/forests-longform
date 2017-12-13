module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src(['.tmp/*.html'])
            .pipe(plugins.useref())
            //  .pipe(plugins.gulpIf('*.js', plugins.uglify()))
            .pipe(plugins.gulpIf('*.css', plugins.cssnano()))
            .pipe(gulp.dest('dist'));
    };
};
