 // var gulpTasks = require('@JDB/build');
const gulp = require('gulp');
const filePaths = require('filepaths');
const fs = require('fs');
const gulpReplace = require('gulp-replace');
const replace = gulpReplace;
const del = require('del');
// var gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handleErrors = require('./util/handle-errors');
const config = require('./config');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
//browserify
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const folderify = require('folderify');
// use comment json to parse vanilla json
const json = require('comment-json');
// var ba = require('../util/build-argv');
const gulpif = require('gulp-if');
// var eslint = require('gulp-eslint');
// var git = require('gulp-git');
const babelify = require('babelify');
const path = require('path');
const inject = require('gulp-inject-string');
const imagemin = require('gulp-imagemin');
const minifycss = require('gulp-minify-css');
const ba = {};
ba.isSourceMapping = true;
ba.apiType = 'serve';

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
*/
gulp.task('test', function() {

});


//

gulp.task('prepare', function () {
    // gulp.src('./app/index.html')
    //     .pipe(gulp.dest('./dist/worker'));
    return del([
        './dist'
    ], {
        dot: true
    });
});
gulp.task('default', ['serve']);

gulp.task('serve', ['prepare'], function () {
    ba.isServe = true;
    ba.apiType = 'serve';
    gulp.start( 'styles', 'images','markup', 'watch', function () {
        // gulp.start('hint', ['check'], function () {});
    });
});

gulp.task('prod', ['prepare'], function () {
    ba.isServe = false;
    ba.apiType = 'prod';
    gulp.start( 'styles', 'images','markup', 'browserify', function () {
        // gulp.start('hint', ['check'], function () {});
    });
});

gulp.task('styles', function() {
    return gulp.src(config.styles.src)
        .pipe(concat('main.css'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.styles.dest));
});

gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        // TODO 据说这个压缩对png压缩不好，待考证
        .pipe(imagemin([imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()])) // Optimize
        // .pipe(fileSizeCheck(50 * 1024))
        .pipe(gulp.dest(config.images.dest));
});




gulp.task('watch', ['browserSync', 'browserify'], function() {
    gulp.watch(config.styles.src, ['styles', reload]);
    gulp.watch(config.images.src, ['images', reload]);
    gulp.watch(config.markup.src, ['markup', reload]);
    gulp.watch(config.scripts.src, ['browserify', reload]);
});


gulp.task('browserify', function () {

    // set up the browserify instance on a task basis
    var b = browserify({
        entries: config.src + '/scripts/app.js',
        debug: true,
        transform: [
            // 只对es后缀文件做转换
            babelify.configure({
                // ignore: /.*\/(lib|libs)\/.*.js/,
                only: /.*\.es|.*app\.js/,
                presets: ["es2015", "stage-3"],
                plugins: ["transform-async-to-generator"]
            }),
            folderify
        ]
    });
    var apiConfigStr;
    var apiConfig;
    try {
        apiConfigStr = fs.readFileSync('./assets/api.json').toString();
        apiConfig = json.parse(apiConfigStr, null, true);
    } catch (e) {
        apiConfig = {};
    }


    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(ba.isSourceMapping, sourcemaps.init({
            loadMaps: true
        })))
        // Add transformation tasks to the pipeline here.
        .pipe(replace(/{{(.+Api)}}/g, function (match, apiName) {
            // TODO 多次读文件效率低
            if (!apiConfig[apiName]) {
                handleErrors(new Error('Api replace error, apiName: "' + apiName + '", check your code and api.json'));
                return '';
            }
            // apiMock 优先级高于环境选择
            var apiType = ba.apiType;
            // isApiMock ? ba.TASK_TYPES.TASK_SERVE : ba.currentMode;
            return apiConfig[apiName][apiType];
        }))
        // .pipe(inject.prepend('window.jdbHybridApiConfig = ' + 'JSON.parse(\'' + json.stringify(apiConfig) + '\');\n'))
        .pipe(gulpif(!ba.isServe, uglify()))
        .on('error', gutil.log)
        .pipe(gulpif(ba.isSourceMapping, sourcemaps.write('./')))
        .pipe(gulp.dest(config.dest + '/scripts'));
});;


gulp.task('browserSync', function () {
    browserSync({
        open: false,
        server: [
            './dist',
            './assets/data',
            // TODO 考虑通过这样来在local serve访问得到依赖
            // './node_modules/lib',
            // './node_modules/common',
        ],
        notify: false,
        logLevel: "info",
        logPrefix: 'LOCAL SERVE',
        middleware: [
            mockApi
        ]
    }, function (err, bs) {
        var local = bs.options.getIn(["urls", "local"]);
        var external = bs.options.getIn(["urls", "external"]);
        console.log('[' + 'LOCAL SERVE'.blue + ']' + ' Entry:');
        console.log(' --------------------------------------'.grey);
        console.log('       Local: ' + (local + '/' + config.name + '/index.html').magenta);
        console.log('    External: ' + (external + '/' + config.name + '/index.html').magenta);
        console.log(' --------------------------------------'.grey);
    });
    // console.log('测试入口:' + )
});

/**
 * 处理mock接口数据返回
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function mockApi(req, res, next) {
    // 检测是否满足mock api规则
    var arr = req.url.match(/[^\/.]+\.json/);
    if (arr && arr.length > 0) {
        // 默认错误信息
        var data = '{"error":"fail to process mock api, please check your code."}';
        var fileName = arr[0];
        try {
            data = fs.readFileSync(path.join('./assets/data', fileName), 'utf8');
        } catch (error) {
            handleErrors(new Error('Fail to get api mock data file:, fileName: "' + fileName + '", check your code or json file'));
        }
        res.setHeader('content-type', 'application/json');
        res.end(data);
    } else {
        next();
    }
}

gulp.task('markup', function () {
    gulp.src('./app/core/*')
        .pipe(gulp.dest('./dist/core'));
    return gulp.src(config.markup.src)
        // insert mock code
        // .pipe(gulpIf(ba.isHybridMock, insertLines({
        //     'before': /<\/head>/i,
        //     'lineBefore': '<script type="text/javascript" src="../hybrid-mock/index.js"></script>'
        // })))
        .pipe(gulp.dest(config.markup.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});
