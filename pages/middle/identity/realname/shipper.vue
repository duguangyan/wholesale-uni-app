<template>
	<view class="agency">
		<view class="top flex">
			<view class="item fs24 flex-1 cf" v-for="(item,index) in progress" :key="index">
				<view class="garden fll" :class="{'activeGarden':index == 0}">{{index}}</view>
				<view class="text fll" :class="{'activeText':index == 0}">{{item}}</view>
				<view class="label fll" v-if="index < 2">
					<image src="../../../../static/imgs/agency-right.png"></image>
				</view>
			</view>
		</view>
		
		<view class="user">
			<view class="item-1">
				<view class="fll">姓名</view>
				<view class="flr">
					<input type="text" placeholder="请输入货主姓名">
				</view>
			</view>
			<view class="item-1">
				<view class="fll">手机号</view>
				<view class="flr">
					<input type="text" placeholder="请输入手机号">
				</view>
			</view>
			<view class="item-2">
				<view class="fll v-1">验证码</view>
				<view class="fll v-2">
					<input type="text" placeholder="请输入验证码">
				</view>
				<view class="text-theme flr v-3">获取验证码</view>
			</view>
		</view>
		<view class="content">
			<view class="item">
				<view class="title">
					<text>经营地区</text>
				</view>
				<view class="choose cf" @click="showPicker">
					<view class="fll" :class="{'text-333':fullAddress!=''}">{{fullAddress==''?'请选择经营地区':fullAddress}}</view>
					<view class="flr">

						<image src="../../../../static/imgs/right.png"></image>
						
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>经营类型</text> <text class="fs28 text-666">（审核通过后不可更改）</text>
				</view>
				<view class="choose cf">
					<view class="fll">请选择类型:如农产品、蔬菜、白菜</view>
					<view class="flr">
						
						<image src="../../../../static/imgs/right.png"></image>
						
					</view>
				</view>
			</view>
			<view class="cat cf">
				<view class="title fll">身份证号</view>
				<view class="input flr">
					<input type="text" placeholder="请输入身份证号码">
				</view>
			</view>
		</view>
		<view class="upload cf">
			<view class="title"><text>上传身份证</text><text class="tips">（正面）</text> </view>
			<view class="img fll" @click="showImage(0)">
				<image src="../../../../static/imgs/cat-1.png" mode=""></image>
			</view>
			<view class="img fll" @click="chooseImage(0)">

				<image :src="agencyImgUpload1==''?'../../../../static/imgs/cat-3.png':agencyImgUpload1" mode=""></image>
				
			</view>
		</view>
		<view class="upload cf">
			<view class="title"><text>上传身份证</text><text class="tips">（反面）</text> </view>
			<view class="img fll" @click="showImage(1)">
				<image src="../../../../static/imgs/cat-2.png" mode=""></image>
			</view>
			<view class="img fll" @click="chooseImage(1)">
				
				<image :src="agencyImgUpload2==''?'../../../../static/imgs/cat-3.png':agencyImgUpload2" mode=""></image>
				
			</view>
		</view>
		<view class="big-btn-active"  @click="doSubmit">提交审核</view>
		<view class="height100"></view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	import { postUserImgUpload, postUserHeadImg, postUpdateNickname } from '@/api/userApi.js'
	export default {
		name: 'agency',
		data() {
			return {
				progress:['填写资料','提交审核','审核通过'],
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				fullAddress:'',
				address: {
					name: '',
					phone: '',
					area: '',
					address: '',
					city: '',
					cityId: '',
					province: '',
					provinceId: '',
					region: '',
					regionId: '',
					def: 1
				},
				imgIndex: '',
				agencyImgUpload1: '',
				agencyImgUpload2: ''
			};
		},
		components: {
			uniList,
			uniListItem,
			mpvueCityPicker
		},
		onLoad() {
			
		},
		onShow() {
			this.agencyImgUpload1 = uni.getStorageSync('agencyImgUpload1')
			this.agencyImgUpload2 = uni.getStorageSync('agencyImgUpload2')
		},
		methods: {
			// 查看示例
			showImage(index){
				uni.navigateTo({
					url:'/pages/common/showImage/showImage?agency='+index
				})
			},
			// 选择图片
			chooseImage(index){
				if(this.agencyImgUpload1 !='' && index == 0){
					uni.navigateTo({
						url:'/pages/common/picture/picture?index=0&url='+this.agencyImgUpload1
					})
					return false
				}
				if(this.agencyImgUpload2 !='' && index == 1){
					uni.navigateTo({
						url:'/pages/common/picture/picture?index=1&url='+this.agencyImgUpload2
					})
					return false
				}
				let _this = this;
				this.imgIndex = index;
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
									if(_this.imgIndex == 0){
										_this.agencyImgUpload1 = res.data
										uni.setStorageSync('agencyImgUpload1',_this.agencyImgUpload1)
										// this.$store.commit('updateNickName',this.nickName);
									}else{
										_this.agencyImgUpload2 = res.data
										uni.setStorageSync('agencyImgUpload2',_this.agencyImgUpload2)
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
			},
			// 显示地址选择
			showPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.fullAddress = e.label
				
				
				// full地址
				let arr = this.fullAddress.split('-');
				// 省
				this.address.province = arr[0]
				this.address.provinceId = e.ids[0]
				// 市
				this.address.city = arr[1]
				this.address.cityId = e.ids[1]
				// 区
				this.address.region = arr[2]
				this.address.regionId = e.ids[2]
			},
			doSubmit(){
			  uni.navigateTo({
				url:'/pages/middle/identity/submitFail/submitFail'
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 货主
	.agency {
		background: #fff;
		.big-btn-active{
			
		}
		.height100{
			height: 30upx;
		}
		.upload{
			margin: 30upx;
			margin-bottom: 50upx;
			.title{
				font-size: 30upx;
				color: #333;
				margin-bottom: 30upx;
				.tips{
					font-size: 24upx;
					color: #999;
				}
			}
			.img{
				width: 140upx;
				height: 140upx;
				margin-right: 30upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.cat{
			margin: 0 30upx;
			margin-top: 20upx;
			.title{
				font-size: 30upx;
				color: #333333;
				width: 20%;
			}
			.input{
				width: 80%;
				font-size: 28upx;
				color: #ccc;
				border-bottom: 1upx solid #F0F0F0;
				padding-bottom: 20upx;
				input{
					font-size: 28upx;
				}
			}
		}
		.content{
			padding-top: 30upx;
			.item{
				margin: 0 30upx;
				height: 140upx;
				.title{
					font-size: 30upx;
					color: #333;
				}
				.choose{
					font-size: 28upx;
					color: #CCCCCC;
					border-bottom: 1upx solid #F0F0F0;
					padding: 20upx 0;
					.flr{
						width: 24upx;
						height: 24upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			
		}
		.user{
			padding: 0 30upx;
			border-bottom: 20upx solid #F5F5F5;
			.item-2{
				height: 100upx;
				line-height: 100upx;
				.v-1{
					font-size: 30upx;
					color: #333;
					width: 20%;
				}
				.v-2{
					width: 56%;
					input{
						position: relative;
						top: 30upx;
						font-size: 30upx;
						padding-bottom: 30upx;
					}
				}
				.v-3{
					width: 24%;
					font-size: 30upx;
				}
			}
			.item-1{
				height: 100upx;
				line-height: 100upx;
				.fll{
					font-size: 30upx;
					color: #333;
					width: 20%;
				}
				.flr{
					width: 80%;
					input{
						position: relative;
						top: 30upx;
						padding-bottom: 30upx;
						font-size: 30upx;
						border-bottom: 1upx solid #F0F0F0;
					}
				}
			}
		}
		.top{
			height: 140upx;
			line-height: 140upx;
			padding: 0 30upx;
			border-bottom: 20upx solid #F5F5F5;
			padding-left: 40upx;
			.item{
				.garden{
					display: inline-block;
					position: relative;
					top: 46upx;
					width: 44upx;
					height: 44upx;
					border-radius: 50%;
					line-height: 44upx;
					text-align: center;
					background: #C2C2CC;
					font-size: 32upx;
					color: #fff;
				}
				.text{
					color: #999999;
					margin-left: 20upx;
					width: 100upx;
					font-size: 24upx;
				}
				.label{
					display: inline-block;
					width: 24upx;
					height: 24upx;
					margin-left: 20upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.activeGarden{
					background: #FE3B0B;
				}
				.activeText{
					color: #FE3B0B;
				}
			}
		}
		


	}
</style>
