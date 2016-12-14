angular.module('worker').controller('manageProCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    console.log($rootScope.rootRole);
    $scope.pageType = $rootScope.rootRole ? 'laborSupervision' : 'worker';

    $scope.$on( '$ionicView.afterEnter', function(event, data){
        window.tools.setNativeTitle( '人人催' );
        $scope.init();
    } );

    $scope.$on( '$ionicView.leave', function(event, data) {
        //$rootScope.bottomBtnType = 0;
    } );

    $scope.$on( '$ionicView.loaded', function(event, data){
        //$scope.init();
    } );

    $scope.init = function() {
        $rootScope.rootTap = true;
        console.log($rootScope.rootRole);
        $scope.pageType = $rootScope.rootRole ? 'laborSupervision' : 'worker';
        console.log($scope.pageType);
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

    $scope.toFinishPro = function() {
        $location.path('/finishPro');
    }

}]);
