angular.module('worker').controller('certificationConCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.post = {};
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
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }

    $scope.submitData = function() {

        $scope.post.idPics = $scope.post.idPics || 'http://api.whatsmax.com:8081/1612/17/20161218181200.png';
        $scope.post.caPics = $scope.post.caPics || 'http://api.whatsmax.com:8081/1612/17/20161218181200.png';
        apiService.getData( '{{userImproveMeApi}}',
            $scope.post
        ).success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.msg );
                    return;
                }
                $scope.listArr = data.list;
        });
    }

}]);
