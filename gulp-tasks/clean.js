module.exports = function(gulp, plugins) {
    return function() {
        plugins.del.sync('dist');
    };
};
