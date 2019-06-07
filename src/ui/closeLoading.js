/**
 * 关闭loading
*/
var closeLoading = function() {
    var loadingElements = document.querySelectorAll('.iceflower-loading29');
    for(var i = 0; i < loadingElements.length; i++) {
        document.body.removeChild(loadingElements[i]);
    }
}


module.exports = closeLoading;