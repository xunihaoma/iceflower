/**
 * 弹窗
 * @Params 
 * {
 *      text: '提示文字',
 *      confirmBtnText: '按钮文字'
 *      cancelBtnText: '按钮文字'
 *      callback: 回调函数,
 *      width: 不传参的话，默认72vw,
 *      color: 默认蓝色，你可以传入任意的颜色
 *      zIndex: 默认3100，当你需要更高的时候可以调高一点, number
 *      type: 'ios' 或者不填，填了瞬间逼格高一倍
 *      colorType: 'danger', 'success', 'warning'， 文字控制常用的三种颜色
 *      cancel: false, true,
 *      cancelCallback: fn,
 *      close: false, true   //是否可以手动关闭
 * }
*/

var insertCSS = require('../unit/insertCSS.js');
var addStyle = require('../unit/addStyle.js');
var checkBrowser = require('../verification/checkBrowser.js');


var alert =  function (object) {
    var that = this;

    if (!object) {
        var object = {};
    }

    //颜色选项
    var color;
    switch(object.colorType) {
        case 'danger':
            color = '#f53333';
            break;
        case 'success':
            color = '#69f0ae';
            break; 
        case 'warning': 
            color = '#fe9e18';
            break; 
        default:
            color = '#1680fa';
            break;        
    }

    //弹窗样式类型
    var type;
    var typeBg;
    switch(object.type) {
        case 'ios':
            type = 'rgba(255,255,255,0.8)';
            typeBg = 'rgba(0,0,0,0.2)';
            document.body.classList.add('iceflower-love-to-blur');
            that.insertCSS( 'body.iceflower-love-to-blur > *:not(.i-love-filter){ -webkit-filter: blur(15px); filter: blur(15px);}');
            break;
        default:
            type = 'white';
            typeBg = 'rgba(0,0,0,0.5)';
            break;        
    }


    //添加一个@keyFrames
    insertCSS( '@keyframes iceflower-appear-from-bottom { 0% {transform:translate(-50%, -10%);opacity:1;} 100% {transform:translate(-50%, -50%);opacity:1;} }' );
    insertCSS( '@keyframes iceflower-alert-bg-appear { 0% {opacity:0;} 100% {opacity:1;} }' );


    var divWarp = document.createElement('div');
    addStyle(divWarp, {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: Number(object.zIndex) || 3100,
        boxSizing: 'border-box',
        background: typeBg,
        animation: 'iceflower-alert-bg-appear 0.15s ease-out',
    });
    divWarp.setAttribute('class', 'i-love-filter');
    document.body.appendChild(divWarp);

    var divAlert = document.createElement('div');
    addStyle(divAlert, {
        boxSizing: 'border-box',
        width: object.width || '300px',
        // background: 'white',
        background: type,
        borderRadius: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        animation: 'iceflower-appear-from-bottom 0.4s cubic-bezier(.11,.83,.39,.99)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    });
    //如果是移动端
    if(!checkBrowser()) {
        divAlert.style.width =  object.width || '72vw';
    }
    divWarp.appendChild(divAlert);

    var h3 = document.createElement('h3');
    addStyle(h3, {
        color: object.color || color,
        textAlign: 'center',
        margin: '0',
        paddingTop: '25px',
        fontWeight: '400',
        borderRadius: '10px 10px 0 0',
        fontSize: '16px'
    });
    h3.innerText = '提示';
    divAlert.appendChild(h3);

    var p_text = document.createElement('p');
    addStyle(p_text, {
        wordBreak: 'normal',
        wordWrap: 'break-word',
        color: '#373a3c',
        textAlign: 'center',
        padding: '20px',
        lineHeight: '25px',
        fontSize: '14px',
        margin: '0',
        borderBottom: '1px solid rgba(30,55,64,0.1)'
    });
    p_text.innerText = object.text ? object.text : '点击确定继续操作';
    divAlert.appendChild(p_text);

    var btn = document.createElement('button');
    addStyle(btn, {
        width: '100%',
        display: 'block',
        padding: '13px 0',
        textAlign: 'center',
        outline: 'none',
        border: 'none',
        borderRadius: '0 0 10px 10px',
        fontSize: '15px',
        color: object.color || color,
        cursor: 'pointer',
        background: 'transparent'
        
    });
    btn.innerText = object.confirmBtnText ? object.confirmBtnText : '确定';
    btn.addEventListener('click', function () {
        document.body.removeChild(divWarp);
        document.body.classList.remove('iceflower-love-to-blur');
        if (object.callback && typeof object.callback == 'function') {
            object.callback();
        }
    });


    if(object.cancel == true) {
        var btnWrap = document.createElement('div');

        var cancelBtn = document.createElement('button');
        addStyle(cancelBtn, {
            width: '50%',
            display: 'inline-block',
            padding: '13px 0',
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            borderRadius: '0 0 0 10px',
            fontSize: '15px',
            color: '#999',
            cursor: 'pointer',
            background: 'transparent'
        });
        cancelBtn.innerText = object.cancelBtnText ? object.cancelBtnText : '取消';
        cancelBtn.addEventListener('click', function () {
            document.body.removeChild(divWarp);
            document.body.classList.remove('iceflower-love-to-blur');
            if (object.cancelCallback && typeof object.cancelCallback == 'function') {
                object.cancelCallback();
            }
            
        });
        btn.style.display = 'inline-block';
        btn.style.width = '50%';
        btn.style.borderRadius = '0 0 10px 0';
        btn.style.borderLeft = '1px solid rgba(30,55,64,0.1)';
        btnWrap.appendChild(cancelBtn);
        btnWrap.appendChild(btn);
        divAlert.appendChild(btnWrap);

    }else {
        divAlert.appendChild(btn);
    }


    //关闭按钮
    if(object.close == true) {

        insertCSS( '.iceflower-alert-close-button::before { content: ""; height:1px;width:15px;background: #999;position:absolute;top: 8px;left:0;transform:rotate(45deg);}' );
        insertCSS( '.iceflower-alert-close-button::after { content: ""; height:1px;width:15px;background: #999;position:absolute;top: 8px;left:0;transform:rotate(-45deg);}' );
        var closeBtn = document.createElement('span');
        addStyle(closeBtn, {
            width: '15px',
            height: '15px',
            display: 'block',
            cursor: 'pointer',
            background: 'transparent',
            position: 'absolute',
            top: '10px',
            right: '10px' 
        });
        closeBtn.className = 'iceflower-alert-close-button';
        closeBtn.addEventListener('click', function () {
            document.body.removeChild(divWarp);
            document.body.classList.remove('iceflower-love-to-blur');   
        });
        divAlert.appendChild(closeBtn);
    }


}

module.exports = alert;