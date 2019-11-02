<template>
	<view>
		<div class="info">
			<div class="avatar cf">
				<span>我的头像</span>
				<!--  #ifdef  H5 -->
				<div class="head-icon flr">
					<img :src="headImgUrl" width="50" height="50" alt />
				</div>
				<div class="icon flr">
					<img src="@/static/img/tag-go.png" width="10" height="10" alt />
				</div>
				<input type="file" id="file" @change='onUpload' />
				<!--  #endif -->
				
				<!--  #ifdef  APP-PLUS || MP-WEIXIN -->
				<div class="head-icon flr" @click="onUpload">
					<img :src="headImgUrl || '@/static/img/icon-user.png'" width="50" height="50" alt />
				</div>
				<div class="icon flr" @click="onUpload">
					<img src="@/static/img/tag-go.png" width="10" height="10" alt />
				</div>
				<!--  #endif -->
				
			</div>
			<div class="list">
				<li @click='goNickName'>
					<span>我的昵称</span>
					<span class="gray">{{person.nickName || "上上农夫"}}</span>
					<div class="icon">
						<img src="@/static/img/tag-go.png" width="10" height="10" alt />
					</div>
				</li>
				<li>
					<span>手机号码</span>
					<span class="gray">{{person.phone}}</span>
					<div class="op0 icon">
						<img src="@/static/img/tag-go.png" width="10" height="10" alt />
					</div>
				</li>
				<li @click="goAddlist">
					<span>收货地址</span>
					<span class="gray">{{person.address}}</span>
					<div class="icon">
						<img src="@/static/img/tag-go.png" width="10" height="10" alt />
					</div>
				</li>
			</div>
		</div>
	</view>
</template>

<script>
	import { postUserImgUpload, postUserHeadImg, postUpdateNickname } from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				headImgUrl: '../../../static/img/icon-user.png',
				person: {
					nickName: '',
					phone: '',
					address: ''
				}
			};
		},
		onLoad() {

		},
		onShow() {
			this.person.phone = uni.getStorageSync('phone')
			this.headImgUrl = uni.getStorageSync('headImgUrl') !== 'null' ? uni.getStorageSync('headImgUrl') : '/static/images/icon-user.png'
			// .substring(1, 2)
			let nickName = uni.getStorageSync('nickName')
			this.person.nickName = nickName === 'null' ? '' : uni.getStorageSync('nickName')
		},
		methods: {
			// 去添加地址
			goAddlist(){
				uni.navigateTo({
					url:'/pages/user/addlist/addlist'
				})
			},
			// 去修改昵称
			goNickName(){
				uni.navigateTo({
					url:'/pages/user/nickname/nickname'
				})
			},
			// 上传头像
			onUpload(e) {
				let _this = this
				// #ifdef H5
				let file = e.target.files[0];
				let formdata = new FormData();
				formdata.append('file', file);
				postUserImgUpload(formdata).then(res => {
					if (res.code === '1000') {
						this.uploadUserHeadImg(res.data)
					} else {
						T.tips(res.message || '上传图片失败')
					}
				}).catch(err => {
					T.tips(err.message || '上传图片失败')
				})
				// #endif
				
				// #ifdef APP-PLUS || MP-WEIXIN 
				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
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
									_this.uploadUserHeadImg(res.data)
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
				// #endif
				

			},
			uploadUserHeadImg(url) {
				let data = {
					headImgUrl: url
				}
				
				postUpdateNickname(data).then(res => {
					if (res.code === '1000') {
						this.headImgUrl = url
						uni.setStorageSync('headImgUrl',url)
						T.tips(res.message || '头像上传成功')
					} else {
						T.tips(res.message || '上传图片失败')
					}
				}).catch(err => {
					T.tips(err.message || '上传图片失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head-icon {
		width: 100upx;
		height: 100upx;
		position: absolute;
		right: 100upx;
		top: 20upx;
		border-radius: 50%;
		overflow: hidden;
		>img {
			width: 100%;
			height: 100%;
		}
	}
	.list{
		li{
			position: relative;
		}
	}
	.icon {
		width: 22upx;
		height: 22upx;
		position: absolute;
		right: 30upx;
		top: 0upx;
		>img {
			width: 100%;
			height: 100%;
		}
	}

	.op0 {
		opacity: 0;
	}

	.gray {
		color: #999;
	}

	.arrange {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 30upx;
		padding-right: 20upx;
	
		&>*:first-child {
			flex-grow: 1;
		}

		&>*:last-child {
			margin-left: 30upx;
		}
	}

	.info {
		height: 100vh;
		background-color: #f5f5f5;
		color: #333;
		font-size: 30upx;
		position: relative;
		
		.avatar {
			position: relative;
			background-color: #fff;
			margin-top: 20upx;
			>img {
				border-radius: 50%;
			}

			@extend .arrange;
			line-height: 140upx;

			input {
				position: absolute;
				width: 200upx;
				height: 140upx;
				opacity: 0;
				z-index: 2;
				right: 0;
			}
		}

		.list {
			margin-top: 20upx;
		}

		li {
			@extend .arrange;
			list-style: none;
			background-color: #fff;
			line-height: 100upx;
			text-align: center;
			position: relative;
			&:not(:last-child) {
				border-bottom: 1upx solid #f0f0f0;
			}
			.gray {
				position: absolute;
				right: 100upx;
			}
			
		}
	}
</style>
