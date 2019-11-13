import {request}  from './request.js'
const getList = data => {
  return request({
    url: '/api/goods/goods/sellGoods',
    method: 'post',
    data,
    isIndicator: true
  })
}

const getDetail = data => {
  return request({
    url: '/api/goods/goods/goodsDetail/' + data.shopId + '/' + data.goodsId,
    // data,
    isIndicator: true
  })
}
const setCollect = data => {
  return request({
    url: '/api/cart/collect/goods/add',
    data,
    method: 'post',
    type: 'form'
  })
}

const removeCollect = data => {
  return request({
    url: '/api/cart/collect/goods/remove',
    data
  })
}

const addToCart = data => {
  return request({
    url: '/api/cart/cart/addItem',
    data
  })
}

const getGoodNums = data => {
  return request({
    url: '/api/cart/cart/getOptInfo',
    data
  })
}

const buyGood = data => {
  return request({
    url: '/api/order/order/calcOrderNow',
    method: 'post',
    // type: 'form',
    data
  })
}

const getFreightPrompt = data => {
  return request({
    url: '/api/goods/postSolution/selectSolution',
    method: 'post',
    type: 'form',
    data
  })
}

const getPostItem = data => {
  return request({
    url: '/api/goods/postSolution/getById',
    method: 'get',
    data
  })
}
// 判断是否备收藏
const getHasCollect = data => {
  return request({
    url: '/api/cart/collect/hasCollect',
    data,
    type: 'form'
  })
}

// 判断是否备收藏
const getCategoryTreeNode = data => {
  return request({
    url: '/api/goods/category/getCategoryTreeNode',
    data,
    type: 'form'
  })
}

export {
	getCategoryTreeNode,
	getHasCollect,
  getList,
  getDetail,
  setCollect,
  removeCollect,
  addToCart,
  getGoodNums,
  buyGood,
  getFreightPrompt,
  getPostItem
}
