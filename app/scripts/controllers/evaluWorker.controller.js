angular.module('worker').controller('evaluWorkerCtrl', ['$scope', '$rootScope', '$location', '$state', 'apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    // console.log(12344);
    $scope.post = {};
    $scope.$on('$ionicView.afterEnter', function(event, data) {
        $scope.init();
    });

    $scope.$on('$ionicView.leave', function(event, data) {
        // $rootScope.bottomBtnType = 0;
    });

    $scope.$on('$ionicView.loaded', function(event, data) {
        //$scope.init();
    });

    $scope.init = function() {
        $rootScope.rootTap = false;
        $scope.beUser = apiService.getCache('beEvaluedUser');
        $scope.post.touserId = $scope.beUser.id;
        console.log($scope.beUser);
        $scope.pageType = $rootScope.rootRole * 1 == 1 ? 'laborSupervision' : 'worker';
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }

    $scope.changeChoose = function(keyName, no) {
        $scope.post[keyName] = no;
    }

    $scope.submitData = function() {
        // $scope.post.userId =
        apiService.getData('{{commentSaveaddCommentApi}}', $scope.post)
            .success(function(data) {
                if (data.code * 1 != 1) {
                    window.toastError(data.msg);
                    return;
                }
                $location.path('pingjiaSuc');
                window.toastSuccess('提交成功', function() {
                    // window.history.back(-1);
                    $location.path('pingjiaSuc');
                });
            });
    }

}]);
