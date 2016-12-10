/*
@author: chenke@jiedaibao.com
date: 20160819
@para: bindId --- 三级联动选择后回传地址
        selectData ---三级联动数组参数，对于人人催，项目，暂时不准备使用，直接从apiService传入

@desc:  region-select绑定到某个input标签上，选择后会将文案自动赋值给input，
        对应选择id择传给bingId,是否写回调函数，以后再拓展
*/


angular.module('worker').directive('regionSelect', ['apiService', function(apiService) {
    return {
        scope: {
            'bindId': '=',
            'selectData':'='
        },
        link: function(scope, element, attrs) {
            console.log(element);
            element.bind('click', function(e) {
                if (window.RegionSelect) {
                    //总感觉。键盘。和三级联动。配合有问题http://www.ionic.wang/js_doc-index-id-66.html
                    document.activeElement.blur();
                    window.RegionSelect.selectRegion(scope.bindId || '', scope.selectData ||apiService.getRegion() , function(returnObj) {
                        if (typeof returnObj == 'string') {
                            returnObj = JSON.parse(returnObj);
                        }
                        scope.bindId = returnObj.codeStr;
                        element.val(returnObj.nameStr);
                    }, function() {
                    });
                }
            });
        }
    }
}]);