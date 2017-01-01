var defaultConfig = {
    title: '找活儿的都看过来了', // 分享标题
    desc: '专门为建筑工人找活的公众号--建筑工人汇', // 分享描述
    type: 'link',// 分享类型,music、video或link，不填默认为link
    link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx674a699ec9961b33&redirect_uri=http%3A%2F%2Fapi.whatsmax.com%2Fweixin%2Fauth&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect', // 分享链接
    imgUrl: 'http://www.whatsmax.com/images/tempSrc/01e439571c20646ac72538120b45fd.png', // 分享图标
    success: function() {
        // 用户确认分享后执行的回调函数
    },
    cancel: function() {
        // 用户取消分享后执行的回调函数
    }
}


function onMenuShareTimeline(config) {
    if (window.wx) {
        window.wx.onMenuShareTimeline(angular.extend({}, defaultConfig, config));
        window.wx.onMenuShareAppMessage(angular.extend({}, defaultConfig, config));
    }
}
module.exports = onMenuShareTimeline;
