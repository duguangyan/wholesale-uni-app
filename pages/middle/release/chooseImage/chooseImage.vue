<template>
	<view class="chooseImage">
		<view class="items">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="title fs34 text-333"><text class="text-theme mgr-10">*</text> {{item.title}}</view>
				<view class="tip fs24 text-999">{{item.tip}}</view>
				<view class="imgs cf">
					<view class="warp img fll" v-for="(it,ix) in item.imgs" :key="ix" v-if="item.imgs.length>0">
						<view class="im">
							<image :src="it" mode="aspectFit"></image>
						</view>
						<view class="del" @click="del(index,ix,0)">x</view>
					</view>
					<view class="img fll" @click="actionSheetTap(index,0)" v-if="index==0 ?(item.imgs.length<5):(item.imgs.length<10)">
						<image src="/static/imgs/icon-1036.png" mode=""></image>
						<view class="progress" v-if="uploadTaskProgress>0 && uploadTaskProgress<=99 && uploadTaskProgressItemsIndex == 0 && uploadTaskProgressIndex == index">
							<cmd-circle cid="circle10" type="circle" :percent="uploadTaskProgress"></cmd-circle>
						</view>
						
					</view>
					
					<view class="warp img fll" v-for="(it,ix) in item.videos" :key="ix" v-if="item.videos.length>0">
						<view class="im">
							<image :src="it.zipUrl" mode="aspectFit"></image>
						</view>
						<view class="del" @click="del(index,ix,1)">x</view>
						<view class="video" @click="showVideo(it.url)">
							<image src="/static/imgs/icon-1038.png" mode=""></image>
						</view>
					</view>
					<view class="img fll" @click="actionSheetTap(index,1)"  v-if="index==0 ?(item.videos.length<5):(item.videos.length<10)">
						<image src="/static/imgs/icon-1037.png" mode=""></image>
						<view class="progress"  v-if="uploadTaskProgress > 0 && uploadTaskProgress<=99 &&  uploadTaskProgressItemsIndex == 1 && uploadTaskProgressIndex == index">
							<cmd-circle cid="circle10" type="circle" :percent="uploadTaskProgress"></cmd-circle>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="big-btn-active" @click="save">保存</view>
	</view>
</template>

<script>
	import T from '@/utils/tips.js'
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	export default {
		data() {
			return {
				isClock: false,
				gapDegree:360,  // 进度条缺口
				uploadTaskProgress:0,  // 进度条
				uploadTaskProgressIndex: '', // 当前进度条索引
				uploadTaskProgressItemsIndex: '',
				chooseIndex:'',  // 0 是主图 1是详情
				chooseType:'',   // 0 是图片 2是视频
				items:[
					{
						title:'货品主图',
						tip:'显示在列表和详情页头图，图片最多上传5张/视频可上传5张',
						imgs:[],
						videos:[]
					},
					{
						title:'货品详情图',
						tip:'显示在详情页下方，图片或视频最多只可上传10张',
						imgs:[],
						videos:[]
					}
				]
			};
		},
		components: {cmdCircle},
		onShow() {
			// 如果有缓存
			this.goodsImgList = uni.getStorageSync('goodsImgList')
			if(this.goodsImgList){
				this.items = this.goodsImgList
			}
		},
		methods:{
			// 显示视频
			showVideo(url){
				uni.navigateTo({
					url:'/pages/common/video/video?url='+url
				})
			},
			// 保存
			save(){
				console.log(this.items)
				if((this.items[0].imgs.length>0 || this.items[0].videos.length>0) && (this.items[1].imgs.length>0 || this.items[1].videos.length>0)){
					uni.setStorageSync('goodsImgList',this.items)
					uni.navigateBack({
						delta:1
					})
				} else {
					if(!(this.items[0].imgs.length>0 || this.items[0].videos.length>0)){
						T.tips('货品主图至少上传一张')
						return false
					}
					if(!(this.items[1].imgs.length>0 || this.items[1].videos.length>0)){
						T.tips('详情图至少上传一张')
						return false
					}
				}
			},
			// 删除图片
			del(index,idx,type){
				if(type == 0){
					this.items[index].imgs.splice(idx,1)
				}else{
					this.items[index].videos.splice(idx,1)
				}
				uni.setStorageSync('goodsImgList',this.items)
			},
			// 选择图片
			actionSheetTap(index,type){
				if(this.isClock){
					return false
				}
				if(this.uploadTaskProgress > 0 && this.uploadTaskProgress < 100){
					T.tips('图片或视频正在上传中，请稍等...')
					return false
				}
				this.uploadTaskProgressItemsIndex = type
				this.uploadTaskProgressIndex = index
				let _this = this
				// index 0 主图 1 详情图
				this.chooseIndex = index
				this.chooseType  = type
				this.isClock = true
				if(type == 0){
					uni.chooseImage({
						count:this.chooseIndex==0?5:10 , //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册选择
						success: function (res) {
							console.log(JSON.stringify(res.tempFilePaths));
							let tempFilePaths = res.tempFilePaths;
							let arr = [];
							tempFilePaths.forEach((item,index)=>{
								_this.upload(item)
							})
						}
					});
				} else {
					uni.chooseVideo({
						count: 5,
						sourceType: ['camera', 'album'],
						success: function (res) {
							_this.upload(res.tempFilePath)
						}
					});
				}
			},
			upload(tempFilePath){
				let _this = this
				let url = ''
				// if(this.chooseType == 0) {
				// 	url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/upms/userImg/upload' : 'http://wsm.qinlvny.com/upms/userImg/upload'
				// }else{
				// 	url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/ws/goods/goodImg/fileUpload' : 'http://wsm.qinlvny.com/ws/goods/goodImg/fileUpload'
				// }
				url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/ws/goods/goodImg/fileUpload' : 'http://wsm.qinlvny.com/ws/goods/goodImg/fileUpload'
				// 保存文件
				 const uploadTask = uni.uploadFile({
					url: url, //仅为示例，非真实的接口地址
					filePath: tempFilePath,
					name: 'file',
					success: (uploadFileRes) => {
						console.log('tempFilePath',tempFilePath)
						console.log(uploadFileRes);
						let res = JSON.parse(uploadFileRes.data)
						if (res.code == '1000') {
							if(_this.chooseType == 0){
								console.log('_this.items:',_this.items)
								_this.items[_this.chooseIndex].imgs.push(res.data.url)
							}else{
								console.log('_this.items:',_this.items)
								_this.items[_this.chooseIndex].videos.push(res.data)
							}
							
							uni.setStorageSync('goodsImgList',_this.items)
							_this.isClock = false
						} else {
							T.tips(res.message || '上传图片失败')
							_this.isClock = false
						}
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
					// console.log('上传进度' + res.progress);
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
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chooseImage{
		background: #fff;
		min-height: 100vh;
		.big-btn-active{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
		.items{
			padding-bottom: 120upx;
			.item{
				margin: 0 30upx;
				margin-bottom: 50upx;
				.tip{
					margin: 20upx 0;
				}
				.title{
					font-weight: 600;
					.text-theme{
						margin-right: 10upx;
					}
				}
				.imgs{
					.warp{
						position: relative;
						.video{
							width: 60upx;
							height: 60upx;
							position: absolute;
							top: 50%;
							margin-top: -30upx;
							left: 50%;
							margin-left: -30upx;
							z-index: 9999;
							>image{
								width: 100%;
								height: 100%;
							}
						}
						.del{
							width: 30upx;
							height: 30upx;
							color: #fff;
							background: #FE3B0B;
							position: absolute;
							right: 0;
							top: 0;
							line-height: 26upx;
							text-align: center;
							font-size: 24upx;
							z-index: 999;
						}
					}
					.img{
						width: 140upx;
						height: 140upx;
						margin-right: 30upx;
						margin-bottom: 20upx;
						position: relative;
						.im{
							width: 140upx;
							height: 140upx;
							margin-right: 20upx;
							
							>image{
								width: 100%;
								height: 100%;
							}
						}
						>image{
							width: 100%;
							height: 100%;
						}
						.progress{
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							background: #fff;
						}
					}
				}
			}
		}
	}
</style>
