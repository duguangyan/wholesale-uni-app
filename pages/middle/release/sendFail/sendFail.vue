<template>
	<view class="sendSuccess">
		<view class="warp">
			<view class="image">
				<image src="/static/imgs/icon-1041.png" mode=""></image>
			</view>
			<view class="fs34 text-333 fs-w mgt-10">
				发布失败
			</view>
			<view class="fs24 text-999 tip">
				货品发布失败，货品已自动 保存，请稍后再试
			</view>
			
			<view class="btn" @click="goBack">返回首页</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goBack(){
				uni.switchTab({
					url:'/pages/main/main'
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
			
			margin: 0 auto;
			margin-top: 50upx;
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
</style>
