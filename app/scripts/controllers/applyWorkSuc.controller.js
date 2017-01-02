angular.module('worker').controller('applyWorkSucCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.data = {};
    $scope.$on( '$ionicView.afterEnter', function(event, data){
        $scope.init();
    } );

    $scope.$on( '$ionicView.leave', function(event, data) {
        $rootScope.bottomBtnType = 0;
    } );

    $scope.$on( '$ionicView.loaded', function(event, data){
        //$scope.init();
    } );

    $scope.init = function() {
        $rootScope.rootTap = false;
        $scope.data.phone = $location.search().phone;
        // $scope.pageType = $rootScope.rootRole * 1 == 1 ? 'laborSupervision' : 'worker';
        // apiService.getData( '{{userMyApi}}', {
        //     userId: window.extHeader.userId
        // } ).success( function( data ) {
        //     if( data.code * 1 !=1 ) {
        //         window.toastError( data.msg);
        //         return;
        //     }
        //     console.log(data);
        //     $scope.showdata = data;
        // });
    };


}]);
