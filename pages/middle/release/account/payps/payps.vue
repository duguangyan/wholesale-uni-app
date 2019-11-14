<template>
	<view class="payps">
		<view class="items">
			<view class="item cf" @click="goReset">
				<view class="fll">重置支付密码</view>
				<view class="flr image"><image src="../../../../../static/imgs/right.png" mode=""></image></view>
			</view>
			<view class="item cf" @click="goRevise">
				<view class="fll">修改支付密码</view>
				<view class="flr image"><image src="../../../../../static/imgs/right.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 去重置密码页面
			goReset(){
				uni.redirectTo({
					url:'/pages/middle/release/account/payps/verifiyPhone'
				})
			},
			// 去修改密码页面
			goRevise(){
				uni.redirectTo({
					url:'/pages/middle/release/account/payps/resPassword'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.payps{
		background: #fff;
		min-height: 100vh;
		.items{
			.item{
				height: 100upx;
				line-height: 100upx;
				margin-left: 30upx;
				padding-right: 30upx;
				font-size: 30upx;
				color: #333;
				border-bottom: 1upx solid #f5f5f5;
				.image{
					width: 24upx;
					height: 24upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
