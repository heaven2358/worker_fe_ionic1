angular.module('worker').controller('applyWorkCtrl', ['$scope', '$rootScope', '$location', '$state', 'apiService','$ionicModal',  function($scope, $rootScope, $location, $state, apiService, $ionicModal) {
    $scope.busy = false;
    console.log(12344);
    $scope.$on('$ionicView.afterEnter', function(event, data) {
        $scope.init();
    });

    $scope.$on('$ionicView.leave', function(event, data) {
        $rootScope.bottomBtnType = 0;
    });

    $scope.$on('$ionicView.loaded', function(event, data) {
        //$scope.init();
    });

    $scope.init = function() {
        $rootScope.rootTap = false;
        console.log($location.search());
        apiService.getData('{{projectDetailApi}}', {
            pId: $location.search().pid
        }).success(function(data) {
            if (data.code * 1 != 1) {
                console.log('error');
                window.toastError(data.msg || '数据错误');
                return;
            }
            console.log(data);
            $scope.data = data;
            // $scope.status = resObj.status;

            // if( resObj.status != window.applyStatus.status ) {
            //     window.applyStatus = resObj;
            //     $rootScope.saveStatusToDevice( angular.extend( {}, resObj ) );
            // }



        });
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }


    $scope.applySubmit = function() {
        console.log('applySubmiting');
        apiService.getData('{{projectWantedApi}}', {
            projectId: $location.search().pid
        }).success(function(data) {
            if (data.code * 1 != 1) {
                console.log('error');
                window.toastError(data.msg || '数据错误');
                return;
            }
            window.toastError('求职成功');
            $location.path('/applyWorkSuc');
            // $scope.status = resObj.status;

            // if( resObj.status != window.applyStatus.status ) {
            //     window.applyStatus = resObj;
            //     $rootScope.saveStatusToDevice( angular.extend( {}, resObj ) );
            // }

        });
    }

    $scope.showShareModal = function() {
        $ionicModal.fromTemplateUrl('views/applyWork/shareModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
        $scope.closeModal = function(e) {
            if ($scope.modal) {
                $scope.modal.hide();
                $scope.modal.remove();
            }
        }
        $scope.$on('closeLargeImg', $scope.closeModal);
    }

}]);
