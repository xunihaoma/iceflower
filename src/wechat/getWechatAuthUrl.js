/**
 * 微信授权
 * url    为授权后的重定向url
 * appId  公众号唯一标识
*/
var getWeChatAuthUrl = function(url, appId, type) {
    var finalUrl = encodeURIComponent(url);
    var scope = 'snsapi_userinfo';
    if(type === 'snsapi_base') {
        scope = 'snsapi_base';
    }
    var x = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + finalUrl  + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect';
    return x;
}

module.exports = getWeChatAuthUrl;