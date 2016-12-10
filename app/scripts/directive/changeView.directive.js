/*
@author: chenke@jiedaibao.com
date: 20160822
@para: changeView --- 三级联动选择后回传地址
        viewData ---三级联动数组参数，对于人人催，项目，暂时不准备使用，直接从apiService传入

@desc:  切换view
        半成品，只能切一次。回来后点击切换view居然不管用
*/
angular.module('worker').directive('jdbChangeView', ['$location', function($location) {
    return {
        scope: {
            'jdbViewData': '='
        },
        link: function(scope, element, attrs) {
            console.log(element);

            element.bind('click', function(e) {
                console.log(attrs.jdbViewPage);
                console.log(scope.jdbViewData);
                try {
                    console.log($location);
                    $location.path(attrs.jdbViewPage.replace('#', '')).search(scope.jdbViewData);

                } catch (e) {
                    console.log(e);
                }
            });
        }
    }
}]);