import {
	request
} from './request.js'


// 后台-列表搜索 SupplyListRes
const supplyListApp = data => {
	return request({
		url: 'ws/goods/supply/supplyListApp'
		// method: 'post',
		// data,
		// type: 'form'
	})
}

// 保存用户定位信息
const userPositionAdd = data => {
	return request({
		url: 'upms/userPosition/add',
		method: 'post',
		data,
		type: 'form'
	})
}


export {
	supplyListApp,
	userPositionAdd
}
