
var compose = require('koa-compose');
var co = require('co');

var readFile2 = function(fileName) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('in promise' + fileName);
            // reject(fileName);
            resolve(fileName);
        },1000);
    });
};

var gen1 = function*(next) {
    var f1 = yield readFile2('./hi-1.txt');
    console.log(f1.toString());
    yield next;
    var f2 = yield readFile2('./hello-1.txt');
    console.log(f2.toString());
    return 22
};

var gen2 = function*(next) {
    var f1 = yield readFile2('./hi-2.txt');
    console.log(f1.toString());
    // yield next;
    var f2 = yield readFile2('./hello-2.txt');
    console.log(f2.toString());
    return 22
};

var gen3 = function*(next) {
    var f1 = yield readFile2('./hi-3.txt');
    console.log(f1.toString());
    var f2 = yield readFile2('./hello-3.txt');
    console.log(f2.toString());
    return 22
};

var usFun1 = function(next) {
    console.log(2);
}
var usFun2 = function(next) {
    console.log(2);
}
compose([gen1, gen2, gen3])

// var ckk = co(compose([gen1, gen2, gen3]));
// ckk.then(function() {
//     console.log('then')
// });
var ckk = co(compose([usFun1, usFun2]));
