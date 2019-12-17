<template>
	<view class="login">
		<!-- <view class="close">
			<image src="../../static/img/tag-close.png" mode=""></image>
		</view> -->
		<view class="body">
			<view class="logo">
				<image src="/static/imgs/icon-1022.png" mode=""></image>
			</view>
			<view class="name">
				<input class="fs30" v-model="phone" @input="doIsLogin" type="number" placeholder="请输入手机号码" />
			</view>
			<view class="code">
				<input class="fs30" v-model="code" @input="doIsLogin" type="number" placeholder="请输入验证码" />
				<text class="getcode" @click="getCode" :class="{'text-theme':codeNum!==''}">{{codeNum}} {{codeText}}</text>
			</view>
			<view class="protocal">
				登录表示同意
				<text @click="goProtocal" class="dialog-txt">《用户服务协议》</text>
				和
				<text @click="goPrivacy" class="dialog-txt"> 《隐私政策》</text>
			</view>
		</view>
		<view :class="{'bg-theme':isRight}" @click="dologin" class="btn fs32">登录</view>

		<!--  #ifdef  MP-WEIXIN -->
		<!-- <view class="footer">
			<button
			class='testbutton'
			open-type="getUserInfo"
			@getuserinfo="getuserinfox"
			withCredentials="true"
			>
			其他登录方式
			<view class="img">
				<image src="../../static/img/icon-wechat.png"></image>
			</view>
			</button>
		</view> -->
		<!--  #endif -->
		<!--  #ifdef  APP-PLUS -->
		<!-- <view class="footer" @click="wxLogin">
			<view class="fs24">其他登录方式</view>
			<view class="img">
				<image src="../../static/img/icon-wechat.png"></image>
			</view>
			</button>
		</view> -->
		<!--  #endif -->
		<Dialog :hasSlot="hasSlot" :title="dialogTitle" @doCancel="doCancel" @doConfirm="doConfirm" :isShow="dialogIsShow"
		 :cancelText="cancelText" :confirmText="confirmText">
			<view>
				<view>请你务必审阅、充分理解“服务协议”和“隐私政策”各条款，包括不限于：为了向你提供即时通讯、内容分享登服务，我们需要收集你的设备信息、操作日志登个人信息。你可以在“设置”中查看、变更、删除个人信息并管理你的授权。</view>
				<view>你可阅读 <text class="dialog-txt" @click="goProtocal">《服务协议》</text>和<text class="dialog-txt" @click="goPrivacy">《隐私政策》</text>了解详细信息。如你同意，请点击“同意”开始接受我们的服务</view>
			</view>
		</Dialog>
	</view>
</template>

<script>
	import validator from '../../utils/validator.js'
	import T from '@/utils/tips.js'
	import Dialog from '@/components/common/Dialog.vue'
	import {
		postUserLogin,
		getUserInfoData,
		postUserSms,
		weixinLogin,
		openIdByCode,
		getUserRealInfo,
		getByUserIdAndType,
		getUserRealInfoAll
	} from '@/api/userApi.js'
	export default {
		data() {
			return {
				hasSlot: true,
				dialogTitle: '服务协议和隐私政策',
				dialogIsShow: false,
				cancelText: '暂不使用',
				confirmText: '同意',
				phone: '',
				code: '',
				codeText: '获取验证码',
				codeNum: '', // 定时器时间
				isRight: false, // 是否完成输入
				setCodeInterval: '', // 定时器
				deviceId: '', // 数据传值deviceId
				appID: 'wxb8afa388fa540c2a',
				weixinCode: '',
				delta: 1,
				from: ''
			}
		},
		components: {
			Dialog
		},
		onBackPress() {
			if (!uni.getStorageSync('access_token')) {
				if (uni.getStorageSync('pagePath') == 'main') {
					uni.switchTab({
						url: '/pages/main/main'
					})
				} else {
					uni.switchTab({
						url: '/pages/user/user'
					})
				}
			}
			console.log('onBackPress')
		},
		onHide() {
			console.log('onHide')
			if (this.setCodeInterval != '') {
				clearInterval(this.setCodeInterval)
			}
		},
		onLoad(options) {
			if (options.delta) this.delta = options.delta
			if (options.from) this.from = options.from
		},
		onShow() {
			uni.setStorageSync('isLogin', 0)
		},
		methods: {
			doConfirm() {
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow', 2)
				this.dologin()
			},
			doCancel() {
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow', 1)
			},
			// 隐私协议
			goPrivacy() {
				uni.navigateTo({
					url: '/pages/user/privacy/privacy'
				})
			},
			// 去用户协议
			goProtocal() {
				uni.navigateTo({
					url: '/pages/user/protocal/protocal'
				})
			},

			// 获取openid
			getOpenIdByCode() {
				uni.login({
					provider: 'weixin',
					success(e) {
						console.log('code', JSON.stringify(e.code))
						let data = {
							code: e.code,
							providerId: 'miniProgram'
						}
						console.log(data)
						openIdByCode(data).then(res => {
							console.log(res)
							if (res.code == '1000') {
								uni.setStorageSync('openid', res.data)
							}
						})
					}
				})

			},
			// APP微信登录
			wxLogin() {
				let _this = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(res) {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(res));
									let accessToken = res.authResult.access_token;
									let openId = res.authResult.openid;
									let data = {
										grant_type: 'wx_app',
										scope: 2,
										client_id: 'cwap',
										client_secret: 'xx',
										systemId: 2,
										deviceId: _this.getUUID(),
										accessToken,
										openId
									}
									console.log('data->>', data)
									postUserLogin(data).then(res => {
										console.log(JSON.stringify(res))
										if (res.code == '9999') {
											uni.getUserInfo({
												provider: 'weixin',
												success: function(infoRes) {
													console.log('-------获取微信用户所有-----');
													console.log(JSON.stringify(infoRes.userInfo));
													data.userInfo = infoRes.userInfo
													uni.navigateTo({
														url: '/pages/login/binding/binding?data=' + JSON.stringify(data)
													})
												}
											});
										} else {
											uni.setStorageSync('access_token', res.access_token)
											uni.setStorageSync('refresh_token', res.refresh_token)
											uni.setStorageSync('uid', res.id)
											// 获取用户信息
											_this.getUserInfoDates()
										}
									})

								}
							});
						}
					}
				});
			},
			// 小程序微信登录
			getuserinfox(e) {
				let _this = this;
				console.log(e)
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						let data = {
							grant_type: 'mini_program',
							scope: 2,
							client_id: 'cwap',
							client_secret: 'xx',
							systemId: 2,
							deviceId: _this.getUUID(),
							miniCode: loginRes.code
						}
						console.log('data->', data)
						postUserLogin(data).then(res => {
							if (res.code == '9999') {
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log('-------获取微信用户所有-----');
										console.log(JSON.stringify(infoRes.userInfo));
										data.userInfo = infoRes.userInfo
										uni.navigateTo({
											url: '/pages/login/binding/binding?data=' + JSON.stringify(data)
										})
									}
								});
							} else {
								uni.setStorageSync('access_token', res.access_token)
								uni.setStorageSync('access_token', res.refresh_token)
								uni.setStorageSync('uid', res.id)

								// 获取用户信息
								_this.getUserInfoDates()
							}
						})
					}
				});

			},
			doIsLogin() {
				this.isRight = this.phone != '' && this.code !== ''
			},
			// 获取验证码
			getCode() {
				console.log(validator.isPhone(this.phone))
				// 已发送未超过60秒直接返回
				if (this.codeNum !== '') {
					return false
				}
				// 手机验证
				if (validator.isPhone(this.phone)) {
					if (this.phone === '') {
						T.tips('手机号不能为空');
						return false
					}
					T.tips('手机号码不正确');
					return false
				}

				// 获取uuid
				this.deviceId = this.getUUID()
				// 获取手机验证码
				let data = {
					mobile: this.phone,
					deviceId: this.deviceId,
					systemId: 4
				}
				postUserSms(data).then((res) => {
					T.tips(res.message)
					if (res.code === '1000') {
						this.codeText = '重新发送'
						this.codeNum = 59
						this.setCodeInterval = setInterval(() => {
							if (this.codeNum === 0) {
								this.codeNum = ''
								clearInterval(this.setCodeInterval)
							} else {
								this.codeNum--
							}
						}, 1000)
					}
				}).catch((err) => {
					T.tips(err.message || '错误')
				})
			},
			// 登录
			dologin: function() {
				if (this.isRight) {

					let dialogIsShow = uni.getStorageSync('dialogIsShow')
					if (dialogIsShow == 1 || dialogIsShow == '') {
						this.dialogIsShow = true
						return
					}

					//#ifdef APP-PLUS  
					var uuid = plus.device.uuid;
					//#endif
					//#ifdef MP-WEIXIN
					this.deviceId = this.getUUID()
					//#endif
					let data = {
						grant_type: 'sms_code',
						scope: '4',
						client_id: 'bwap',
						client_secret: 'xx',
						systemId: '4',
						deviceId: this.deviceId,
						mobile: this.phone,
						smsCode: this.code
					}
					// let dates = this.$qs.stringify(data)
					postUserLogin(data).then((res) => {
						uni.setStorageSync('access_token', res.access_token)
						uni.setStorageSync('refresh_token', res.refresh_token)
						uni.setStorageSync('uid', res.id)

						uni.setStorageSync('phone', this.phone)
						if (this.setCodeInterval != '') {
							clearInterval(this.setCodeInterval)
						}
						// 获取用户信息
						this.getUserInfoDates()
					}).catch((err) => {
						T.tips(err.message || '登录错误')
					})
				}
			},
			getUserInfoDates() {
				// #ifdef  MP-WEIXIN
				this.getOpenIdByCode();
				// #endif
				getUserRealInfoAll().then((res) => {
					if (res.code === '1000') {
						let roleId = res.data.userRole.roleId || ''
						uni.setStorageSync('nickName', res.data.user.realName || (res.data.userRealInfo ? res.data.userRealInfo.realName :
							'') || res.data.apply.realName)
						uni.setStorageSync('headImgUrl', res.data.user.headImgUrl)
						uni.setStorageSync('roleId', roleId)
						uni.setStorageSync('userRealInfo', res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : '')
						uni.setStorageSync('userApply', res.data.apply.id ? JSON.stringify(res.data.apply) : '')

						switch (roleId) {
							case '20003':
								let userRealInfo = uni.getStorageSync('userRealInfo')
								if (userRealInfo == '') {
									uni.redirectTo({
										url: '/pages/middle/identity/identity'
									})
								} else {
									uni.switchTab({
										url: '/pages/main/main'
									})
								}
								break;
							case '20001':
								uni.switchTab({
									url: '/pages/middle/middle'
								})
								break;
							case '20002':
								uni.switchTab({
									url: '/pages/middle/middle'
								})
								break;
							case '20004':
								uni.switchTab({
									url: '/pages/middle/middle'
								})
								break;
							default:
								break;
						}



						// 返回上一页
						// if(this.from == 'order'){
						//  if(uni.getStorageSync('pagePath') == 'main'){
						//   uni.switchTab({
						//   	url:'/pages/main/main'
						//   })
						//  }else{
						//   uni.switchTab({
						//   	url:'/pages/user/user'
						//   }) 
						//  }

						// } else {
						//  uni.navigateBack({
						//  	 delta: parseInt(this.delta)
						//  })
						// }

					}
				}).catch((err) => {
					T.tips(err.message || '获取用户信息错误')
				})
			},
			getUUID() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
				s[8] = s[13] = s[18] = s[23] = "-";

				var uuid = s.join("");
				return uuid
			}
		}
	}
</script>

<style lang="scss" scoped>
	input::-webkit-input-placeholder {
		color: #999999;
	}

	input::-moz-input-placeholder {
		color: #999999;
	}

	input::-ms-input-placeholder {
		color: #999999;
	}

	.dialog-txt {
		color: #FE3B0B !important;
	}

	.login {
		height: 100vh;
		background: #fff;

		.close {
			width: 60upx;
			height: 60upx;
			margin: 50upx 22upx;

			>image {
				width: 100%;
				height: 100%;
			}
		}

		.body {
			margin-left: 56upx;
			margin-right: 56upx;
			padding-top: 10upx;

			.logo {
				width: 200upx;
				height: 200upx;
				margin: 0 auto;
				padding-top: 20upx;

				>image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.welcome {
			padding-top: 74upx;
			font-size: 40upx;
			color: #000;
		}

		.subwel {
			color: #999;
			font-size: 24upx;
			margin-top: 20upx;
		}

		.name,
		.code {
			line-height: 70upx;
			color: #000;
			border-bottom: #f0f0f0 solid 1upx;

			input {
				height: 30upx;
				border: none;
				outline: none;
			}
		}

		::placeholder {
			color: #ccc;
			font-size: 30upx;
		}

		.name {
			padding: 20upx 0;
			margin-top: 50upx;
		}

		.code {
			padding: 20upx 0;
			position: relative;

			.getcode {
				font-size: 30upx;
				color: #000;
				position: absolute;
				right: 0upx;
				top: 50%;
				transform: translateY(-50%);
				z-index: 99999;
			}
		}

		.protocal {
			margin-top: 20upx;
			font-size: 20upx;
			color: #999999;

			text {
				color: #52cc66;
			}
		}

		.btn {
			width: 640upx;
			line-height: 80upx;
			text-align: center;
			color: #fff;
			background-color: #d9d9d9;
			border-radius: 40upx;
			margin: 40upx auto auto;

			&.actived {
				background-color: #fc2d2d;
			}
		}

		.footer {
			position: absolute;
			bottom: 136upx;
			text-align: center;
			width: 100%;

			button::after {
				border: none;
			}

			button {
				background: none;
			}

			input {
				outline: none;
				border: none;
				list-style: none;
			}

			.img {
				margin: 30upx auto;
				width: 70upx;
				height: 70upx;

				>image {
					width: 100%;
					height: 100%;
					margin: 0 auto;
				}
			}
		}
	}
</style>
