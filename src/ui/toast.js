/**
 * 弹出一个toast
 * 默认2秒自动消失，点击也会消失
 * @Params is a Object 
 * {
 *     text: '提示文字', 可插入html字符串，例如<br>自主控制换行
 *     bgColor: 默认白色，你可以传入任意的颜色
 *     zIndex: 默认3100，当你需要更高的时候可以调高一点 number,
 *     vanish: 默认2000毫秒消失
 * }
*/

var insertCSS = require('../unit/insertCSS.js');
var addStyle = require('../unit/addStyle.js');

var toast = function (o) {
    if (!o) { var o = {}; }

    //添加一个@keyFrames
    insertCSS('@keyframes iceflower-toast { 0% {transform:totate(0deg);} 100% {transform: rotate(360deg);} }');

    var divWarp = document.createElement('div');
    addStyle(divWarp, {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: Number(o.zIndex) || 3100,
        background: 'transparent'
    });
    document.body.appendChild(divWarp);

    var toastDiv = document.createElement('div');
    addStyle(toastDiv, {
        background: 'transparent',
        color: 'white',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
        left: '50%',
        top: '50%',
        width: '80vw',
        textAlign: 'center'
    });
    divWarp.appendChild(toastDiv);

    var p = document.createElement('p');
    addStyle(p, {
        color: 'white',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '15px',
        letterSpacing: '1px',
        maxWidth: '100%',
        background: o.bgColor || 'rgba(0,0,0,0.7)',
        margin: '0',
        padding: '10px 15px',
        borderRadius: '5px'
    });
    p.innerHTML = o.text || '😄提交成功';
    toastDiv.appendChild(p);




    //点击toast也会消失
    divWarp.addEventListener('click', function() {
        divWarp.remove();
    });


    var vanishTime = o.vanish || 2000;
    setTimeout(function() {
        divWarp.remove();
    }, vanishTime);

}



module.exports = toast;