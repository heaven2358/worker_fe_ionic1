/*
@author: chenke@jiedaibao.com
date: 20160819
@para: bindId --- 三级联动选择后回传地址
        selectData ---三级联动数组参数，对于人人催，项目，暂时不准备使用，直接从apiService传入

@desc:  region-select绑定到某个input标签上，选择后会将文案自动赋值给input，
        对应选择id择传给bingId,是否写回调函数，以后再拓展

补充：
    如果不直接scope.ngModel = window.tools.checkPhoneNo(element.val()); 进行赋值，
    第12位，不展现，但是提交时，发现仍然存在
*/
angular.module('worker').directive('inputPhone', function() {
    return {
        scope: {
            'ngModel': '='
        },
        link: function(scope, element, attrs) {
            //貌似不推荐用eval，但是怎么把字符串，转成正则呢；
            var exet = attrs.parse ? eval(attrs.parse) : /^[1-9][0-9]{0,10}$/;
            var strParseFun = window.tools.checkString(exet);
            element.bind('input', function(e) {
                element.val(strParseFun(element.val()));
                scope.ngModel = strParseFun(element.val());
                /*setTimeout(function() {
                    scope.ngModel = strParseFun(element.val());
                },200);*/
                console.log(scope.ngModel);
                scope.$digest();
            });
        }
    }
});