/**
 * 是时候要自己写轮播图了
 * 
*/
var insertCSS = require('../unit/insertCSS.js');
var addStyle = require('../unit/addStyle.js');

var carousel = function(o) {
    if (!o) {
        throw '亲爱的朋友，请传入一个对象作为参数';
    }
    var warp = document.querySelector(o.el);
    var items = new Array();
    items = document.querySelectorAll(o.items);
    
    var height = 'auto';
    if(o.height) {
        height = o.height;
    }

    //外框css
    addStyle(warp, {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: height
    });

    //每个轮播
    insertCSS(o.items + ' { height: ' + height + ' }');
    insertCSS(o.items + ' { width: 100%;  position: absolute; top: 0; left: 0; overflow: hidden; display: none;}');
    //轮播里的图片
    insertCSS(o.items + ' img { width:100%; height: auto;}');
    //动画
    insertCSS( '@keyframes iceflower-carousel__show_animation { 0% {transform:scaleX(1.1);} 100% {transform:scaleX(1);} }' );
    insertCSS('.iceflower-carousel__show {display: block !important; animation: iceflower-carousel__show_animation 0.2s ease-out; }');

    //顺序提示 ul
    var ul = document.createElement('ul');
    var liList = [];

    for(var i = 0; i< items.length; i++) {
        var li = document.createElement('li');
        addStyle(li, {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            margin: '0 5px',
            display: 'inline-block',
            cursor: 'pointer'
        });
        ul.appendChild(li);
        liList.push(li);
    }

    addStyle(ul, {
        position: 'absolute',
        left: '50%',
        bottom: '20px',
        transform: 'translateX(-50%)',
        zIndex: 31
    })
    warp.appendChild(ul);

    //定时器
    var changeItemId;
    var itemIndex = 0;


    // -1 上一张 0不变 1 下一张
    var changeItem = function(num) { 
        liList.forEach(function(x) { addStyle(x, {width: '12px', borderRadius: '50%'}); });
        for(var i = 0; i< items.length; i++) {
            items[i].classList.remove('iceflower-carousel__show');
        } 
        itemIndex = itemIndex + num;
        if(num == -1) {
            (itemIndex < 0) ? itemIndex = items.length -1 : '';
        }else if(num == 1) {
            (itemIndex >= items.length) ? itemIndex = 0 : '';
        }else {
            // 不改变
        } 
        addStyle(liList[itemIndex], { width: '30px', borderRadius: '6px' });
        items[itemIndex].classList.add('iceflower-carousel__show');
    }

    changeItem(0);

    changeItemId = setInterval(function() {
        changeItem(1);
    }, 5000);


    //顺序提示监听
    liList.forEach(function(single, index) {
        single.addEventListener('click', function() {
            itemIndex = index;
            changeItem(0);
        });
    });


    //左按钮
    var spanLeft = document.createElement('span');
    addStyle(spanLeft, {
        display: 'none',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.1)',
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 29,
        cursor: 'pointer'
    });
    insertCSS('.iceflower-carousel__left_span::before { content: " "; display: block; width: 12px; height: 2px; background: rgba(255,255,255,0.9); transform: rotate(-45deg); position: absolute; left: 10px; top: 12px; z-index: 31;}');
    insertCSS('.iceflower-carousel__left_span::after  { content: " "; display: block; width: 12px; height: 2px; background: rgba(255,255,255,0.9); transform: rotate(45deg); position: absolute; left: 10px; top: 20px; z-index: 31;}');
    insertCSS('.iceflower-carousel__left_span:hover { background: rgba(0,0,0,0.4) !important;}')
    spanLeft.setAttribute('class', 'iceflower-carousel__left_span');
    warp.appendChild(spanLeft);

    spanLeft.addEventListener('click', function() {
        changeItem(-1);
    });


    //右按钮
    var spanRight = document.createElement('span');
    addStyle(spanRight, {
        display: 'none',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.2)',
        position: 'absolute', 
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 29,
        cursor: 'pointer'
    });
    insertCSS('.iceflower-carousel__right_span::before { content: " "; display: block; width: 12px; height: 2px; background: rgba(255,255,255,0.9); transform: rotate(45deg); position: absolute; right: 10px; top: 12px; z-index: 31;}');
    insertCSS('.iceflower-carousel__right_span::after  { content: " "; display: block; width: 12px; height: 2px; background: rgba(255,255,255,0.9); transform: rotate(-45deg); position: absolute; right: 10px; top: 20px; z-index: 31;}');
    insertCSS('.iceflower-carousel__right_span:hover { background: rgba(0,0,0,0.4) !important;}')
    spanRight.setAttribute('class', 'iceflower-carousel__right_span');
    warp.appendChild(spanRight);

    spanRight.addEventListener('click', function() {
        changeItem(1);
    });


    warp.addEventListener('mouseenter', function() {
        clearInterval(changeItemId);
        spanLeft.style.display = 'block';
        spanRight.style.display = 'block';
    });
    warp.addEventListener('mouseleave', function() {
        changeItemId = setInterval(function() {
            changeItem(1);
        }, 5000);
        spanLeft.style.display = 'none';
        spanRight.style.display = 'none';
    });
}


module.exports = carousel;