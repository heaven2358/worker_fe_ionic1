angular.module('worker').controller('indexCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.ifGetLocation = false;
    $scope.data = {};
    $scope.$on( '$ionicView.afterEnter', function(event, data){
        $scope.init();
    });

    $scope.$on( '$ionicView.leave', function(event, data) {
        $rootScope.bottomBtnType = 0;
    });

    $scope.$on( '$ionicView.loaded', function(event, data){
        //$scope.init();
    });

    $scope.init = function() {
        $rootScope.rootTap = false;
        // apiService.getData( '{{getUserStatusApi}}', {} ).success( function( data ) {
        //     if( data.error.returnCode != 0 ) {
        //         window.toastError( data.error.returnUserMessage );
        //         return;
        //     } else {
        //         var resObj = data.data;
        //
        //         $scope.status = resObj.status;
        //
        //         if( resObj.status != window.applyStatus.status ) {
        //             window.applyStatus = resObj;
        //             $rootScope.saveStatusToDevice( angular.extend( {}, resObj ) );
        //         }
        //

        //     }
        // });
    };

    $scope.roleChoose = function(ret) {
        // ret 1 劳务员 0 砖工
        //角色，1=劳务员 2=工人
        console.log(ret);
        apiService.getData('{{chooseRoleApi}}', {
            weixinId: window.extHeader.weixinId || '234',
            weixinNick:window.extHeader.userNick || 'seser',
            role: ret * 1 == 1 ? 1 : 2
        }).success(function(res) {
            console.log(res);
            if(res.code * 1 != 1) {
                window.toastError(res.msg);
                return;
            }
            console.log('dd');
            apiService.setCache('tempRes',res);
            $rootScope.rootRole = ret;
            window.localStorage.rootRole = $rootScope.rootRole;
            $location.path('wantOffer');
        });

    }

    if($rootScope.wx_js_ready) {
        getLocation();
    } else{
        $rootScope.$on('wx_js_ready', function() {
            getLocation();
        });
    }

    function getLocation() {
        if(window.wx) {
            window.wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                }
            });
        }
    }
}]);
