/*
imgs ex:

[{url:'****'},{url:'XXXXX'}]


*/



angular.module('worker').directive('ngLargeImg', ['$ionicModal', function($ionicModal, $ionicSlideBoxDelegate, imgService ) {

    return {
        scope: {
            imgs: '=',
            index: '='
        },
        link: function(scope, element, attrs, $ionicSlideBoxDelegate, imgService) {

            scope.closePhoto = function(e) {
                scope.modal.hide();
                scope.modal.remove();
            }
            scope.data = {};
            scope.data.slider = [];
            /*//先这么写，再仔细思考一下策略，修改
            scope.imgs = window.tools.checkImgArr(scope.imgs);*/
            element.bind('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                $ionicModal.fromTemplateUrl('views/directive/ng-large-img.html', {
                    'scope': scope
                }).then(function(modal) {
                    scope.modal = modal;
                    scope.modal.show();
                    scope.showPhoto = true;
                    scope.showPhotoData = element.attr('src');
                    scope.activeIndex = scope.index;
                    scope.data.imgArr = checkImgArr(scope.imgs);
                });
            });
            scope.$on('closeLargeImg', function(d, data) {
                if (scope.modal) {
                    scope.modal.hide();
                    scope.modal.remove();
                }
            });
            scope.options = {
                loop: false,
                //effect: 'fade',
                showPager: false,
                speed: 500
            };

            function checkImgArr(imgArr) {
                // imgArr = [{url：'sdfsdfsf'},{url: 'sdfsdfsdf'}]
                var tempArr = angular.extend([], imgArr);
                angular.forEach(tempArr, function(item, index) {
                    window.tools.imageLoadPromise(item.url)
                        .then(function() {
                            //do nothing
                        }, function(e) {
                            console.log(e);
                            item.url = './images/normal/defaultUser.png';
                        });

                });
                return tempArr;
            }
        }
    };
}])