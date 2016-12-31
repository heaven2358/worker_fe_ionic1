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
        var initUrl = '{{projectListApi}}';
        if($rootScope.rootRole * 1 == 1) {
            initUrl = '{{workerListApi}}';
        }

        apiService.getData( initUrl, {
            address1: '重庆市',
            address2:'江北区',
            pageNum: 1,
            pageSize: 10
        } ).success( function( data ) {
            if( data.code * 1 != 1) {
                console.log('error');
                window.toastError( data.msg || '数据错误');
                return;
            }
            if($rootScope.rootRole * 1 == 1) {
                $scope.data.wList = data.userList;
                console.log($scope.data.wList );
            }else {
                $scope.data.pList = data.pList;
            }
        });
    };

    $scope.inviteSomebody = function(id) {
        $location.path('/inviteWorker');
    }
    $scope.toPublishPro = function() {
        if($rootScope.rootRole * 1 == 1) {
            $location.path('/publishPro');
            return
        }
        apiService.getData( '{{userFabuApi}}', {

        } ).success( function( data ) {
            if( data.code * 1 != 1) {
                console.log('error');
                window.toastError( data.msg || '数据错误');
                return;
            }
            $location.path('/fabuSuc');
        });
    }

    $scope.inviteSomebody = function(item) {
        $location.path('/inviteWorker')
            .search({
                uid : item.id,
                nick: item.nick,
                userName:item.userName
            });
    }
    $scope.applyWork = function(id) {
        $location.path('/applyWork')
            .search({
                pid : id
            });
    }


}]);
