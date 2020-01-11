<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
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
			this.url = decodeURIComponent(options.url)
		},
		methods:{
			getMessage(e){
				  console.log(e.detail.data);
			}
		}
	}
</script>

<style lang="scss">

</style>
  