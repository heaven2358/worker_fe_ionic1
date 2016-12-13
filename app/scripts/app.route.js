angular.module('worker').config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // $ionicConfigProvider.views.maxCache(100); //on cache page
    // $ionicConfigProvider.views.transition('none');

    // $ionicConfigProvider.views.swipeBackEnabled(true);//禁止侧滑返回操作
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
            controller: 'manageProCtrl'
        })
        //认证
        .state('certificationCon', {
            url: '/certificationCon',
            templateUrl: 'views/certificationCon/certificationCon.html',
            controller: 'certificationConCtrl'
        })
        .state('user', {
            url: '/user',
            templateUrl: 'views/user/user.html',
            controller: 'userCtrl'
        });



    $urlRouterProvider.otherwise('/index');
}]);
