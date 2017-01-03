angular.module('worker').controller('publishProCtrl', ['$scope', '$rootScope', '$location', '$state', 'apiService','$ionicModal', function($scope, $rootScope, $location, $state, apiService, $ionicModal) {
    $scope.busy = false;
    $scope.data = {};
    $scope.data.workType = '砌砖工';
    $scope.data.picsArr = [];
    // $scope.data.tempImg = '';
    // console.log(12344);
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
        $scope.cityList = apiService.getRegion().cities[21].elements[0].elements;
        $scope.data.allAddress = '重庆市-江北区';
    };

    $scope.toCertification = function() {
        $location.path('/toCertification');
    }

    $scope.publishPro = function() {
        // $location.path('/publishPro');
        if(!checkData()) {
            return
        }
        $scope.data.pics = $scope.data.picsArr.join(',') || 'http://api.whatsmax.com:8081/1612/17/20161218181200.png';
        $scope.data.address1 = $scope.data.allAddress.split('-')[0] || '重庆市';
        $scope.data.address2 = $scope.data.allAddress.split('-')[1] || '江北区';
        apiService.getData('{{projectSubmitApi}}', $scope.data).success(function(data) {
            if (data.code * 1 != 1) {
                console.log('error');
                window.toastError(data.msg || '数据错误');
                return;
            }
            $location.path('/fabuSuc');
            window.toastSuccess('发布成功', function() {
                // window.history.back(-1);
            });
        });
    }

    $scope.$watch('data.tempImg', function(value) {
        console.log(value);
        if (value) {
            $scope.data.picsArr.push(value);
        }

    });
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

    function checkData() {
        if(!$scope.data.projectName) {
            window.toastError( '项目名称不可为空');
            return false;
        }

        if(!$scope.data.workerCount) {
            window.toastError( '项目人数不可为空');
            return false;
        }

        if(!$scope.data.quantity) {
            window.toastError( '单位总量不可为空');
            return false;
        }

        if(!$scope.data.price) {
            window.toastError( '项目单价不可为空');
            return false;
        }

        return true;
    }


}]);
