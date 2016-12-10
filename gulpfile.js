var gulpTasks = require('@JDB/build');
var gulp = require('gulp');
var filePaths = require('filepaths');

var fs = require('fs');

var gulpReplace = require('gulp-replace');

gulp.task('addRequireJs', function() {

    var paths = filePaths.getSync('app/scripts/');

    var replace_controller_str = [];
    paths.forEach(function(item) {
        //console.log(item);
        if (item.match(/.controller.js/i)) {
            console.log(item);
            item = item.replace('/app/scripts', '');
            replace_controller_str.push('require(\'' + item + '\');');
        }

    });


    console.log('/**replace-controller*//*end*/' + replace_controller_str.join(' '));

    return gulp.src('app/scripts/app.js')
        .pipe(gulpReplace('{{targetselector}}', replace_controller_str.join('\n')))
        .pipe(gulp.dest('app/scripts/'));
});

gulp.task('addOnePage', function() {
    var argv = require('yargs').argv;
    if(!argv.p){
        console.log('no page add');
        return
    }
    var paths = filePaths.getSync('app/scripts/');

    var replace_controller_str = [];
    paths.forEach(function(item) {
        //console.log(item);
        if (item.match(/.controller.js/i)) {
            item = item.replace('/app/scripts', '');
            replace_controller_str.push('require(\'' + item + '\');');
        }
    });
    var viewName = argv.p;

    if(replace_controller_str.join(' ').indexOf(viewName) != -1) {
        console.log('MaybeFile existed, please Confirm, and Manually create');
        return
    }
    fs.writeFile( 'app/scripts/controllers/'+ viewName + '.controller.js','','utf8');
    fs.writeFile( 'app/styles/'+ viewName + '.scss','','utf8');
    fs.mkdir('app/views/'+ viewName,function(e) {
        if(e) {
            console.log(e);
        }
        fs.writeFile( 'app/views/'+ viewName + '/' + viewName + '.html','','utf8');
        console.log('路由和require 就自己加吧');
    })


    /*var paths = filePaths.getSync('app/scripts/');

    var replace_controller_str = [];
    paths.forEach(function(item) {
        //console.log(item);
        if (item.match(/.controller.js/i)) {
            console.log(item);
            item = item.replace('/app/scripts', '');
            replace_controller_str.push('require(\'' + item + '\');');
        }

    });

    console.log(argv);*/
});

/*var Stream = require('stream');
var through = require('through2');

gulp.task('test', function() {
    gulp.src('app/scripts/app.js')
        .pipe(function () {
            return through.obj(function (file, enc, cb) {
                console.log(file);
                // 主体实现忽略若干行
                this.push(file);

                cb();
            })
        });
});*/