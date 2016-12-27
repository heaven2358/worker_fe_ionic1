
angular.module('worker').controller('inviteWorkerCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    console.log(12344);
    $scope.$on( '$ionicView.afterEnter', function(event, data){
        window.tools.setNativeTitle( '人人催' );
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
        apiService.getData( '{{workerDetailApi}}', {
            pId: $location.search().uid,
            nick:   $location.search().nick,
            userName:   $location.search().userName
        }).success( function( data ) {
            if( data.code * 1 != 1) {
                console.log('error');
                window.toastError( data.msg || '数据错误');
                return;
            }
            console.log(data);
            $scope.data = data;
        });
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }

}]);
