/**
 * @param {string} str  判断是否是手机号
 * @returns {Boolean}
 */
let isPhone = function (phone) {
  return !(/^1[2345789]\d{9}$/.test(phone))
}
/**
 * @param {string} str  判断用户昵称为英文字母或者汉字，限4-30个字符
 * @returns {Boolean}
 */
let isNickName = function (nickName) {
  // 去掉前后空格
    let name = nickName.replace(/^\s+|\s+$/g,"")
    return name.length>=2 && name.length<21
}

/**
 * @param {string} str  判断详细地址为英文字母或者汉字，限5-120个字符
 * @returns {Boolean}
 */
let isAddressDetall = function (address) {
  return (/^[\u4e00-\u9fa5\w]{5,120}$/.test(address))
}

/**
 * @param {string} str  判断是否是正确的金额
 * @returns {Boolean}
 */
let isMoney = function (money) {
  return !(/^[0-9]*(\.[0-9]{1,2})?$/.test(money))
}

/**
 * @param {string} str  判断是否是大于0的数字
 * @returns {Boolean}
 */
let isNumber = function isInteger(obj) {
  let reg = /^[-+]?\d+$/;
  if (!reg.test(obj)) {
    return false;
  } else {
    return true;
  }
}

export default {
  isNumber,
  isMoney,
  isPhone,
  isNickName,
  isAddressDetall
}
