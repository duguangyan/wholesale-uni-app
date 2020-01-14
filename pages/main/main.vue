<template>

	<view class="main">
		<view class="titleNview-placing"></view>
		<view class="seach">
			<!-- <view class="bg"></view> -->
			<!--  #ifdef  MP-WEIXIN ||APP-PLUS || H5 -->
			<view class="content">
				<view class="fll img-1" @click="goClassify">
					<image :class="{nmt2:platform == 1}" src="/static/imgs/search-left-1.png" mode=""></image>
					<view :class="['text',platform == 1?'mt10':platform == 2?'mt15':'']">分类</view>
				</view>
				<view class="img fll">
					<image src="/static/imgs/icon-search-1.png" @click="goSearch"></image>
				</view>
				<view class="flr img-2" @click="goOrder">
					<image :class="{nmt2:platform == 1}" src="/static/imgs/search-order-1.png" mode=""></image>
					<view :class="['text',platform == 1?'mt10':platform == 2?'mt15':'']">进货单</view>
				</view>
			</view>

			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<!-- <view class="img">
				<image src="/static/img/icon-search-2.png"></image>
			</view> -->
			<!--  #endif -->
		</view>
		<!-- 轮播图 -->
		<view class="index-top-warp">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper @change="changeBanner" :circular="circular" class="swiper" indicator-color="rgba(0,0,0,.3)"
						 indicator-active-color='#FE3B0B' :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						 :duration="duration">
							<swiper-item v-for="(item,index) in adSet" :key="index" @click="goNextPage(item)">
								<view class="swiper-item">
									<image :src="item.path"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<SwiperDot class="dot" :listWidth="listWidth" :current="cur" :list="adSet"></SwiperDot>
		</view>
		<view class="passageways flex">
			<view class="items flex-1" v-for="(item,index) in passageways" :key="index" @click="goPassageway(index)">
				<view class="txt">{{item.txt}}</view>
				<view class="img">
					<image :src="item.img" mode=""></image>
				</view>
			</view>
		</view>
		<view class="recommend">
			热门推荐
		</view>
		<!-- nav导航 -->
		<view class="nav cf">
			<view class="li fll" v-for="(item,index) in navList" :key="index" @click="goSearchPage(item)">
				<view class="img">
					<image :src="item.imgPath"></image>
				</view>
				<view class="name fs26 text-333">{{item.name}}</view>
			</view>
		</view>

		<!-- 广告 -->
		<view class="advs" v-if="adSet2.length>0" @click="goadSet(adSet2[0])">
			<image :src="adSet2[0].path" mode=""></image>
		</view>
		<!-- 精选 -->
		<view class="seles">
			<view class="title">
				<image :src="imgPath"></image>
			</view>
			<view class="content">
				<view v-for="(item,index) in goodsDetailRespList" :key="index" @click="goGoodsDetail(item.shopId,item.id)">
					<Goodx :item='item' :roleId="1"></Goodx>
				</view>
			</view>

		</view>
		<!-- <TabBar :checkIndex='checkIndex'></TabBar> -->
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
	import {
		mapState
	} from 'vuex'
	import {
		getHomeList,
		addHit
	} from '../../api/mainApi.js'
	import {
		appUpdate
	} from '../../api/userApi.js'
	import T from '@/utils/tips.js'
	import TabBar from '@/components/common/TabBar.vue'
	import SwiperDot from "@/components/common/SwiperDotByMain.vue"
	import Goodx from "@/components/common/Goodx.vue"
	import Dialog from '@/components/common/Dialog.vue'
	export default {
		data() {
			return {
				circular: true,
				goodsDetailRespList: [],
				navList: [],
				imgPath: '',
				adSet: '',
				adSet2: '',
				hasSlot: true,
				dialogTitle: '服务协议和隐私政策',
				dialogIsShow: false,
				cancelText: '暂不使用',
				confirmText: '同意',
				checkIndex: 0,
				homeList: {},
				banner: [], // 轮播图
				navs: [], // 导航nav
				advs: [], // 广告
				seles: [], // 精选
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				platform: 0,
				cur: 0,
				listWidth: 0,
				roleId: '',
				colorPattern: {
					'红': '255,0,0',
					'黄': '255,55,0',
					'蓝': '30,30,255',
					'紫': '200,50,248',
				},
				passageways: [{
						txt: '附近的人',
						img: 'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
					},
					{
						txt: '订单种植',
						img: 'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
					},
					{
						txt: '采购大厅',
						img: 'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
					},
					{
						txt: '供货大厅',
						img: 'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
					}
				]
			}
		},
		components: {
			TabBar,
			SwiperDot,
			Goodx,
			Dialog
		},
		onTabItemTap(e) {
			uni.setStorageSync('pagePath', 'main')
		},
		onLoad() {
			// 首次启动清空需要认证标记
			uni.removeStorageSync('needIdentify')

			uni.setStorageSync('pagePath', 'main')
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			// 版本更新 （APP）
			// #ifdef APP-PLUS
			this.updataApp()
			// #endif	
			
			
			
		},
		onShow() {
			// 如果认证状态，打回认证
			// if(uni.getStorageSync('needIdentify')){
			//   return uni.navigateTo({
			//     url: '/pages/middle/identity/identity'
			//   })
			// }
			// 获取首页banner
			this.getHomeList()
			// 判断用户类型
			this.assessUserType()
			
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
					console.log('userLocation',res)
					uni.setStorageSync('userLocation', JSON.stringify(res))
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
			
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			// 获取首页banner
			this.getHomeList()
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			// 跳转
			goPassageway(index){
				switch (index){
					case 0:
						uni.navigateTo({
							url:'/pages/nearby/nearby'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'/pages/common/webview/webview?url=http://m.qinlvny.com/static/toxic.html'
						})
						break;
					default:
						break;
				}
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
			doConfirm() {
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow', 2)
			},
			doCancel() {
				this.dialogIsShow = false
				uni.setStorageSync('dialogIsShow', 1)
			},
			// 计算颜色
			calcAttr(attr) {
				let str = attr.substr(0, 1)
				let color = this.colorPattern[str] || '165,165,165'
				return {
					color: 'rgba(' + color + ',1)',
					bg: 'rgba(' + color + ',0.1)'
				}

			},
			// 判断用户类型
			assessUserType() {
				// 设置底部tab样式
				this.roleId = uni.getStorageSync('roleId')
				// 判断用户是否同意协议
				let dialogIsShow = uni.getStorageSync('dialogIsShow')
				if (dialogIsShow == "" || dialogIsShow == '1') {
					this.dialogIsShow = true
				} else {
					this.dialogIsShow = false
				}
				if (this.roleId) {
					// 设置底部tab样式
					if (this.roleId == '20002') {
						uni.setTabBarItem({
							index: 1,
							text: '代办',
							iconPath: 'static/img/2.1.png',
							selectedIconPath: 'static/img/2.2.png'
						})
					}
					if (this.roleId == '20003') {
						uni.setTabBarItem({
							index: 1,
							text: '入驻',
							iconPath: 'static/img/2.1.png',
							selectedIconPath: 'static/img/2.2.png'
						})
					} else if (this.roleId == '20001' || this.roleId == '20004') {
						uni.setTabBarItem({
							index: 1,
							text: '发布',
							iconPath: 'static/img/4.1.png',
							selectedIconPath: 'static/img/4.2.png'
						})
					}
				}
			},
			changeBanner(e) {
				this.cur = e.detail.current;
			},
			// 显示分类
			goClassify() {
				uni.navigateTo({
					url: '/pages/main/classify/classify'
				})
			},
			//去进货单
			goOrder() {
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			// 更新版本
			updataApp() {
				// #ifdef APP-PLUS
				// 安卓
				let data = {
					code: '003'
				}
				// ios
				if (this.platform == '2') {
					data.code = '004'
				}
				appUpdate(data).then(res => {
					console.log(res)
					if (res.code == '1000') {
						// var req = { //升级检测数据
						//  "appid": plus.runtime.appid,  
						//  "version": plus.runtime.version  
						// }
						if (res.data) {
							// 判断是否强制更新
							let forceUpdate = 0
							if (res.data.forceUpdate == 1) {
								forceUpdate = 1
							}
							plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
								// let nowVersions = plus.runtime.version.split('.');
								let nowVersions = wgtinfo.version.split('.');
								let serverVersions = res.data.version.split('.');
								console.log(nowVersions + '-' + serverVersions)
								if (nowVersions[1] < serverVersions[1]) { // 更新大版本
									if (res.data.packagePath) {
										uni.showModal({
											title: '版本更新',
											content: "有新的版本发布,是否立即进行新版本下载？",
											cancelText: forceUpdate == 0 ? '取消' : '退出',
											success: function(model) {
												if (model.confirm) {
													uni.showLoading({
														title: '正在跳转...'
													});
													if (uni.getStorageSync('platformAndroid') == '10') { // 安卓更新
														console.log('packagePath:', res.data.packagePath)
														var dtask = plus.downloader.createDownload(res.data.packagePath, {}, function(d, status) {
															// 下载完成  
															if (status == 200) {
																plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
																	uni.showToast({
																		title: '安装失败',
																		mask: false,
																		duration: 1500
																	});
																	uni.hideLoading();
																})
															} else {
																uni.showToast({
																	title: '更新失败',
																	mask: false,
																	duration: 1500
																});
																uni.hideLoading();
															}
														});
														dtask.start();
													} else {
														var url = encodeURI('itms-apps://itunes.apple.com/cn/app/上上农夫/id1484601336?l=zh&mt=8'); // HelloH5应用在appstore的地址  
														console.log('ios->', url)
														plus.runtime.openURL(url);
													}
												} else if (model.cancel) {
													console.log(forceUpdate)
													if (forceUpdate == 1) {
														// plus.runtime.quit();
														plus.os.name == "Android" ? plus.runtime.quit() : plus.ios.import("UIApplication").sharedApplication()
															.performSelector("exit");
													}
													console.log('用户点击取消');
												}
											}
										});
									}
								} else { // 更新小版本
									if (nowVersions[2] < serverVersions[2]) {
										if (res.data.updatePackagePath) {
											uni.showModal({
												title: '版本更新',
												content: "有新的版本发布,是否立即进行新版本下载？",
												cancelText: forceUpdate == 0 ? '取消' : '退出',
												success: function(model) {
													if (model.confirm) {
														uni.showLoading({
															title: '正在下载...'
														});
														uni.downloadFile({
															url: res.data.updatePackagePath,
															success: (downloadResult) => {
																if (downloadResult.statusCode === 200) {
																	uni.hideLoading();
																	plus.runtime.install(downloadResult.tempFilePath, {
																		force: false
																	}, function(e) {
																		console.log('install success...', e);
																		uni.hideLoading();
																		plus.runtime.restart();
																	}, function(e) {
																		uni.showToast('更新失败')
																		uni.hideLoading();
																		console.error('install fail...', e);
																	});
																}
															},
															fail() {
																setTimeout(function() {
																	uni.showToast('更新失败')
																	uni.hideLoading();
																}, 2000);
															}
														});

													} else if (model.cancel) {
														console.log('用户点击取消');
														console.log(forceUpdate)
														if (forceUpdate == 1) {
															// plus.runtime.quit();
															plus.os.name == "Android" ? plus.runtime.quit() : plus.ios.import("UIApplication").sharedApplication()
																.performSelector("exit");
														}
													}
												}
											})
										}
									}
								}

							});
						}
					}
				})
				// #endif	
			},
			// 去广告页面
			goadSet(item) {
				addHit({
					id: item.id
				})
				if (item.type == 1) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.url
					})
				} else if (item.type == 5) {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=1&goodsId=' + item.url
					})
				}
			},
			// nav 去搜索页面
			goSearchPage(item) {
				let path = ''
				if (item.isAgentcy == 0 && item.isCompany == 1 && item.isPerson == 0) {
					path = '/pages/order/company/company?categoryId=' + item.componentId
				} else {
					path = '/pages/order/goodsList/goodsList?categoryId=' + item.componentId
				}

				uni.navigateTo({
					url: path
				})
			},
			// 去搜索页面item.isCompany == 1 && 
			goSearch() {
				uni.navigateTo({
					url: '/pages/main/search/search'
				})
			},
			// 获取首页banner
			getHomeList() {
				getHomeList({
					parentId: 1
				}).then((res) => {
					if (res.code == '1000') {
						this.homeList = res.data
						this.adSet = this.homeList.list[0].list[0].list[0].adPosition.adSet
						this.adSet2 = this.homeList.list[2].list[0].list[0].adPosition.adSet
						this.navList = this.homeList.list[1].list[0].list
						this.imgPath = this.homeList.list[3].list[0].list[0].imgPath
						this.goodsDetailRespList = this.homeList.list[3].list[1].goodsDetailRespList
						this.goodsDetailRespList.forEach((item, index) => {
							item.valueAddr = item.valueAddr.substring(0, 5)
						})

						this.listWidth = uni.upx2px(this.adSet.length * 30) + 'px';

					}
				})
			},
			goNextPage(item) {

				addHit({
					id: item.id
				})
				// url: '/pages/common/webview/webview?url=http://m.qinlvny.com/static/video.html#' + item.url
				if (item.type == 6) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=http://m.qinlvny.com/static/video.html#' + item.url

					});
				} else if (item.type == 5) {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=' + item.id + '&goodsId=' + item.url
					});
				} else if (item.type == 1) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.url
					})
				}
			},
			goGoodsDetail(shopId, goodsId) {
				uni.navigateTo({
					url: '/pages/order/goodsDetail/goodsDetail?shopId=' + shopId + '&goodsId=' + goodsId
				})
			},
			chooseColorValue(v) {
				let obg = {}
				if (v.indexOf('黄') != '-1') {
					obg = {
						bgColor: '#FF5500',
						fontColor: '#FFF6F0'
					}
				} else if (v.indexOf('红') != '-1') {
					obg = {
						bgColor: '#FFF0F0',
						fontColor: '#FF0000'
					}
				} else if (v.indexOf('紫') != '-1') {
					obg = {
						bgColor: '#FBF0FF',
						fontColor: '#C42AFD'
					}
				}
				return obj;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-txt {
		color: #1AAD19;
	}

	.mt10 {
		margin-top: 10upx;
	}

	.mt15 {
		margin-top: 14upx;
	}

	.nmt2 {
		transform: translateY(-4upx);
		// top: -8upx;
	}

	.dot {
		position: absolute;
		z-index: 9999;
		width: 100%;
		height: 40upx;
		bottom: -10upx;
	}

	.titleNview-placing {
		height: var(--status-bar-height);
		// padding-top: 44px;
		box-sizing: content-box;
	}

	.main {
		width: 750upx;
		margin: 0 auto;
		overflow-x: hidden;
		background: #fff;
		min-height: 100vh;
		.passageways{
			.items{
				.img{
					width: 44upx;
					height: 44upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		// padding-bottom: 100upx;
		.bb1 {
			position: fixed;
			height: 0;
			bottom: 0upx;
			border: 1upx solid #f5f5f5;
			background: #f0f0f0;
			width: 100%;
		}

		width: 100%;
		height: 100%;

		.seach {
			width: 100%;
			height: 60upx;
			position: relative;
			top: 20upx;
			z-index: 99999;

			.bg {
				width: 100%;
				height: 100%;
				background: #fff;
				opacity: .4;
				border-radius: 30upx;
			}

			.name {
				text-align: center;
				position: absolute;
				top: 6upx;
				left: 300upx;
			}

			.content {
				.img-1 {
					text-align: center;

					>image {
						width: 36upx;
						height: 36upx;
						margin: 0 auto;
						position: relative;
						top: 2upx;
					}

					margin-left: 30upx;
					font-size: 20upx;
					color: #48484C;

					.text {
						position: relative;
						top: -6upx;
						/* #ifdef H5 */
						top: 0;
						/* #endif */
					}
				}

				.img-2 {
					text-align: center;

					>image {
						width: 36upx;
						height: 36upx;
						margin: 0 auto;
						position: relative;
						top: 2upx;
					}

					font-size: 20upx;

					color: #48484C;
					margin-right: 30upx;

					.text {
						position: relative;
						top: -6upx;
						/* #ifdef H5 */
						top: 0;
						/* #endif */
					}
				}
			}

			/*  #ifdef MP-WEIXIN || APP-PLUS || H5  */
			.img {
				// width: 24upx;
				height: 60upx;
				width: 540upx;
				z-index: 99999;
				position: absolute;
				left: 50%;
				margin-left: -280upx;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			/*  #endif  */

			/*  #ifdef MP-WEIXIN  */
			// .img {
			// 	// width: 24upx;
			// 	height: 60upx;
			// 	width: 450upx;
			// 	z-index: 99999;
			// 	position: absolute;
			// 	left: 30upx;
			// 	top: -30upx;

			// 	>image {
			// 		width: 100%;
			// 		height: 100%;
			// 	}
			// }

			/*  #endif  */

		}


		.seles {
			margin-top: -20upx;

			.content {


				.item {
					padding: 0 30upx;
					width: 100%;
					height: 250upx;
					border-radius: 10upx;
					overflow: hidden;
					background: #fff;
					margin-bottom: 20upx;
					border-bottom: 1upx solid #f5f5f5;

					.warp {
						margin-top: 18upx;
						padding: 4upx 20upx;
						position: relative;

						.deliver {
							.tip {
								background: #999;
								color: #fff;
								display: inline-block;
								border-radius: 20upx;
								margin-left: 10upx;
								padding: 2upx 4upx;
							}
						}

						.address {
							.img {
								width: 28upx;
								height: 22upx;
								margin-right: 6upx;

								>image {
									width: 100%;
									height: 100%;
									position: relative;
									top: -12upx;

								}
							}
						}

						.ellipsis-line2 {
							height: 78upx;
							line-height: 39upx;
							font-size: 30upx;
							color: #48484C;
						}

						.add {
							position: absolute;
							right: 20upx;
							bottom: 12upx;
						}

						.mgt-20 {
							margin-top: 26upx !important;
							width: 100%;
						}
					}

					.Android {
						.add {}
					}

					>.img {

						background-image: url('~@/static/img/default-shouye.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						-moz-background-size: 100% 100%;
						width: 220upx;
						height: 220upx;
						border-radius: 20upx;
						overflow: hidden;

						>image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.seles {
			.title {
				width: 310upx;
				height: 50upx;
				margin: 26upx auto 18upx auto;

				// background-image: url('~@/static/img/default-shouye.png');
				// background-repeat: no-repeat;
				// background-size: 100% 100%;
				// -moz-background-size: 100% 100%;
				>image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.advs {
			width: 690upx;
			height: 140upx;
			margin: 0 auto;
			background-image: url('~@/static/img/default-hengfu.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			-moz-background-size: 100% 100%;

			>image {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			// margin: 20upx 0;
			margin-top: 30upx;

			.li {
				width: 20%;
				text-align: center;
				margin-bottom: 34upx;

				.name {
					margin-top: 18upx;
				}

				.img {
					background-image: url('~@/static/img/default-tubiao.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					-moz-background-size: 100% 100%;
					width: 96upx;
					height: 96upx;
					margin: 0 auto;

					>image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.index-top-warp {
			width: 100%;
			overflow: hidden;
			margin-top: 40upx;
			border-radius: 20upx;
			overflow: hidden;
			position: relative;

			// background: #fff;
			swiper {
				height: 250upx;
				width: 690upx;
				margin: 0 auto;
				border-radius: 20upx;
			}

			swiper-item {
				height: 250upx; //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
				width: 690upx;
				margin: 0 auto;
				border-radius: 20upx;
			}

			.swiper-item {
				background-image: url('~@/static/img/default-shouye-1.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;

				image {
					width: 100%;
					height: 250upx;
					border-radius: 20upx;
				}
			}

			.nav {
				padding: 0 40upx;
				text-align: left;

				&:after {
					content: "";
					height: 100upx;
					width: 1upx;
					background: #fff;
					display: inline-block;
					position: absolute;
					top: 50upx;
					left: 355upx;
					z-index: 9999;
				}

				height: 200upx;

				image {
					width: 100upx;
					height: 100upx;
				}

				position: relative;

				.item {
					text-align: center;
				}

			}

		}

		.attr {
			padding: 3px 5px;
			font-size: 10px;
			margin-left: 5px;
			border-radius: 30px;
		}
	}
</style>
