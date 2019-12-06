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
					<input type="text" v-model="realName" :disabled="disabled || userRealInfo.realName" placeholder="需和营业执照相同">
				</view>
			</view>
			<view class="item-1">
				<view class="fll">企业执照号</view>
				<view class="flr">
					<input type="text" v-model="realName" :disabled="disabled || userRealInfo.realName" placeholder="需和营业执照编号相同">
				</view>
			</view>
			
			<view class="upload cf license">
				<view class="title">上传营业执照</view>
				<view class="img fll" @click="chooseImage(1)">
					<image :src="agencyImgUpload3==''?'/static/imgs/cat-3.png':agencyImgUpload3" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="item regaddress" @click="showType">
					<view class="title">注册地址</view>
					<view class="choose cf">
						<view class="fll" :class="{'text-666':productType!=''}">{{productType == ''?'请选择地区':productType}}</view>
						<view class="flr" v-if="!disabled">
							<image src="/static/imgs/right.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="item-1">
				<view class="fll">详细地址</view>
				<view class="flr detailed ">
					<input type="text" v-model="realName" :disabled="disabled || userRealInfo.realName" placeholder="输入详细地址">
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
						<input type="text" v-model="realName" :disabled="disabled || userRealInfo.realName" placeholder="请输入法人信息">
					</view>
				</view>
				<view class="item-1">
					<view class="fll">身份证号</view>
					<view class="flr">
						<input type="text" v-model="realName" :disabled="disabled || userRealInfo.realName" placeholder="请输入法人身份证号">
					</view>
				</view>
			</view>
			<view class="upload cf">
				<view class="title"><text>上传身份证</text><text class="tips">（正面）</text> </view>
				<view class="img fll" @click="showImage(0)"  v-if="userApply==''">
					<image src="/static/imgs/cat-1.png" mode=""></image>
				</view>
				<view class="img fll" @click="chooseImage(0)">
			
					<image :src="agencyImgUpload1==''?'/static/imgs/cat-3.png':agencyImgUpload1" mode=""></image>
					
				</view>
			</view>
			<view class="upload cf">
				<view class="title"><text>上传身份证</text><text class="tips">（反面）</text> </view>
				<view class="img fll" @click="showImage(1)" v-if="userApply==''">
					<image src="/static/imgs/cat-2.png" mode=""></image>
				</view>
				<view class="img fll" @click="chooseImage(1)">
					
					<image :src="agencyImgUpload2==''?'/static/imgs/cat-3.png':agencyImgUpload2" mode=""></image>
					
				</view>
			</view>
		</view>
		
		
		<view class="content pdt-30">
			<view class="item" @click="showType">
				<view class="title">
					<text>经营类型</text> <text class="fs24 text-999">（审核通过后不可更改）</text>
				</view>
				<view class="choose cf">
					<view class="fll" :class="{'text-666':productType!=''}">{{productType == ''?'请选择类型:如农产品、蔬菜、白菜':productType}}</view>
					<view class="flr" v-if="!disabled">
						<image src="/static/imgs/right.png"></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>经营地区</text> <text class="fs24 text-999">（如需多个经营地区，可通过“加号”增加经营地区）</text>
				</view>
				<view class="choose cf" @click="showPicker">
					<view class="fll" :class="{'text-333':fullAddress!=''}">{{fullAddress==''?'请选择经营地区':address.province + ' ' + address.city}} {{hasfrom == 2? address.region:''}}</view>
					<view class="flr" v-if="!disabled">
						<image src="/static/imgs/right.png"></image>
					</view>
				</view>
			</view>
			<view class="cf add">
				<view class="text-theme fs24 flr">+新增地区</view>
			</view>
			
		</view>
		
		<view class="user">
			
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
	import { postUserImgUpload, postUserHeadImg, postUpdateNickname, getUserRealInfoSettledIn, getUserRealInfoAll, applyAuditWithdraw, applyApplyUpdate, applyApplyModifySettledIn } from '@/api/userApi.js'
	import { getCategoryTreeNode } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		name: 'agency',
		data() {
			return {
				hasArea:false,
				categoryId:'',
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
				agencyImgUpload3: '',
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
				this.hasArea = this.hasfrom == 2
				// 如果是货主获取经营类型（产品分类）
				if(this.hasfrom == 2){
					getCategoryTreeNode().then(res=>{
						if(res.code == '1000'){
							this.categoryTree = res.data
						}
					})
				}
			}
			// 审核失败页面返回
			
			if(options.from == 'auditFail'){
				this.from = 'auditFail'
			}
		},
		onShow() {
			// 获取缓存数据
			this.agencyImgUpload1 = uni.getStorageSync('agencyImgUpload1')
			this.agencyImgUpload2 = uni.getStorageSync('agencyImgUpload2')
			if(uni.getStorageSync('userRealInfo')){
				this.userRealInfo =JSON.parse(uni.getStorageSync('userRealInfo'))
				this.cardNo   = this.userRealInfo.cardNo
				this.realName = this.userRealInfo.realName
			}
			
			// 判断用户类型
			this.assessUserType() 
			
		},
		
		methods: {
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
					if(this.from == ''){
						this.disabled     = this.userApply.status != 3
					}else{
						this.disabled     = false
					}
					this.realName           = this.userApply.realName
					this.cardNo             = this.userApply.cardNo
					this.categoryId         = this.userApply.categoryId
					this.agencyImgUpload1   = this.userApply.cardImgFront
					this.agencyImgUpload2   = this.userApply.cardImgReverse
					this.productType        = this.userApply.categoryName
					this.fullAddress        = this.userApply.province + this.userApply.city 
					this.address.province   = this.userApply.province
					this.address.provinceId = this.userApply.provinceId
					this.address.city       = this.userApply.city
					this.address.cityId     = this.userApply.cityId
					this.address.region     = this.userApply.region
					this.address.regionId   = this.userApply.regionId
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
			onChange(e){
				
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
					data.categoryId = this.productTypeId || this.categoryId
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
