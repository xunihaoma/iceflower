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
var toast = require('./ui/toast.js');
// var carousel = require('./ui/carousel.js');
var loading = require('./ui/loading.js');
var closeLoading = require('./ui/closeLoading.js');
var scrollView = require('./ui/scrollView.js');

//WeChat
var getWechatAuthUrl = require('./wechat/getWechatAuthUrl.js');
var wxShare = require('./wechat/wxShare.js');
var miniOpen = require('./wechat/miniOpen.js');
var miniComp = require('./wechat/miniComp.js');
var appOpen = require('./wechat/appOpen.js');

window.iceflower = new Object();





//iceflower
iceflower.checkMobile = checkMobile;
iceflower.checkBrowser = checkBrowser;
iceflower.urlQuery = urlQuery;
iceflower.insertCSS = insertCSS;
iceflower.addStyle = addStyle;
iceflower.getRandomNum = getRandomNum;
iceflower.alert = alert;
iceflower.toast = toast;
// iceflower.carousel = carousel;
iceflower.loading = loading;
iceflower.closeLoading = closeLoading;
iceflower.scrollView = scrollView;
iceflower.getWechatAuthUrl = getWechatAuthUrl;
iceflower.wxShare = wxShare;
iceflower.miniOpen = miniOpen;
iceflower.miniComp = miniComp;
iceflower.appOpen = appOpen;
