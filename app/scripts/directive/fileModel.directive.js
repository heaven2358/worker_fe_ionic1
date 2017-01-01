angular.module('worker').directive('fileModel', ['$parse', 'apiService', function($parse, apiService) {
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
                        console.log(scope.exportSrc);
                        scope.exportSrc = resObj.picurl;
                        console.log(scope.exportSrc);
                        // scope.$digest();
                    });
                };
                tempReader.readAsDataURL(file);

            };
        }
    };
}]);
