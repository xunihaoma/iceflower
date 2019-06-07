//VERIFICATION
var checkMobile = require('./verification/checkMobile.js');
var checkBrowser = require('./verification/checkBrowser.js');
//UNIT
var urlQuery = require('./unit/urlQuery.js');
var insertCSS = require('./unit/insertCSS.js');
var addStyle = require('./unit/addStyle.js');
var getRandomNum = require('./unit/getRandomNum.js');
//UI
var alert = require('./ui/alert.js');
// var carousel = require('./ui/carousel.js');
var loading = require('./ui/loading.js');
var closeLoading = require('./ui/closeLoading.js');
//WeChat
var getWechatAuthUrl = require('./wechat/getWechatAuthUrl.js');
var wxShare = require('./wechat/wxShare.js');

window.iceflower = new Object();





//iceflower
iceflower.checkMobile = checkMobile;
iceflower.checkBrowser = checkBrowser;
iceflower.urlQuery = urlQuery;
iceflower.insertCSS = insertCSS;
iceflower.addStyle = addStyle;
iceflower.getRandomNum = getRandomNum;
iceflower.alert = alert;
// iceflower.carousel = carousel;
iceflower.loading = loading;
iceflower.closeLoading = closeLoading;
iceflower.getWechatAuthUrl = getWechatAuthUrl;
iceflower.wxShare = wxShare;
