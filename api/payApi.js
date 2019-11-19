import {request}  from './request.js'

// 支付宝wap网页支付
const payAlipayByWap = data => {
  return request({
    url: '/api/order/order/pay',
    method: 'post',
    data,
    type: 'form'
  })
}


// 微信支付
const payWXpayByWap = data => {
  return request({
    url: '/api/pay/wx/tradeCrate',
    method: 'post',
    data,
  })
}
//
const fundRecordList = data => {
  return request({
    url: '/api/pay/fundRecord/pageMyList',
    data,
	type: 'form'
  })
}

// 我的账单详情
const fundRecordDetail = data => {
	return request({
		url: '/api/pay/fundRecord/detail',
		data,
		type: 'form',
	})
}
// 获取用户银行卡列表
const getBankList = data => {
	return request({
		url: '/api/pay/bank/listPage',
		data,
		type: 'form',
	})
}

// 获取用户银行卡列表
const getBankInsert = data => {
	return request({
		method: 'post',
		url: '/api/pay/bank/insert',
		data,
		type: 'form',
	})
}

// 修改支付密码
const setBankmodifyPwd = data => {
	return request({
		method: 'post',
		url: '/api/pay/accountSub/modifyPwd',
		data,
		type: 'form',
	})
}

// 设置支付密码
const setBanksetNewPwd = data => {
	return request({
		method: 'post',
		url: '/api/pay/accountSub/setNewPwd',
		data,
		type: 'form',
	})
}

// 验证银行卡
const validCard = data => {
	return request({
		method: 'post',
		url: '/api/pay/bank/validCard',
		data,
		type: 'form',
	})
}

// 获取我的账户资金
const accountSub = data => {
	return request({
		method: 'post',
		url: '/api/pay/accountSub/getFund',
		data,
		type: 'form',
	})
}



export {
	accountSub,
	validCard,
	setBanksetNewPwd,
	setBankmodifyPwd,
	getBankInsert,
	getBankList,
	fundRecordDetail,
  fundRecordList,
  payAlipayByWap,
  payWXpayByWap
}
