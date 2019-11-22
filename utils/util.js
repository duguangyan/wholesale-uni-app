// 验证身份证
function isCardNo(card) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(card) === false) {
		return false;
	} else {
		return true;
	}
}

// 获取当前时间
function getCurrentTime() {
	var keep = '';
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	var rand = Math.round(Math.random() * 899 + 100);
	keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
	return keep; //20160614134947
}

/**
 * @param {Object} input
 * 获取对象长度
 */
function objLength(input) {
	var type = toString(input);
	var length = 0;
	if (type != "[object Object]") {
		//throw "输入必须为对象{}！"
	} else {
		for (var key in input) {
			if (key != "number") {
				length++;
			}

		}
	}
	return length;
}

// 验证是否是手机号码
function vailPhone(number) {
	let flag = false;
	// let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	let myreg = /^1[3456789]\d{9}$/;
	if (number.length != 11) {
		flag = flag;
	} else if (!myreg.test(number)) {
		flag = flag;
	} else {
		flag = true;
	}
	return flag;
}

// 保留小数点后两位小数
function toDecimal2(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}

// 浮点型除法
function div(a, b) {
	var c, d, e = 0,
		f = 0;
	try {
		e = a.toString().split(".")[1].length;
	} catch (g) {}
	try {
		f = b.toString().split(".")[1].length;
	} catch (g) {}
	return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f -
		e));
}

// 浮点型加法函数
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return ((arg1 * m + arg2 * m) / m).toFixed(2);
}

// 浮点型乘法
function mul(a, b) {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch (f) {}
	try {
		c += e.split(".")[1].length;
	} catch (f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 遍历对象属性和值
function displayProp(obj) {
	var names = "";
	for (var name in obj) {
		names += name + obj[name];
	}
	return names;
}

// 去除字符串所有空格
function sTrim(text) {
	return text.replace(/\s/ig, '')
}

//去除所有:
function replaceMaohao(txt) {
	return txt.replace(/\:/ig, '')
}

// 转换星星分数
function convertStarArray(score) {
	//1 全星,0 空星,2半星
	var arr = []
	for (var i = 1; i <= 5; i++) {
		if (score >= i) {
			arr.push(1)
		} else if (score > i - 1 && score < i + 1) {
			arr.push(2)
		} else {
			arr.push(0)
		}
	}
	return arr
}

// 处理购物车数量输入
function dealCartNum(str) {
	let numStr = str.trim();
	numStr = numStr.replace(/\b(0+)/gi, "");
	if (numStr.length === 0) {
		return '1'
	} else if (numStr > 9999) {
		return '9999'
	} else {
		return numStr
	}

}

// 获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
	var date = new Date();
	var sign1 = "-";
	var sign2 = ":";
	var year = date.getFullYear() // 年
	var month = date.getMonth() + 1; // 月
	var day = date.getDate(); // 日
	var hour = date.getHours(); // 时
	var minutes = date.getMinutes(); // 分
	var seconds = date.getSeconds() //秒
	var weekArr = ['', '', '', '', '', '', ''];
	var week = weekArr[date.getDay()];
	// 给一位数数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
	return currentdate;
}
// 获取当前的日期时间前24小时 格式“yyyy-MM-dd HH:MM:SS”
function getNowFormatDateTo24() {
	var date = new Date();
	var sign1 = "-";
	var sign2 = ":";
	var year = date.getFullYear() // 年
	var month = date.getMonth() + 1; // 月
	var day = date.getDate() - 1; // 日
	var hour = date.getHours(); // 时
	var minutes = date.getMinutes(); // 分
	var seconds = date.getSeconds() //秒
	var weekArr = ['', '', '', '', '', '', ''];
	var week = weekArr[date.getDay()];
	// 给一位数数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
	return currentdate;
}


function extend(des, src, override) {
	if (src instanceof Array) {
		for (var i = 0, len = src.length; i < len; i++)
			extend(des, src[i], override);
	}
	for (var i in src) {
		if (override || !(i in des)) {
			des[i] = src[i];
		}
	}
	return des;
}

// 获取url参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}




function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace('/[^\d\.-]/g', "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
	var t = "";
	for (let i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}

function formatMoney(num) {
	return fmoney(num, 2)
}


// 验证金额 可验证大于等于零，小于等于99999999.99 的数字
function verificationAmount(num) {
	var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
	if (exp.test(num)) {
		return true;
	} else {
		return false;
	}
}

// 数字转换成金额
function isPriceNumber(_keyword) {
	if (_keyword == "0" || _keyword == "0." || _keyword == "0.0" || _keyword == "0.00") {
		_keyword = "0";
		return true;
	} else {
		var index = _keyword.indexOf("0");
		var length = _keyword.length;
		if (index == 0 && length > 1) { /*0开头的数字串*/
			var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
			if (!reg.test(_keyword)) {
				return false;
			} else {
				return true;
			}
		} else { /*非0开头的数字*/
			var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
			if (!reg.test(_keyword)) {
				return false;
			} else {
				return true;
			}
		}
		return false;
	}
}

// 时间戳转年月日时分秒
function timestampToTime(timestamp) {
	var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

	return Y + M + D + h + m + s;
	// console.log(strDate) //2019-08-01 09:55:26
}

// function MillisecondToDate(msd) {
//     var time = parseFloat(msd) / 1000;
//     if (null != time && "" != time) {
//         if (time > 60 && time < 60 * 60) {
//             time = parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
//                 parseInt(time / 60.0)) * 60) + "秒";
//         }
//         // else if (time >= 60 * 60 && time < 60 * 60 * 24) {
//         else if (time >= 60 * 60) {
//             time = parseInt(time / 3600.0) + "时" + parseInt((parseFloat(time / 3600.0) -
//                 parseInt(time / 3600.0)) * 60) + "分" +
//                 parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
//                 parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
//         }
//         else {
//             time = parseInt(time) + "秒";
//         }
//     }
//     return time;
// }

// 剩余天时分秒
function getLeftTime(endtime) {
	let nowtime = new Date().getTime();
	let lasttime = (endtime - nowtime) / 1000;
	if (lasttime > 0) {
		let lastdate = parseInt(lasttime / 3600 / 24);
		let lasthours = parseInt(lasttime / 3600 % 24);
		let lastminutes = parseInt(lasttime / 60 % 60);
		let lastseconds = parseInt(lasttime % 60);
		let strtime = lastdate + '' + '天' + '' + lasthours + '' + '时' + '' + lastminutes + '' + '分' + '' + lastseconds + '' +
			'秒';
		return strtime
	}
	return ''
}

// 时间戳转时分
function MillisecondToDate(msd) {
	var time = (parseFloat(msd) - Date.parse(new Date())) / 1000;
	if (null != time && "" != time) {
		if (time > 60 && time < 60 * 60) {
			time = parseInt(time / 60.0) + ":" + parseInt((parseFloat(time / 60.0) -
				parseInt(time / 60.0)) * 60) + " ";
		}
		// else if (time >= 60 * 60 && time < 60 * 60 * 24) {
		else if (time >= 60 * 60) {
			time = parseInt(time / 3600.0) + ":" + parseInt((parseFloat(time / 3600.0) -
					parseInt(time / 3600.0)) * 60) + ":" +
				parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
					parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + " ";
		} else {
			time = parseInt(time) + " ";
		}
	}
	return time;
}

// 获取日期
function doHandleDate() {
	var myDate = new Date();
	var tYear = myDate.getFullYear();
	var tMonth = myDate.getMonth();

	var m = tMonth + 1;
	if (m.toString().length == 1) {
		m = "0" + m;
	}
	return tYear + '-' + m;
}
// 获取年
function doHandleYear(tYear) {
	var myDate = new Date();
	var tYear = myDate.getFullYear();

	return tYear;
}
// 获取月
function doHandleMonth() {
	var myDate = new Date();
	var tMonth = myDate.getMonth();

	var m = tMonth + 1;
	if (m.toString().length == 1) {
		m = "0" + m;
	}
	return m;
}




/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html){
  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}
  


module.exports = {
	getNowFormatDateTo24,
	formatRichText,
	doHandleMonth,
	doHandleYear,
	doHandleDate,
	getLeftTime,
	MillisecondToDate,
	timestampToTime,
	isPriceNumber,
	verificationAmount,
	fmoney,
	formatMoney,
	getQueryString,
	isCardNo,
	extend,
	getNowFormatDate,
	getCurrentTime,
	objLength,
	displayProp,
	sTrim,
	replaceMaohao,
	vailPhone,
	toDecimal2,
	div,
	mul,
	accAdd,
	convertStarArray,
	dealCartNum,
}
