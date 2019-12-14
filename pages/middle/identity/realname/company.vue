<template>
	<view class="agency">
		<view class="top flex">
			<view class="item fs24 flex-1 cf" v-for="(item,index) in progress" :key="index">
				<view class="garden fll" :class="{'activeGarden':index == 0 || (index==1 && disabled)}">{{index+1}}</view>
				<view class="text fll" :class="{'activeText':index == 0  || (index==1 && disabled)}">{{item}}</view>
				<view class="label fll" v-if="index < 2">
					<image src="/static/imgs/agency-right.png"></image>
				</view>
			</view>
		</view>
		
		<view class="user bb-20">
			<view class="title">
				<text>企业信息</text>
			</view>
			<view class="item-1">
				<view class="fll">企业名称</view>
				<view class="flr">
					<input type="text" :disabled="disabled" v-model="enterpriseName"  placeholder="需和营业执照相同">
				</view>
			</view>
			<view class="item-1">
				<view class="fll">企业执照号</view>
				<view class="flr">
					<input type="text" :disabled="disabled" v-model="licenseNo" placeholder="需和营业执照编号相同">
				</view>
			</view>
			
			<view class="upload cf license">
				<view class="title">上传营业执照</view>
				<view class="img fll" @click="chooseImage(2)">
					<image :src="licenseImage==''?'/static/imgs/cat-3.png':licenseImage" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="item regaddress">
					<view class="title">注册地址</view>
					<view class="choose cf" @click="showPicker">
						<view class="fll" :class="{'text-333':addressObj.province!=''}">{{addressObj.province==''?'请选择地区':addressObj.province + ' ' + addressObj.city + ' ' + addressObj.region}}</view>
						<view class="flr" v-if="!disabled">
							<image src="/static/imgs/right.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="item-1">
				<view class="fll">详细地址</view>
				<view class="flr detailed ">
					<input type="text" v-model="address" :disabled="disabled" placeholder="输入详细地址">
				</view>
			</view>
		</view>
		<view class="bb-20">
			<view class="user">
				<view class="title">
					<text>法人信息</text>
				</view>
				<view class="item-1">
					<view class="fll">姓名</view>
					<view class="flr">
						<input type="text" v-model="realName" :disabled="disabled" placeholder="请输入法人信息">
					</view>
				</view>
				<view class="item-1">
					<view class="fll">身份证号</view>
					<view class="flr">
						<input type="text" v-model="cardNo" :disabled="disabled" placeholder="请输入法人身份证号">
					</view>
				</view>
			</view>
			<view class="upload cf">
				<view class="title"><text>上传身份证</text><text class="tips">（正面）</text> </view>
				<view class="img fll" @click="showImage(0)">
					<image src="/static/imgs/cat-1.png" mode=""></image>
				</view>
				<view class="img fll" @click="chooseImage(0)">
			
					<image :src="cardImgFront ==''?'/static/imgs/cat-3.png':cardImgFront" mode=""></image>
					
				</view>
			</view>
			<view class="upload cf">
				<view class="title"><text>上传身份证</text><text class="tips">（反面）</text> </view>
				<view class="img fll" @click="showImage(1)">
					<image src="/static/imgs/cat-2.png" mode=""></image>
				</view>
				<view class="img fll" @click="chooseImage(1)">
					<image :src="cardImgReverse ==''?'/static/imgs/cat-3.png':cardImgReverse" mode=""></image>
				</view>
			</view>
		</view>
		
		
		<view class="content pdt-30">
			<view class="item" @click="showType">
				<view class="title">
					<text>经营类目</text> <text class="fs24 text-999">（审核通过后不可更改）</text>
				</view>
				<view class="choose cf">
					<view class="fll" :class="{'text-666':productType!=''}">{{productType == ''?'请选择类型:如农产品、蔬菜、白菜':productType}}</view>
					<view class="flr" v-if="!disabled">
						<image src="/static/imgs/right.png"></image>
					</view>
				</view>
			</view>
			<view class="item" v-for="(item,index) in areas" :key="index">
				<view class="title">
					<text>经营地区</text> <text class="fs24 text-999">（可通过“加号”增加经营地区）</text>
				</view>
				<view class="choose cf">
					<view class="fll" @click="showPickerAreas(index)" :class="{'text-333':item.province!=''}">{{item.province==''?'请选择经营地区':item.province + ' ' + item.city}}</view>
					<view class="flr fs24 text-theme addanddel" v-if="index>0 && !disabled" @click="delAreas(index)">-删除</view>
					<view class="flr fs24 text-theme addanddel" v-if="index==0 && !disabled" @click="addAreas">+新增地区</view>
					<view class="flr right" v-if="!disabled">
						<image src="/static/imgs/right.png"></image>
					</view>
					
				</view>
			</view>
			<!-- <view class="cf add" @click="addAreas">
				<view class="text-theme fs24 flr">+新增地区</view>
			</view> -->
			
		</view>
		
		<view class="user" v-if="isSetBack">
			
			<view class="item-1" v-if="!disabled && userRealInfo ==''">
				<view class="fll">邀请码</view>
				<view class="flr">
					<input type="text" v-model="code" :disabled="disabled" placeholder="请输入邀请码">
				</view>
			</view>
			<view class="fs24 text-999 tip" v-if="!disabled && userRealInfo ==''">
				邀请码需找销售人员提供
			</view>
			
		</view>
		
		<!-- 0 待审  1 审核通过  2 不通过  3 撤回 -->
		<view class="big-btn-active"  @click="doSubmit" v-if="!disabled">提交审核</view>
		<view class="big-btn-active"  @click="setBack" v-if="disabled">撤回</view>
		<view class="height100"></view>
		<chooseType v-if="isChooseType" :list="categoryTree" @close="chooseTypeClose" @complete="chooseTypeComplete"></chooseType>
		<mpvue-city-picker :themeColor="themeColor" :hasArea='hasArea' ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm" @onChange='onChange'></mpvue-city-picker>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	import chooseType from '@/components/realname/ChooseType.vue'
	import { postUserImgUpload, postUserHeadImg, postUpdateNickname, getUserRealInfoSettledIn, getUserRealInfoAll, applyAuditWithdraw, applyApplyUpdate, applyApplyModifySettledIn,enterpriseSettledIn } from '@/api/userApi.js'
	import { getCategoryTreeNode } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		name: 'agency',
		data() {
			return {
				isSetBack: true,
				hasArea:false,
				categoryId:'',
				code :'',        // 邀请码
				userApply:'',    // 用户类型
				disabled: false, // 是否可以输入
				progress:['填写资料','提交审核','审核通过'],
				isChooseType:false,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				address:'',
				addressObj: {
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
				areas:[{
					"provinceId": "",
					"province": "",
					"cityId": "",
					"city": ""
				}],
				imgIndex: '',
				hasfrom:'',
				from:'',
				productType:'',
				realName :'',        // 真实姓名
				cardNo:'',           // 身份证号码
				cardImgFront :'',    // 身份证正面照
				cardImgReverse :'',  // 身份证反面照
				categoryTree:'',     // 产品分类
				productTypeId:'',    // 分类Id
				userRealInfo:'',     // 邀请码
				enterpriseName:'',   // 企业名称
				licenseNo:'',        // 营业执照号码
				licenseImage:'',     // 营业执照照片
				showPickerAreasIndex:''
			};
		},
		components: {
			uniList,
			uniListItem,
			mpvueCityPicker,
			chooseType
		},
		onLoad(options) {
			// hafrom : 1代办 2 货主 3企业
			if(options.hasfrom) {
				this.hasfrom = options.hasfrom
				// this.disabled = true
			}
			// 审核失败页面返回
			if(options.from == 'auditFail') {
				this.from = 'auditFail'
			}
			
			
		},
		onShow() {
			// 获取经营类型（产品分类）
			this.getCategoryTreeNode()
			// 获取缓存数据
			this.cardImgFront  = uni.getStorageSync('cardImgFront')
			this.cardImgReverse  = uni.getStorageSync('cardImgReverse')
			this.licenseImage  = uni.getStorageSync('licenseImage')
			// if(uni.getStorageSync('userRealInfo')){
			// 	this.userRealInfo =JSON.parse(uni.getStorageSync('userRealInfo'))
			// 	this.cardNo   = this.userRealInfo.cardNo
			// 	this.realName = this.userRealInfo.realName
			// }
			
			// 判断用户类型
			this.assessUserType() 
			
		},
		
		methods: {
			// 删除地区
			delAreas(index){
				this.areas.splice(index,1);
			},
			// 新增地区
			addAreas(){
				let obj = {
					"provinceId": "",
					"province": "",
					"cityId": "",
					"city": ""
				}
				this.areas.push(obj)
			},
			// 获取分类
			getCategoryTreeNode(){
				let data = {
					roleType: '20004'
				}
				getCategoryTreeNode(data).then(res=>{
					if(res.code == '1000'){
						this.categoryTree = res.data
					}
				})
			},
			// 获取用户信息
			getUserRealInfoAll(){
				getUserRealInfoAll().then((res) => {
					if (res.code === '1000') {
						let roleId = res.data.userRole.roleId || ''
						uni.setStorageSync('nickName', res.data.user.realName || (res.data.userRealInfo?res.data.userRealInfo.realName:'') || res.data.apply.realName)
						uni.setStorageSync('headImgUrl', res.data.user.headImgUrl)
						uni.setStorageSync('roleId', roleId)
						uni.setStorageSync('userRealInfo',res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : '')	
						uni.setStorageSync('userApply', res.data.apply.id ? JSON.stringify(res.data.apply) : '')	
					}
				})
			},
			// 撤回
			setBack(){
				applyAuditWithdraw().then(res=>{
					if(res.code == '1000'){
						let userApply    = JSON.parse(uni.getStorageSync('userApply')) 
						userApply.status = 3
						this.userApply   = userApply
						uni.setStorageSync('userApply',userApply)
						this.disabled    = false
						this.isSetBack   = false
					}
				})
			},
			// 判断数据
			assessUserType(){
				// 判断用户类型
				let userApply             = uni.getStorageSync('userApply')
				if(userApply){
					this.userApply          = JSON.parse(userApply) 
					
					this.hasfrom            = this.userApply.type == 1 ? 2 : 1
					this.disabled           = this.userApply.status != 3
					this.realName           = this.userApply.realName
					this.cardNo             = this.userApply.cardNo
					this.categoryId         = this.userApply.categoryId
					this.cardImgFront       = this.userApply.cardImgFront
					this.cardImgReverse     = this.userApply.cardImgReverse
					this.productType        = this.userApply.categoryName
					this.fullAddress        = this.userApply.province + this.userApply.city 
					this.addressObj.province   = this.userApply.province
					this.addressObj.provinceId = this.userApply.provinceId
					this.addressObj.city       = this.userApply.city
					this.addressObj.cityId     = this.userApply.cityId
					this.addressObj.region     = this.userApply.region
					this.addressObj.regionId   = this.userApply.regionId
					
					// 企业
					let userRealInfo    = JSON.parse(uni.getStorageSync('userRealInfo')) 
					this.enterpriseName = this.userApply.enterpriseName
					this.licenseNo      = userRealInfo.licenseNo
					this.licenseImage   = this.userApply.licenseImage
					this.address        = this.userApply.address
					this.productTypeId  = this.userApply.categoryId
					this.areas          = JSON.parse(this.userApply.areas)
					// 撤回
					if(this.userApply.status == 3) this.isSetBack = false
					// 审核失败
					if(this.from = 'auditFail'){
						this.disabled = false
						this.isSetBack = false
					} 
					
					
				}
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
				if(this.disabled){
					return false
				}
				uni.navigateTo({
					url:'/pages/common/showImage/showImage?agency='+index
				})
			},
			// 选择图片
			chooseImage(index){
				
				if(this.disabled){
					return false
				}
				if(this.cardImgFront  !='' && index == 0){
					uni.navigateTo({
						url:'/pages/common/picture/picture?index=0&url='+this.cardImgFront 
					})
					return false
				}
				if(this.cardImgReverse  !='' && index == 1){
					uni.navigateTo({
						url:'/pages/common/picture/picture?index=1&url='+this.cardImgReverse 
					})
					return false
				}
				
				if(this.licenseImage  !='' && index == 2){
					uni.navigateTo({
						url:'/pages/common/picture/picture?index=2&url='+this.licenseImage 
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
										_this.cardImgFront  = res.data
										uni.setStorageSync('cardImgFront',_this.cardImgFront )
										// this.$store.commit('updateNickName',this.nickName);
									}else if(_this.imgIndex == 1){
										_this.cardImgReverse  = res.data
										uni.setStorageSync('cardImgReverse',_this.cardImgReverse)
									}else if(_this.imgIndex == 2){
										_this.licenseImage = res.data
										uni.setStorageSync('licenseImage',_this.licenseImage)
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
				this.hasArea = true
				this.$refs.mpvueCityPicker.show()
			},
			showPickerAreas(index){
				if(this.disabled){
					return false
				}
				this.showPickerAreasIndex = index
				this.hasArea = false
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onChange(e){
				
			},
			onConfirm(e) {
				let arr = e.label.split('-');
				if(this.hasArea) { // 注册地址
					// 省
					this.addressObj.province   = arr[0]
					this.addressObj.provinceId = e.ids[0]
					// 市
					this.addressObj.city       = arr[1]
					this.addressObj.cityId     = e.ids[1]
					// 区
					this.addressObj.region     = arr[2]
					this.addressObj.regionId   = e.ids[2]
				}else{ // 经营地区
					this.areas[this.showPickerAreasIndex].provinceId = e.ids[0]
					this.areas[this.showPickerAreasIndex].province =  arr[0]
					this.areas[this.showPickerAreasIndex].cityId = e.ids[1]
					this.areas[this.showPickerAreasIndex].city = arr[1]
				}
				
			},
			doSubmit(){
				// 数据验证
				if(this.enterpriseName == ''){
					T.tips('企业名称不能为空')
					return false
				}
				if(this.licenseNo == ''){
					T.tips('营业执照号码不能为空')
					return false
				}
				
				if(this.licenseImage == ''){
					T.tips('请上传营业执照')
					return false
				}
				if(this.addressObj.province == ''){
					T.tips('请选择注册地址')
					return false
				}
				
				if(this.realName == ''){
					T.tips('姓名不能为空')
					return false
				}
				
				
				if(this.cardNo == ''){
					T.tips('身份证号码不能为空')
					return false
				}
				
				
				
				if(this.cardImgFront  == ''){
					T.tips('身份证正面照不能为空')
					return false
				}
				if(this.cardImgReverse  == ''){
					T.tips('身份证反面照不能为空')
					return false
				}
				
				if(this.productType == ''){
					T.tips('经营类型不能为空')
					return false
				}
				
				let n = 0 
				this.areas.forEach(item=>{
					if(item.province !=''){
						n++
					}
				})
				if(n == 0){
					T.tips('至少选着一个经营地区')
					return false
				}
				
				// if(!uni.getStorageSync('userRealInfo')){
				// 	if(this.code == ''){
				// 		T.tips('邀请码不能为空')
				// 		return false
				// 	}
				// }
				
				//  实名认证
				let data = {
					cardImgFront:   this.cardImgFront,
					cardImgReverse: this.cardImgReverse,
					cardNo:         this.cardNo,
					realName:       this.realName,
					province:       this.addressObj.province,
					provinceId:     this.addressObj.provinceId,
					city:           this.addressObj.city,
					cityId:         this.addressObj.cityId,
					region:         this.addressObj.region,
					regionId:       this.addressObj.regionId,
					type:           4,
					enterpriseName: this.enterpriseName,
					licenseNo:      this.licenseNo,
					licenseImage:   this.licenseImage,
					categoryId:     this.productTypeId,
					code:           this.code,
					areas:          JSON.stringify(this.areas),
					address:        this.address
				}
				
				if(this.userApply.status == 3 || this.from != '') { // 重新审核
					data.id = this.userApply.id
					data.status = 3
					if(this.from !=''){
						applyApplyModifySettledIn(data).then(res=>{
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
					}else{
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
					}
					
				}else{  // 第一次审核
					enterpriseSettledIn(data).then(res=>{
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
			margin-top: 60upx;
		}
		.height100{
			height: 30upx;
		}
		.license{
			margin: 30upx 0 !important;
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
			// padding-top: 30upx;
			.add{
				line-height: 100upx;
				height: 100upx;
				margin: 0 30upx;
			}
			.regaddress{
				margin: 0 !important;
			}
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
					.fll{
						width: 500upx;
					}
					.addanddel{
						width: 140upx !important;
					}
					.right{
						position: relative;
						right: 140upx;
					}
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
			.title{
				margin-top: 30upx;
				font-size: 32upx;
			}
			.tip{
				line-height: 60upx;
				margin-left: 172upx;
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
					width: 25%;
				}
				.detailed{
					input{
						border-bottom: none !important;
					}
				}
				.flr{
					width: 75%;
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
