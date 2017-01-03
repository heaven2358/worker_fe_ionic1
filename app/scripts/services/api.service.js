angular.module('worker').service('apiService', [
    '$http', '$rootScope', '$location', 'storageService', '$q',
    function($http, $rootScope, $location, storageService, $q) {
        ///var apiConfig = require('../assets/api.json');

        var new_region = require('./../common/new_region.js');

        function getHttpData(url, postDataStr) {
            // var cachePromise = $q.when(function() {
            //     return storageService.getCache(url, postDataStr)
            // });

            // cachePromise.success = function(fn) {

            //     cachePromise.then(function(response) {
            //         fn(response.data, response.status, response.headers);
            //     });
            //     return cachePromise;
            // };

            // return cachePromise;

            var tempCache = storageService.getCache(url, postDataStr);
            if (tempCache) {
                ajaxCommonLogic(tempCache.dataCatch);
                return {
                    success: function(callback) {
                        callback && callback(tempCache.dataCatch);
                        if (callback) {
                            return this;
                        }
                    }
                }

            }

            return $http.post(url, postDataStr).success(function(res) {
                storageService.setCache(url, postDataStr, res);
                ajaxCommonLogic(res);
            }).error(function(e) {
                window.toastError('请求接口出现错误，请稍后再试！');
            });
        }

        this.getData = function(url, data, opt) {
            opt = opt || {};
            opt.method = opt.method || 'post';

            if (data) {
                data.from = 'worker';
            }

            url = changeUrl(url);
            opt.method = opt.method.toLowerCase();
            //很low，先这么处理本地 post 404吧
            if (window.location.href.indexOf(':8080') > -1) {
                opt.method = 'get';
            }

            if (opt.method == 'get') {
                if (data.headimgUrl) {
                    delete data.headimgUrl;
                }
                return $http.get(
                    url + '?' + json2url(data)
                ).success(function(res) {
                    ajaxCommonLogic(res);
                }).error(function() {
                    window.toastError('请求接口出现错误，请稍后再试！');
                });
            } else {
                var extHeader = window.extHeader;

                if (extHeader) {
                    data = angular.extend({}, extHeader, data);
                }
                if (data.headimgUrl) {
                    delete data.headimgUrl;
                }
                if (opt.dataCache) {
                    return getHttpData(url, data);
                }

                // return $http({
                //     url:url,
                //     method:'POST',
                //     data:data
                // })
                // .success(function(data,header,config,status){
                // //响应成功
                //
                // }).error(function(data,header,config,status){
                // //处理响应失败
                // });
                return $http.post(url, data).success(function(res) {
                    ajaxCommonLogic(res);
                }).error(function(e) {
                    window.toastError('请求接口出现错误，请稍后再试！');
                });
            }
        }

        this.getUrl = changeUrl;

        function ajaxCommonLogic(result) {
            try {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }

                if (typeof result.code != 'undefined' && result.code != null && result.code * 1 != 1) {
                    switch (parseInt(result.code)) {
                        case 9999:
                            { //用户未登录
                                window.toastError('用户未登录或登录状态已过期，请重新登录!', function() {
                                    // window.CloseWindow.closeWindow(function() {}, function() {});
                                    window.location.href = window.config.redirect_uri;
                                }, 3000);
                                break;
                            }
                    }
                }
            } catch (e) {
                console.log(e);
            }

        }

        function json2url(json) {
            var arr = [];
            var str = '';
            for (var i in json) {
                str = i + '=' + json[i];
                arr.push(str);
            }
            return arr.join('&');
        }

        function changeUrl(url) { //去掉'{{' 和 '}}'
            //return getApiByEnv(apiConfig, url.replace(/[\{|\}]/g, ''));
            return url;
        }

        var cachePool = {};

        this.setCache = function(key, value) {
            cachePool[key] = value;
        }

        this.getCache = function(key) {
            return cachePool[key];
        }
        this.getRegion = function() {
            return new_region;
        }

        this.openUrl = function(url, dataObj, callback, errorCallback) {
            var querryString = '';
            if (dataObj) {
                querryString = '?';
                querryString += json2url(dataObj);
            }
            window.HybridOpenUrl.hybridOpenUrl(
                url + querryString,
                function() {
                    callback && callback();
                },
                function() {
                    errorCallback && errorCallback();
                }
            );
        }
    }
]);
