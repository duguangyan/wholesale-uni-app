<template>
	<view class="agency">
		<view class="sf">
			<image :src="agency == 0 ?'../../../static/imgs/sfcat-1.png':'../../../static/imgs/sfcat-2.png'" mode=""></image>
		</view>
		<view class="text">
			
			{{agency == 0?'证件信息真实完整，内容清晰可见 文字无遮挡':'证件内容清晰可见必须在有效期限内 请勿上传时间过期证件'}}
			
		</view>
		
		<view class="big-btn-active" @click="getImage">{{agency == 0?'去拍摄正面':'去拍摄反面'}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agency:0
			};
		},
		onLoad(options) {
			this.agency = options.agency
		},
		onShow() {
			if(this.agency == 0){
				uni.setNavigationBarTitle({
				    title: '身份证正面示例'
				});
			}else if(this.agency == 1){
				uni.setNavigationBarTitle({
				    title: '身份证反面示例'
				});
			}
		},
		methods:{
			getImage(){
				let _this = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera'], //从相机选择
				    success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						let url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/upms/userImg/upload' : 'https://m.qinlvny.com/upms/userImg/upload'
						uni.uploadFile({
							url: url, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								let res = JSON.parse(uploadFileRes.data)
								if (res.code === '1000') {
									if(_this.agency == 0){
										uni.setStorageSync('agencyImgUpload1',res.data)
										uni.navigateBack({
											delta:1
										})
									}else{
										uni.setStorageSync('agencyImgUpload2',res.data)
										uni.navigateBack({
											delta:1
										})
									}
								} else {
									T.tips(res.message || '上传图片失败')
								}
							},
							fail:(err) => {
								T.tips('上传图片失败')
							}
						});
				    }
				});  
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agency{
		
		.sf{
			width: 678upx;
			height: 420upx;
			margin: 0 auto;
			margin-top: 50upx;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			width: 440upx;
			margin: 0 auto;
			font-size: 30upx;
			color: #333;
			line-height: 50upx;
			margin-top: 40upx;
			text-align: center;
		}
		.big-btn-active{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
	}
</style>
