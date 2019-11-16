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
// 我的账单列表
const fundRecordList = data => {
  return request({
    url: '/api/pay/fundRecord/pageMyList',
    data,
	type: 'form'
  })
}


export {
  fundRecordList,
  payAlipayByWap,
  payWXpayByWap
}
