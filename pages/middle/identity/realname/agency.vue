<template>
	<view class="agency">
		<view class="top flex">
			<view class="item fs24 flex-1 cf" v-for="(item,index) in progress" :key="index">
				<view class="garden fll" :class="{'activeGarden':index == 0 || (index==1 && disabled)}">{{index}}</view>
				<view class="text fll" :class="{'activeText':index == 0  || (index==1 && disabled)}">{{item}}</view>
				<view class="label fll" v-if="index < 2">
					<image src="../../../../static/imgs/agency-right.png"></image>
				</view>
			</view>
		</view>
		
		<view class="user">
			<view class="item-1">
				<view class="fll">姓名</view>
				<view class="flr">
					<input type="text" v-model="realName" :disabled="disabled" :placeholder="realNamePlaceholder">
				</view>
			</view>
			<view class="item-1" v-if="!disabled && userRealInfo ==''">
				<view class="fll">邀请码</view>
				<view class="flr">
					<input type="text" v-model="code" :disabled="disabled" placeholder="请输入邀请码">
				</view>
			</view>
			<view class="fs24 text-999 tip" v-if="!disabled && userRealInfo ==''">
				邀请码需找销售人员提供
			</view>
			<!-- <view class="item-1">
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
			</view> -->
		</view>
		<view class="content">
			<view class="item">
				<view class="title">
					<text>{{hasfrom==2?'经营地区':'代办地区'}}</text>
				</view>
				<view class="choose cf" @click="showPicker">
					<view class="fll" :class="{'text-333':fullAddress!=''}">{{fullAddress==''?(hasfrom==2?'请选择经营地区':'请选择代办地区'):this.address.province +"-"+ this.address.city}}</view>
					<view class="flr" v-if="!disabled">
						<image src="../../../../static/imgs/right.png"></image>
					</view>
				</view>
			</view>
			<view class="item" v-if="hasfrom == 2" @click="showType">
				<view class="title">
					<text>经营类型</text> <text class="fs28 text-666">（审核通过后不可更改）</text>
				</view>
				<view class="choose cf">
					<view class="fll" :class="{'text-666':productType!=''}">{{productType == ''?'请选择类型:如农产品、蔬菜、白菜':productType}}</view>
					<view class="flr" v-if="!disabled">
						<image src="../../../../static/imgs/right.png"></image>
					</view>
				</view>
			</view>
			<view class="cat cf">
				<view class="title fll">身份证号</view>
				<view class="input flr">
					<input type="idcard" v-model="cardNo" :disabled="disabled" placeholder="请输入身份证号码">
				</view>
			</view>
		</view>
		<view class="upload cf">
			<view class="title"><text>上传身份证</text><text class="tips">（正面）</text> </view>
			<view class="img fll" @click="showImage(0)"  v-if="userApply==''">
				<image src="../../../../static/imgs/cat-1.png" mode=""></image>
			</view>
			<view class="img fll" @click="chooseImage(0)">

				<image :src="agencyImgUpload1==''?'../../../../static/imgs/cat-3.png':agencyImgUpload1" mode=""></image>
				
			</view>
		</view>
		<view class="upload cf">
			<view class="title"><text>上传身份证</text><text class="tips">（反面）</text> </view>
			<view class="img fll" @click="showImage(1)" v-if="userApply==''">
				<image src="../../../../static/imgs/cat-2.png" mode=""></image>
			</view>
			<view class="img fll" @click="chooseImage(1)">
				
				<image :src="agencyImgUpload2==''?'../../../../static/imgs/cat-3.png':agencyImgUpload2" mode=""></image>
				
			</view>
		</view>
		<!-- 0 待审  1 审核通过  2 不通过  3 撤回 -->
		<view class="big-btn-active"  @click="doSubmit" v-if="!disabled">提交审核</view>
		<view class="big-btn-active"  @click="setBack" v-if="disabled">撤回</view>
		<view class="height100"></view>
		<chooseType v-if="isChooseType" :list="categoryTree" @close="chooseTypeClose" @complete="chooseTypeComplete"></chooseType>
		<mpvue-city-picker :themeColor="themeColor" :hasArea='false' ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	import chooseType from '@/components/realname/ChooseType.vue'
	import { postUserImgUpload, postUserHeadImg, postUpdateNickname, getUserRealInfoSettledIn, getUserRealInfoAll, applyAuditWithdraw, applyApplyUpdate } from '@/api/userApi.js'
	import { getCategoryTreeNode } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		name: 'agency',
		data() {
			return {
				realNamePlaceholder:'', 
				code :'',        // 邀请码
				userApply:'',    // 用户类型
				disabled: false, // 是否可以输入
				progress:['填写资料','提交审核','审核通过'],
				isChooseType:false,
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
				agencyImgUpload2: '',
				hasfrom:'',
				productType:'',
				realName :'',        // 真实姓名
				cardNo:'',           // 身份证号码
				cardImgFront :'',    // 身份证正面照
				cardImgReverse :'',  // 身份证反面照
				categoryTree:'',     // 产品分类
				productTypeId:'',    // 分类Id
				userRealInfo:'',     // 邀请码
			};
		},
		components: {
			uniList,
			uniListItem,
			mpvueCityPicker,
			chooseType
		},
		onLoad(options) {
			// hafrom : 1代办 2 货主
			if(options.hasfrom){
				this.hasfrom = options.hasfrom
				// 如果是货主获取经营类型（产品分类）
				if(this.hasfrom == 2){
					getCategoryTreeNode().then(res=>{
						if(res.code == '1000'){
							this.categoryTree = res.data
						}
					})
				}
			}
		},
		onShow() {
			// 获取缓存数据
			this.agencyImgUpload1 = uni.getStorageSync('agencyImgUpload1')
			this.agencyImgUpload2 = uni.getStorageSync('agencyImgUpload2')
			this.userRealInfo = uni.getStorageSync('userRealInfo') || ''
			// 判断用户类型
			this.assessUserType() 
		},
		
		methods: {
			// 撤回
			setBack(){
				applyAuditWithdraw().then(res=>{
					if(res.code == '1000'){
						let userApply    = JSON.parse(uni.getStorageSync('userApply')) 
						userApply.status = 3
						this.userApply   = userApply
						uni.setStorageSync('userApply',userApply)
						this.disabled    = false
					}
				})
			},
			// 判断数据
			assessUserType(){
				// 判断用户类型
				let userApply             = uni.getStorageSync('userApply')
				if(userApply){
					this.userApply        = JSON.parse(userApply) 
					this.hasfrom          = this.userApply.type == 1 ? 2 : 1
					this.disabled         = this.userApply.status != 3
					this.realName         = this.userApply.realName
					this.cardNo           = this.userApply.cardNo
					this.agencyImgUpload1 = this.userApply.cardImgFront
					this.agencyImgUpload2 = this.userApply.cardImgReverse
					this.productType      = this.userApply.categoryName
					this.fullAddress      = this.userApply.province + this.userApply.city + this.userApply.region
				}
				
				this.realNamePlaceholder = this.hasfrom==2?'请输入货主姓名':'请输入代办姓名'
			},
			chooseTypeComplete(e){
				console.log(e)
				this.productType   = e.left + '/' + e.content + '/' + e.right
				this.productTypeId = e.id
				this.isChooseType  = false
			},
			chooseTypeClose(){
				this.isChooseType = false
			},
			// 选择经营类型
			showType(){
				if(this.disabled){
					return false
				}
				this.isChooseType = true
			},
			// 查看示例
			showImage(index){
				uni.navigateTo({
					url:'/pages/common/showImage/showImage?agency='+index
				})
			},
			// 选择图片
			chooseImage(index){
				if(this.disabled){
					return false
				}
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
				if(this.disabled){
					return false
				}
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
				this.address.province   = arr[0]
				this.address.provinceId = e.ids[0]
				// 市
				this.address.city       = arr[1]
				this.address.cityId     = e.ids[1]
				// 区
				this.address.region     = arr[2]
				this.address.regionId   = e.ids[2]
			},
			doSubmit(){
				// 数据验证
				if(this.realName == ''){
					T.tips('姓名不能为空')
					return false
				}
				if(!uni.getStorageSync('userRealInfo')){
					if(this.code == ''){
						T.tips('邀请码不能为空')
						return false
					}
				}
				
				if(this.cardNo == ''){
					T.tips('身份证号码不能为空')
					return false
				}
				if(this.fullAddress == ''){
					T.tips('请选择地址')
					return false
				}
				if(this.agencyImgUpload1 == ''){
					T.tips('身份证正面照不能为空')
					return false
				}
				if(this.agencyImgUpload2 == ''){
					T.tips('身份证反面照不能为空')
					return false
				}
				//  实名认证
				let data = {
					cardImgFront:   this.agencyImgUpload1,
					cardImgReverse: this.agencyImgUpload2,
					cardNo:         this.cardNo,
					realName:       this.realName,
					province:       this.address.province,
					provinceId:     this.address.provinceId,
					city:           this.address.city,
					cityId:         this.address.cityId,
					region:         this.address.region,
					regionId:       this.address.regionId
				}
				if(!uni.getStorageSync('userRealInfo')){
					data.code = this.code
				}
				// 代办 货主判断  hasfrom : 1代办 2货主
				if(this.hasfrom == 1){
					data.type = 2
				}else if(this.hasfrom == 2){
					data.type = 1
					data.categoryId = this.productTypeId
				}
				
				if(this.userApply.status == 3) { // 重新审核
					data.id = this.userApply.id
					data.status = 3
					applyApplyUpdate(data).then(res=>{
						if(res.code == '1000'){
							getUserRealInfoAll().then((res) => {
								if (res.code === '1000') {
									let roleId = res.data.userRole.roleId || ''
									uni.setStorageSync('nickName', res.data.user.nickName)
									uni.setStorageSync('headImgUrl', res.data.user.headImgUrl)
									uni.setStorageSync('roleId', roleId)
									uni.setStorageSync('userRealInfo',res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : '')	
									uni.setStorageSync('userApply', res.data.apply.id ? JSON.stringify(res.data.apply) : '')	
									uni.switchTab({
										url:'/pages/middle/middle'
									})
								}
							})
						}else{
							 T.tips(res.message || '审核失败')
						}
					})
				}else{  // 第一次审核
					getUserRealInfoSettledIn(data).then(res=>{
						if(res.code == '1000'){
							getUserRealInfoAll().then((res) => {
								if (res.code === '1000') {
									let roleId = res.data.userRole.roleId || ''
									uni.setStorageSync('nickName', res.data.user.nickName)
									uni.setStorageSync('headImgUrl', res.data.user.headImgUrl)
									uni.setStorageSync('roleId', roleId)
									uni.setStorageSync('userRealInfo',res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : '')	
									uni.setStorageSync('userApply', res.data.apply.id ? JSON.stringify(res.data.apply) : '')	
									uni.switchTab({
										url:'/pages/middle/middle'
									})
								}
							})
						}else{
							 T.tips(res.message || '审核失败')
						}
					})
				}
 
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
				// color: #ccc;
				border-bottom: 1upx solid #F0F0F0;
				padding-bottom: 20upx;
				position: relative;
				top: 4upx;
				input{
					font-size: 28upx;
					position: relative;
					top: -4upx;
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
			.tip{
				line-height: 60upx;
				margin-left: 140upx;
			}
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
						padding-bottom: 24upx;
						font-size: 30upx;
						border-bottom: 1upx solid #F0F0F0;
					}
				}
			}
		}
		.top{
			height: 140upx;
			line-height: 140upx;
			border-bottom: 20upx solid #F5F5F5;
			
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
					margin-left: 40upx;
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
