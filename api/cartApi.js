import {request}  from './request.js'

// 获取进货单列表
const getCartOrderList = data => {
  return request({
    url: '/api/ws/cart/cart/index',
    data,
  })
}

// 选中sku
const getCartCheck = data => {
  return request({
    url: '/api/ws/cart/cart/check',
    data,
    type: 'form'
  })
}
// 取消选中sku
const getCartUncheck = data => {
  return request({
    url: '/api/ws/cart/cart/unCheck',
    data,
    type: 'form'
  })
}

// 取消选中sku
const getCartChangeNum = data => {
  return request({
    url: '/api/ws/cart/cart/changeNum',
    data,
    type: 'form'
  })
}

// 从购物车中移除
const getCartRemove = data => {
  return request({
    url: '/api/ws/cart/cart/remove',
    data,
    type: 'form'
  })
}

// 从购物车中移除
const getAddressDefAddress = data => {
  return request({
    url: '/api/upms/address/getDefAddress',
    method: 'post',
    type: 'form'
  })
}

// 进货单结算
const getOrderCart = data => {
  return request({
    url: '/api/ws/order/order/calcOrderCart',
    data,
    method: 'post',
  })
}

// 提交订单
const postCreateOrder = data => {
  return request({
    url: '/api/ws/order/order/createOrder',
    data,
    method: 'post',
  })
}


export {	
  postCreateOrder,
  getOrderCart,
  getAddressDefAddress,
  getCartRemove,
  getCartChangeNum,
  getCartCheck,
  getCartUncheck,
  getCartOrderList
}
