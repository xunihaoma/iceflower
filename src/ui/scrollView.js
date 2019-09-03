/**
 * 在html里添加两个class样式
 * 
 * 
 */


var scrollView = function (classOne, classTwo) {

    var scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) };

    //判断一个元素在不在可视区中
    var isElementInViewport = function (el) {
        //支持传入jquery的dom对象
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0 && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
    }

    var elementsToShow = document.querySelectorAll(classOne);

    var loop = function() {
        for(var i = 0; i < elementsToShow.length; i++) {
            if (isElementInViewport(elementsToShow[i])) {
                elementsToShow[i].classList.add(classTwo.replace('.',''));
            } else {
                elementsToShow[i].classList.remove(classTwo.replace('.',''));
            }
        }

        scroll(loop);
    }


    loop();
}


module.exports = scrollView;