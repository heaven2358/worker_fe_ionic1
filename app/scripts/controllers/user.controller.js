angular.module('worker').controller('userCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;

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
        $rootScope.rootTap = true;
        $scope.pageType = $rootScope.rootRole * 1 == 1 ? 'laborSupervision' : 'worker';
        apiService.getData( '{{userMyApi}}', {
            userId: window.extHeader.userId
        } ).success( function( data ) {
            if( data.code * 1 !=1 ) {
                window.toastError( data.msg);
                return;
            }
            console.log(data);
            $scope.showdata = data;
        });
    };

    $scope.toCertification = function() {

        $location.path('/certificationCon');
    }


    $scope.pingjia = function(item) {
        $location.path('/evaluWorker')
            .search({
                touserId: item.id
            });
        apiService.setCache('beEvaluedUser', item);
    }

    $scope.dealWorker = function(item, choice) {
        apiService.getData( '{{workerDoitApi}}', {
            userId: window.extHeader.userId,
            toUserId: item.id,
            projectId: item.projectId,
            doit: choice * 1
        } ).success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.msg );
                    return;
                }
                $scope.init();
                window.toastSuccess('操作成功');
            });
    }

}]);
