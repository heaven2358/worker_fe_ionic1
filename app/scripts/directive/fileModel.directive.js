angular.module('worker').directive('fileModel', ['$parse', 'apiService', function($parse, apiService) {
    return {
        restrict: 'AE',
        scope: {
            imgList: '=',
            imgIndex: '=',
            imgSrc: '=',
            defaultImg: '='
        },
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event) {
                // scope.$apply(function() {
                //     modelSetter(scope, element[0].files[0]);
                // });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                console.log(scope.file);
                uploadFun(scope.file);
                // scope.getFile();
            });

            function uploadFun(file) {
                var tempReader  = new FileReader();
                // tempReader(file);
                tempReader.onload = function() {
                    this.result;
                    console.log(tempReader.result);
                    apiService.getData('{{picUploadApi}}', {
                        image: tempReader.result
                    }).success(function(resObj) {
                        console.log(resObj);
                    });
                };
                tempReader.readAsDataURL(file);


            };
        }
    };
}]);
