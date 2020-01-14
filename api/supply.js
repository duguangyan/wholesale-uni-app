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



export {
	supplyListApp
}
