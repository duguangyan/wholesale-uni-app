<template>
	<view class="video">
		<video :src="url" :autoplay="true" controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad(options) {
			this.url= options.url
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.video{
		height: 100vh;
		background: #000;
		video{
			width: 100%;
			line-height: 100%;
			margin-top: 100upx;
		}
	}
	
</style>

