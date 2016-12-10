angular.module('worker').service('storageService', function() {
    this.data = {
    };

    this.setData = function(key, value) {
        this.data[key] = value;
    }

    this.getData = function(key) {
        return this.data[key] || undefined;
    }
    var requestCatch = {};
    var count = 0;
    var MAXKEY = 10;
    var keyPool = [];
    var catchTime = 1 * 60 * 1000;

    this.setCache = function(url, postDataStr, resData) {
        try {
            if(!requestCatch[url]) {
                requestCatch[url] = {};
            }
            if(typeof postDataStr == 'object') {
                postDataStr = JSON.stringify(postDataStr);
            }
            requestCatch[url][postDataStr] = {
                timeStamp: new Date().getTime(),
                dataCatch: resData
            }
            keyPool.push({
                catchUrl: url,
                paraStr:postDataStr
            });
            count += 1;
            if (count > MAXKEY && requestCatch[url][postDataStr]) {
                var tempObj = keyPool.shift();
                delete requestCatch[tempObj.url][tempObj.paraStr];
            }
        } catch (e) {
            console.log(e);
            return null
        }

    }


    this.getCache = function(url, postDataStr) {
        try {
            if(typeof postDataStr == 'object') {
                postDataStr = JSON.stringify(postDataStr);
            }
            if (!requestCatch[url] || !requestCatch[url][postDataStr] ) {
                return null
            }
            var element = requestCatch[url][postDataStr];
            var tempStamp = new Date().getTime();
            if ((tempStamp - element.timeStamp) < catchTime) {
                return element
            } else {
                delete requestCatch[url][postDataStr];
                return null
            }
        } catch (e) {
            console.log(e);
            return null
        }
    }

});
