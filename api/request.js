// const apiUrl = 'http://m.qinlvny.com'; // 正式
// let apiUrl = 'http://duu-u.imwork.net:27307'; // 开发
 let apiUrl = 'http://192.168.0.202:7000'; // 开发
const versionNumber = 'V1.0.4'; //版本号

if (apiUrl == 'http://192.168.0.202:7000') {
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
		if (uni.getStorageSync("access_token") && params.url !='/api/act/pageLayout/getListByParentId' &&  params.url !='/api/oauth/oauth/token' ) {
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
		
		let newUrl = params.url;
		// #ifdef MP-WEIXIN || APP-PLUS
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
					if(res.code == '1011'){
						uni.navigateTo({
							url:'/pages/login/login'
						})
						// let content = '登录过期，请重新登录！'
						// if(uni.getStorageSync('access_token') == '') {
						// 	content = '请先登录！'
						// }
						// if(res.message == '无权访问！'){
						// 	content = '无权访问！'
						// }
						// let islogin = uni.getStorageSync('isLogin')
						// if(islogin != 1){
						// 	uni.setStorageSync('isLogin',1)
						// 	uni.showModal({
						// 	    title: '提示',
						// 	    content,
						// 	    success: function (res) {
						// 	        if (res.confirm) {
						// 			   // uni.setStorageSync('isLogin',0)	
						// 	           uni.navigateTo({
						// 	           	url:'/pages/login/login'
						// 	           })
						// 	        } else if (res.cancel) {
						// 	            console.log('用户点击取消');
						// 				uni.setStorageSync('isLogin',0)
						// 	        }
						// 	    }
						// 	});
						// }
						
					}else if(res.code == '1017'){
						let tokenData = {
							grant_type:'refresh_token',
							scope:2,
							client_id: 'cwap',
							client_secret:'xx',
							refresh_token: uni.getStorageSync('refresh_token')
						}
						
						uni.request({
							url: apiUrl + '/oauth/oauth/token',
							method: 'POST',
							data: tokenData,
							header:{
								'content-type':'application/multipart/form-data'
							},
							success(res) { 
								if(res.code == '1000'){
									uni.request({
										url: apiUrl + newUrl,
										method: params.method || 'GET',
										data: params.data,
										header,
										success(res) {
											if(res.code == '1000'){
												resolve(res);
											}else{
												uni.showToast({
												    title: '标题',
												    duration: '请求数据错误'
												});
											}
										},
										fail() {
											uni.showToast({
											    title: '标题',
											    duration: '请求数据错误'
											});
										}
									})
								} else{
									uni.showToast({
									    title: '标题',
									    duration: '请求数据错误'
									});
								}
							},
							fail(err) {
								uni.showToast({
								    title: '标题',
								    duration: '请求数据错误'
								});
							}
						})
					} else {
						if(!uni.getStorageSync('access_token')){
							// 防止重复进入错误页面
							if(uni.getStorageSync('err') != 1){
								uni.navigateTo({
									url:'/pages/common/err/err?redirect=' + JSON.stringify(params)
								})
							}
						}
					}
					 resolve(res);
				}
			},
			fail(err) {
				
				
				// 请求失败处理
				if (err.errMsg || err.errMsg === "request:fail timeout") {
					uni.showToast({
						icon:'none',
						title:'网络请求超时'
					})
					uni.navigateTo({
						url:'/pages/common/err/err?from=unonline'
					})
				}
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
