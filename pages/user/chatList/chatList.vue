<template>
	<view>
		<view v-if="token != ''">
			<web-view :src="url" @message="onMessage"></web-view>
		</view>
		<view v-if="token == ''" @click="goLogin">
			<view class="image">
				<image src="/static/imgs/message-icon.png" mode=""></image>
			</view>
			<view class="fs24 text-999">还没有互动消息 赶快去登陆吧！</view>
			<view class="login-btn">
				请登录
			</view>
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
						this.url = 'https://im.qinlvny.com/#/session?id='+uid+'&tk='+res.data
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
	.image{
		width: 200upx;
		height: 200upx;
		margin: 0 auto;
		>image{
			width: 100%;
			height: 100%;
		}
		padding-top: 300upx;
	}
	.text-999{
		width: 170upx;
		margin: 30upx auto;
		line-height: 40upx;
	}
	.login-btn{
		width:150upx;
		height:60upx;
		border:1upx solid rgba(254,59,11,1);
		border-radius:30upx;
		margin:  0 auto;
		text-align: center;
		line-height: 58upx;
		color: rgba(254,59,11,1);
	}
</style>
