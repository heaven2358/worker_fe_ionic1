angular.module('worker').controller('certificationConCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.post = {};
    $scope.post.tempIdPicsArr = ['123123',''];
    $scope.post.tempCaPicsArr = [];
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
    // $scope.$watch('');

    $scope.init = function() {
        $rootScope.rootTap = false;

        apiService.getData( '{{userSelfInitApi}}'
        ).success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.msg );
                    return;
                }
                $scope.post = data.user;
                if($scope.post.idPics) {
                    $scope.post.tempIdPicsArr = data.user.idPics.split(',');
                }
                if($scope.post.caPics) {
                    $scope.post.tempCaPicsArr = data.user.caPics.split(',');
                }
        });
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }

    $scope.submitData = function() {

        // $scope.post.idPics = $scope.post.idPics || 'http://api.whatsmax.com:8081/1612/17/20161218181200.png';
        $scope.post.idPics = joinStr($scope.post.tempIdPicsArr, ',');
        // $scope.post.caPics = $scope.post.caPics || 'http://api.whatsmax.com:8081/1612/17/20161218181200.png';
        $scope.post.caPics = joinStr($scope.post.tempCaPicsArr, ',');
        apiService.getData( '{{userImproveMeApi}}',
            $scope.post
        ).success( function( data ) {
                if( data.code * 1 != 1 ) {
                    window.toastError( data.msg );
                    return;
                }
                // $scope.listArr = data.list;
                window.toastSuccess('保存成功');
        });
    }

    function joinStr(obj, para) {
        //默认要么obj,要么array
        var tempArr = [];
        for(var i in obj) {
            if(obj[i]) {
                tempArr.push(obj[i]);
            }
        }
        // }else {
        //     tempArr = obj;
        // }
        return tempArr.join(para);
    }

}]);
