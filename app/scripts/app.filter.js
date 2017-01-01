angular.module('worker')
    .filter('timeMiSecFilter', function() {
        return function(input) {
            var tempStr = '';
            var tempArr = [];
            var tempTime = input;

            if(typeof input != 'number') {
                return '年月日'
            }

            tempArr.push((new Date(tempTime)).getFullYear() + '年');
            tempArr.push(((new Date(tempTime)).getMonth() + 1) + '月');
            tempArr.push((new Date(tempTime)).getDate()  + '日');

            return tempArr.join('');
        };
    });
