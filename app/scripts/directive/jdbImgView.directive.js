angular.module('worker').directive('jdbImgView', [
    '$ionicModal', '$timeout',
    function($ionicModal, $ionicSlideBoxDelegate, $ionicSlides, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                imgList: '=',
                imgIndex: '=',
                imgSrc: '=',
                defaultImg: '='
            },
            templateUrl: 'views/directive/jdb-img-view.html',
            link: function(scope, element, attrs, $ionicSlideBoxDelegate) {

                scope.data = {};
                scope.data.slider = [];

                waitForImage(scope.imgSrc.url);

                /* attrs.$observe('img-src', function(newValue) {
                    console.log(newValue);
                    if (newValue) {
                        waitForImage(newValue);
                    }
                });*/

                scope.$watch('imgSrc', function(newValue) {
                    if (newValue) {
                        waitForImage(newValue.url);
                    }
                });
                scope.showLargeImg = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!scope.imgList) {
                        return;
                    }

                    $ionicModal.fromTemplateUrl('views/directive/ng-large-img.html', {
                        'scope': scope
                    }).then(function(modal) {
                        scope.modal = modal;
                        scope.modal.show();
                        scope.showPhoto = true;
                        scope.activeIndex = scope.imgIndex;
                        scope.data.imgArr = checkImgArr(scope.imgList);
                    });
                };

                scope.closePhoto = function(e) {
                    if (scope.modal) {
                        scope.modal.hide();
                        scope.modal.remove();
                    }
                }

                function waitForImage(url) {
                    try {
                        /*if (!angular.isDefined(url)) {
                            return
                        }*/

                        if (url && url.indexOf('data:image/jpeg;base64,') != -1) {
                            scope.imgUrl = url;
                            return
                        }


                        if (scope.defaultImg) {
                            scope.imgUrl = scope.defaultImg;
                        } else {
                            scope.inLoad = true;
                        }
                        scope.inLoad = true;
                        if (!url || url == '') {
                            return;
                        }
                        var tempImg = new Image();
                        tempImg.onload = function() {
                            scope.imgUrl = url;
                            scope.inLoad = false;
                        }
                        tempImg.src = url;
                    } catch (e) {
                        console.log(e);
                    }
                }

                scope.$on('closeLargeImg', scope.closePhoto);

                function checkImgArr(imgArr) {
                    // imgArr = [{url：'sdfsdfsf'},{url: 'sdfsdfsdf'}]
                    var tempArr = angular.extend([], imgArr);
                    angular.forEach(tempArr, function(item, index) {

                        if (item.url && item.url.indexOf('data:image/jpeg;base64,') != -1) {
                            return
                        }
                        window.tools.imageLoadPromise(item.url)
                            .then(function() {
                                //do nothing
                            }, function(e) {
                                item.url = scope.defaultImg || './images/common/default-photo.png';
                            });
                    });
                    return tempArr;
                }
            }
        };
    }
]);