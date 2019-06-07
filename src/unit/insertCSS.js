/**
 * 动态添加css代码到样式表
 */
var insertCSS = function (rule) {
    try {
        document.styleSheets[0].insertRule(rule, 0);
    }
    catch (ex) {
        var style = document.createElement("style");
        style.innerHTML = rule;
        document.head.appendChild(style);
    }
    return;
}

module.exports = insertCSS;