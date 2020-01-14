<template>
	<view class="send">
		<view class="tip cf" v-if="isTip" @click="hideTip"><text class="fll">注：只有平台注册的代办和货主才有资格发布哦</text>  <text class="flr">x</text></view>
		<view class="title">
			我有货,找市场代卖
		</view>
		<view class="items">
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>货品名称</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>货品品种</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>产地</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>供货能力</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>规格描述</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
		</view>
		<view class="desc">
			<view class="title">货品描述</view>
			<view class="warp cf">
				<view class="imgs fll">
					<view class="cf">
						<view class="li fll" @click="chooseImgs">
							<image src="/static/imgs/icon-1036.png" mode=""></image>
						</view>
						<view class="li fll" v-for="(item,index) in imgs" :key="index" v-if="imgs.length>0" @click="chooseImgs">
							<image :src="item.url" mode=""></image>
						</view>
					</view>
					
				</view>
				<view class="videos fll">
					<view class="cf">
						<view class="li fll" @click="chooseVideos">
							<image src="/static/imgs/icon-1037.png" mode=""></image>
						</view>
						<view class="li fll" v-for="(item,index) in videos" :key="index" v-if="videos.length>0"  @click="chooseVideos">
							<image :src="item.url" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
			
		</view>
		<view class="big-btn" @click="send">
			发布供货需求
		</view>
	</view>
</template>

<script>
	import T from '@/utils/tips.js'
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	export default {
		data() {
			return {
				isTip: true,
				isClock: false,
				imgs: [],
				videos: []
			};
		},
		components: {cmdCircle},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 发布供货需求
			send(){
				
			},
			// 选择图片
			chooseImgs(){
				if(this.isClock){
					return false
				}
				// if(this.uploadTaskProgress > 0 && this.uploadTaskProgress < 100){
				// 	T.tips('图片或视频正在上传中，请稍等...')
				// 	return false
				// }
				let _this = this
				uni.chooseImage({
					count: 9 , //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						let tempFilePaths = res.tempFilePaths;
						let arr = [];
						tempFilePaths.forEach((item,index)=>{
							_this.upload(item)
						})
					},
					fail() {
						_this.isClock = false
					}
				});
			},
			// 选择视频
			chooseVideos(){
				if(this.isClock){
					return false
				}
				let len = this.imgs.length + this.videos.length
				if(len>=9){
					this.isSend = false
					return false
				}
				// if(this.uploadTaskProgress > 0 && this.uploadTaskProgress < 100){
				// 	T.tips('图片或视频正在上传中，请稍等...')
				// 	return false
				// }
				let _this = this
				uni.chooseVideo({
					count: 9,
					sourceType: ['camera', 'album'],
					success: function (res) {
						_this.upload(res.tempFilePath)
					},
					fail() {
						_this.isClock = false
					}
				});
			},
			upload(tempFilePath){
				let _this = this
				let url = ''
				url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/ws/goods/goodImg/fileUpload' : 'http://wsm.qinlvny.com/ws/goods/goodImg/fileUpload'
				// 保存文件
				 const uploadTask = uni.uploadFile({
					url: url, //仅为示例，非真实的接口地址
					filePath: tempFilePath,
					name: 'file',
					success: (uploadFileRes) => {
					
					},
					fail:(err) => {
						T.tips('上传图片失败')
						_this.isClock = false
					},
					complete:() => {
						_this.isClock = false
					}
				});
				
				
				uploadTask.onProgressUpdate((res) => {
					 console.log('上传进度' + res.progress);
					// console.log('已经上传的数据长度' + res.totalBytesSent);
					// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					this.uploadTaskProgress = res.progress
					if(this.uploadTaskProgress >= 100){
						this.uploadTaskProgress = 0
					}
					// 测试条件，取消上传任务。
					// if (res.progress > 50) {
					// 	uploadTask.abort();
					// }
				});
				
			},
			// 隐藏tip
			hideTip(){
				this.isTip = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send{
		.big-btn{
			position: fixed;
			bottom: 20upx;
			left: 60upx;
		}
		.desc{
			.warp{
				
			}
			border-top: 20upx solid #F0F0F0;
			.title{
				margin: 0 0 20upx 0;
				color: #000000;
			}
			.imgs,.videos{
				.li{
					width: 160upx;
					height: 160upx;
					margin-left: 20upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				
			}
		}
		.items{
			padding: 0 20upx;
			.item{
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1upx solid #F0F0F0;
			}
			.item:last-child{
				border-bottom: none;
			}
		}
		.title{
			padding: 20upx;
			font-size: 34upx;
			color: #FE3B0B;
			font-weight: 600;
		}
		.tip{
			padding: 0 20upx;
			height:60upx;
			line-height: 60upx;
			background:rgba(255,239,235,1);
			font-size: 20upx;
			color: #FE3B0B;
		}
	}
	
</style>
