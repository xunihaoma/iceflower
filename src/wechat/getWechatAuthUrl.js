/**
 * 微信授权
 * url    为授权后的重定向url
 * appId  公众号唯一标识
*/
var getWeChatAuthUrl = function(url, appId) {
    var finalUrl = encodeURIComponent(url);
    var x = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + finalUrl  + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    return x;
}

module.exports = getWeChatAuthUrl;