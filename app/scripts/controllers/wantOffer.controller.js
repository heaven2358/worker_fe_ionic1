angular.module('worker').controller('wantOfferCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;

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

    $scope.inviteSomebody = function() {
        $location.path('/inviteWorker');
    }

}]);
