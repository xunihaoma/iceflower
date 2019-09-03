/**
 * 弹出一个loading
 * @Params is a Object 
 * {
 *     text: '提示文字',
 *     color: 默认白色，你可以传入任意的颜色
 *     zIndex: 默认3100，当你需要更高的时候可以调高一点 number,
 *     type: 'white'  //白色背景的loading,  'none' //隐形的遮盖层什么都没有
 *     size: 'little' 
 * }
*/

var insertCSS = require('../unit/insertCSS.js');
var addStyle = require('../unit/addStyle.js');

var loading = function (o) {
    if (!o) { var o = {}; }

    //添加一个@keyFrames
    insertCSS('@keyframes iceflower-donut-spin { 0% {transform:totate(0deg);} 100% {transform: rotate(360deg);} }');

    var divWarp = document.createElement('div');
    divWarp.setAttribute('class', 'iceflower-loading29');

    var bgWrapColor = (function() {
        if(o.type == 'white') {
            return 'rgba(255,255,255,0.9)';
        }else if(o.size == 'little') {
            return 'rgba(255,255,255,0)';
        }else {
            return 'rgba(0,0,0,0.6)';
        }
    })();

    addStyle(divWarp, {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: Number(o.zIndex) || 3100,
        background: bgWrapColor
    });
    document.body.appendChild(divWarp);

    if(o.type === 'none') {
        divWarp.style.background = 'transparent';
        return;
    }

    var loadingDiv = document.createElement('div');
    addStyle(loadingDiv, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: o.size == 'little'? '20px 30px': '0',
        background:  o.size == 'little'? 'rgba(0,0,0,0.6)': 'transparent',
        borderRadius: o.size == 'little'? '7px': 'none',
    });
    divWarp.appendChild(loadingDiv);

    var loading = document.createElement('div');

    var borderLeftColor = (function() {
        if(o.color) {
            return o.color;
        }else if(o.type == 'white') {
            return '#767676';
        }else {
            return 'white';
        }
    })()

    addStyle(loading, {
        position: 'relative',
        zIndex: 31,
        display: 'block',
        border: o.type == 'white'? '3px solid rgba(0, 0, 0, 0.1)':'3px solid rgba(255, 255, 255, 0.3)',
        borderLeftColor: borderLeftColor,
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        margin: '0 auto',
        animation: 'iceflower-donut-spin 0.6s linear infinite'
    });
    loadingDiv.appendChild(loading);

    if(o.text) {
        var p = document.createElement('p');
        addStyle(p, {
            fontSize: '14px',
            color: o.color || 'white',
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '0'
        });
        p.innerHTML = o.text || '';
        loadingDiv.appendChild(p);
    }
}



module.exports = loading;