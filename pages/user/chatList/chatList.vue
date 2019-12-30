<template>
	<view>
		<web-view :src="url" @message="onMessage"></web-view>
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
			uni.showModal({
				content:decodeURIComponent(options.url)
			})
			this.url = decodeURIComponent(options.url)
		},
		methods:{
			onMessage(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">

</style>
