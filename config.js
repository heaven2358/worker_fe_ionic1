var path = require('path');
var packageConfig = null;
var packageConfigPath = path.join(process.cwd(), './package.json');
// 读取用户项目的配置文件
try {
    packageConfig = require(packageConfigPath);
} catch (error) {
    // 文件不存在则直接中断构建
    console.log('[FATAL ERROR]', 'Please add a package.json file to your project!');
    console.log('[FATAL ERROR]', 'package.json path: ', packageConfigPath);
    process.exit(1);
}

var packageName = packageConfig.name || 'site';
var src = './app';
var destBase = './dist';
// 产出文件到对应包名目录下
var dest = './dist/' + packageName;
// h5产出到根目录

if (packageConfig.jdbBuild && packageConfig.jdbBuild.isH5) {
    dest = destBase;
}
var config = {
    name: packageName,
    version: require('./package.json').version,
    isH5: !!(packageConfig.jdbBuild && packageConfig.jdbBuild.isH5),
    src: src,
    dest: dest,
    destBase: destBase,
    styles: {
        src: src + '/styles/**/*.{css,scss}',
        dest: dest + '/styles'
    },
    markup: {
        src: src + '/**/*.html',
        dest: dest
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    scripts: {
        src: [src + '/scripts/**', src + '/libs/**']
    }
};

module.exports = config;
