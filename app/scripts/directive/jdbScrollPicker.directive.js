angular.module('worker').directive('jdbScrollPicker', [
    '$ionicPopup', '$timeout', 
    function($ionicPopup, $timeout) {
        var template = '';
        return {
            restrict: 'E',
            replace: true,
            scope: {
                selectors: '=',
                values: '=',
                defaultValues: '='
                 //displayFormat: '&'
            },
            templateUrl: 'views/directive/jdb-scroll-pick.html',
            link: function(scope, element, attrs) {
                scope.title = attrs.title || '选择';
                scope.placeHolder = attrs.placeHolder;
                scope.displayValue = undefined;
                scope.texts = [];
                scope.defaultValues = scope.defaultValues || [];
                if (scope.values == undefined) {
                    scope.values = [];
                }
                if (scope.values.length) {
                    scope.displayValue = displayFormatFromValue(scope.values, scope.selectors);
                }
                /*try{
                   scope.displayValue = scope.values[0] + '年' + scope.values[1] + '月'; 
                }catch(e){

                }*/

                //scope.displayValue = scope.values[0] + '年' + scope.values[1] + '月';
                scope.showSelect = function() {
                    scope.myPopup = $ionicPopup.show({
                        templateUrl: 'views/directive/jdb-scroll-picker.html',
                        title: scope.title,
                        subTitle: '',
                        cssClass: 'jdb-select-popup',
                        scope: scope,
                        buttons: [{
                            text: '取消'
                        }, {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                scope.selectValue();
                            }
                        }]
                    });
                }
                var items = scope.items;
                scope.selects = [];
                scope.init = function() {
                }
                scope.$on('$destroy', function() {
                    scope.myPopup && scope.myPopup.close();
                });
                scope.selectValue = function() {
                    for (var i = 0; i < scope.selectors.length; i++) {
                        scope.selectors[i].innerCtl.selectValue();
                    }
                    $timeout(function() {
                        scope.displayValue = scope.texts.join(' ');
                    });
                }
                function displayFormatFromValue(valueArr, selectorArr) {

                    if(typeof(valueArr) != typeof(selectorArr) ) {
                        return '';
                    }

                   /* selector = [{
                        title: '',
                        items[{
                            value: 1,
                            text: '1月'
                        } {
                            value: 2,
                            text: '2月'
                        }, ]
                    }, {
                        title: '',
                        items[{
                            value: 1,
                            text: '1月'
                        } {
                            value: 2,
                            text: '2月'
                        }, ]
                    }]*/
                    var tempStr = [];

                    angular.forEach(valueArr, function(item, index) {
                        var tempArr = selectorArr[index].items;
                        for (var i = 0; i < tempArr.length; i++) {
                            if (tempArr[i].value == item) {
                                tempStr.push(tempArr[i].text);
                                break;
                            }
                        }
                    });
                    
                    return tempStr.join('');
                }
            }
        }
    }]
);