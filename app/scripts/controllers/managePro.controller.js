angular.module('worker').controller('manageProCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.workerSubmit = {};
    $scope.workerSubmit.addTimeShow = new Date().getTime();
    $scope.pageType = $rootScope.rootRole ? 'laborSupervision' : 'worker';

    $scope.$on( '$ionicView.afterEnter', function(event, data){
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
        $scope.pageType = $rootScope.rootRole * 1 == 1 ? 'laborSupervision' : 'worker';
        $scope.workerSubmit.addTimeShow = new Date().getTime();
        var initUrl = '{{workerManaInitApi}}';
        if($rootScope.rootRole * 1 == 1) {
            initUrl = '{{bossManaInitApi}}';
        }
        apiService.getData( initUrl, {
            userId: window.extHeader.userId
        } ).success( function( data ) {
            if( data.code * 1 != 1 ) {
                window.toastError( data.msg );
                return;
            }
            $scope.data = data;
        });
    };

    $scope.toFinishPro = function(item) {
        $location.path('/finishPro').search({
            projectName: item.projectName,
            projectId: item.id
        });
    }

    $scope.workerSubmit = function() {
        $scope.workerSubmit.userId = window.extHeader.userId;
        $scope.workerSubmit.projectId = $scope.data.project.id;
        $scope.workerSubmit.addTime = new Date($scope.workerSubmit.addTimeShow).getTime();
        apiService.getData( '{{workerSubmitProApi}}', $scope.workerSubmit )
            .success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.msg );
                    return;
                }
                window.toastSuccess('提交成功');
            });
    }

    $scope.dealDoit = function(item, choice) {
        apiService.getData( '{{workerDoitApi}}', {
            userId: window.extHeader.weixinId,
            toUserId: item.id,
            projectId: item.projectId,
            doit: choice * 1
        } ).success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.error.returnUserMessage );
                    return;
                }
                window.toastSuccess('操作成功');
            });
    }

}]);
