<template>
	<view class="send">
		<view class="tip cf" v-if="isTip" @click="hideTip"><text class="fll">注：只有平台注册的代办和货主才有资格发布哦</text>  <text class="flr">x</text></view>
		<view class="title">
			我有货,找市场代卖
		</view>
		<view class="items">
			<view class="item cf fs24" @click="goCategory">
				<view class="fll"><text class="text-theme">*</text>货品名称</view>
				<view class="fll text-999 mgl-30">请选择</view>
				<view class="arrow-right flr"></view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>货品品种</view>
				<view class="fll text-999 mgl-30"><input type="text" placeholder="请选择"></view>
			</view>
			<view class="item cf fs24" @click="checkAddress">
				<view class="fll"><text class="text-theme">*</text>产&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp地</view>
				<view class="fll text-999 mgl-30">请选择</view>
				<view class="arrow-right flr"></view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>供货能力</view>
				<view class="fll text-999 mgl-30">
					<input type="text" placeholder="请选择">
				</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>规格描述</view>
				<view class="fll text-999 mgl-30">
					<input type="text" placeholder="请选择">
				</view>
			</view>
		</view>
		<view class="desc">
			<view class="title">货品描述</view>
			<view class="warp cf">
				<view class="imgs fll">
					<view class="cf">
						<view class="li fll" v-for="(item,index) in imgs" :key="index" v-if="imgs.length>0" @click="chooseImgs">
							<image :src="item.url" mode=""></image>
						</view>
						<view class="li fll" v-if="isSendResources" @click="chooseImgs">
							<image src="/static/imgs/icon-1036.png" mode=""></image>
							<view class="progress" v-if="uploadTaskProgressOne>0 && uploadTaskProgressOne<=99">
								<cmd-circle cid="circle10" type="circle" :percent="uploadTaskProgressOne"></cmd-circle>
							</view>
						</view>
						
						<view class="li fll" v-for="(item,index) in videos" :key="index" v-if="videos.length>0"  @click="chooseVideos">
							<image :src="item.zipUrl" mode=""></image>
						</view>
						<view class="li fll" v-if="isSendResources" @click="chooseVideos">
							<image src="/static/imgs/icon-1037.png" mode=""></image>
							<view class="progress" v-if="uploadTaskProgressTwo>0 && uploadTaskProgressTwo<=99">
								<cmd-circle cid="circle10" type="circle" :percent="uploadTaskProgressTwo"></cmd-circle>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="big-btn" @click="send">
			发布供货需求
		</view>
		<mpvue-city-picker :hasArea="hasArea" :themeColor="themeColor" ref="mpvueCityPicker" :isFullAddress='isFullAddress' :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import T from '@/utils/tips.js'
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				isSendResources: true,
				hasArea: false,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				uploadTaskProgressOne:0,  // 进度条
				uploadTaskProgressTwo:0,  // 进度条
				isFullAddress: false,
				isTip: true,
				isClock: false,
				imgs: [],
				videos: [],
				count: 9
			};
		},
		components: {cmdCircle, mpvueCityPicker},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 产地弹窗确认
			onConfirm(e) {
				this.fullAddress = e.label
				// full地址
				let arr = this.fullAddress.split('-')
			},
			// 产地弹窗取消
			onCancel(){
				
			},
			// 选择产地
			checkAddress(){
				this.$refs.mpvueCityPicker.show()
			},
			// 选择货品名称
			goCategory(){
				uni.navigateTo({
					url:'/pages/middle/release/product/replacesale/category/category'
				})
			},
			// 发布供货需求
			send(){
				
			},
			// 选择图片
			chooseImgs(){
				if(this.isClock){
					return false
				}
				let len = this.imgs.length + this.videos.length
				if(len>=9){
					this.isSendResources = false
					return false
				}
				let _this = this
				uni.chooseImage({
					count: this.count , //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						let tempFilePaths = res.tempFilePaths;
						let arr = [];
						tempFilePaths.forEach((item,index)=>{
							_this.upload(item,1)
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
					this.isSendResources = false
					return false
				}
				let _this = this
				uni.chooseVideo({
					count: this.count,
					sourceType: ['camera', 'album'],
					success: function (res) {
						_this.upload(res.tempFilePath,2)
					},
					fail() {
						_this.isClock = false
					}
				});
			},
			// 上传资源
			upload(tempFilePath,index){
				let _this = this
				let url = ''
				url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/ws/goods/goodImg/fileUpload' : 'http://wsm.qinlvny.com/ws/goods/goodImg/fileUpload'
				// 保存文件
				 const uploadTask = uni.uploadFile({
					url: url, //仅为示例，非真实的接口地址
					filePath: tempFilePath,
					name: 'file',
					success: (uploadFileRes) => {
						let res = JSON.parse(uploadFileRes.data)
						if(res.code == '1000'){
							let len = this.imgs.length + this.videos.length
							this.count = 9 - len
							if(len>=9){
								this.isSendResources = false
								return false
							}
							if(this.isSendResources){
								if(index == 1){ // 图片
									T.tips(res.message || '图片上传成功')
									this.imgs.push(res.data)
								}else{ // 视频
									T.tips(res.message || '视频上传成功')
									this.videos.push(res.data)
								}
							}
						}
					},
					fail:(err) => {
						T.tips(err.message || '上传图片失败')
						_this.isClock = false
					},
					complete:() => {
						_this.isClock = false
						
						let len = this.imgs.length + this.videos.length
						this.count = 9 - len
						if(len>=9){
							this.isSendResources = false
							return false
						}
						
					}
				});
				
				uploadTask.onProgressUpdate((res) => {
					this.isClock = true
					if(index == 1){
						this.uploadTaskProgressOne = res.progress
						if(this.uploadTaskProgressOne >= 100){
							this.uploadTaskProgressOne = 0
							this.isClock = false
						}
					}else{
						this.uploadTaskProgressTwo = res.progress
						if(this.uploadTaskProgressTwo >= 100){
							this.uploadTaskProgressTwo = 0
							this.isClock = false
						}
					}
					
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
			z-index: 99999;
		}
		.desc{
			.warp{
				padding-bottom: 300upx;
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
					margin-top: 20upx;
					position: relative;
					image{
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 9;
					}
					.progress{
						position: absolute;
						top: 0;
						left: 0;
						z-index: 999;
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
				input{
					width: 570upx;
					height: 100upx;
				}
				.arrow-right{
					position: relative;
					top: 40upx;
				}
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