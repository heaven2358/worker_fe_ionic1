angular.module('worker').service('imgService', function() {
    return {
        checkImgArr: function(imgArr) {
            // imgArr = [{url：'sdfsdfsf'},{url: 'sdfsdfsdf'}]
            var tempArr = angular.extend([], imgArr);
            angular.forEach(tempArr, function(item, index) {
                console.log(item);
                window.imageLoadPromise(item.url)
                    .success(function() {
                        //do nothing
                    })
                    .error(function(e) {
                        item.url = '/images/normal/defaultUser.png';
                    });
            });
            return tempArr;
        }
    }
});