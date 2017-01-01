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
                // alert('change');
                scope.file = (event.srcElement || event.target).files[0];
                uploadFun(scope.file);
                // scope.getFile();
            });

            function uploadFun(file) {
                // alert('beforeUpload');

                try {
                    var imgJrc = require('./../common/jsImg.js');
                    console.log(imgJrc);
                    var tempImg = new Image();
                    var tempReader = new FileReader();
                    // tempReader(file);
                    var flag = true;
                    tempReader.onerror = function(e) {
                        flag = false;
                        alert('获取图片失败');
                    }
                    tempReader.onloadend = function() {
                        // this.result;
                        // console.log(tempReader.result);
                        tempImg.src = tempReader.result;
                        var srcBase64 = imgJrc.compress(tempImg, 50).src;
                        $ionicLoading.show({
                            template: '<ion-spinner icon="ios"></ion-spinner>',
                            noBackdrop: true
                        });
                        if (flag) {
                            apiService.getData('{{picUploadApi}}', {
                                image: srcBase64
                            }).success(function(resObj) {
                                try{
                                    $ionicLoading.hide();
                                    // alert(JSON.stringify(resObj));
                                    if(resObj.code == null || resObj.code * 1 != 1) {
                                        window.toastError( resObj.msg || '图片上传失败，请稍后重试' );
                                        return
                                    }
                                    scope.exportSrc = resObj.picurl;
                                    // scope.$digest();
                                }catch(e){
                                    alert(e);
                                }

                            }).error(function(e) {
                                window.toastError('图片上传失败');
                                alert(e);
                            });
                        }

                    };
                    tempReader.readAsDataURL(file);
                } catch (e) {
                    alert('代码错误');
                }


            };
        }
    };
}]);
