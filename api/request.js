
 const apiUrl = 'http://192.168.0.202:7000'; // 开发
// const apiUrl = 'http://duu-u.imwork.net:27307'; // 开发
// const apiUrl = 'http://m.qinlvny.com'; // 正式
const versionNumber = 'v1.0.0'; //版本号

if (apiUrl == 'http://192.168.0.202:7000') {
	uni.setStorageSync('v', versionNumber + ' 开发');
	uni.setStorageSync('s', '开发');
} else {
	uni.setStorageSync('v', versionNumber + '正式');
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
		
		uni.showToast({
			title: '加载中...',
			icon: 'loading'
		})
		
		let newUrl = params.url;
		// #ifdef MP-WEIXIN || APP-PLUS
		if (params.url.indexOf('/api') != -1) {
			newUrl = newUrl.split('/api')[1]
		}  
		// #endif
		uni.onNetworkStatusChange(function (res) {
			if(!res.isConnected) {
				uni.navigateTo({
					url:'/pages/common/err/err?from=unonline'
				})
			}
		});
		
		
		uni.request({
			url: apiUrl + newUrl,
			method: params.method || 'GET',
			data: params.data,
			header,
			success(res) {
				uni.hideToast();
				// 请求成功
				var res = res.data;
				if (res.code == '1000') {
					resolve(res);
				} else {
				// 请求成功非1000	
					if(res.code === '1011'){
						let content = '登录过期，请重新登录！'
						if(uni.getStorageSync('access_token') == '') {
							content = '请先登录！'
						}
						uni.showModal({
						    title: '提示',
						    content,
						    success: function (res) {
						        if (res.confirm) {
						           uni.navigateTo({
						           	url:'/pages/login/login'
						           })
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
						
					}
					// else{
					// 	params.url = newUrl;
					// 	// #ifdef MP-WEIXIN
					// 	let pages = getCurrentPages(); // 当前页面
					// 	let beforePage = pages[pages.length - 2]; // 前一个页面
					// 	let url = beforePage.route
					// 	if(url =! '/pages/common/err/err'){
					// 		uni.navigateTo({
					// 			url:'/pages/common/err/err?redirect=' + JSON.stringify(params)
					// 		})
					// 	}
					// 	// #endif
					// 	// #ifdef MP-WEIXIN
					// 	console.log('params===>>')
					// 	console.log(params)
					// 	uni.navigateTo({
					// 		url:'/pages/common/err/err?redirect=' + JSON.stringify(params)
					// 	})
					// 	// #endif
						
						
					// }
					resolve(res);
				}
			},
			fail(err) {
				uni.hideToast();
				// 请求失败处理
				if (err.errMsg || err.errMsg === "request:fail timeout") {
					uni.showToast({
						icon:'none',
						title:'网络请求超时'
					})
				} else {
					// uni.showToast({
					// 	icon:'none',
					// 	title:res.message || '网络请求超时'
					// })
				}
				 reject(err)
			},
			complete(res) {
				// 请求结束
				uni.hideToast();
			}
		})
	})
};

module.exports = {
	request
}
