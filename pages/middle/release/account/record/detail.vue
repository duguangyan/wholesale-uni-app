<template>
	<view class="detail">
		<view class="top">
			<view><text class="fs48 text-333">-300</text> <text class="fs24 text-333">元</text></view>
			<view class="fs24 text-999">已提现</view>
		</view>
		<view class="items">
			<view class="item">
				<view class="fll fs30 text-333">到账银行</view>
				<view class="flr fs30 text-999">招商银行(6666)</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">提现金额</view>
				<view class="flr fs24 text-999">5050.05</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">申请时间</view>
				<view class="flr fs24 text-999">2019-09-25 15:35:25</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">到账时间</view>
				<view class="flr fs24 text-999">2019-09-25 15:39:25</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">提现单号</view>
				<view class="flr fs24 text-999">1521252525352025</view>
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
			
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		background: #FFFFFF;
		min-height: 100vh;
		.items{
			.item{
				height: 100upx;
				line-height: 100upx;
				margin-left: 30upx;
				padding-right: 30upx;
				border-bottom: 1upx solid #f5f5f5;
			}
		}
		.top{
			text-align: center;
			height: 100upx;
			padding: 30upx 0 60upx 0;
			border-top: 1upx solid #f5f5f5;
			border-bottom: 20upx solid #F5F5F5;
		}
	}
</style>
