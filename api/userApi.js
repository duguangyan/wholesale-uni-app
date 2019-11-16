import {
	request
} from './request.js'


// 用户登录
const postUserLogin = data => {
	return request({
		url: '/api/oauth/oauth/token',
		method: 'post',
		data,
		type: 'form'
	})
}

// 用户获取验证码
const postUserSms = data => {
	return request({
		url: '/api/oauth/validate/code/sms',
		data,
		method: 'post',
		type: 'form'
	})
}

// 获取用户信息
const getUserInfoData = data => {
	return request({
		url: '/api/upms/user/getUserInfo',
		data
	})
}

// 跟新用户头像
const postUserHeadImg = data => {
	return request({
		url: '/api/upms/userImg/upload',
		data,
		method: 'post',
		type: 'form'
	})
}

// 根据ID获取父级地址
const getUserAddressList = data => {
	return request({
		url: '/api/upms/address/getUserAddressList',
		data
	})
}

// 获取用户地址列表
const getChildrenByPId = data => {
	return request({
		url: '/api/upms/area/getChildrenByPId',
		data,
		type: 'form'
	})
}

// 保存用户收货地址
const postUserAddressInsert = data => {
	return request({
		url: '/api/upms/address/insert',
		data,
		method: 'post',
		type: 'form'
	})
}

// 根据ID获取地区地址
const getAddressById = data => {
	return request({
		url: '/api/upms/address/getById',
		data,
		type: 'form'
	})
}

// 根据ID更新地址
const postAddressUpdate = data => {
	return request({
		url: '/api/upms/address/update',
		data,
		method: 'post',
		type: 'form'
	})
}

// 删除地址
const postAddressDelete = data => {
	return request({
		url: '/api/upms/address/delete',
		data,
		method: 'post',
		type: 'form'
	})
}

// 更新昵称
const postUpdateNickname = data => {
	return request({
		url: '/api/upms/user/updateInfo',
		data,
		method: 'post',
		type: 'form'
	})
}

// 获取用户商品收藏商品
const getCollectGoodsList = data => {
	return request({
		url: '/api/cart/collect/goods/list',
		data,
		type: 'form'
	})
}


// 订单列表
const getOrderPageMyOrder = data => {
	return request({
		url: '/api/order/order/pageMyOrder',
		data,
		type: 'form'
	})
}

// 上传图片
const postUserImgUpload = data => {
	return request({
		url: '/api/upms/userImg/upload',
		data,
		method: 'post',
		type: 'file'
	})
}

// 用户订单详情
const getOrderDetailById = data => {
	return request({
		url: '/api/order/order/myOrderInfo',
		data,
		type: 'form'
	})
}

// 取消订单
const postOrderCancel = data => {
	return request({
		url: '/api/order/order/cancel',
		data,
		method: 'post',
		type: 'form'
	})
}

// 确认收货
const postOrderConfirm = data => {
	return request({
		url: '/api/order/order/confirm',
		data,
		method: 'post',
		type: 'form'
	})
}

// 查看物流信息
const postOrderLogisticsQuery = data => {
	return request({
		url: '/api/order/order/logisticsQuery',
		data,
		type: 'form'
	})
}

// 移除收藏商品ids
const getCollectGoodsRemove = data => {
	return request({
		url: '/api/cart/collect/goods/remove',
		data,
		type: 'form'
	})
}

// 根据ID查询广告位
const getAdPositioneById = data => {
	return request({
		url: '/api/act/adPosition/getById',
		data,
		type: 'form'
	})
}

// 严选好物
const getPageLayout = data => {
	return request({
		url: '/api/act/pageLayout/getListByParentId',
		data,
		type: 'form'
	})
}


// formId 提交
const getSetFormId = data => {
	return request({
		url: '/api/wechat/accessInterface/setFormId',
		data,
		type: 'form',
		method: 'post',
	})
}

// 微信登录
const weixinLogin = data => {
	return request({
		url: '/api/oauth/socialLogin/weixin',
		data,
		type: 'form',
		method: 'post',
	})
}

// 获取openid
const openIdByCode = data => {
	return request({
		url: '/api/oauth/userConnection/openIdByCode',
		data,
		type: 'form',
	})
}

// 获取版本号判断是否更新
const appUpdate = data => {
	return request({
		url: '/api/upms/appUpdate/getByCode',
		data,
		type: 'form',
	})
}


// 根据用户ID获取用户状态信息
const getUserRealInfo = data => {
	return request({
		url: '/api/goods/userRealInfo/getUserRoleAndUserRealInfo',
		data,
		type: 'form',
	})
}


// 用户实名认证
const getUserRealInfoSettledIn = data => {
	return request({
		method: 'post',
		url: '/api/goods/userRealInfo/settledIn',
		data,
		type: 'form',
	})
}
// 或许用户认证信息
const getByUserIdAndType = data => {
	return request({
		method: 'post',
		url: '/api/goods/apply/getByUserIdAndType',
		data,
		type: 'form',
	})
}

// 获取用户全部信息 实名 认证 
const getUserRealInfoAll = data => {
	return request({
		url: '/api/goods/userRealInfo/getUserInfo',
		data,
		type: 'form',
	})
}

// 获取用户全部信息 实名 认证 
const getShopIdByUser = data => {
	return request({
		url: '/api/goods/shop/getShop',
		data,
		type: 'form',
	})
}





export {
	getShopIdByUser,
	getUserRealInfoAll,
	getByUserIdAndType,
	getUserRealInfoSettledIn,
	getUserRealInfo,
	appUpdate,
	openIdByCode,
	weixinLogin,
	getSetFormId,
	getPageLayout,
	getAdPositioneById,
	getCollectGoodsRemove,
	postOrderLogisticsQuery,
	postOrderConfirm,
	postOrderCancel,
	getOrderDetailById,
	postUserImgUpload,
	getOrderPageMyOrder,
	getCollectGoodsList,
	postAddressDelete,
	postUpdateNickname,
	postAddressUpdate,
	getAddressById,
	postUserAddressInsert,
	getChildrenByPId,
	getUserAddressList,
	postUserHeadImg,
	postUserLogin,
	postUserSms,
	getUserInfoData
}
