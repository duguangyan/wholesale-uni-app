<template>
	
    <view class="main">
		<view class="seach" @click="goSearch">
			<!-- <view class="bg"></view> -->
			<!--  #ifdef  APP-PLUS || H5 -->
			<view class="img">
				<image src="../../static/img/icon-search-1.png"></image>
			</view>
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<view class="img">
				<image src="../../static/img/icon-search-2.png"></image>
			</view>
			<!--  #endif -->
		</view>
		<!-- 轮播图 -->
       <view class="index-top-warp">
       	<view class="uni-padding-wrap">
       		<view class="page-section swiper">
       			<view class="page-section-spacing">
       				<swiper class="swiper" indicator-color="rgba(0,0,0,.3)" indicator-active-color='#FC2D2D' :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
       					<swiper-item v-for="(item,index) in homeList.list[0].list[0].list[0].adPosition.adSet" :key="index" @click="goNextPage(item)">
       						<view class="swiper-item">
       							<image :src="item.path"></image>
       						</view>
       					</swiper-item>
       				</swiper>
       			</view>
       		</view>
       	</view>
       </view>	
       <!-- nav导航 -->
	   <view class="nav cf">
		   <view class="li fll" v-for="(item,index) in homeList.list[1].list[0].list" :key="index" @click="goSearchPage(item.name)">
			   <view class="img">
				   <image :src="item.imgPath || '../../static/img/img-def-middle.png'"></image>
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
		   <image :src="homeList.list[2].list[0].list[0].adPosition.adSet[0].path || '../../static/img/img-def-large.png'" mode=""></image>
	   </view>
	   <!-- 精选 -->
	   <view class="seles">
		   <view class="title">
			   <image :src="homeList.list[3].list[0].list[0].imgPath || '../../static/img/img-def-large.png'" mode=""></image>
		   </view>
		   <view class="content cf">
			   <view class="item fll" v-for="(item,index) in homeList.list[3].list[1].goodsDetailRespList" :key="index" @click="goGoodsDetail(item.shopId,item.id)">
				  <view class="img">
					  <image :src="item.imgUri" mode=""></image>
				  </view>
				  <view class="warp" :class="{'Android': platform == 1}">
					  <view class="fs28 ellipsis-line2">
					  		{{item.name}}
					  </view>
					  <view class="cf mgt-20">
						  <view class="fll fs36 text-red"><text class="fs24">￥</text>{{item.minPrice}}</view>
						  <view class="add flr fs20 text-999">{{item.valueAddr}}</view>
					  </view>
				  </view>
				 
			   </view>
		   </view>
		  
	   </view>
	   <!-- <TabBar :checkIndex='checkIndex'></TabBar> -->
	   
    </view>
</template>

<script>
    import { mapState } from 'vuex'
	import { getHomeList, addHit } from '../../api/mainApi.js'
	import T from '@/utils/tips.js'
	import TabBar from '@/components/common/TabBar.vue'
    export default {
		data() {
			return {
				checkIndex:0,
				homeList:{},
				banner:[], // 轮播图
				navs:[],   // 导航nav
				advs:[],   // 广告
				seles:[],  // 精选
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				platform: 0
			}
		},
		components:{TabBar},
        onLoad() {
			
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
        },
		onShow() {
			// 获取首页banner
			this.getHomeList()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			// 获取首页banner
			this.getHomeList()
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		methods:{
			// 去广告页面
			goadSet(item){
				addHit({ id: item.id })
				if (item.type == 1) {
					uni.navigateTo({
						url:'/pages/common/webview/webview?url='+ item.url
					})
				}else if(item.type == 5){
					uni.navigateTo({
						url:'/pages/order/goodsDetail/goodsDetail?shopId=1&goodsId='+item.url
					})
				}
			},
			// nav 去搜索页面
			goSearchPage(name){
				uni.navigateTo({
					url:'/pages/order/goodsList/goodsList?search='+name
				})
			},
			// 去搜索页面
			goSearch(){
				uni.navigateTo({
					url:'/pages/main/search/search'
				})
			},
			// 获取首页banner
			getHomeList(){
				getHomeList({ parentId: 1 }).then((res) => {
					if(res.code == '1000'){
						this.homeList = res.data
						this.homeList.list[3].list[1].goodsDetailRespList.forEach((item,index) => {
							let arr = item.valueAddr.split('-')
							item.valueAddr = arr[arr.length-1]
						})
					}
				})
			},
			goNextPage(item){
				
				addHit({ id: item.id })
				
				if(item.type == 5){
					uni.navigateTo({
					    url:'/pages/order/goodsDetail/goodsDetail?shopId='+item.shopId + '&goodsId='+ item.id
					});
				}else if(item.type == 1){
					uni.navigateTo({
						url:'/pages/common/webview/webview?url='+item.url
					})
				}
			},
			goGoodsDetail(shopId,goodsId){
				uni.navigateTo({
					url:'/pages/order/goodsDetail/goodsDetail?shopId='+shopId + '&goodsId='+goodsId
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.main{
		// padding-bottom: 100upx;
		.bb1{
			position: fixed;
			height: 0;
			bottom: 0upx;
			border: 0.5upx solid #f5f5f5;
			background: #f0f0f0;
			width: 100%;
		}
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		.seach{
			width:670upx;
			height:60upx;
			margin: 0 auto;
			position: relative;
			top: 80upx;
			
			z-index: 99999;
			
			.bg{
				width:100%;
				height:100%;
				background: #fff;
				opacity: .4;
				border-radius:30upx;
			}
			
			.name{
				text-align: center;
				position: absolute;
				top:6upx;
				left: 300upx;
			}
			
			
			
			/*  #ifdef APP-PLUS || H5  */
			.img{
				// width: 24upx;
				height: 60upx;
				width: 670upx;
				z-index: 99999;
				position: absolute;
				left: 50%;
				margin-left: -335upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			/*  #endif  */
			
			/*  #ifdef MP-WEIXIN  */
			.img{
				// width: 24upx;
				height: 60upx;
				width: 450upx;
				z-index: 99999;
				position: absolute;
				left: 30upx;
				top: -30upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			/*  #endif  */
			
		}
		
		
		.seles{
			.content{
				margin: 0 30upx;
				.item{
					width: 340upx;
					height: 520upx;
					border-radius:10upx;
					overflow: hidden;
					background: #fff;
					margin-bottom: 20upx;
					padding-bottom: 20upx;
					.warp{
						margin-top: 18upx;
						padding: 4upx 20upx;
						position: relative;
						.ellipsis-line2{
							height: 78upx;
							line-height: 39upx;
						}
						.add{
							position: absolute;
							right: 20upx;
							bottom: 12upx;
						}
						.mgt-20{
							margin-top: 26upx !important;
						}
					}
					.Android{
						.add{
						
						}
					}
					.img{
						width: 340upx;
						height: 355upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.item:nth-child(even){
					position: relative;
					left: 20upx;
				}
			}
		}
		.seles{
			.title{
				width: 240upx;
				height: 40upx;
				margin: 30upx auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.advs{
			width: 690upx;
			height: 140upx;
			margin: 0 auto;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.nav{
			margin:20upx 0;
			padding-top: 300upx;
			.li{
				width: 20%;
				text-align: center;
				.name{
					margin-top: 4upx;
				}
				.img{
					width: 96upx;
					height: 96upx;
					margin: 0 auto;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.index-top-warp {
			position: absolute;
			top: 0;
			width: 100%;
			overflow: hidden;
			// background: #fff;
			swiper {
				height: 360upx
			}
			swiper-item {
				height: 360upx //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
			}
			.swiper-item {
				image {
					width: 100%;
					height: 360upx;
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
    }
</style>
