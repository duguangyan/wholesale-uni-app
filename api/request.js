// const apiUrl = 'http://m.qinlvny.com'; // 正式
// let apiUrl = 'http://duu-u.imwork.net:27307'; // 开发
   let apiUrl = 'http://192.168.0.202:8000/ws'; // 开发
const versionNumber = 'V1.0.1'; //版本号

if (apiUrl == 'http://192.168.0.202:8000') {
	uni.setStorageSync('v', versionNumber);
	uni.setStorageSync('s', ' 开发');
} else {
	uni.setStorageSync('v', versionNumber);
	uni.setStorageSync('s', ' 正式');
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
let islogin = uni.getStorageSync('isLogin')
const request = function(params = {}) {
	return new Promise((resolve, reject) => {
		let data = params.data || {};
		let header = {}
		if (uni.getStorageSync("access_token") && params.url !='/api/act/pageLayout/getListByParentId' &&  params.url !='/api/oauth/oauth/token') {
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
		
		// try{
		// 	if(params.data.isLoading != 1){
		// 		uni.showToast({
		// 			title: '加载中...',
		// 			icon: 'loading'
		// 		})
		// 	}
		// }catch(e){
		// 	//TODO handle the exception
		// }
		
		// if(params.url.indexOf('/goods') != -1){
		// 	 apiUrl = 'http://192.168.0.174:7002/ws'
		// }
		
		let newUrl = params.url;
		// #ifdef MP-WEIXIN || APP-PLUS || H5
		if (params.url.indexOf('/api') != -1) {
			newUrl = newUrl.split('/api')[1]
		}  
		console.log('apiUrl:',apiUrl)
		console.log(params.url.indexOf('/ws'))
		if (params.url.indexOf('/oauth') != -1 || params.url.indexOf('/upms') != -1) {
			apiUrl = apiUrl.split('/ws')[0]
		}else{
			if(apiUrl.indexOf('/ws') == -1){
				apiUrl = apiUrl + '/ws'
			}
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
				// try{
				// 	if(params.data.isLoading != 1){
				// 		uni.hideToast();
				// 	}
				// }catch(e){
				// 	//TODO handle the exception
				// }
				// 请求成功
				var res = res.data;
				
				if (res.code == '1000' || res.access_token) {
					uni.setStorageSync('err',0);
					resolve(res);
					
				} else {
					// 请求成功非1000	
					// if(res.code == '1011'){
					// 	if(newUrl != '/cart/cart/index' || newUrl != '/api/order/order/pageMyOrder'){
					// 		uni.removeStorageSync('access_token')
					// 		uni.navigateTo({
					// 			url:'/pages/login/login'
					// 		})
					// 	}
						
						
					// 	// let content = '登录过期，请重新登录！'
					// 	// if(uni.getStorageSync('access_token') == '') {
					// 	// 	content = '请先登录！'
					// 	// }
					// 	// if(res.message == '无权访问！'){
					// 	// 	content = '无权访问！'
					// 	// }
					// 	// let islogin = uni.getStorageSync('isLogin')
					// 	// if(islogin != 1){
					// 	// 	uni.setStorageSync('isLogin',1)
					// 	// 	uni.showModal({
					// 	// 	    title: '提示',
					// 	// 	    content,
					// 	// 	    success: function (res) {
					// 	// 	        if (res.confirm) {
					// 	// 			   // uni.setStorageSync('isLogin',0)	
					// 	// 	           uni.navigateTo({
					// 	// 	           	url:'/pages/login/login'
					// 	// 	           })
					// 	// 	        } else if (res.cancel) {
					// 	// 	            console.log('用户点击取消');
					// 	// 				uni.setStorageSync('isLogin',0)
					// 	// 	        }
					// 	// 	    }
					// 	// 	});
					// 	// }
						
					// }else if(res.code == '1017'){
					// 	let tokenData = {
					// 		grant_type:'refresh_token',
					// 		scope:2,
					// 		client_id: 'cwap',
					// 		client_secret:'xx',
					// 		refresh_token: uni.getStorageSync('refresh_token')
					// 	}
					// 	console.log('tokenData',tokenData)
					// 	console.log('apiUrl',apiUrl + '/oauth/oauth/token')
					// 	uni.request({
					// 		url: apiUrl + '/oauth/oauth/token',
					// 		method: 'POST',
					// 		data: tokenData,
					// 		header:{
					// 			'content-type':'application/x-www-form-urlencoded'
					// 		},
					// 		success(res) { 
					// 			console.log('1',res)
					// 			if(res.data && res.data.access_token){
					// 				uni.setStorageSync('access_token', res.data.access_token)
					// 				uni.setStorageSync('refresh_token', res.data.refresh_token)
					// 				uni.request({
					// 					url: apiUrl + newUrl,
					// 					method: params.method || 'GET',
					// 					data: params.data,
					// 					header,
					// 					success(res) {
					// 						console.log('2',res)
					// 						if(res.code == '1000'){
					// 							resolve(res);
					// 						}else{
					// 							uni.showToast({
					// 							    title: '请求数据错误',
					// 							    duration: 2000,
					// 								icon :'none'
					// 							});
					// 						}
					// 					},
					// 					fail() {
					// 						uni.showToast({
					// 						    title: '请求数据错误',
					// 						    duration: 2000,
					// 							icon :'none'
					// 						});
					// 					}
					// 				})
					// 			} else {
					// 				// uni.showToast({
					// 				//     title: '请求数据错误',
					// 				//     duration: 2000,
					// 				// 	icon :'none'
					// 				// });
					// 				uni.navigateTo({
					// 					url:'/pages/login/login'
					// 				})
					// 			}
					// 		},
					// 		fail(err) {
					// 			uni.showToast({
					// 			    title: '请求数据错误',
					// 			    duration: 2000,
					// 				icon :'none'
					// 			});
					// 		}
					// 	})
					// } else {
					// 	if(res.code != '9999') {
					// 		if(!uni.getStorageSync('access_token')){
					// 			// 防止重复进入错误页面
					// 			if(uni.getStorageSync('err') != 1){
					// 				uni.navigateTo({
					// 					url:'/pages/common/err/err?redirect=' + JSON.stringify(params)
					// 				})
					// 			}
					// 		}
					// 	}
					// }
					resolve(res);
				}
			},
			fail(err) {
				// 请求失败处理
				// if (err.errMsg || err.errMsg === "request:fail timeout") {
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'网络请求超时'
				// 	})
				// 	uni.navigateTo({
				// 		url:'/pages/common/err/err?from=unonline'
				// 	})
				// }
				//  reject(err)
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
