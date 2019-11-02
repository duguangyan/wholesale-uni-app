<template>
	
	<web-view src="https://m.qinlvny.com/static/protocal.html"></web-view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.protocal {
		text-align: center;
		color: #999;
		font-size: 24upx;
		background-color: #f5f5f5;
		.p1{
			text-align: left;
			font-size: 32upx;
		}
		.p2{
			text-align: left;
			font-size: 28upx;
		}
		.content {
			padding: 30upx 30upx 70upx 30upx;
			-webkit-overflow-scrolling: scrolling;
			overflow: scroll;
			height: calc(100%-40upx);
			font-size: 28upx;
			white-space: pre-wrap;
			text-align: left;
		}
	}
</style>
