var notify = require("gulp-notify");

module.exports = function() {

    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        // TODO 接受title入参，区分error类型
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, args);

    // Keep gulp from hanging on this task
    if (this.emit) {
        this.emit('end');
    }
};
