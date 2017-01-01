angular.module('worker').run([
    '$http', '$rootScope', '$location', 'apiService', '$state', '$window', '$ionicHistory',
    function($http, $rootScope, $location,
        apiService, $state, $window, $ionicHistory) {

        var tabConfig = require('./common/showTab.config.js');
        $rootScope.rootTap = false;
        $rootScope.rootRole = 0; //1 默认为劳务员，2 默认为工人

        //初始化获取localStorge存储状态
        //处理老板机滑动不能问题
        $rootScope.fixCantScroll = function() {
                /*if($('ion-content').hasClass('overflow-scroll')) {
                    $('ion-content').removeClass('overflow-scroll');
                    setTimeout(function() {
                        $('ion-content').addClass('overflow-scroll');
                    }, 20);
                }*/
                if ($('ion-content').hasClass('scroll-content')) {
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
            if (tabConfig.indexOf($location['$$path']) > -1) {
                $rootScope.rootTap = true;
            }
            var backView = $ionicHistory.backView();
            // if( window.ShowCloseButton ) {
            //     if( $rootScope.closeBtnShown && !backView ) {
            //         ShowCloseButton.showCloseButton( '0', function(){}, function(){} );
            //         $rootScope.closeBtnShown = !$rootScope.closeBtnShown;
            //     } else if( !$rootScope.closeBtnShown && backView ) {
            //         ShowCloseButton.showCloseButton( '1', function(){}, function(){} );
            //         $rootScope.closeBtnShown = !$rootScope.closeBtnShown;
            //     }
            // }
            //移除弹窗相关dom
            $rootScope.$broadcast('closeLargeImg');
        });

        function appRunInit() {
            if (tabConfig.indexOf($location['$$path']) > -1) {
                $rootScope.rootTap = true;
            }
            //先简单通过一个数组控制。tab选择
            $rootScope.tabChage = [];
            $rootScope.tabChage[0] = true;
            //初始化角色
            $rootScope.rootRole = window.extHeader.role;
            if(!$rootScope.rootRole ) {
                console.log(234);
                $location.path('/index');
            } else {
                if(!location.hash) {
                    $location.path('/wantOffer');
                    console.log();
                    // $location.path(location.hash);
                }

            }
            weixinBrowser();
        }

        $rootScope.changeTab = function(viewState, index) {
            $location.path(viewState);
            angular.forEach($rootScope.tabChage, function(item, index) {
                console.log(index);
                $rootScope.tabChage[index] = false;
            });
            $rootScope.tabChage[index] = true;
        }
            // alert(document.cookie);

        function weixinBrowser() {
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
                apiService.getData('{{weixin_jsconfigApi}}', {
                    ajaxUrl: encodeURIComponent(window.location.href.split('#')[0])
                }, {
                    method: 'get'
                }).success(function(resData) {
                    if (!window.wx) {
                        return;
                    }
                    console.log(resData);
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx674a699ec9961b33', // 必填，公众号的唯一标识
                        timestamp: resData.timestamp, // 必填，生成签名的时间戳
                        nonceStr: resData.nonceStr, // 必填，生成签名的随机串
                        signature: resData.signature, // 必填，签名，见附录1
                        jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'onMenuShareQZone',
                                'hideMenuItems',
                                'showMenuItems',
                                'hideAllNonBaseMenuItem',
                                'showAllNonBaseMenuItem',
                                'translateVoice',
                                'startRecord',
                                'stopRecord',
                                'onVoiceRecordEnd',
                                'playVoice',
                                'onVoicePlayEnd',
                                'pauseVoice',
                                'stopVoice',
                                'uploadVoice',
                                'downloadVoice',
                                'chooseImage',
                                'previewImage',
                                'uploadImage',
                                'downloadImage',
                                'getNetworkType',
                                'openLocation',
                                'getLocation',
                                'hideOptionMenu',
                                'showOptionMenu',
                                'closeWindow',
                                'scanQRCode',
                                'chooseWXPay',
                                'openProductSpecificView',
                                'addCard',
                                'chooseCard',
                                'openCard'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    window.wx.ready(function(res) {
                        console.log(res);

                        $rootScope.$broadcast('wx_js_ready');
                        $rootScope.wx_js_ready = true;

                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    });
                    window.wx.error(function(e) {

                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                    });
                });
                console.log($location);
            };

        }


        appRunInit();
    }
]);
