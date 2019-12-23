 let apiUrl = 'https://wsm.qinlvny.com'; // 微信 APP 正式
// let apiUrl = ''; // H5正式
// let apiUrl = 'http://192.168.0.202:8000'; // 开发

const versionNumber = 'V1.0.8.1'; //版本号

if (apiUrl == 'http://192.168.0.202:8000/ws') {
	uni.setStorageSync('v', versionNumber);
	uni.setStorageSync('s', '开发');
} else {
	uni.setStorageSync('v', versionNumber);
	uni.setStorageSync('s', '正式');
}
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {
			throw reason
		})
	);
};

/*
 * @param {*} params 
 * @param {*} url String
 * @param {*} data Object
 * @param {*} success Function
 * @param {*} fail Function
 * @param {*} complete Function
 */
const request = function(params = {}) {
	return new Promise((resolve, reject) => {
		let data = params.data || {};
		let header = {}
		if (uni.getStorageSync("access_token")  &&  params.url !='/api/oauth/oauth/token') {
			header = {
				'Authorization': 'Bearer ' + uni.getStorageSync("access_token") || ''
			};
		}
		if (params.type == 'json') {
			header['content-type'] = 'application/json'
		} else if (params.type == 'file') {
			header['content-type'] = 'application/multipart/form-data'
		} else if (params.type == 'form') {
			header['Content-type'] = 'application/x-www-form-urlencoded'
		}
	
		let newUrl = params.url;
		// #ifdef MP-WEIXIN || APP-PLUS || H5
		if (params.url.indexOf('/api') != -1) {
			newUrl = newUrl.split('/api')[1]
		}  
		

		// try{
		// 	if(params.data.grant_type == 'mini_program' || params.data.grant_type == 'wx_app'){
		// 		apiUrl = 'http://2b7306b237.wicp.vip'
		// 	}
		// }catch(e){  
		// 	//TODO handle the exception
		// }
		
		// #endif

		uni.request({
			url: apiUrl + newUrl,
			method: params.method || 'GET',
			data: params.data,
			header,
			sslVerify: false,
			success(res) {
				// 请求成功
				var res = res.data;
				
				if (res.code == '1000' || res.access_token) {
					uni.setStorageSync('err',0);
					resolve(res);
					
				} else {
					// 请求成功非1000	
					if(res.code == '1011'){
						// if(newUrl != '/cart/cart/index' || newUrl != '/api/order/order/pageMyOrder'){
						// 	uni.removeStorageSync('access_token')
						// 	uni.navigateTo({
						// 		url:'/pages/login/login'
						// 	})
						// }
					}else if(res.code == '1017'){
						let tokenData = {
							grant_type:'refresh_token',
							scope: '4',
							client_id: 'bwap',
							client_secret:'xx',
							refresh_token: uni.getStorageSync('refresh_token')
						}
						
						uni.request({
							url: 'http://wsm.qinlvny.com/oauth/oauth/token',
							method: 'POST',
							data: tokenData,
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							success(res) { 
								console.log('1',res)
								if(res.data && res.data.access_token){
									uni.setStorageSync('access_token', res.data.access_token)
									uni.setStorageSync('refresh_token', res.data.refresh_token)
									header = {
										'Authorization': 'Bearer ' + uni.getStorageSync("access_token") || ''
									};
									
									uni.request({
										url: apiUrl + newUrl,
										method: params.method || 'GET',
										data: params.data,
										header,
										success(res) {
											console.log('2',res)
											if(res.code == '1000'){
												resolve(res);
											}
										},
										fail() {
											uni.showToast({
											    title: '请求数据错误',
											    duration: 2000,
												icon :'none'
											});
										}
									})
								} else {
									uni.navigateTo({
										url:'/pages/login/login'
									})
								}
							},
							fail(err) {
								uni.showToast({
								    title: '请求数据错误',
								    duration: 2000,
									icon :'none'
								});
							}
						})
					} else {
						if(res.code != '9999') {
							if(!uni.getStorageSync('access_token')){
								// 防止重复进入错误页面
								if(uni.getStorageSync('err') != 1){
									uni.navigateTo({
										url:'/pages/common/err/err?redirect=' + JSON.stringify(params)
									})
								}
							}
						}
					}
					resolve(res);
				}
			},
			fail(err) {
				 reject(err)
			},
			complete(res) {
				// 请求结束

			}
		})
	})
};

module.exports = {
	request
}
