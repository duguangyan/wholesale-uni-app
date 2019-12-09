<template>
	<view>
		<view class="setting">
			<view class="items">
				<view class="title">基本信息</view>
				<view class="list">
				  <view class="cf li header">
				    <view class="fll fs28">我的头像</view>
				    <view class="icon flr">
				      <image src="/static/img/tag-go.png" />
				    </view>
					<view class="image flr" @click="onUpload">
						<image :src="headImgUrl" mode=""></image>
					</view>
				  </view>
				  <view class="cf li" v-if="roleId != 20004">
				    <view class="fll fs28">我的姓名</view>
					<view class="flr fs30 text-999 value">{{nickName||'正鼎农品'}}</view>
				  </view>
				  <view v-if="roleId == 20004">
					  <view class="cf li">
					    <view class="fll fs28">企业名称</view>
					  	<view class="flr fs30 text-999 value">{{nickName||'正鼎农品'}}</view>
					  </view>
					  <view class="cf li">
					    <view class="fll fs28">营业执照号</view>
					  	<view class="flr fs30 text-999 value">{{nickName||'正鼎农品'}}</view>
					  </view>
					  <view class="cf li">
					    <view class="fll fs28">法人</view>
					  	<view class="flr fs30 text-999 value">{{nickName||'正鼎农品'}}</view>
					  </view>
				  </view>
				  <view class="cf li">
				    <view class="fll fs28">手机号</view>
				    <view class="icon flr" @click="goChangePhone">
				      <image src="/static/img/tag-go.png" />
				    </view>
				  	<view class="flr fs30 text-999 value" @click="goChangePhone">{{phone}}</view>
				  </view>
				</view>
			</view>
			
			<view class="items" v-if="roleId == 20001 || roleId == 20002 || roleId == 20004">
				<view class="title">行业信息</view>
				<view class="list">
				 
				 <view class="cf li">
				   <view class="fll fs28">我的身份</view>
				   
				   <view class="flr fs30 text-999 value" v-if="roleId == 20001">种植户</view>
				   <view class="flr fs30 text-999 value" v-if="roleId == 20002">代办</view>
				   <view class="flr fs30 text-999 value" v-if="roleId == 20004">企业</view>
				 </view>
				 
				  <view class="cf li" v-if="roleId == 20001">
				    <view class="fll fs28">经营类目</view>
				    
					<view class="flr fs30 text-999 value">{{categoryName}}</view>
				  </view>
				  
				  <view class="cf li">
				    <view class="fll fs28">{{roleId == 20001?'经营地区':'代办地区'}}</view>
				    
				  	<view class="flr fs30 text-999 value">{{province + city + region}}</view>
				  </view>
				</view>
			</view>
			
		  <!--  <view class="list">
		      <view class="cf li" @click="goProtocal">
		        <view class="fll fs28">服务条款与协议</view>
		        <view class="icon flr">
		          <image src="@/static/img/tag-go.png" />
		        </view>
		      </view>
		      <view class="cf li"  @click="goAbout">
		        <view class="fll fs28">关于我们</view>
		        <view class="icon flr">
		          <image src="@/static/img/tag-go.png" />
		        </view>
		      </view>
		    </view> -->
			<view class="version">{{version}}</view>
		    <view class="footer-btn" @click="showDialog" v-if="isLogin">退出登录</view>
		  </view>
	</view>
</template>

<script>
	import { postUpdateNickname } from '@/api/userApi.js'
	export default {
		data() {
			return {
				isLogin: false,
				headImgUrl: '/static/img/icon-user.png',
				phone:'',
				roleId:'',
				categoryName:'',
				province:'',
				city:'',
				region:'',
				version: '',
				nickName:''
			};
		},
		onShow() {
			// 获取版本号
			this.version    = uni.getStorageSync('s') + ' ' + uni.getStorageSync('v')
			// 获取缓存数据
			this.isLogin    = uni.getStorageSync('access_token')
			this.phone      = uni.getStorageSync('phone') || ''
			this.nickName   = uni.getStorageSync('nickName')
			this.roleId     = uni.getStorageSync('roleId')
			if(uni.getStorageSync('headImgUrl') != null){
				this.headImgUrl = uni.getStorageSync('headImgUrl')
			}
			if(uni.getStorageSync('userApply')){
				let userApply     = JSON.parse(uni.getStorageSync('userApply'))
				this.categoryName = userApply.categoryName || ''
				this.province     = userApply.province || ''
				this.city         = userApply.city || ''
				this.region       = userApply.region || ''
			}
		},
		methods:{
			showDialog() {
			  let _this = this
			  uni.showModal({
			      title: '提示',
			      content: '是否退出当前账号?',
				  confirmText: '退出',
			      success: function (res) {
			          if (res.confirm) {
			              let records  = uni.getStorageSync('records')
						  let platform = uni.getStorageSync('platform')
						  let dialogIsShow = uni.getStorageSync('dialogIsShow')
			              uni.clearStorageSync() // 清除缓存
						  uni.setStorageSync('records',records)
						  uni.setStorageSync('platform',platform)
						  uni.setStorageSync('dialogIsShow',dialogIsShow)
			              // uni.switchTab({
			              // 	url:'/pages/user/user'
			              // })
						  _this.$eventHub.$emit('goBlack',true)
						  uni.navigateBack({
						  	delta:1
						  })
			          } else if (res.cancel) {
			              console.log('用户点击取消');
			          }
			      }
			  });
			},
			// 修改手机号
			goChangePhone(){
				uni.navigateTo({
					url:'/pages/user/setting/changePhone'
				})
			},
			// 上传头像
			onUpload(e) {
				let _this = this
				// #ifdef H5
				let file     = e.target.files[0];
				let formdata = new FormData();
				formdata.append('file', file);
				postUserImgUpload(formdata).then(res => {
					if (res.code == '1000') {
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
						let url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/upms/userImg/upload' : 'http://wsm.qinlvny.com/upms/userImg/upload'
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
.icon-img2,.icon-img{
	width: 22upx;
	height: 22upx;
	>image{
		width: 100%;
		height: 100%;
	}
}
.setting {
	width: 750upx;
	margin: 0 auto;
	overflow-x: hidden;
	.version{
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-top: 20upx;
	}
	.footer-btn{
		height: 100upx;
		line-height: 100upx;
		background: #fff;
		margin-top: 20upx;
		text-align: center;
		color: #000;
		font-size: 30upx;
	}
  &::before {
    content: '';
    display: block;
    z-index: -1;
    position: absolute;
    background-color: #f5f5f5;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
  }
  .items{
	  .title{
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		color: #999;
		position: relative;
		left: 30upx;
	  }
  }
  .list {
    //margin-top: 20upx;
	
    .li {
		height: 100upx;
		line-height: 100upx;
		background: #fff;
		padding: 0 30upx;
		border-bottom: 1upx solid #F5F5F5;
		.value{
			position: relative;
			right: 20upx;
			top: 2upx;
		}
		.image{
			width: 90upx;
			height: 90upx;
			position: relative;
			top: 28upx;
			right: 10upx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.icon{
			width: 22upx;
			height: 22upx;
			position: relative;
			
			z-index: 9999;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.header{
		height: 140upx;
		line-height: 140upx;
	}
  }
  .exit{
    width: 640upx;
    line-height: 80upx;
    border-radius: 40upx;
    background-color: #FC2D2D;
    text-align: center;
    margin: 40upx auto auto auto;
    color: #fff;
  }
}
</style>