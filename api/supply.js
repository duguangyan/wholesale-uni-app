import {
	request
} from './request.js'


// 后台-列表搜索 SupplyListRes
const supplyListApp = data => {
	return request({
		url: '/ws/goods/supply/supplyListApp'
		// method: 'post',
		// data,
		// type: 'form'
	})
}

// 保存用户定位信息
const userPositionAdd = data => {
	return request({
		url: '/upms/userPosition/add',
		method: 'post',
		data
		// type: 'form'
	})
}

// 根据地区获取用户身份信息 APP-附近的人  货主|代办
const getUserRealByArea = data => {
	return request({
		url: '/ws/goods/userRealInfo/getUserRealByArea',
		data,
		type: 'form'
	})
}

// 根据地区获取用户身份信息 APP-附近的人  采购商
const getUser4Area = data => {
	return request({
		url: '/upms/userPosition/getUser4Area',
		data,
		type: 'form'
	})
}


export {
	getUser4Area,
	getUserRealByArea,
	supplyListApp,
	userPositionAdd
}
