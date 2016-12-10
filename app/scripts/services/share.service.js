/**
 * 分享组件service
 */
angular.module('worker').service('shareService',[function () {
    // 分享渠道与渠道名称对应map
    var type2name = {
        //sms: '短信',
        wxfeed: '朋友圈',
        wxmsg: '微信',
        qq: 'QQ',
        qqzone: 'QQ空间'
            //weibo: '微博'
    };
    function Share(config) {
        this.config = config;
        this.shareData = {};
        this.initShare();
    }
    Share.prototype.initShare = function () {
        var opts = this.config || {};
        // var contentArr = [];
        var shareImageUrl = opts.shareImg;
        var sharePageUrl = opts.shareUrl;

        for (var key in type2name) {

            var type = key;
            var name = type2name[type];
            var shareContent = opts.shareContent;
            if (shareContent[type]) {
                this.shareData[type] = {
                    type: type,
                    shareTitle: shareContent[type].shareTitle,
                    shareText: shareContent[type].shareText,
                    shareImageUrl: shareImageUrl,
                    sharePageUrl: sharePageUrl,
                    recipients: '',
                    subject: type,
                    name: name
                };

            }
        }
    };
    Share.prototype.doShare = function (type) {
        var source = 'h5app';
        var shareData = this.shareData;
        var shareStr = JSON.stringify(shareData[type]);
        var shareContentB64 = window.encodeURIComponent(shareStr);
        var shareUrl = ['jdbclient://native.jiedaibao.com/web2Native/share?source=',
            source,
            '&shareTo=',
            type,
            '&content=',
            shareContentB64
        ].join('');
        window.location.replace(shareUrl);
    };
    return Share;
}]);
