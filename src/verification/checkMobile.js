/**
 * 判断号码是否正确正则表达
 * 对返回1
 * 错返回0
 * 规则第一位是1，后10位是数字即可
*/
var checkMobile = function(s) {      
    var length = s.length;      
    if (length == 11 && /[1]\d{10}/.test(s)) {        
        return 1;
    } else {         
        return 0;
    }  
}


module.exports = checkMobile;