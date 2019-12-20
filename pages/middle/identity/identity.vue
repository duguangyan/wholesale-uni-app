<template>
	<view class="identity">
		<NavigationBar :title="title" :isBack="isBack"></NavigationBar>
		<view class="items cf">
			<view class="item fll" v-for="(item,index) in items" :key="index" @click="goPage(index)">
				<view class="image">
					<image :src="item.imgUrl"></image>
				</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import NavigationBar from "@/components/common/NavigationBar.vue"
	import T from "@/utils/tips.js"
	export default {
		data() {
			return {
				title:'选择身份',
				isBack: false,
				items:[
					{
						text:'我是代办',
						imgUrl:'/static/imgs/icon-1.png'
					},
					{
						text:'我是种植户',
						imgUrl:'/static/imgs/icon-2.png'
					},
					{
						text:'我是批发商',
						imgUrl:'/static/imgs/icon-3.png'
					},
					{
						text:'我是企业',
						imgUrl:'/static/imgs/icon-4.png'
					},
				]
			};
		},
		components:{ NavigationBar },
		onBackPress(){
			T.tips('请选择角色')
			return true
		},
		onLoad() {
			
		},
		onShow() {
      // 需要实名标记
			// uni.setStorageSync('needIdentify','1')
		},
		methods:{
			goPage(index){
				switch (index){
					case 0:
					// 代办
						uni.navigateTo({
							url:'/pages/middle/identity/realname/agency?hasfrom=1'
						})
						break;
					case 1:
					// 货主
						uni.navigateTo({
							url:'/pages/middle/identity/realname/agency?hasfrom=2'
						})
						break;
					// 买家		
					case 2:
						uni.navigateTo({
							url:'/pages/middle/identity/realname/buyer'
						})
						break;
					case 3:
					// 企业
						uni.navigateTo({
							url:'/pages/middle/identity/realname/company'
						})
						break;	
					default:
						break;
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.identity{
		background: #fff;
		height: 100vh;
		// padding-top: 100upx;
		overflow: hidden;
		.items{
			margin-top: 90upx;
      padding: 0 20upx;
		}
		.item{
			text-align: center;
			margin-top: 120upx;
			width: 50%;
			.image{
				width: 180upx;
				height: 180upx;
				margin: 0 auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				font-size: 30upx;
				color: #333;
				margin-top: 20upx;
			}
		}
	}
</style>
