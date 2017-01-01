
angular.module('worker').controller('publishProCtrl',['$scope','$rootScope','$location','$state','apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.data = {};
    $scope.data.workType = '砌砖工';
    $scope.data.pics = [];
    // $scope.data.tempImg = '';
    // console.log(12344);
    $scope.$on( '$ionicView.afterEnter', function(event, data){
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

    $scope.publishPro = function() {
        // $location.path('/publishPro');
        console.log($scope.data);

        $scope.data.pics = $scope.data.picsArr.join(',') || 'http://api.whatsmax.com:8081/1612/17/20161218181200.png';
        $scope.data.address1 = $scope.data.address1 || '重庆市';
        $scope.data.address2 = $scope.data.address2 || '江北区';
        console.log($scope.pics);
        apiService.getData( '{{projectSubmitApi}}',$scope.data).success( function( data ) {
            if( data.code * 1 != 1) {
                console.log('error');
                window.toastError( data.msg || '数据错误');
                return;
            }
            $location.path('/fabuSuc');
            window.toastSuccess('发布成功', function() {
                // window.history.back(-1);
            });
        });
    }

    $scope.testChange = function(e) {
        console.log(files[0]);
    }
    $scope.$watch('data.tempImg', function(value) {
        console.log(value);
        if(value) {
            $scope.data.picsArr.push(value);
        }

    });

}]);
