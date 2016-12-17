(function() {
    window.tools = {
        setNativeTitle: function(titleName) {
            if (!window.SetTitle) {
                return;
            }
            window.SetTitle.setTitle(titleName);
        },
        setNativeSearchIcon: function(option) {
            var imgSearchIconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTVDNzhBNzkwMkI2MTFFNkI3MDg5OTlEMDlENEY3QUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTVDNzhBN0EwMkI2MTFFNkI3MDg5OTlEMDlENEY3QUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNUM3OEE3NzAyQjYxMUU2QjcwODk5OUQwOUQ0RjdBRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNUM3OEE3ODAyQjYxMUU2QjcwODk5OUQwOUQ0RjdBRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmGQ7P8AAAMhSURBVHja7JtNSFRRHMXfRBRjNEIQUVSQkZkLadcioQ9q0UJTaKa1i8qyhato08ZV69pEROG6oK9lUaMVMbtwkdkiyKKwMHCEoMhe5zJn8jVlODr3vce958CPy+C8+3d+PO/cj2cmDMNAsZcVUiDBEqxIsARLsCLBEizBigRLsCLBEizBigRLsAQrEizBEqxIsAQrEizBEqwsJStT+nu1gS7QCdrBetAMZsBnMA6egPvgVZoFZ1L06FQGHAXnwZ46riuBi+AuCCX432kFV8E+vv4CboJH4AV4D76CJrAZ7AYHQR6s4zUj4BSYSJVhIzhh8mA2rOQDOA1WL/Ja875+Xheyn3wKPtNvkv4FToA5yrkBmpfYTw5cZz9z7Nd7wcfAD/ATDDaoz0H2Z/ot+Cy4FZR5x51tcN8D7LfMOt4JNl+sRUoYtlRjmP0XWS8xwUnMInrAbfCR892yhRo5zo83gl5wx6eV3Dm2Q5bkBux3qKaeF/PgNq7CzDx3E/hmsdYq/pWYefKupFZ8cd/BXWxvWZZr8p11TLp9GSI62T6Mqd4Dtnt9EdzOdiymemM1dZ0fg2f4Db+Gewu2k2WdMnfjnBccRnbOXK6Z2BBRnZY1xVQvy3bWlzH4E9stMdWr1pnyRfBLth0x1euoqeu84GdsD8VU73BNXa3ktJJbXsyHLPFD91mu1cc6z4MED0Zd3k0b51+Jd7tp5vR3NKhsJV62VOMS5Y6yXnJJ8ESjetA50OC+z0QOQHf6fCZXsHwmd1ynyn+fKueWcap8LZzPBZ0qL/xcRH+dz0WcjDwXUc1bsE2C/xyTRyKCpsEVDiM7QJbvy/J1gT+fjlxjrj8CJtMkOUjRUzBmytgDSmF9Me/vjZweb6+R3OLbqfJiV3zdPAExq7ANYC13xaY4x30K7i2wiGgBRW72TIID4I0vC424kgrJLj+AbWTuB+/AVvCY0iXYJck+/AtBopJdHoP/NyZP8ItUd7CFO/l1UHliXnewC9G/cUmwBCsSLMESrEiwBEuwIsESrEiwBEuwIsESLMGKBEuwBEuBBEuwIsES7Gp+CTAA6x0rGr65DzMAAAAASUVORK5CYII=';

            if (option && option.cancel) {
                window.tools.cancelNativeRightIcon({});
                return false;
            }

            if (option && option.function) {
                window.searchIcon_callBack = option.function;
            } else if (!window.searchIcon_callBack) {
                window.searchIcon_callBack = function() {
                    window.location.href = '#/overdueCheck';
                }
            }
            window.tools.setNativeRightIcon({

                defaultTitle: '查老赖',
                imgBase64: imgSearchIconBase64,
                callBackName: 'searchIcon_callBack'
            });
        },
        toast: function(str) {
            try {
                window.plugins.toast.showShortCenter(str, function() {}, function() {});
            } catch (e) {
                console.log(e);
            }
        },
        cancelNativeRightIcon: function() {
            window.tools.setNativeRightIcon({});
        },
        setNativeRightIcon: function(option) {
            if (!window.RightNavigationBar) {
                return;
            }
            window.RightNavigationBar.setRightNavigationItem(

                option.defaultTitle || '',
                option.imgBase64 || '',
                option.callBackName || 'console.log',
                option.parameters || '',
                option.successFun || (function() {}),
                option.errorFun || (function() {})
            );
        },
        dataStatistic: function(option) {
            option = option || {};
            var defaultOpt = {
                'type': option.type || '未定义',
                'action': option.action || '未定义',
                'target': option.target || '未定义'
            };
            window._hmt.push([
                '_trackEvent',
                defaultOpt.type + '-' + defaultOpt.action + '-' + defaultOpt.target,
                '', ''
            ]);
        },
        imageLoadPromise: function(imgURI) {
            return new window.Promise(function(resolve, reject) {
                var tempImg = new Image();
                tempImg.onerror = function(e) {
                    reject(e);
                }
                tempImg.onload = function() {
                    resolve()
                }
                tempImg.src = imgURI;
            });
        },
        checkImgArr: function(imgArr) {
            // imgArr = [{url：'sdfsdfsf'},{url: 'sdfsdfsdf'}]
            var tempArr = angular.extend([], imgArr);
            angular.forEach(tempArr, function(item, index) {
                window.tools.imageLoadPromise(item.url)
                    .then(function() {
                        //do nothing
                    }, function(e) {
                        console.log(e);
                        item.url = './images/normal/defaultUser.png';
                    });

            });
            return tempArr;
        },
        checkPhoneNo: function(phone) {
            var str = phone,
                exet = /^[1-9][0-9]{0,10}$/;
            if (str == '') {
                return '';
            }

            if (angular.isNumber(str)) {
                str = str.toString();
            }
            if (str.match(exet) != null) {
                return str;
            } else {
                //强大的中文输入法能一次输入两个字符
                return window.tools.checkPhoneNo(str.substr(0, str.length - 1));
            }
        },
        checkString: function(exet) {
            function cutString(tempString) {
                if (tempString == '') {
                    return '';
                }

                if (angular.isNumber(tempString)) {
                    tempString = tempString.toString();
                }
                if (tempString.match(exet) != null) {
                    return tempString;
                } else {
                    //强大的中文输入法能一次输入两个字符
                    return cutString(tempString.substr(0, tempString.length - 1));
                }
            }
            return function(str) {
                return cutString(str);
            }

        },
        sendMessage: function() {
            var dateStamp = new Date().getTime();
            return function(str) {
                var tempImg = new Image();
                tempImg.src = 'http://www.baidu.com/?message=' + str;
            }
        },
        endsWith: function(str1, str2) {
            return str1.indexOf(str2, str1.length - str2.length) !== -1;
        }
    }
        //百度打点
    window._hmt = window._hmt || [];
    (function() {
        // var hm = document.createElement("script");
        // hm.src = "https://hm.baidu.com/hm.js?2c51dea2abf30365f9569dd0ba201ef8";
        // var s = document.getElementsByTagName("script")[0];
        // s.parentNode.insertBefore(hm, s);
    })();
})();
