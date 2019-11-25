<template>

	<view class="main">
		 <view class="titleNview-placing"></view>
		<view class="seach">
			<!-- <view class="bg"></view> -->
			<!--  #ifdef  MP-WEIXIN ||APP-PLUS || H5 -->
			<view class="content">
				<view class="fll img-1" @click="goClassify">
					<image src="../../static/imgs/search-left-1.png" mode=""></image>
					<view>分类</view>
				</view>
				<view class="img fll">
					<image src="../../static/imgs/icon-search-1.png"  @click="goSearch"></image>
				</view>
				<view class="flr img-2" @click="goOrder">
					<image src="../../static/imgs/search-order-1.png" mode=""></image>
					<view>进货单</view>
				</view>
			</view>
			
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<!-- <view class="img">
				<image src="../../static/img/icon-search-2.png"></image>
			</view> -->
			<!--  #endif -->
		</view>
		<!-- 轮播图 -->
		<view class="index-top-warp">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper @change="changeBanner" class="swiper" indicator-color="rgba(0,0,0,.3)" indicator-active-color='#FC2D2D' :indicator-dots="indicatorDots"
						 :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,index) in homeList.list[0].list[0].list[0].adPosition.adSet" :key="index" @click="goNextPage(item)">
								<view class="swiper-item">
									<image :src="item.path"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<SwiperDot class="dot" :listWidth="listWidth" :current="cur" :list="homeList.list[0].list[0].list[0].adPosition.adSet"></SwiperDot>
		</view>
		<!-- nav导航 -->
		<view class="nav cf">
			<view class="li fll" v-for="(item,index) in homeList.list[1].list[0].list" :key="index" @click="goSearchPage(item.name)">
				<view class="img">
					<image :src="item.imgPath"></image>
				</view>
				<view class="name fs24 text-333">{{item.name}}</view>
			</view>
		</view>


		<!-- <form bindsubmit="submitInfo" report-submit='true' > <button formType="submit"> 111111111111 </button> </form> -->
		<!-- <form @submit="submitInfo" report-submit="true">
	   	formId
	   	<button form-type="submit">Submit</button>
	   	<button form-type="reset">Reset</button>
	   </form> -->

		<!-- 广告 -->
		<view class="advs" @click="goadSet(homeList.list[2].list[0].list[0].adPosition.adSet[0])">
			<image :src="homeList.list[2].list[0].list[0].adPosition.adSet[0]?homeList.list[2].list[0].list[0].adPosition.adSet[0].path:''" mode=""></image>
		</view>
		<!-- 精选 -->
		<view class="seles">
			<view class="title">
				<image :src="homeList.list[3].list[0].list[0].imgPath"></image>
			</view>
			<view class="content">
				<view v-for="(item,index) in homeList.list[3].list[1].goodsDetailRespList" :key="index" @click="goGoodsDetail(item.shopId,item.id)">
					<Goodx :item='item'></Goodx>
				</view>
				
				<!-- <view class="item cf" v-for="(item,index) in homeList.list[3].list[1].goodsDetailRespList" :key="index" @click="goGoodsDetail(item.shopId,item.id)">
					<view class="img fll">
						<image :src="item.imgUri" mode=""></image>
					</view>
					<view class="warp fll" :class="{'Android': platform == 1}">
						<view class="fs28 ellipsis-line2">
							{{item.name}}
						</view>
						<view class="deliver">
							<text class="fs20 text-999">{{item.valueAddr}}</text>
							<span class="attr" v-for="attr in item.attrValDesc" :key="attr" :style="'background:' + calcAttr(attr).bg+';color:'+calcAttr(attr).color">{{attr}}</span>
						</view>
						<view class="price">
							<view class="fs34 text-red"><text class="fs24">￥</text>{{item.minPrice}}<text class="fs24">元/{{item.unitName}}起</text></view>
						</view>
						<view class="address cf">
							<view class="fll img">
								<image src="../../static/imgs/main-icon-1.png" mode=""></image>
							</view>
<<<<<<< HEAD
							<view class="fll fs20 text-999">河北省廊坊市固安县 <text class="mgl-20">舒尚飞</text></view>
=======
							<view class="fll fs20 text-999">{{item.shopArea}} <text class="mgl-20">{{item.realName}}</text></view>
							<!-- <view class="flr fs20 text-999">{{item.valueAddr}}</view> -->
>>>>>>> origin/soaly-v1
						</view>
					</view>
				</view> -->
			</view>

		</view>
		<!-- <TabBar :checkIndex='checkIndex'></TabBar> -->

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
	export default {
		data() {
			return {
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
				cur:0,
				listWidth:0,
				roleId:'',
        colorPattern: {
        	'红': '255,0,0',
        	'黄': '255,55,0',
        	'蓝': '30,30,255',
        	'紫': '200,50,248',
        },
			}
		},
		components: {
			TabBar,SwiperDot,Goodx
		},
		onTabItemTap(e){
			uni.setStorageSync('pagePath','main')
		},
		onLoad() {
			uni.setStorageSync('pagePath','main')
			// 版本更新 （APP）
			// #ifdef APP-PLUS
			this.updataApp()
			// #endif	


			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
		},
		onShow() {
			
			uni.hideLoading()
			// 获取首页banner
			this.getHomeList()
			// 判断用户类型
			this.assessUserType()
			
			
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
      // 计算颜色
      calcAttr(attr){
      	let str = attr.substr(0,1)
      	let color = this.colorPattern[str] || '165,165,165'
      	return {
      		color: 'rgba('+color+',1)',
      		bg: 'rgba('+color+',0.1)'
      	}
      	
      },
			// 判断用户类型
			assessUserType(){
				// 设置底部tab样式
				this.roleId = uni.getStorageSync('roleId')
				if(this.roleId){
					if(this.roleId == '20002'){
						uni.setTabBarItem({
						  index: 1,
						  text: '代办',
						  iconPath: '/static/img/2.1.png',
						  selectedIconPath: '/static/img/2.2.png'
						})
						
					} else if(this.roleId == '20001') {
						uni.setTabBarItem({
						  index: 1,
						  text: '我要卖',
						  iconPath: '/static/img/4.1.png',
						  selectedIconPath: '/static/img/4.2.png'
						})
					}
				}
			},
			changeBanner(e) {
				this.cur = e.detail.current;
			},
			// 显示分类
			goClassify(){
				uni.navigateTo({
					url:'/pages/main/classify/classify'
				})
			},
			//去进货单
			goOrder(){
				uni.navigateTo({
					url:'/pages/order/order'
				})
			},
			// 更新版本
			updataApp() {
				// #ifdef APP-PLUS
				// 安卓
				let data = {
					code: '001'
				}
				// ios
				if(this.platform == '2'){
					data.code = '002'
				}
				appUpdate(data).then(res => {
					console.log(res)
					if (res.code == '1000') {
						// var req = { //升级检测数据
						//  "appid": plus.runtime.appid,  
						//  "version": plus.runtime.version  
						// }
						if(res.data){
							// 判断是否强制更新
							let forceUpdate = 0
							if(res.data.forceUpdate == 1){
								forceUpdate = 1
							}
							plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
								// let nowVersions = plus.runtime.version.split('.');
								let nowVersions = wgtinfo.version.split('.');
								let serverVersions = res.data.version.split('.');
								console.log(nowVersions + '-' + serverVersions)
								if (nowVersions[1] < serverVersions[1]) { // 更新大版本
									if (res.data.packagePath) {
										uni.showModal({
											title: '版本更新',
											content: "有新的版本发布,是否立即进行新版本下载？",
											cancelText:forceUpdate == 0?'取消':'退出',
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
													if(forceUpdate == 1){
														 // plus.runtime.quit();
														 plus.os.name=="Android"?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
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
												cancelText:forceUpdate == 0?'取消':'退出',
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
																		console.log('install success...',e);
																		uni.hideLoading();
																		plus.runtime.restart();
																	}, function(e) {
																		uni.hideLoading();
																		console.error('install fail...', e);
																	});
																}
															}
														});
														setTimeout(function () {
														    uni.hideLoading();
														}, 2000);
													}  else if (model.cancel) {
														console.log('用户点击取消');
														console.log(forceUpdate)
														if(forceUpdate == 1){
															// plus.runtime.quit();
															plus.os.name=="Android"?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
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
			goSearchPage(name) {
				uni.navigateTo({
					url: '/pages/order/goodsList/goodsList?search=' + name
				})
			},
			// 去搜索页面
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
						this.homeList.list[3].list[1].goodsDetailRespList.forEach((item, index) => {
							item.valueAddr = item.valueAddr.substring(0, 5)
						})
						
						this.listWidth = uni.upx2px(this.homeList.list[3].list[1].goodsDetailRespList.length * 26) + 'px';
					}
				})
			},
			goNextPage(item) {

				addHit({
					id: item.id
				})

				if (item.type == 5) {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=' + item.shopId + '&goodsId=' + item.id
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
			chooseColorValue(v){
				let obg = {}
				if(v.indexOf('黄') != '-1'){
					obg = {
						bgColor:'#FF5500',
						fontColor:'#FFF6F0'
					}
				}else if(v.indexOf('红') != '-1'){
					obg = {
						bgColor:'#FFF0F0',
						fontColor:'#FF0000'
					}
				}else if(v.indexOf('紫') != '-1'){
					obg = {
						bgColor:'#FBF0FF',
						fontColor:'#C42AFD'
					}
				}
				return obj;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dot{
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

			.content{
				.img-1{
					text-align: center;
					>image{
						width: 36upx;
						height: 36upx;
						margin: 0 auto;
					}
					margin-left: 30upx;
					font-size: 20upx;
					color: #48484C;
				}
				.img-2{
					text-align: center;
					>image{
						width: 36upx;
						height: 36upx;
						margin: 0 auto;
					}
					font-size: 20upx;
					color: #48484C;
					margin-right: 30upx;
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
						.deliver{
							.tip{
								background: #999;
								color: #fff;
								display: inline-block;
								border-radius: 20upx;
								margin-left: 10upx;
								padding: 2upx 4upx;
							}
						}
						.address{
							.img{
								width: 28upx;
								height: 22upx;
								margin-right: 6upx;
								>image{
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
				width: 240upx;
				height: 40upx;
				margin: 30upx auto;
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
       margin-top: 20upx;
			.li {
				width: 20%;
				text-align: center;
        margin-bottom: 20upx;

				.name {
					margin-top: 4upx;
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
        padding: 3px  5px;
        font-size: 10px;
        margin-left: 5px;
        border-radius: 30px;
    }
	}
</style>
