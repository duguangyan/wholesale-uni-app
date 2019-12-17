import {request}  from './request.js'

// 支付宝wap网页支付
const payAlipayByWap = data => {
	let url = '/api/ws/order/order/pay';
	// #ifdef H5 
		url = '/api/ws/order/order/pay';  
	// #endif
  return request({
    url: url,
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
		url: '/api/pay/bank/getListBySubAccountId',
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

// 验证银行卡修改
const bankCardCertification = data => {
	return request({
		url: '/api/pay/bank/bankCardCertification',
		data,
		type: 'form',
	})
}

// 获取我的账户资金
const accountSub = data => {
	return request({
		url: '/api/pay/accountSub/getFund',
		data,
		type: 'form',
	})
}

// 解绑银行卡
const deleteBank = data => {
	return request({
		url: '/api/pay/bank/delete',
		data,
		type: 'form',
	})
}

// 验证支付密码
const validPayPwd = data => {
	return request({
		method: 'post',
		url: '/api/pay/accountSub/validPayPwd',
		data,
		type: 'form',
	})
}

// 提现
const postPayApply = data => {
	return request({
		method: 'post',
		url: '/api/pay/draw/apply',
		data,
		type: 'form',
	})
}

// 发送验证码
const postAccountSubSendSms = data => {
	return request({
		method: 'post',
		url: '/api/pay/accountSub/sendSms',
		data,
		type: 'form',
	})
}

// 企业银行卡新增数据
const enterpriseInsert = data => {
	return request({
		method: 'post',
		url: '/api/pay/bank/enterpriseInsert',
		data,
		type: 'form',
	})
}

// 企业银行卡更新
const enterpriseUpdate = data => {
	return request({
		method: 'post',
		url: '/api/pay/bank/enterpriseUpdate',
		data,
		type: 'form',
	})
}

// 用户认证企业公账银行卡
const enterpriseAuditCheckUp = data => {
	return request({
		method: 'post',
		url: '/api/pay/bank/enterpriseAuditCheckUp',
		data,
		type: 'form',
	})
}

export {
	enterpriseAuditCheckUp,
	enterpriseUpdate,
	enterpriseInsert,
	postAccountSubSendSms,
	bankCardCertification,
	postPayApply,
	validPayPwd,
	deleteBank,
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
