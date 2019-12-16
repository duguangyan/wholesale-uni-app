import {
	request
} from './request.js'
const getList = data => {
  return request({
    url: '/api/ws/search/goods/search',
    method: 'post',
    data,
    isIndicator: true 
  })
}

const getDetail = data => {
	return request({
		url: '/api/ws/goods/goods/goodsDetail/' + data.shopId + '/' + data.goodsId,
		// data,
		isIndicator: true
	})
}
const setCollect = data => {
	return request({
		url: '/api/ws/cart/collect/goods/add',
		data,
		method: 'post',
		type: 'form'
	})
}

const removeCollect = data => {
	return request({
		url: '/api/ws/cart/collect/goods/remove',
		data
	})
}

const addToCart = data => {
	return request({
		url: '/api/ws/cart/cart/addItem',
		data
	})
}

const getGoodNums = data => {
	return request({
		url: '/api/ws/cart/cart/getOptInfo',
		data
	})
}

const buyGood = data => {
	return request({
		url: '/api/ws/order/order/calcOrderNow',
		method: 'post',
		// type: 'form',
		data
	})
}

const getFreightPrompt = data => {
	return request({
		url: '/api/ws/goods/postSolution/selectSolution',
		method: 'post',
		type: 'form',
		data
	})
}

const getPostItem = data => {
	return request({
		url: '/api/ws/goods/postSolution/getById',
		method: 'get',
		data
	})
}
// 判断是否备收藏
const getHasCollect = data => {
	return request({
		url: '/api/ws/cart/collect/hasCollect',
		data,
		type: 'form'
	})
}

// 根据店铺shopId获取商品分类
const getCategoryTreeNode = data => {
	return request({
		url: '/api/ws/goods/category/getCategoryTreeNode',
		data,
		type: 'form'
	})
}

// 获取商品分类
const selectCategoryTreeNode = data => {
	return request({
		url: '/api/ws/goods/category/selectCategoryTreeNode',
		data,
		type: 'form'
	})
}

// 根据商品分类ID获取分类属性
const getByCategoryId = data => {
	return request({
		url: '/api/ws/goods/categoryAttr/getByCategoryId',
		data,
		type: 'form'
	})
}

// 获取分类
const getCategoryUnitList = data => {
	return request({
		url: '/api/ws/goods/categoryUnit/getCategoryUnitList',
		data,
		type: 'form'
	})
}

// 发布商品
const postSaveGoods = data => {
	return request({
		method: 'post',
		url: '/api/ws/goods/goods/saveGoods',
		data,
		// type: 'form'
	})
}

// 编辑
const postEditGoods = data => {
	return request({
		method: 'post',
		url: '/api/ws/goods/goods/editGoods',
		data,
		// type: 'form'
	})
}


// B2B获取商品详情
const getGoodsDetail = data => {
	return request({
		url: '/api/ws/goods/goods/goodsDetail/' + data.shopId + '/' + data.goodsId,
		// data,
		// type: 'form'
	})
}

// B2B商品列表 APP-我的货品
const getPageGoods = data => {
	return request({
		url: '/api/ws/goods/goods/myPageGoods',
		data,
		type: 'form'
	})
}

// B2B商品搜索
const getPageGoodsSearch = data => {
	return request({
		method: 'post',
		url: '/api/ws/search/goods/search',
		data,
		// type: 'form'
	})
}

// 统计APP-我的货品商品
const statisticsGoods = data => {
	return request({
		url: '/api/ws/goods/goods/statisticsGoods',
		data,
		type: 'form'
	})
}

// 统计APP-我的货品商品
const handlerGoods = data => {
	return request({
		method: 'post',
		url: '/api/ws/goods/goods/handlerGoods',
		data,
		// type: 'form'
	})
}

// APP-首页分类查找
const mainSelectCategory = data => {
	return request({
		url: '/api/ws/goods/category/selectCategory',
		data,
		// type: 'form'
	})
}


const getMaster = data => {
  return request({
  	url: '/api/ws/goods/userRealInfo/fromIdGetShopUserInfo',
  	data
  })
}

// 根据角色获取代办人列表
const getAgencyByRole = data=>{
  return request({
  	url: '/api/ws/goods/userRealInfo/fromIdGetAgentUserInfo',
  	data
  })
}

// 根据区域获取代办人类表
const getAgencyByArea = data => {
  return request({
  	url: '/api/ws/goods/agentArea/fromIdGetAgent',
  	data
  })
}

// 店铺信息
const getShopInfo = data => {
  return request({
  	url: '/api/ws/goods/shop/ShopInfoById',
  	data
  })
}




export {
	mainSelectCategory,
	postEditGoods,
	handlerGoods,
	statisticsGoods,
	getPageGoodsSearch,
	getPageGoods,
	getGoodsDetail,
	postSaveGoods,
	getCategoryUnitList,
	getByCategoryId,
	selectCategoryTreeNode,
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
	getPostItem,
  getAgencyByArea,
  getShopInfo,
  getMaster
}
