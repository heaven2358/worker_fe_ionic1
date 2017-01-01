angular.module('worker')
    .filter('timeMiSecFilter', function() {
        return function(input) {
            var tempStr = '';
            var tempArr = [];
            console.log(input);
            if(!input) {
                return '年月日'
            }
            var tempTime = (new Date(input)).getTime();
            console.log(tempTime);
            // if(typeof input != 'number') {
            //     return '年月日'
            // }

            try{
                tempArr.push((new Date(tempTime)).getFullYear() + '年');
                tempArr.push(((new Date(tempTime)).getMonth() + 1) + '月');
                tempArr.push((new Date(tempTime)).getDate()  + '日');
                console.log('end');
            }catch(e){
                console.log(e);
            }
            return tempArr.join('');
        };
    });
