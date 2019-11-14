<template>
	<view class="cash">
		<view class="top cf">
			<view class="fll fs32 text-333">提现到银行卡</view>
			<view class="flr img"><image src="../../../../../static/imgs/right.png" mode=""></image></view>
			<view class="flr fs28 text-theme mgr-20">招商银行(8888)</view>
		</view>
		<view class="content">
			<view class="cf">
				<view class="fll fs26 text-333 price-icon">￥</view>
				<view class="fll">
					<input class="text-333" type="text" placeholder="请输入金额">
				</view>
				<view class="flr fs24 text-333">
					全部提现
				</view>
			</view>
		</view>
		<view class="tip cf">
			<view class="img fll">
				<image src="../../../../../static/imgs/icon-1018.png" mode=""></image>
			</view>
			<view class="text fs24 text-999 fll">
				账户余额¥6050.06，其中¥1000不可提现
			</view>
		</view>
		<view class="big-btn-active" @click="getCash">提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getCash(){
				uni.redirectTo({
					url:'/pages/middle/release/account/cash/cashSuccess'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash{
		background: #fff;
		min-height: 100vh;
		padding-top: 30upx;
		.tip{
			margin: 30upx 0 50upx 30upx;
			
			.img{
				width: 24upx;
				height: 24upx;
				position: relative;
				top: -10upx;
				margin-right: 10upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.content{
			height: 100upx;
			line-height: 100upx;
			margin: 0 30upx;
			margin-top: 30upx;
			border-bottom: 1upx solid #f5f5f5;
			.price-icon{
				position: relative;
				top: 10upx;
				font-weight: 600;
			}
			.cf{
				input{
					position: relative;
					top: 30upx;
					padding-left: 20upx;
					font-weight: 600;
					font-size: 40upx;
				}
			}
		}
		.top{
			height: 90upx;
			margin: 0 30upx;
			padding: 0 30upx;
			line-height: 90upx;
			background: #F5F5F5;
			.img{
				width: 24upx;
				height: 24upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
