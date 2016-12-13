angular.module('worker').run([
    '$http', '$rootScope', '$location', 'apiService', '$state', '$window', '$ionicHistory',
    function($http, $rootScope, $location,
         apiService, $state, $window, $ionicHistory) {

        // $cordovaKeyboard.disableScroll(true);//关闭键盘调起时推屏幕
        $window.onNativeNavBack = function() {
            //如果有历史，则回退，没有则关闭hybrid
            if( $ionicHistory.backView() ) {
                $ionicHistory.goBack(-1);
            } else {
                window.CloseWindow.closeWindow(function() {},function() {});
            }
        }

        var keyName = 'worker_applyStatusStr',
            codeMap = {
                NO_STATUS: -3,
                UN_REGIST: -2,
                FORBIDDEN: -1,
                NO_PASS: 0,
                PART_PASS: 1
            };

        $rootScope.changeStatusMsg = '您的权限已经改变，页面将在3秒后刷新！';
        window.applyStatus = {};

        if (!$rootScope.startPageCount) {
            $rootScope.startPageCount = 0;
        }

        function getStatusToDevice() {
            var nativeData = window.extHeader;
            var statusStr = localStorage.getItem( keyName );

            if (!statusStr) {
                window.applyStatus.status = codeMap.NO_STATUS;
            } else {
                var statusObj = JSON.parse(statusStr),
                    memberId, tmpList;

                if ((statusObj.status + '').indexOf('_') != -1) {
                    tmpList = statusObj.status.split('_');
                    memberId = tmpList[0];

                    statusObj.status = tmpList[1];
                }

                if (memberId && memberId != window.extHeader.memberID) {
                    statusObj.status = -3;
                }

                window.applyStatus = statusObj;
            }
            $rootScope.rrcPage();
        }

        //异步发送请求，更新本地存储状态。
        // apiService.getData('{{getUserStatusApi}}', {}).success(function(data) {
        //     if (data.error.returnCode != 0) {
        //         toastError(data.error.returnUserMessage);
        //         return;
        //     }
        //
        //     var value = data.data,
        //         tmpStatus = window.applyStatus.status;
        //
        //     //更新本地存储状态
        //     $rootScope.saveStatusToDevice(angular.extend({}, value));
        //
        //     //更新windows上变量，有可能status不变其他参数改变，但不用强制跳转的情况
        //     window.applyStatus = value;
        //
        //     if (tmpStatus != value.status) {
        //
        //         var nowUrl = window.location.href;
        //
        //         //如果当前页面不是逾期债权页面
        //         if (nowUrl.indexOf('#/myOverdueDebt') == -1) {
        //             //如果当前页非loading页,弹框提示后跳转页面
        //             if (nowUrl.indexOf('#/loadingPage') == -1 && !window.tools.endsWith(nowUrl, '#/')) {
        //                 toastError($rootScope.changeStatusMsg, function($rootScope) {
        //                     return function() {
        //                         $rootScope.rrcPage();
        //                     }
        //                 }($rootScope), 3000);
        //             } else { //如果是loadnig页即刻刷新
        //                 $rootScope.rrcPage();
        //             }
        //         }
        //     }
        // });

        $rootScope.saveStatusToDevice = function(statusObj) {
            if (statusObj && (statusObj.status || statusObj.status === 0) ) {
                statusObj.status = window.extHeader.memberID + '_' + statusObj.status;
            }

            localStorage.setItem( keyName, JSON.stringify(statusObj) );
        }

        $rootScope.rrcPage = function() {
            var nativeData = window.extHeader,
                nowUrl = window.location.href,
                nativeType = nativeData.collectionType ? nativeData.collectionType : nativeData.type;

            //本地调试直接跳过
            if(nowUrl.indexOf( 'file://' ) == -1 && !window.tools.endsWith(nowUrl, '/')) {
                return;
            }
            window.tools.sendMessage(JSON.stringify(nativeData));
            // if (angular.isNumber(nativeData.type)) {
            //     nativeData.type = nativeData.type.toString();
            // }
            // if (nativeData.type == '1' || nativeData.type == '0') {
            //     console.log(nativeData.type);
            //     $location.path('/collectionProgress').search({
            //         'debtorMemberId': nativeData.debetorMemberID,
            //         'creditorMemberID': nativeData.creditorMemberID,
            //         'productID': nativeData.productID,
            //         'endTime': nativeData.endTime,
            //         'type': nativeData.type,
            //         'orderID': nativeData.orderID
            //     });
            //     return;
            // }

            if (nativeType) { //有type则是落地页
                $location.path('/' + nativeType).search(nativeData);
            } else if (parseInt(window.applyStatus.status) < 0) { //不是通过的催客则跳转到逾期债权
                $rootScope.overdueLink();
            } else { //无type则进入任务列表
                $location.path('/taskList');
            }
        }

        // $rootScope.overdueLink = function() {
        //     $location.path('/myOverdueDebt');
        // }


        //初始化获取localStorge存储状态
        // getStatusToDevice();

        //处理老板机滑动不能问题
        $rootScope.fixCantScroll = function() {
            /*if($('ion-content').hasClass('overflow-scroll')) {
                $('ion-content').removeClass('overflow-scroll');
                setTimeout(function() {
                    $('ion-content').addClass('overflow-scroll');
                }, 20);
            }*/

            if($('ion-content').hasClass('scroll-content')) {
                $('ion-content').removeClass('scroll-content');
                setTimeout(function() {
                    $('ion-content').addClass('scroll-content');
                }, 20);
            }
        }

        //监听页面url改变后操作
        $rootScope.closeBtnShown = false;
        $rootScope.$on('$ionicView.enter', function() {
            window.tools.cancelNativeRightIcon();
            window.scrollTo(0, 0);

            var backView = $ionicHistory.backView();

            if( window.ShowCloseButton ) {
                if( $rootScope.closeBtnShown && !backView ) {
                    ShowCloseButton.showCloseButton( '0', function(){}, function(){} );
                    $rootScope.closeBtnShown = !$rootScope.closeBtnShown;
                } else if( !$rootScope.closeBtnShown && backView ) {
                    ShowCloseButton.showCloseButton( '1', function(){}, function(){} );
                    $rootScope.closeBtnShown = !$rootScope.closeBtnShown;
                }
            }

            //移除弹窗相关dom
            $rootScope.$broadcast( 'closeLargeImg' );
        });


        $rootScope.changeTab = function (viewState) {
            $location.path(viewState);
        }

     //    $ionicPlatform.ready(function() {
     //        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
     //            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
     //            cordova.plugins.Keyboard.disableScroll(true);
     //        }

     //        if (window.StatusBar) {
     //            StatusBar.styleDefault();
     //        }

     //        if( window.HybridNavigation ) {
        //         HybridNavigation.hybridNavigation('1', function(){}, function(){});
        //     }

        //     if( !window.extHeader ) {
        //         CommonParams.commonParams( function( nativeData ) {
        //             window.extHeader = nativeData;
        //             angular.bootstrap(document, ['worker']);
        //         }, function() {
        //             toastError( '获取登陆信息失败', function() {
        //                 CloseWindow.closeWindow(function() {},function() {});
        //             } );
        //         } );
        //     }
        // });

        /*.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
                    // Use x-www-form-urlencoded Content-Type
                    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }*/
    }]
);
