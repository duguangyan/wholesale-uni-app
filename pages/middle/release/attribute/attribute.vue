<template>
	<view class="attribute">
		<NavigationBar title="选择属性" :isClick="isClick" :clickTitle="clickTitle" @doClick="doClick"></NavigationBar>
		<view class="height80"></view>
		<!-- <view class="edit fs28" @click="goAdd">新增属性</view> -->
		<view class="address cf" @click="showPicker" v-if="hasAddress.length>0">
			<view class="fll"> <text class="text-theme mgr-10">*</text> <text>产地</text></view>
			<view class="flr image"><image src="/static/imgs/right.png" mode=""></image></view>
			<view class="flr text-999 mgr-20" :class="{'text-333':addressInfo!=''}">{{addressInfo?addressInfo:'请选择产地'}}</view>
		</view>
		<view class="content">
			<view class="list" v-for="(item,index) in categorys" :key="index">
				<view class="title fs30"><text class="text-theme mgr-10">*</text> <text>{{item.name}}</text></view>
				<view class="items cf">
					<view class="item fll" :class="{'active': it.isCheck}"  v-for="(it,ix) in item.valueSet" :key="ix" @click='checkIndex(index,ix,item.inputType)'>
						{{it.value}}
					</view>
				</view>
			</view>
			
			<view class="list" v-for="(item,index) in categorysInput" :key="index">
				<view class="title fs30">{{item.name}}</view>
				<view class="items">
					<input type="text" @input="doInputValue" v-model="item.inputVal" placeholder="自定义输入">
				</view>
			</view>
			
			
			<view class="list" v-for="(item,index) in addCategoryAttributes" :key="index"  v-if="addCategoryAttributes.length>0">
				<view class="title fs30">{{item.name}}</view>
				<view class="items">
					<text class="it active" v-for="(it,ix) in item.values" :key="ix" @click="goEdit(index,ix)">
						{{it}}
					</text>
				</view>
			</view>
			
			
		</view>
		<view class="footer-btn">
			<view class="big-btn-active" :class="{nodata:hasData}" @click="saveAttribute">保存</view>
		</view>
		
		
		<mpvue-city-picker :hasArea="hasArea" :themeColor="themeColor" ref="mpvueCityPicker" :isFullAddress='isFullAddress' :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
	
</template>

<script>
	import NavigationBar from '@/components/common/NavigationBar.vue'
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	import { getByCategoryId } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				hasArea:false,
				hasData: true,
				clickTitle:'新增属性',
				isClick:true,
				address:{},
				addressInfo:'',
				isFullAddress: false,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				fullAddress:'',
				itemIndex: 0,
				colors:['红色1','红色2','红色3','红色4','红色5','红色6','红色7'],
				categorys:[],
				categorysInput:[],
				addCategoryAttributes:[],
				hasAddress:[]
			};
		},
		components: {mpvueCityPicker, NavigationBar},
		onLoad() {
			
		},
		onShow() {
			// 根据商品分类ID获取商品属性
			this.getByCategoryId()
			// 获取自定义属性
			this.addCategoryAttributes = uni.getStorageSync('addCategoryAttributes') || []
			
			// 如果缓存有地址
			if(uni.getStorageSync('addCategoryAddress')){
				this.address = JSON.parse(uni.getStorageSync('addCategoryAddress'))
				this.addressInfo = this.address.province + ' ' + this.address.city
			}
			
			
		},
		methods:{
			// 编辑属性
			goEdit(index,ix){
				uni.navigateTo({
					url:'/pages/middle/release/attribute/add/add?index='+index+'&ix='+ix
				})
			},
			// 根据商品分类ID获取商品属性
			getByCategoryId(){
				let data = {
					status: 1,
					categoryId: JSON.parse(uni.getStorageSync('varieties')).id   
				}
				getByCategoryId(data).then(res=>{
					if(res.code == '1000'){
						uni.setStorageSync('categorysDates',res.data)
						let categorys = []
						let categorysInput = []
						res.data.forEach(item=>{
							// item.valueSet.forEach(it=>{
							// 	it.isCheckIndex = 0
							// })
							item.isCheckIndex = [0]
							if(item.inputType == 4){
								item.inputVal = ''
								categorysInput.push(item)
							}else if(item.inputType == 0){
								this.hasAddress.push(item)
							}else{
								if(item.valueSet.length>0){
									item.valueSet.forEach((item,index)=>{
										item.isCheck = index == 0 ? true : false
									})
								}
								categorys.push(item)
							}
						})
						// 如果缓存有输出数据
						if(uni.getStorageSync('categorysValues') && uni.getStorageSync('categorysValues').length>0){
							let categorysSync = uni.getStorageSync('categorysValues')
							try{
								categorys.forEach((item,index)=>{
									item.valueSet.forEach((it,ix)=>{
										if(it.id == categorysSync[index].valueSet[ix].id){
											it.isCheck = categorysSync[index].valueSet[ix].isCheck
										}else{
											categorysSync.forEach((nn,mm)=>{
												nn.valueSet.forEach((n,m)=>{
													if(it.id == n.id){
														it.isCheck = n.isCheck
													}
												})
											})
										}
									})
								})
							}catch(e){
								//TODO handle the exception
							}
							
							this.categorys = categorys
							
						}else{
							this.categorys = categorys
						}
						// this.categorys = categorys
						
						if(uni.getStorageSync('categorysInput') && uni.getStorageSync('categorysInput').length>0){
							this.categorysInput = uni.getStorageSync('categorysInput')
						}else{
							this.categorysInput = categorysInput
						}
						// 判断是否选完数据
						this.assessHasData()
					}else{
						T.tips(res.message || '获取分类信息失败')
					}
				})
			},
			// 新增属性
			doClick(e){
				this.goAdd()
			},
			// 新增属性
			goAdd(){
				uni.navigateTo({
					url:'/pages/middle/release/attribute/add/add'
				})
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.fullAddress = e.label
				// full地址
				let arr = this.fullAddress.split('-')
				// 省
				this.address.province = arr[0]
				this.address.provinceId = e.ids[0] || 1
				// 市
				this.address.city = arr[1]
				this.address.cityId = e.ids[1] || 67748
				this.addressInfo = this.address.province + '-' + this.address.city
				
				uni.setStorageSync('addCategoryAddress', JSON.stringify(this.address))
				// 区
				// this.address.region = arr[2]
				// this.address.regionId = e.ids[2]
				
				this.assessHasData()
				
			},
			doInputValue(){
				uni.setStorageSync('categorysInput',this.categorysInput)
				this.assessHasData()
			},
			// 判断是否选完数据
			assessHasData(){
				let n = 0
				 this.categorysInput.forEach(item=>{
					if(item.inputVal !=''){
						n++
					}
				 })
				 let isFalse = true
				 if(n == this.categorysInput.length){
					isFalse = false
				 }
				 
				 this.hasData = this.addressInfo =='' || isFalse
			},
			showPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			// 保存
			saveAttribute(){
				if(!this.hasData) {
					uni.setStorageSync('categorysValues',this.categorys)
					uni.setStorageSync('categorysInput',this.categorysInput)
					
					let attribute = ''
					this.categorys.forEach((item,index)=>{
						if(item.valueSet.length>0){
							
							item.valueSet.forEach((it,ix)=>{
								if(it.isCheck){
									if(attribute == ''){
										attribute = it.value
									}else{
										attribute = attribute + ',' +  it.value
									}
								}
							})
							
							
						}
					})
					this.categorysInput.forEach((item,index)=>{
						
						if(attribute == ''){
							attribute = item.inputVal
						}else{
							attribute = attribute + ',' +  item.inputVal
						}
					})
					
					let addCategoryAttributes = uni.getStorageSync('addCategoryAttributes')
					if(addCategoryAttributes){
						addCategoryAttributes.forEach((item,index)=>{
							if(attribute==''){
								attribute = item.values[0]
							}else{
								attribute = attribute + ',' +  item.values[0]
							}
						})
					}
					
					uni.setStorageSync('attribute',attribute)
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			// 去地址页面
			goAddress(){
				
			},
			// 选择属性
			checkIndex(index,ix,type){
				console.log(ix)
				if(type == 2){ // 复选框
					this.categorys[index].valueSet[ix].isCheck = !this.categorys[index].valueSet[ix].isCheck
					
				}else{ // 单选框
					this.categorys[index].valueSet.forEach(item=>{
						item.isCheck = false
					})
					this.categorys[index].valueSet[ix].isCheck = true
				}
				uni.setStorageSync('categorysValues',this.categorys)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.attribute{
		padding-top: var(--status-bar-height);
		background: #fff;
		min-height: 100vh;
		padding-bottom: 120upx;
		.text-333{
			color: #333333 !important;
		}
		.nodata{
			background: #D9D9D9 !important;
		}
		.footer-btn{
			width: 100%;
			height: 100upx;
			background: #fff;
			position: fixed;
			bottom: 0;
			z-index: 99;
			padding: 30upx 0;
		}
		.big-btn-active{
			
		}
		.height80{
			height: 80upx;
		}
		.footer{
			position: fixed;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			bottom: 0;
			padding-right: 60upx;
			z-index: 999;
			button{
				background: #007AFF !important;
				color: #fff;
				position: relative;
				right: 30upx;
				top: 20upx;
			}
			background: #eee;
			
		}
		.content{
			padding-bottom: 200upx;
			.list{
				margin-top: 10upx;
				
				.items{
					margin: 0 30upx;
					width: 750upx;
					input{
						border-bottom: 1upx solid #f5f5f5;
						font-size: 30upx;
						padding-bottom: 20upx;
					}
					.item{
						width:150upx;
						height:70upx;
						line-height: 70upx;
						text-align: center;
						border:1upx solid rgba(230,230,230,1);
						border-radius:5upx;
						font-size: 24upx;
						color: #666;
						margin-right: 25upx;
						margin-bottom: 20upx;
					}
					.it{
						
						line-height: 70upx;
						text-align: center;
						border:1upx solid rgba(230,230,230,1);
						border-radius:5upx;
						font-size: 24upx;
						color: #666;
						margin-right: 25upx;
						margin-bottom: 20upx;
						padding: 8upx 14upx;
					}
					.active{
						border:1upx solid rgba(254,59,11,1);
						color:rgba(254,59,11,1);
					}
				}
				.title{
					height: 100upx;
					line-height: 100upx;
					padding: 0 30upx;
					uni-icons{
						margin-right: 10upx;
					}
					
				}
			}
		}
		
		.edit{
			height: 100upx;
			line-height: 100upx;
			color: #007AFF;
			text-align: right;
			padding-right: 30upx;
		}
		.address{
			position: relative;
			height: 80upx;
			height: 80upx;
			line-height: 80upx;
			border-bottom: 1upx solid #f5f5f5;
			margin: 0 30upx;
			.info{
				position: absolute;
				right: 90upx;
				top: 30upx;
			}
			.fll{
				font-size: 30upx;
				color: #333;
			}
			.image{
				width: 24upx;
				height: 24upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.flr{
				font-size: 30upx;
			}
			
		}
		
	}
</style>
