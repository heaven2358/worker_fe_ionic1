angular.module('worker').run([
    '$http', '$rootScope', '$location', 'apiService', '$state', '$window', '$ionicHistory',
    function($http, $rootScope, $location,
         apiService, $state, $window, $ionicHistory) {

        var tabConfig = require('./common/showTab.config.js');
        $rootScope.rootTap = false;
        $rootScope.rootRole = 0; //1 默认为劳务员，0 默认为工人
        // $cordovaKeyboard.disableScroll(true);//关闭键盘调起时推屏幕
        // $window.onNativeNavBack = function() {
        //     //如果有历史，则回退，没有则关闭hybrid
        //     if( $ionicHistory.backView() ) {
        //         $ionicHistory.goBack(-1);
        //     } else {
        //         window.CloseWindow.closeWindow(function() {},function() {});
        //     }
        // }

        // var keyName = 'worker_applyStatusStr',
        //     codeMap = {
        //         NO_STATUS: -3,
        //         UN_REGIST: -2,
        //         FORBIDDEN: -1,
        //         NO_PASS: 0,
        //         PART_PASS: 1
        //     };

        // $rootScope.changeStatusMsg = '您的权限已经改变，页面将在3秒后刷新！';
        // window.applyStatus = {};

        // $rootScope.saveStatusToDevice = function(statusObj) {
        //     if (statusObj && (statusObj.status || statusObj.status === 0) ) {
        //         statusObj.status = window.extHeader.memberID + '_' + statusObj.status;
        //     }
        //
        //     localStorage.setItem( keyName, JSON.stringify(statusObj) );
        // }
        //
        // $rootScope.rrcPage = function() {
        //     var nativeData = window.extHeader,
        //         nowUrl = window.location.href,
        //         nativeType = nativeData.collectionType ? nativeData.collectionType : nativeData.type;
        //
        //     //本地调试直接跳过
        //     if(nowUrl.indexOf( 'file://' ) == -1 && !window.tools.endsWith(nowUrl, '/')) {
        //         return;
        //     }
        //     window.tools.sendMessage(JSON.stringify(nativeData));
        //     // if (angular.isNumber(nativeData.type)) {
        //     //     nativeData.type = nativeData.type.toString();
        //     // }
        //     // if (nativeData.type == '1' || nativeData.type == '0') {
        //     //     console.log(nativeData.type);
        //     //     $location.path('/collectionProgress').search({
        //     //         'debtorMemberId': nativeData.debetorMemberID,
        //     //         'creditorMemberID': nativeData.creditorMemberID,
        //     //         'productID': nativeData.productID,
        //     //         'endTime': nativeData.endTime,
        //     //         'type': nativeData.type,
        //     //         'orderID': nativeData.orderID
        //     //     });
        //     //     return;
        //     // }
        //
        //     if (nativeType) { //有type则是落地页
        //         $location.path('/' + nativeType).search(nativeData);
        //     } else if (parseInt(window.applyStatus.status) < 0) { //不是通过的催客则跳转到逾期债权
        //         $rootScope.overdueLink();
        //     } else { //无type则进入任务列表
        //         $location.path('/taskList');
        //     }
        // }

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
        console.log( $location);
        //监听页面url改变后操作
        $rootScope.closeBtnShown = false;
        $rootScope.$on('$ionicView.enter', function() {
            window.tools.cancelNativeRightIcon();
            window.scrollTo(0, 0);
            if(tabConfig.indexOf($location['$$path']) > -1 ) {
                console.log(24);
                $rootScope.rootTap = true;
            }
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



        if(tabConfig.indexOf($location['$$path']) > -1 ) {
            $rootScope.rootTap = true;
        }

        $rootScope.changeTab = function (viewState) {
            $location.path(viewState);
        }

    }]
);
