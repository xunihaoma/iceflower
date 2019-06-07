/**
 * 获取url?name= 123的值
 * iceflower.urlQuery('name')
*/
var urlQuery = function (sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

module.exports = urlQuery;