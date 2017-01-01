angular.module('worker').controller('finishProCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.showdata = {};
    $scope.project = {};
    $scope.$on( '$ionicView.afterEnter', function(event, data){
        $scope.init();
    } );

    $scope.$on( '$ionicView.leave', function(event, data) {
        $rootScope.rootTap = true;
    } );

    $scope.$on( '$ionicView.loaded', function(event, data){
        //$scope.init();
    } );

    $scope.init = function() {
        $rootScope.rootTap = false;
        $scope.project.projectName = $location.search().projectName;
        apiService.getData( '{{projectFinInitApi}}', {
            userId: window.extHeader.userId,
            projectId: $location.search().projectId
        }).success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.msg );
                    return;
                }
                $scope.listArr = data.list;
                $scope.changeShow(new Date().getDay());
        });
    };


    $scope.projectBudget = function(id) {
        apiService.getData( '{{projectBudgetApi}}', {
            userId: window.extHeader.userId,
            id: id,
            projectId: $location.search().projectId
        }).success( function( data ) {
            if( data.code * 1 != 1 ) {
                window.toastError( data.msg );
                return;
            }
            window.toastSuccess('决算成功');
        });
    }

    $scope.changeShow = function(indexList) {
        $scope.showdata = {};
        angular.forEach($scope.listArr, function(item, index) {
            if(item.week * 1 === indexList) {
                $scope.showdata.nowTime = item.nowTime;
                $scope.showdata.workerList = item.list;
            }
        });
        console.log($scope.showdata);
    }

}]);
