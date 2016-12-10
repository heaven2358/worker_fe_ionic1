angular.module("worker").directive("imgUploadDirective", [ 
    '$q', '$window', '$cordovaCamera', '$cordovaActionSheet','$cordovaKeyboard',
    function( $q, $window, $cordovaCamera, $cordovaActionSheet,$cordovaKeyboard ) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                imglist: '='
            },
            template: function(tElement, tAttrs) {
                var _html = '';
                _html += '<div ng-repeat="img in imglist" ng-click="imgClick($index)" class="upload-img" style="background-image: url({{img}});">';
                _html += '</div>';
                _html += '<div ng-click="uploadClick()" class="upload-btn" ng-if="limitupImageNum != imglist.length"> ';
                _html += '<i class="before"></i> <i class="after"></i></div></div>';
                return _html;
            },
            link: function(scope, element, attrs) {
                
                scope.paddingImgNum = 0;
                if(scope.imglist.length) {
                   scope.paddingImgNum = scope.imglist.length;
                }
                //scope.imglist = ['http://localhost:3000/worker/images/normal/defaultUser.png', 'http://jdbserver.b0.upaiyun.com/images/53851465014026315', 'http://jdbserver.b0.upaiyun.com/images/53851465014039782', 'http://jdbserver.b0.upaiyun.com/images/53851465014032905', 'http://jdbserver.b0.upaiyun.com/images/53851465205375618','http://jdbserver.b0.upaiyun.com/images/53851466064985895'];

                scope.limitupImageNum = attrs.limitupImageNum * 1;
                scope.uploadClick = function() {

                    if (scope.imglist.length + scope.paddingImgNum >= scope.limitupImageNum) {
                        toastError('最多上传' + scope.limitupImageNum + '张照片');
                        return;
                    }

                    if ($cordovaKeyboard.isVisible()) {
                        $('#nullClick').click();
                    }

                    $cordovaActionSheet.show({
                        title: '请选择图片来源',
                        buttonLabels: ['本地相机', '本地相册'],
                        addCancelButtonWithLabel: '取消',
                        androidEnableCancelButton: true,
                        winphoneEnableCancelButton: true
                    }).then(function(btnIndex) {
                        if (btnIndex == 1) {
                            $cordovaCamera.getPicture({
                                quality: 100,
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                encodingType: Camera.EncodingType.JPEG,
                                targetWidth: 500,
                                targetHeight: 500,
                                popoverOptions: CameraPopoverOptions,
                                correctOrientation: true
                            }).then(function(imageURI) {
                                scope.paddingImgNum++;
                                imgUploadFun(imageURI);
                            }, function(err) {
                               // toastError('获取相片数据失败');
                            });
                        } else if (btnIndex == 2) {
                            navigator.camera.getPicture(function(imageURI) {
                                scope.paddingImgNum++;
                                imgUploadFun(imageURI);
                            }, function(e) {
                               // toastError('获取相片数据失败');
                            }, {
                                quality: 100,
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            });
                        }
                    });
                }

                function imgUploadFun(imgURI) {
                    try {
                        function uploadImageTest(imgURItest) {
                            var d = $q.defer();

                            $window.ImageUpload.uploadImage(imgURItest, function(uploadImgUrl) {
                                d.resolve(uploadImgUrl);
                            }, function(e) {
                                d.reject(e);
                            });
                            return d.promise
                        }

                        uploadImageTest(imgURI).then(function(uploadImgUrl) {
                            scope.imglist.push(uploadImgUrl);
                            scope.paddingImgNum--;
                        })
                    } catch (e) {
                        toastError(e);
                    }
                }

                scope.imgClick = function(index) {
                    $cordovaActionSheet.show({
                        title: '请选择操作',
                        buttonLabels: ['删除图片'],
                        addCancelButtonWithLabel: '取消',
                        androidEnableCancelButton: true,
                        winphoneEnableCancelButton: true
                    }).then(function(btnIndex) {
                        if (btnIndex == 1) {
                            scope.imglist.splice(index, 1);
                        }
                    });
                }
            }
        };
    }
]);
