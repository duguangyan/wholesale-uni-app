<template>
	<view>
		<view v-if="token != ''">
			<web-view :src="url" @message="onMessage"></web-view>
		</view>
		<view v-if="token == ''" @click="goLogin">
			请登录
		</view>
	</view>
</template>

<script>
	import { getImToken } from "@/api/userApi.js"
	import T from "@/utils/tips.js"
	export default {
		data() {
			return {
				url:'',
				token:''
			};
		},
		onLoad(options) {
			// uni.showModal({
			// 	content:decodeURIComponent(options.url)
			// })
			console.log(decodeURIComponent(options.url))
			this.url = decodeURIComponent(options.url)
		},
		onShow() {
			this.token = uni.getStorageSync('access_token')
			let token  = this.token
			if (token) {
				getImToken().then(res=>{
					if(res.code == '1000'){
						let uid  = uni.getStorageSync('uid')
						this.url = 'http://im.qinlvny.com/#/session?id='+uid+'&tk='+res.data
						console.log(this.url)
						}else{
						T.tips("请求IM数据失败")
					}
				})
			} else {
				T.tips("请先登录")
			}
			
		},
		methods:{
			goLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			onMessage(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">

</style>
