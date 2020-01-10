<template>
	<view>
		
	</view>
</template>

<script>
	import { getShopInfoByUserId, getImToken } from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				userId :'',
				tk :'',
				id :''
			};
		},
		onLoad(options) {
			uni.showLoading({
			    title: '加载中'
			});
			this.userId = options.userId
			this.tk     = options.tk
			this.id     = options.id
			// http://wsm.qinlvny.com/#/pages/common/bridge/bridge?userId=fc35e5a61462ee6b9d15328a111bd114&tk=36b1211a126789eda280ad46632cd650&id=6f80f809fdafade2e2f34bf064714a54
		},
		onShow() {
			
			this.shopInfoByUserId()

		},
		methods:{
			shopInfoByUserId(){
				let data = {
					userId: this.userId
				}
				getShopInfoByUserId(data).then(res=>{
					console.log(res)
					uni.hideLoading()
					if(res.code == '1000' && res.data){
						uni.navigateTo({
							url:'/pages/shop/shop/shop?userId='+ res.data.id 
						})
					}else{
						uni.switchTab({
							url: '/pages/user/chatList/chatList'
						})
					}
				}).catch(err=>{		
					uni.switchTab({
						url: '/pages/user/chatList/chatList'
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
