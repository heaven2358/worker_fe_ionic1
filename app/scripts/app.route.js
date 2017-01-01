angular.module('worker').config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // $ionicConfigProvider.views.maxCache(100); //on cache page
    // $ionicConfigProvider.views.transition('none');

    $ionicConfigProvider.views.swipeBackEnabled(false);//禁止侧滑返回操作
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/index/index.html',
            controller: 'indexCtrl'
        })
        .state('wantOffer', {
            url: '/wantOffer',
            templateUrl: 'views/wantOffer/wantOffer.html',
            controller: 'wantOfferCtrl'
        })
        .state('managePro', {
            url: '/managePro',
            templateUrl: 'views/managePro/managePro.html',
            cache: false,
            controller: 'manageProCtrl'
        })
        //认证
        .state('certificationCon', {
            url: '/certificationCon',
            templateUrl: 'views/certificationCon/certificationCon.html',
            controller: 'certificationConCtrl'
        })
        //邀请工人
        .state('inviteWorker', {
            url: '/inviteWorker',
            templateUrl: 'views/inviteWorker/inviteWorker.html',
            controller: 'inviteWorkerCtrl'
        })
        //发布项目
        .state('publishPro', {
            url: '/publishPro',
            templateUrl: 'views/publishPro/publishPro.html',
            controller: 'publishProCtrl'
        })
        //发布决算项目
        .state('finishPro', {
            url: '/finishPro',
            templateUrl: 'views/finishPro/finishPro.html',
            controller: 'finishProCtrl'
        })
        //评价催客
        .state('evaluWorker', {
            url: '/evaluWorker',
            templateUrl: 'views/evaluWorker/evaluWorker.html',
            cache: false,
            controller: 'evaluWorkerCtrl'
        })
        //申请工作
        .state('applyWork', {
            url: '/applyWork',
            templateUrl: 'views/applyWork/applyWork.html',
            controller: 'applyWorkCtrl'
        })
        //评价成功
        .state('pingjiaSuc', {
            url: '/pingjiaSuc',
            templateUrl: 'views/pingjiaSuc/pingjiaSuc.html'
        })
        //发布成功
        .state('fabuSuc', {
            url: '/fabuSuc',
            templateUrl: 'views/fabuSuc/fabuSuc.html'
        })
        //申请上工成功
        .state('applyWorkSuc', {
            url: '/applyWorkSuc',
            templateUrl: 'views/applyWorkSuc/applyWorkSuc.html'
        })
        .state('user', {
            url: '/user',
            templateUrl: 'views/user/user.html',
            controller: 'userCtrl'
        });



    $urlRouterProvider.otherwise('/index');
}]);
