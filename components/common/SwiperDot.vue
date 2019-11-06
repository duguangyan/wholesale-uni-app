
<template>
	<view class="dot-main">
		<text class="item">{{(current + 1) +" / "+list.length}}</text>
		<view class="bg"></view>
	</view>
</template>
<style lang="scss" scoped>
	.dot-main {
		width:100%;
		height: 40upx;
		position: relative;
		.bg{
			background: #000;
			opacity: .3;
			width: 100upx;
			height: 40upx;
			position: absolute;
			right: 30upx;
			bottom: 0;
			border-radius: 40upx;
		}
		.item{
			padding: 0upx 20upx;
			border-radius: 40upx;
			color: #fff;
			text-align: center;
			line-height: 40upx;
			position: absolute;
			z-index: 9999;
			right: 36upx;
			font-size: 24upx;
		}
	}
</style>
<script>
	export default {
		props: [ 'list','current'],
		data() {
			return {
				
			};
		}
	}
</script>