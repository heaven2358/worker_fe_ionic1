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
        console.log(ret);
        console.log({
            weixinId: window.extHeader.weixinId || '234',
            weixinNick:window.extHeader.userNick || 'seser',
            role: ret * 1 == 1 ? 1 : 2
        });
        apiService.getData('{{chooseRoleApi}}', {
            weixinId: window.extHeader.weixinId || '234',
            weixinNick:window.extHeader.userNick || 'seser',
            role: ret * 1 == 1 ? 1 : 2
        }).success(function(res) {
            console.log(res);
            $rootScope.rootRole = ret;
            $location.path('wantOffer');
        });

    }

    window.wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            console.log(res);
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
        }
    });
}]);
