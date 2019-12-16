<template>
	<view class="cash">
		<view class="content">
			<view class="image">
				<image src="/static/imgs/icon-1019.png"></image>
			</view>
			<view class="fs34 text-333">提交成功</view>
			<view class="fs24 text-999 mgt-20">
				提现提交成功，到账时间以银行为准
			</view>
			<view class="fs20 text-999 mgt-20">
				申请时间: {{time}}
			</view>
		</view>
		<view class="big-btn-active" @click="goBack">返回账户</view>
	</view>
</template>

<script>
	import util from "@/utils/util"
	export default {
		data() {
			return {
				time:''
			};
		},
		onLoad() {
			this.time = util.getNowFormatDate()
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:2
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash{
		background: #fff;
		min-height: 100vh;
		.content{
			text-align: center;
			.image{
				width: 120upx;
				height: 120upx;
				margin: 0 auto;
				padding-top: 100upx;
				padding-bottom: 20upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.big-btn-active{
			margin-top: 50upx;
		}
	}
</style>
