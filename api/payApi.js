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



export {
  payAlipayByWap,
  payWXpayByWap
}
