angular.module('worker').controller('wantOfferCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.data = {};
    $scope.$on( '$ionicView.afterEnter', function(event, data){
        window.tools.setNativeTitle( '人人催' );
        $scope.init();

    } );

    $scope.$on( '$ionicView.leave', function(event, data) {
        $rootScope.bottomBtnType = 0;
    } );

    $scope.$on( '$ionicView.loaded', function(event, data){
        //$scope.init();
    } );

    $scope.init = function() {
        $rootScope.rootTap = true;

        // $scope.data = apiService.getCache('tempRes');

        apiService.getData( '{{projectListApi}}', {
            address1: '重庆市',
            address2:'江北区',
            pageNum: 1,
            pageNum: 10
        } ).success( function( data ) {
            if( data.code * 1 != 1) {
                window.toastError( data.msg );
                return;
            }
            console.log(data);
            $scope.data.pList = data.pList;
            console.log($scope.data.pList );
            // $scope.status = resObj.status;

            // if( resObj.status != window.applyStatus.status ) {
            //     window.applyStatus = resObj;
            //     $rootScope.saveStatusToDevice( angular.extend( {}, resObj ) );
            // }



        });
    };

    $scope.inviteSomebody = function(id) {
        $location.path('/inviteWorker');
    }
    $scope.toPublishPro = function() {
        $location.path('/publishPro');
    }

}]);
