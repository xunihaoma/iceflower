var iceAlert = require('../ui/alert.js');
var appOpen = function(Vue, object) {
    if (!object) {
        var object = {};
    }

    if(object.appid == undefined) throw '请传入参数 appid';
    if(object.extinfo == undefined) object.extinfo = 'iceflower';
    if(object.errorCallBack == undefined) object.errorCallBack = function() { return 0; };

    Vue.directive('app-open', {
        inserted: function(el) {
            var isWechat = navigator.userAgent.match(/MicroMessenger/i) == 'MicroMessenger' ? true : false;
            if(!isWechat) {
                el.addEventListener('click', function() {
                    iceAlert({text: '请在微信中打开该链接', colorType: 'danger'});
                })
                return;
            }
            var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
            var wechatVersion = wechatInfo[1].split('.');
            if( Number(wechatVersion[0]) * 100000 + Number(wechatVersion[1]) * 1000 + Number(wechatVersion[2]) < 700012 ) {
                el.addEventListener('click', function() {
                    iceAlert({text: '当前微信版本低于7.0.12 无法唤起APP', colorType: 'danger'});
                })
                return;
            }

            if(!el.style.position) {
                el.style.position = 'relative';
            }

            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = '0';
            div.style.bottom = '0';
            div.style.left = '0';
            div.style.right = '0';
            div.style.zIndex = '1600';
            div.style.overflow = 'hidden';
            div.style.background = 'transparent';
            div.innerHTML = `
                <wx-open-launch-app appid="${object.appid}" extinfo="${object.extinfo}" id="iceflowerOpenApp29">
                    <template>
                        <div style="background: transparent; padding:5000px"></div> 
                    </template>
                </wx-open-launch-app>
            `;
            el.appendChild(div);

            var openAppBtn = document.getElementById('iceflowerOpenApp29');

            openAppBtn.addEventListener('launch', function(e) {
                console.log('成功唤起app啦');
            });

            openAppBtn.addEventListener('error', function(e) {
                object.errorCallBack(e.detail);
            })
        }
    })
}



module.exports = appOpen;