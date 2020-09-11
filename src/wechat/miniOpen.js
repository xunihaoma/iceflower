var iceAlert = require('../ui/alert.js');
var miniOpen = function(Vue, object) {
    if (!object) {
        var object = {};
    }

    if(object.username == undefined) throw '请传入参数 username';
    if(object.path == undefined) throw '请传入参数 path';

    Vue.directive('mini-open', {
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
                    iceAlert({text: '当前微信版本低于7.0.12 无法唤起小程序', colorType: 'danger'});
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
                <wx-open-launch-weapp username="${object.username}" path="${object.path}">
                    <template>
                        <div style="background: transparent; padding:5000px"></div> 
                    </template>
                </wx-open-launch-weapp>
            `;
            el.appendChild(div);

        }
    })
}



module.exports = miniOpen;