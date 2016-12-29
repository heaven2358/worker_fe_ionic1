
angular.module('worker').controller('publishProCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.data = {};
    $scope.data.workType = '砌砖工';
    // console.log(12344);
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
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }

    $scope.publishPro = function() {
        // $location.path('/publishPro');
        console.log($scope.data);
        apiService.getData( '{{projectSubmitApi}}',$scope.data).success( function( data ) {
            if( data.code * 1 != 1) {
                console.log('error');
                window.toastError( data.msg || '数据错误');
                return;
            }
            window.toastSuccess('发布成功', function() {
                window.history.back(-1);
            });
        });
    }



}]);
