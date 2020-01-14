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
			// this.url = decodeURIComponent(options.url)
			// console.log('decodeURIComponent-------------')
			// console.log(this.url)
			
			let tid = options.tid
			let id = options.id
			let tk = options.tk
			this.url = 'https://im.qinlvny.com/#/chat/p2p-' + tid + '?id=' + id + '&tk=' + tk
			console.log('chatUrl',this.url)
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
  