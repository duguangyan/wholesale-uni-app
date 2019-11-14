<template>
	<view class="verifiy">
		<view class="tip">本次操作需验证手机号码，我们会向你198****666发送验证码</view>
		<view class="content">
			<view class="cf">
				<view class="fll fs30 text-333">验证码</view>
				<view class="fll">
					<input class="fs30" type="number" placeholder="请输入验证码" />
				</view>
				<view class="flr fs30 text-theme">
					获取验证码
				</view>
			</view>
		</view>
		<view class="big-btn-active" @click="goresPassword">
			下一步
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
			// 去设置密码
			goresPassword(){
				uni.redirectTo({
					url:'/pages/middle/release/account/payps/resPassword'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.verifiy{
		background: #fff;
		min-height: 100vh;
		.content{
			height: 100upx;
			line-height: 100upx;
			margin: 0 30upx;
			border-bottom: 1upx solid #F5F5F5;
			.cf{
				.fll{
					input{
						position: relative;
						top: 28upx;
						left: 20upx;
					}
				}
			}
			
		}
		.tip{
			height: 80upx;
			line-height: 80upx;
			padding: 0 30upx;
			font-size: 24upx;
			color: #999;
			background: #F5F5F5;
		}
		.big-btn-active{
			margin-top: 50upx;
		}
	}
</style>
