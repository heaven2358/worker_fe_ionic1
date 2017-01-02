    require('../lib/ionic');
    require('../lib/zepto');
    require('./common/dialog');
    require('./common/toast');
    document.documentElement.style.fontSize = (document.documentElement.offsetWidth / 10) + 'px';
    angular.element(document).ready(function () {
        try{
            // if(window.localStorage.worker_app_userinfo ) {
            //     window.extHeader = JSON.parse(window.localStorage.worker_app_userinfo);
            //     console.log(window.extHeader);
            // }else{
            //     if(window.tools.getCookie('auth_resp')) {
            //         window.extHeader = JSON.parse(JSON.parse(window.tools.getCookie('auth_resp').split('').join('')));
            //         window.localStorage.worker_app_userinfo = JSON.stringify(window.extHeader);
            //     }
            // }

            var redirect_uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx674a699ec9961b33&redirect_uri=http%3A%2F%2Fapi.huoerdangjia.com%2Fweixin%2Fauth&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
            if(window.tools.getCookie('auth_resp')) {
                window.extHeader = JSON.parse(JSON.parse(window.tools.getCookie('auth_resp').split('').join('')));
                // alert(JSON.stringify(window.extHeader));
                window.localStorage.worker_app_userinfo = JSON.stringify(window.extHeader);
                window.localStorage.rootRole = window.extHeader.role;
            }

            if(!window.extHeader.weixinId){
                window.extHeader = {};
                if(window.navigator.userAgent.indexOf('MicroMessenger') > -1) {
                    window.location.href = redirect_uri;
                }
            }

        }catch(e) {
            window.extHeader = {};
            if(window.navigator.userAgent.indexOf('MicroMessenger') > -1) {
                window.location.href = redirect_uri;
            }
        }

        // {productID:"5815919718275566320001",JDBID:"BF712413-77B7-4767-8129-47FF58925877",tradeType:"3",deviceType:"iPhone 5S",proxyType:"http",memberID:"550357453066215428",channel:"appstore",h:"1136",appKey:"fb371c48e9a9b2a1174ed729ae888513",udid:"298b613a4b5c1a2e369d6a5b91299b9e80a21e80",w:"640",accessToken:"ACCESS_TOKEN5503574530662154281459335278960",deviceID:"B4541559-B800-4343-87E2-03E01DFCA1B7",platform:"iOS",clientVersion:"2.1.0",phoneVen:"1",jailbreak:0,network:"5",systemVersion:"8.3",traceID:"9954E8A1-DEE2-4830-B5CC-01055031D183",companyName:"人人行",companyId:"123123"};
        try{
            angular.bootstrap(document, ['worker']);
        }catch(e){
        }

    });
    /*/*
    /**
     * require your modules
     */
    require('./common/tools.js');
    require('./app.module.js');
    require('./app.route.js');
    require('./app.run.js');

    /* require controllers */

    require('./controllers/index.controller.js');
    require('./controllers/wantOffer.controller.js');
    require('./controllers/managePro.controller.js');
    require('./controllers/user.controller.js');
    require('./controllers/certificationCon.controller.js');
    require('./controllers/inviteWorker.controller.js');
    require('./controllers/publishPro.controller.js');
    require('./controllers/finishPro.controller.js');
    require('./controllers/evaluWorker.controller.js');
    require('./controllers/applyWork.controller.js');
    require('./controllers/inviteSuc.controller.js');
    require('./controllers/applyWorkSuc.controller.js');

    /* controllers end*/
    require('./directive/fileModel.directive.js');
    // require('./directive/fancySelect.directive.js');
    // require('./directive/imgUpload.directive.js');
    // require('./directive/jdbScrollPicker.directive.js');
    // require('./directive/jdbScrollSelector.directive.js');
    // require('./directive/ngTap.directive.js');
    require('./directive/jdbImgView.directive.js');
    // require('./directive/moneyFmt.directive.js');
    // require('./directive/regionSelect.directive.js');
    // require('./directive/inputPhone.directive.js');

    /*require('./directive/changeView.directive.js');*/

    require('./services/api.service.js');
    require('./services/storage.service.js');
    require('./services/img.service.js');
    require('./services/share.service.js');

    require('./app.filter.js');

    // function count(m, n) {
    //     if(m == 0 || n == 0) {
    //         return 0;
    //     }
    //     if(m == 1 ||  n == 1) {
    //         return 1;
    //     }
    //     return count(n, m - 1) + count(n- 1, m);
    // }
