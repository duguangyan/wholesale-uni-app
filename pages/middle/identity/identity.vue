<template>
	<view class="identity">
		<NavigationBar :title="title" :isBack="isBack"></NavigationBar>
		<view class="item" v-for="(item,index) in items" :key="index" @click="goPage(index)">
			<view class="image">
				<image :src="item.imgUrl"></image>
			</view>
			<view class="text">{{item.text}}</view>
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
				items:[]
			};
		},
		components:{ NavigationBar },
		onBackPress(){
			T.tips('请选择角色')
			return false
		},
		onLoad() {
			
		},
		onShow() {
			let userRealInfo = uni.getStorageSync('userRealInfo')
			if(userRealInfo){
				this.items = [
					{
						text:'我是代办',
						imgUrl:'../../../static/imgs/icon-1.png'
					},
					{
						text:'我要卖货',
						imgUrl:'../../../static/imgs/icon-2.png'
					}
				]
			}else{
				this.items = [
					{
						text:'我是代办',
						imgUrl:'../../../static/imgs/icon-1.png'
					},
					{
						text:'我要卖货',
						imgUrl:'../../../static/imgs/icon-2.png'
					},
					{
						text:'我要采购',
						imgUrl:'../../../static/imgs/icon-3.png'
					},
				]
			}
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
					case 2:
						uni.navigateTo({
							url:'/pages/middle/identity/realname/buyer'
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
		min-height: 100vh;
		padding-top: 100upx;
		.item{
			text-align: center;
			margin-top: 120upx;
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
