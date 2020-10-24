  
/**
 * {
 *      activityId: 大教务营销中心生成的活动id,
 *      url: 要分享的地址
 *      title: 分享的标题,
 *      desc: 分享给朋友的描述
 *      imgUrl: 分享的图片
 *      success: function() {
 *          分享成功的回调函数
 *      }     
 * }
 * 
*/



// npm install crypto-js
var sha1 = require('crypto-js/sha1');

//生成随机数
var randomString = function(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//微信分享主方法
var wxShare = function(o) {
    //npm install weixin-js-sdk
    if(!window.iceflowerWXShare) {
        window.iceflowerWX = require('weixin-js-sdk');
    }

    //WXTicket 就是公众号开发文档中的 jsapi_ticket
    var WXTicket = window.localStorage.getItem("WXTicket");
    var WXAppId = window.localStorage.getItem("WXAppId");

    var weixinShareUrl = o.url; 


    var sharefn = function(JS_WXTicket, appId) {

        // 微信分享方法
        var noncestr = randomString(16);
        var timestamp = Date.now();
        var url = window.location.origin + window.location.pathname + window.location.search;
        var sha1_signature = sha1("jsapi_ticket=" + JS_WXTicket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url);
        iceflowerWX.config({
            debug: false, 
            // 必填，公众号的唯一标识
            appId: appId, 
            timestamp: timestamp, 
            nonceStr: noncestr, 
            signature: sha1_signature.toString(), 
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            openTagList: ['wx-open-launch-weapp', 'wx-open-launch-app']
        });
        iceflowerWX.ready(function() {
            //分享到朋友圈
            iceflowerWX.onMenuShareTimeline({
                title: o.title, 
                link: weixinShareUrl,
                imgUrl: o.imgUrl, 
                success: function() {
                    // 用户确认分享后执行的回调函数
                    if (o.success && typeof o.success == 'function') {
                        o.success();
                    }
                }
            });
            // 分享给朋友
            iceflowerWX.onMenuShareAppMessage({
                title: o.title, 
                desc: o.desc,
                link: weixinShareUrl, 
                imgUrl: o.imgUrl, 
                success: function() {
                    // 用户确认分享后执行的回调函数
                    if (o.success && typeof o.success == 'function') {
                        o.success();
                    }
                    
                }
            });

            //暴露一个分享成功的全局变量
            window.iceflowerWXShare = true;

        });
        iceflowerWX.error(function() {
            window.localStorage.removeItem("WXTicket");
            console.log('分享错误啦');
            setTimeout(function() {
                wxShare(o);
            }, 5000)
        });
    }


    //单页面二次分享设置不请求后台获取jsapi_ticket
    if(window.iceflowerWXShare) {
        sharefn(WXTicket, WXAppId);
        return;
    }



    //第一次异步请求获取jsapi_ticket
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var resp = request.responseText;
                var data = JSON.parse(resp);
                WXTicket = data.dataJson.jsApiTicket;
                WXAppId  = data.dataJson.appId;
                window.localStorage.setItem("WXTicket", WXTicket);
                window.localStorage.setItem("WXAppId", WXTicket);
                sharefn(WXTicket, WXAppId);
            } else {
                // 服务器获取 jsapi_ticket 错误
                console.log('服务器获取 jsapi_ticket 错误');
            }
        }

    };

    //服务器获取 jsapi_ticket 的url
    request.open('post', "https://h5.rundejy.com/wechat/getJsApiTicket", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //send的格式是字符串 name=123&lala=2900
    request.send("activityId=" + o.activityId);

}


module.exports = wxShare;