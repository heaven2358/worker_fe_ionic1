angular.module('worker').controller('wantOfferCtrl', ['$scope', '$rootScope', '$location', '$state', 'apiService', function($scope, $rootScope, $location, $state, apiService) {
    $scope.busy = false;
    $scope.data = {};
    $scope.config = {};
    $scope.data.curentPa = 0;
    $scope.data.listBlock = false;
    $scope.data.totalPa = 1; //先写个10
    $scope.data.wList = [];
    $scope.data.pList = [];
    $scope.config.pageSize = 10;

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
        $rootScope.rootTap = true;
        $scope.data.curentPa = 0;
        $scope.data.listBlock = false;
        $scope.data.totalPa = 1; //先写个10
        $scope.data.wList = [];
        $scope.data.pList = [];
        $scope.cityList = apiService.getRegion().cities[21].elements[0].elements;
        $scope.data.address2 = '江北区';
        initList()
    };

    $scope.inviteSomebody = function(id) {
        $location.path('/inviteWorker');
    }
    $scope.toPublishPro = function() {
        if ($rootScope.rootRole * 1 == 1) {
            $location.path('/publishPro');
            return
        }
        apiService.getData('{{userFabuApi}}', {

        }).success(function(data) {
            if (data.code * 1 != 1) {
                window.toastError(data.msg || '数据错误');
                return;
            }
            $location.path('/fabuSuc');
        });
    }

    $scope.inviteSomebody = function(item) {
        $location.path('/inviteWorker')
            .search({
                uid: item.id,
                nick: item.nick,
                userName: item.userName
            });
    }
    $scope.applyWork = function(id) {
        $location.path('/applyWork')
            .search({
                pid: id
            });
    }
    $scope.resetList = function() {
        $scope.data.curentPa = 0;
        $scope.data.wList = [];
        $scope.data.pList = [];
        $scope.data.listBlock = false;
        initList();
    }

    $scope.nextPage = function() {
        initList();
    }

    function initList() {
        // $scope.data = apiService.getCache('tempRes');
        function commonExit() {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.data.listBlock = false;
        }
        if($scope.data.listBlock) {
            return;
        }
        $scope.data.listBlock = true;
        var initUrl = '{{projectListApi}}';
        // alert($rootScope.rootRole);
        if ($rootScope.rootRole * 1 == 1) {
            initUrl = '{{workerListApi}}';
        }
        console.log(initUrl);
        apiService.getData(initUrl, {
            address1: '重庆市',
            address2: $scope.data.address2,
            pageNum: $scope.data.curentPa + 1,
            pageSize: $scope.config.pageSize
        }).success(function(data) {
            if (data.code * 1 != 1) {
                window.toastError(data.msg || '数据错误');
                commonExit();
                return;
            }
            $scope.data.curentPa = data.curPage;
            $scope.data.totalPa = data.totalCount;
            if ($rootScope.rootRole * 1 == 1 && data.userList && data.userList.length > 0) {
                $scope.data.wList = $scope.data.wList.concat(data.userList);
            }
            if(data.pList && data.pList.length > 0){
                $scope.data.pList = $scope.data.pList.concat(data.pList);
            }
            commonExit();
            // commonExit();
        });
    }


}]);
