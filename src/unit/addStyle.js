/**
 * 快捷帮元素添加css样式
 * addStyle(el, {
 *     width: '100px',
 *     height: '200px'
 * })
 * 
*/
var addStyle = function (el, styleObject) {
    for (var prop in styleObject) {
        el.style[prop] = styleObject[prop];
    }
}


module.exports = addStyle;