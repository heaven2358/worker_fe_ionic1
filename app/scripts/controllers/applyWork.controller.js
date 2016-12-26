
angular.module('worker').controller('applyWorkCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    console.log(12344);
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
        console.log($location.search());
        apiService.getData( '{{projectDetailApi}}', {
            pId: $location.search().pid
        } ).success( function( data ) {
            if( data.code * 1 != 1) {
                console.log('error');
                window.toastError( data.msg || '数据错误');
                return;
            }
            console.log(data);
            $scope.data = data;
            // $scope.status = resObj.status;

            // if( resObj.status != window.applyStatus.status ) {
            //     window.applyStatus = resObj;
            //     $rootScope.saveStatusToDevice( angular.extend( {}, resObj ) );
            // }



        });
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }


    $scope.applySubmit = function() {
        console.log('applySubmiting');
    }
}]);
