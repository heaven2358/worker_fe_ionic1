angular.module('worker').directive('fileModel', ['$parse', 'apiService', '$ionicLoading', function($parse, apiService, $ionicLoading) {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            exportSrc: '='
        },
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event) {
                scope.file = (event.srcElement || event.target).files[0];
                uploadFun(scope.file);
            });

            function uploadFun(file) {
                try {
                    var imgJrc = require('./../common/jsImg.js');
                    console.log(imgJrc);
                    var tempImg = new Image();
                    var tempReader = new FileReader();
                    var flag = true;
                    var ifImgLoaded = false;
                    tempImg.onload = function() {
                        if(ifImgLoaded) {
                            return
                        }
                        ifImgLoaded = true;
                        if (tempImg.src.indexOf('image/png') > -1) {
                            var base64Str = imgJrc.compress(tempImg, 50, 'png').src;
                        } else {
                            var base64Str = imgJrc.compress(tempImg, 50).src;
                        }
                        // var srcBase64 = tempReader.result;
                        // var srcBase64 = imgJrc.compress(tempImg, 50).src;
                        $ionicLoading.show({
                            template: '<ion-spinner icon="ios"></ion-spinner>',
                            noBackdrop: true
                        });

                        apiService.getData('{{picUploadApi}}', {
                            image: base64Str
                        }).success(function(resObj) {
                            try {
                                $ionicLoading.hide();
                                // alert(JSON.stringify(resObj));
                                if (resObj.code == null || resObj.code * 1 != 1) {
                                    window.toastError(resObj.msg || '图片上传失败，请稍后重试');
                                    return
                                }
                                scope.exportSrc = resObj.picurl;
                            } catch (e) {
                                alert(e);
                            }

                        }).error(function(e) {
                            window.toastError('图片上传失败');
                            alert(e);
                        });
                    }
                    tempReader.onerror = function(e) {
                        flag = false;
                        alert('获取图片失败');
                    }
                    tempReader.onload = function() {
                        // this.result;
                        console.log(tempReader);
                        tempImg.src = tempReader.result;

                    };
                    tempReader.readAsDataURL(file);

                } catch (e) {
                    alert('代码错误');
                }


            };
        }
    };
}]);
