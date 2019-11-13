
<template>
	<view class="dot-main">
		<view class="items cf" :style="{width:listWidth}">
			<view class="item fll" :class="{'active':current==index}" v-for="(item,index) in list" :key="index"></view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
	.dot-main {
		width:100%;
		height: 40upx;
		position: relative;
		.items{
			margin: 0 auto;
			.item{
				width:16upx;
				height:4upx;
				background:#FFFFFF;
				border-radius:2upx;
				margin: 0 6upx;
			}
			.active{
				background:rgba(254,59,11,1);
			}
		}
		
	}
</style>
<script>
	export default {
		props: [ 'list','current','listWidth'],
		data() {
			return {
				
			};
		}
	}
</script>