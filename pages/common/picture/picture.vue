<template>
	<view class="picture">
		<view class="img">
			<image :src="url" mode="aspectFit"></image>
		</view>
		
		<view class="big-btn-active" @click="del">删除图片</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				index:''
			};
		},
		onLoad(options) {
			this.url = options.url
			this.index = options.index
			console.log(this.url)
			console.log(this.index)
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: '1/1'
			});
		},
		methods:{
			del(){
				let userApply = ''
				if(uni.getStorageSync('userApply')){
					userApply = JSON.parse(uni.getStorageSync('userApply'))
				}
				if(this.index == 0){
					uni.setStorageSync('cardImgFront','')
					if(uni.getStorageSync('userApply')){
						userApply.cardImgFront = ''
					}
				}else if(this.index == 1){
					uni.setStorageSync('cardImgReverse','')
					if(uni.getStorageSync('userApply')){
						userApply.cardImgReverse = ''
					}
				}else if(this.index == 2){
					uni.setStorageSync('licenseImage','')
					if(uni.getStorageSync('userApply')){
						userApply.licenseImage = ''
					}
				}
				if(uni.getStorageSync('userApply')){
					uni.setStorageSync('userApply',JSON.stringify(userApply))
				}
				uni.navigateBack({
					delta:1
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.picture{
		.big-btn-active{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
		.img{
			width: 100%;
			height: 100vh;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
</style>
