/**
 * 判断号码是否正确正则表达
 * 对返回1
 * 错返回0
 * 规则第一位是1，后10位是数字即可
 * 支持港澳台电话规则 8开头 10位或11位
*/
var checkMobile = function(s) {      
    if (/[1]\d{10}$/.test(s) || /[8]\d{9,10}$/.test(s)) {        
        return 1;
    } else {         
        return 0;
    }  
}


module.exports = checkMobile;