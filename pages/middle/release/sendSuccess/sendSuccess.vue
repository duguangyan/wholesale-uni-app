<template>
	<view class="sendSuccess">
		<view class="warp">
			<view class="image">
				<image src="../../../../static/imgs/icon-1019.png" mode=""></image>
			</view>
			<view class="fs34 text-333 fs-w mgt-10">
				等待审核
			</view>
			<view class="fs24 text-999 tip">
				你可以在“我要卖-我的货品” 查看和管理你发布过的货品信息
			</view>
			<view class="cf btn">
				<view class="fll" @click="goBack">返回首页</view>
				<view class="flr" @click="resBack">再发一条</view>
			</view>
			
		</view>
		
		<view class="big-btn-active" @click="showBack">预览</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			// 去除缓存
			this.doClearStorageSync()
		},
		methods:{
			// 去除缓存
			doClearStorageSync(){
				uni.clearStorageSync('goodsTitile')
				uni.clearStorageSync('varieties')
				uni.clearStorageSync('addCategoryAddress')
				uni.clearStorageSync('addCategoryAttributes')
				uni.clearStorageSync('categorysInput')
				uni.clearStorageSync('categorysValues')
				uni.clearStorageSync('attribute')
				uni.clearStorageSync('goodsSkuList')
				uni.clearStorageSync('textareaValue')
			},
			// 返回首页
			goBack(){
				uni.switchTab({
					url:'/pages/main/main'
				})
			},
			// 再发一条
			resBack(){
				uni.redirectTo({
					url:'/pages/middle/release/release'
				})
			},
			// 预览
			showBack(){
				uni.redirectTo({
					url:'/pages/middle/release/release'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sendSuccess{
		background: #fff;
		min-height: 100vh;
	
		
		.warp{
			width: 440upx;
			margin: 0 auto;
			text-align:center;
			.tip{
				width: 340upx;
				margin: 0 auto;
				line-height: 40upx;
				margin-top: 20upx;
			}
		}
		.big-btn-active{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
		.image{
			width: 80upx;
			height: 80upx;
			margin: 0 auto;
			padding-top: 320upx;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.btn{
			margin-top: 50upx;
			.fll,.flr{
				width:180upx;
				height:60upx;
				line-height: 60upx;
				text-align: center;
				border:1upx solid rgba(240,240,240,1);
				border-radius:30upx;
				color: #333333;
				font-size: 24upx;
			}
		}
	}
</style>
