<template>
	<view class="add">
		<view class="img">
			<image src="/static/imgs/icon-1019.png" mode=""></image>
		</view>
		<view class="title fs28 text-333">
			你已成功提交企业对公账户认证信息，请耐心等待！
		</view>
		<view class="tip fs24 text-999">
			打款需要2~3个工作日，请关注银行通知及时打款确认
		</view>
		<view class="big-btn-active" @click="showDetail">
			查看进度
		</view>
	</view>
</template>

<script>
	import { getBankInsert } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
		
		},
		methods:{
			showDetail(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		background: #fff;
		min-height: 100vh;
		.img{
			width: 120upx;
			height: 120upx;
			>image{
				width: 100%;
				height: 100%;
			}
			margin: 0 auto;
			padding-top: 100upx;
		}
		.title{
			margin-top: 60upx;
		}
		.title,.tip{
			text-align: center;
			line-height: 60upx;
		}
		.tip{
			margin-bottom: 100upx;
		}
	}
</style>
