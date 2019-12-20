<template>
	<view class="relesase">
		<view class="top">
			<view class="camera" @click="actionSheetTap" v-if="goodsImg == ''">
				<view class="image"><image src="/static/imgs/icon-1034.png" mode=""></image></view>
				<view class="fs28 text-333">上传图片/视频的货品更有吸引力</view>
				<view class="fs24 text-999">(最少需上传1张)</view>
			</view>
			<view v-if="goodsImg!=''">
				<view class="edit flex">
					<view class="flex-1">
						<view class="image">
							<image :src="goodsImg" mode=""></image>
						</view>
						<view class="video"  v-if="goodsImgs.length == 0" @click="goVideo(goodsImgList[0].videos[0].url)">
							<image src="/static/imgs/icon-1038.png" mode=""></image>
						</view>
					</view>
					<view class="flex-1" @click="editGoodsImgList">
						<view class="btn">编辑图片</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">
				<view class="name fs38 text-000">货品标题</view>
				<view class="input fs24"><input type="text" @input="checkTitle" @blur="checkTitle" maxlength="50" v-model="goodsTitile" placeholder="输入货品标题方便用户找到你的货品15-50个字以内"></view>
				
				<view class="items">
					<view class="item cf" @click="goVarieties" >
						<view class="fll text-theme">*</view>
						<view class="fll fs30 text-333">{{varieties?varieties:'货品品种'}}</view>
						<view class="flr mt2"><image src="/static/imgs/right.png" mode=""></image></view>
					</view>
					<view class="item cf" @click="goAttribute">
						<view class="fll text-theme">*</view>
						<view class="fll fs30 text-333 ellipsis">{{attribute?attribute:'货品属性'}}</view>
						<view class="flr mt2"><image src="/static/imgs/right.png" mode=""></image></view>
					</view>
					<view class="item cf" @click="goPrice">
						<view class="fll text-theme">*</view>
						<view class="fll fs30 text-333">{{price?price:'货品价格'}}</view>
						<view class="flr mt2"><image src="/static/imgs/right.png" mode=""></image></view>
					</view>
				</view>
				
			</view>
		</view>

		<view class="footer fs28">
			<view class="title fs38 text-000">货品描述</view>
			<view class="tips fs20 text-999">请如实填写货品信息（图片、价格、描述等），否则会影响审核发布！</view>
			<view class="textarea">
				<textarea maxlength="1000" v-model="textareaValue" @input="textareaInput" @blur="textareaInput" placeholder="请对货品进行详细描述，可参考以下内容,货品介绍：如货品的优势、质量等级,经营能力：如基地/产地/企业规模、相关设施、供货能力" style="height: 240upx;"/>
				<view class="num">
					<view @click="clearTextarea">
						<text>{{num}}/1000</text>
						<view class="image"><image src="../../../static/imgs/icon-1035.png" mode=""></image></view>
					</view>					
				 </view>
			</view>
		</view>
		
		
		
		<view class="big-btn-active" :class="{nodata:hasData}" @click="doRelease">发布货品</view>
	</view>
</template>

<script>
	import T from '@/utils/tips.js'
	import { postSaveGoods, getGoodsDetail, postEditGoods } from '@/api/goodsApi.js'
	export default {
		data() {
			return {
				hasData:true,
				goodsTitile:'',
				num: 0,
				textareaValue:'',
				varieties:'',
				attribute:'',
				price:'',
				goodsImg:'',
				goodsImgList:[
				],
				goodsImgLists:[],
				goodsSkuList:[],
				goodsImgs:'',
				goodsId:'',
				shopId:'',
				editGoods:'' // 编辑时候请求的数据
			};
		},
		components: {},
		onBackPress(){
			console.log('------------onBackPress')
			if(this.goodsId!='' && this.shopId!=''){
				this.doClearStorageSync()
			}
		},
		onHide() {
			console.log('------------onHide')
			// if(this.goodsId!='' && this.shopId!=''){
			// 	this.doClearStorageSync()
			// }
		},
		onLoad(options) {
			// 货主编辑商品
			if(options.goodsId) this.goodsId = options.goodsId
			if(options.shopId)  this.shopId = options.shopId
			
			
		},
		onShow() {
			if(this.goodsId!='' && this.shopId!=''){
				uni.setNavigationBarTitle({
				    title: '编辑商品'
				});
				// 获取编辑商品详情
				this.getGoodsDetail()
			}else{
				uni.setNavigationBarTitle({
				    title: '发布商品'
				});
				// 获取缓存数据
				this.getStorageSyncBySelf()
			}
			
			
		},
		methods:{
			// 去除缓存
			doClearStorageSync(){
				uni.removeStorageSync('goodsTitile')
				uni.removeStorageSync('varieties')
				uni.removeStorageSync('addCategoryAddress')
				uni.removeStorageSync('addCategoryAttributes')
				uni.removeStorageSync('categorysInput')
				uni.removeStorageSync('categorysValues')
				uni.removeStorageSync('attribute')
				uni.removeStorageSync('goodsSkuList')
				uni.removeStorageSync('textareaValue')
				uni.removeStorageSync('goodsImgList')
			},
			// 获取编辑商品详情
			// 新增商品后台传参比较复杂，修改也是很复杂，老板不懂技术，很忧伤（后台不愿意改，将就用吧）
			getGoodsDetail(){
				let data = {
					goodsId: this.goodsId,
					 shopId: this.shopId  
				}
				getGoodsDetail(data).then(res=>{
					if(res.code == '1000' && res.data && res.data.goodsDetail){
						// 编辑的时候商品数据
						this.editGoods = res.data.goodsDetail.goods
						// 编辑商品详情 ->组装图片
						this.assembleImage(res)
						// 编辑商品详情 ->货品品种
						this.assembleVarieties(res)
						// 编辑商品详情 ->货品属性
						this.assembleAttrList(res)
						// 编辑商品详情 ->货品价格
						this.assembleGoodsSkuList(res)
						
						
						// 货品标题
						this.goodsTitile = res.data.goodsDetail.goods.name
						// 货品描述
						this.textareaValue = res.data.goodsDetail.goods.detail
						
						uni.setStorageSync('textareaValue',this.textareaValue)
						uni.setStorageSync('goodsTitile',this.goodsTitile)
						
						this.mun = this.textareaValue.length
						// 验证表单是否可以提交
						this.assessHasData()
					}
				})
			},
			// 编辑商品详情 ->货品价格
			assembleGoodsSkuList(res){
				let goodsSkuList = []
				if(uni.getStorageSync('goodsSkuList')){
					goodsSkuList = uni.getStorageSync('goodsSkuList')
				}else{
					let sku          = res.data.goodsDetail.goodsSkuList
					
					goodsSkuList = [
						{
							id:'',
							unitId:sku[0].attrValueList[0].skuId,
							price:'',
							priceType:2,
							sort:1,
							startNum:'',
							stock: sku[0].stock,
							unit: sku[0].attrValueList[0].name,
							volume:'',
							weight:'',
							skuAttrValues:[{
								name:sku[0].attrValueList[0].name,
								skuId:sku[0].attrValueList[0].id,
								value:sku[0].attrValueList[0].value
							}],
							priceExpList: JSON.parse(sku[0].priceExp) 
						}
					]
					
					uni.setStorageSync('goodsSkuList',goodsSkuList)
					
				}
				let arr = []
				
				goodsSkuList[0].priceExpList.forEach(item=>{
					arr.push(item.price)
				})
				
				arr.sort(function (a, b) {
				  return a-b;
				});
				let min = arr[0];  
				let max = arr[arr.length - 1];  
				this.price     = "￥" + min + "~" + "￥" + max
				
			},
			// 编辑商品详情 ->货品属性
			assembleAttrList(res){
				if(uni.getStorageSync('categorysValues')){
					if(uni.getStorageSync('attribute')) this.attribute = uni.getStorageSync('attribute')
				}else{
					let attrList        = res.data.goodsDetail.goodsDetailAttrList
					let categorysValues = []
					let categorysInput  = []
					attrList.forEach(item=>{
						// 地址
						if(item.inputType==0){
							let address = {"province":"","provinceId":"","city":item.goodsDetailAttrValueList[0].remark,"cityId": item.goodsDetailAttrValueList[0].value}
							uni.setStorageSync('addCategoryAddress',JSON.stringify(address))
						}
						// 后台属性
						if(item.inputType==2 || item.inputType==1 || item.inputType==null){
							categorysValues.push(item)
						}
						// 填写的属性
						if(item.inputType==4){
							categorysInput.push(item)
						}
						
						if(item.inputType!=0){
							item.goodsDetailAttrValueList.forEach(it=>{
								this.attribute += ' ' + it.value
							})
						}
					})
					uni.setStorageSync('categorysValues',categorysValues)
					uni.setStorageSync('categorysInput',categorysInput)
				}
				
				
				
			},
			// 编辑商品详情 ->货品品种
			assembleVarieties(res){
				if(uni.getStorageSync('varieties')){
					this.varieties = JSON.parse(uni.getStorageSync('varieties')).name
				}else{
					this.varieties   = res.data.goodsDetail.goods.categoryName
					let categoryId   = res.data.goodsDetail.goods.categoryId
					let categoryName = res.data.goodsDetail.goods.categoryName
					let varieties = {"id":categoryId,"parentId":"","sort":0,"children":null,"name":categoryName,"initials":"","imgUrl":""}
					uni.setStorageSync('varieties',JSON.stringify(varieties))
				}
				
			},
			// 编辑商品详情 ->组装图片
			assembleImage(res){
				if(uni.getStorageSync('goodsImgList')){
					this.goodsImg     = uni.getStorageSync('goodsImgList')[0].imgs[0] || uni.getStorageSync('goodsImgList')[0].videos[0].zipUrl
					this.goodsImgList = uni.getStorageSync('goodsImgList')
					this.goodsImgs    =  this.goodsImgList[0].imgs
				}else{
					this.goodsImgLists = res.data.goodsDetail.goodsImgVOList
					let imgs = res.data.goodsDetail.goodsImgVOList
					
					let goodsImgList = [
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
					let videoUrl = {
							a:[],
							b:[]
						}
					let videoZipUrl = {
							a:[],
							b:[]
						}
					imgs.forEach((item,index)=>{
						
						// 主键类型：1商品主图 2商品详情图
						if(item.primaryType == 1){  // 主图
							// 类型 1图片 2视频 3视频截图
							
							switch (item.type){
								case 1:
									this.goodsImg = item.imgUrl
									goodsImgList[0].imgs.push(item.imgUrl)
									break;
								case 2:
									videoUrl.a.push(item.imgUrl)
									break;	
								case 3:
									this.goodsImg = item.imgUrl
									videoZipUrl.a.push(item.imgUrl)
									break;
								default:
									break;
							}
							
							
						}else{  // 详情图
							// 类型 1图片 2视频 3视频截图
							switch (item.type){
								case 1:
									goodsImgList[1].imgs.push(item.imgUrl)
									break;
								case 2:
									videoUrl.b.push(item.imgUrl)
									break;	
								case 3:
									videoZipUrl.b.push(item.imgUrl)
									break;
								default:
									break;
							}
						}
					})
					
					videoUrl.a.forEach((item,index)=>{
						let o = {
							url:item,
							zipUrl:videoZipUrl.a[index]
						}
						goodsImgList[0].videos.push(o)
					})
					videoUrl.b.forEach((item,index)=>{
						let o = {
							url:item,
							zipUrl:videoZipUrl.b[index]
						}
						goodsImgList[1].videos.push(o)
					})
					uni.setStorageSync('goodsImgList',goodsImgList)
					this.goodsImgs    =  goodsImgList[0].imgs
				}
				
				
				
				
				
				
				
				
			},
			// 发布货品
			doRelease(){
				// 数据验证
				if(this.goodsImg == ''){
					T.tips('请上传图片')
					return false
				}
				// if(this.goodsTitile == ''){
				// 	T.tips('请填写标题名称')
				// 	return false
				// }
				if(this.varieties == ''){
					T.tips('请填写货品品种')
					return false
				}
				if(this.attribute == ''){
					T.tips('请填写货品属性')
					return false
				}
				if(this.price == ''){
					T.tips('请填写货品价格')
					return false
				}
				// if(this.textareaValue == ''){
				// 	T.tips('请填写货品描述')
				// 	return false
				// }
				
				
				// 分类信息
				let categorysValues = uni.getStorageSync('categorysValues')
				// 分类input填写信息
				let categorysInput = uni.getStorageSync('categorysInput')
				// 分类地址信息
				let addCategoryAddress = uni.getStorageSync('addCategoryAddress')
				// 分类自己填写信息
				let addCategoryAttributes = uni.getStorageSync('addCategoryAttributes')
				// 上传图片
				let goodsImgList = uni.getStorageSync('goodsImgList')
				// SKU价格信息
				let goodsSkuList = uni.getStorageSync('goodsSkuList')
				
				// 数据处理 适配后台DTO
				let goodsAttrList = []
				if(addCategoryAddress){
					addCategoryAddress = JSON.parse(addCategoryAddress)
					let categorysDates = uni.getStorageSync('categorysDates')
					let categoryAttrId = ''
					if(categorysDates && categorysDates.length>0){
						categorysDates.forEach(item=>{
							if(item.inputType == 0){
								categoryAttrId = item.id
							}
						})
					}
					
					let obj = {
						categoryAttrId,
						goodsAttrValueList:[
							{
								categoryAttrId,
								remark:addCategoryAddress.province + addCategoryAddress.city,
								sort:1,
								value:addCategoryAddress.cityId	
							}
						],
						goodsId:'',
						name:'产地',
						nameGroup:'',
						inputType:0,
						sort:1
					}
					goodsAttrList.push(obj)
				}
				if(categorysValues.length>0){
					console.log(categorysValues)
					
					categorysValues.forEach((item,index)=>{
						if(item.valueSet){
							if(item.valueSet.length>0){
								
								let goodsAttrValueList = []
								item.valueSet.forEach((it,ix)=>{
									if(it.isCheck){
										let obj = {
											categoryAttrId:item.id,
											remark:'',
											sort:ix+1,
											value:it.value
										}
										goodsAttrValueList.push(obj)
									}
								})
								
								let obj = {
									categoryAttrId:item.id,
									goodsAttrValueList,
									goodsId:'',
									name:item.name,
									nameGroup:'',
									inputType:item.inputType,
									sort:index + 2
								}
								goodsAttrList.push(obj)
							}
						}
						
						if(item.goodsDetailAttrValueList){
							if(item.goodsDetailAttrValueList.length>0){
								
								let goodsAttrValueList = []
								item.goodsDetailAttrValueList.forEach((it,ix)=>{
									let obj = {
										categoryAttrId:item.id,
										remark:'',
										sort:ix+1,
										value:it.value
									}
									goodsAttrValueList.push(obj)
								})
								
								let obj = {
									categoryAttrId:item.id,
									goodsAttrValueList,
									goodsId:'',
									name:item.name,
									nameGroup:'',
									inputType:item.inputType,
									sort:index + 2
								}
								goodsAttrList.push(obj)
							}
						}
						
					})
				}
				
				if(addCategoryAttributes && addCategoryAttributes.length>0) {
					
					addCategoryAttributes.forEach((item,index)=>{
						
						let goodsAttrValueList = []
						let obj = {
							categoryAttrId:'',
							remark:'',
							sort:index+1,
							value:item.values[0]
						}
						goodsAttrValueList.push(obj)
						
						
						let obj1 = {
							categoryAttrId:'',
							goodsAttrValueList,
							goodsId:'',
							name:item.name,
							nameGroup:'',
							inputType:4,
							sort:''
						}
						goodsAttrList.push(obj1)
						
					})
					
					
					
					
				}
				
				if(categorysInput.length>0){
					
					categorysInput.forEach((item,index)=>{
						let obj = {
							categoryAttrId:item.id,
							goodsAttrValueList:[
								{
									categoryAttrId:item.id,
									remark:'',
									sort:index+1,
									value:item.inputVal	
								}
							],
							goodsId:'',
							name:item.name,
							nameGroup:'',
							inputType:item.inputType,
							sort:goodsAttrList.length + 1 + index
						}
						goodsAttrList.push(obj)
					})
				}
				
				// 编辑图片
				this.goodsImgLists = []
				if(goodsImgList && goodsImgList.length>0){
					
					if(goodsImgList[0].imgs.length>0){
						this.utilGoodsImgLists(goodsImgList,0,1)
					}
					
					if(goodsImgList[0].videos.length>0){
						this.utilGoodsImgLists(goodsImgList,0,2)		
						this.utilGoodsImgLists(goodsImgList,0,3)
					}
					
					if(goodsImgList[1].imgs.length>0){
						this.utilGoodsImgLists(goodsImgList,1,1)
					}
					if(goodsImgList[1].videos.length>0){
						this.utilGoodsImgLists(goodsImgList,1,2)		
						this.utilGoodsImgLists(goodsImgList,1,3)
					}
					
				}
				// 构造后台DTO
				let GoodsSaveAndEditReq = {
					brandId:'',
					categoryId:JSON.parse(uni.getStorageSync('varieties')).id,
					detail:this.textareaValue,
					goodsAttrList,
					goodsImgList:this.goodsImgLists,
					goodsSkuList,
					goodsSpecList:[
						{
						  "categorySpecId": "",
						  "goodsSpecValueList": [
							{
							  "goodsSpecId": "",
							  "id": "",
							  "sort": 1,
							  "value": goodsSkuList[0].skuAttrValues[0].value
							}
						  ],
						  "id": "",
						  "name": goodsSkuList[0].unit,
						  "sort": 1,
						  "valueSuffix": ""
						}
					  ],
					imgUrl:'',
					keywords:'',
					name: this.goodsTitile || JSON.parse(uni.getStorageSync('varieties')).name,
					purchaseNotes:'',
					saveType:1,
					shopCategoryId:'',
					shopId:'',
					showStyle:2,
					sort:1,
					unit:goodsSkuList[0].unitId || goodsSkuList[0].unit
				}
				console.log('GoodsSaveAndEditReq',GoodsSaveAndEditReq)
				if(this.goodsId!='' && this.shopId!=''){  // 编辑商品
					GoodsSaveAndEditReq.goodsId = this.goodsId
					GoodsSaveAndEditReq.shopId = this.shopId
				
					postEditGoods(GoodsSaveAndEditReq).then(res=>{
						if(res.code == '1000'){
							uni.redirectTo({
								url:'/pages/middle/release/sendSuccess/sendSuccess?id='+ res.data.id + '&shopId='+ res.data.shopId
							})
						}else{
							T.tips(res.message || '发布失败')
						}
					}).catch(err=>{
						uni.navigateTo({
							url:'/pages/middle/release/sendFail/sendFail'
						})
					})
				}else{  // 保存商品
					postSaveGoods(GoodsSaveAndEditReq).then(res=>{
						if(res.code == '1000'){
							uni.redirectTo({
								url:'/pages/middle/release/sendSuccess/sendSuccess?id='+ res.data.id + '&shopId='+ res.data.shopId
							})
						}else{
							T.tips(res.message || '发布失败')
						}
					}).catch(err=>{
						uni.navigateTo({
							url:'/pages/middle/release/sendFail/sendFail'
						})
					})
				}
				
				
				
			},
			// 编辑图片方法 i 1主图还是2详情  ii 类型 1图片 2视频 3视频截图
			utilGoodsImgLists(goodsImgList,i,ii){
				if(ii == 1){
					goodsImgList[i].imgs.forEach((item,index)=>{
						let obj = {
									goodId:'',
									imgUrl:item,
									primaryType:i + 1,
									sort:index,
									type:ii
								}
						this.goodsImgLists.push(obj)
					})
				}else{
					goodsImgList[i].videos.forEach((item,index)=>{
						let obj = {
									goodId:'',
									imgUrl:ii == 2 ? item.url : item.zipUrl,
									primaryType:i + 1,
									sort:index,
									type:ii
								}
						this.goodsImgLists.push(obj)
					})
				}
					
			},
			// 获取缓存数据
			getStorageSyncBySelf(){
				
				this.textareaValue = uni.getStorageSync('textareaValue') || ''
				this.goodsTitile = uni.getStorageSync('goodsTitile') || ''
				
				if(uni.getStorageSync('varieties')){
					this.varieties = JSON.parse(uni.getStorageSync('varieties')).name 
				}
			
				if(uni.getStorageSync('attribute')){
					this.attribute = uni.getStorageSync('attribute')
				}
				
				this.goodsSkuList = uni.getStorageSync('goodsSkuList')
				let arr = []
				if(this.goodsSkuList){
					this.goodsSkuList[0].priceExpList.forEach(item=>{
						arr.push(item.price)
					})
					
					arr.sort(function (a, b) {
					  return a-b;
					});
					if(arr.length<=1){
						this.price     = "￥" + arr[0]
					}else{
						let min = arr[0];
						let max = arr[arr.length - 1];  
						this.price     = "￥" + min + "~" + "￥" + max
					}
					
				}
				
				this.goodsImgList = uni.getStorageSync('goodsImgList') || []
				let goodsImgList = uni.getStorageSync('goodsImgList') || []
					
				if(this.goodsImgList.length>0){
					if(this.goodsImgList[0].imgs.length > 0){
						this.goodsImg = this.goodsImgList[0].imgs[0]
					}else{
						if(this.goodsImgList[0].videos.length>0){
							this.goodsImg = this.goodsImgList[0].videos[0].zipUrl
						}
						
					}
				}
				
				this.goodsImgLists = []
				if(goodsImgList && goodsImgList.length>0){
					
					if(goodsImgList[0].imgs.length>0){
						this.utilGoodsImgLists(goodsImgList,0,1)
					}
					
					if(goodsImgList[0].videos.length>0){
						this.utilGoodsImgLists(goodsImgList,0,2)		
						this.utilGoodsImgLists(goodsImgList,0,3)
					}
					
					if(goodsImgList[1].imgs.length>0){
						this.utilGoodsImgLists(goodsImgList,1,1)
					}
					if(goodsImgList[1].videos.length>0){
						this.utilGoodsImgLists(goodsImgList,1,2)		
						this.utilGoodsImgLists(goodsImgList,1,3)
					}
					
				}
				
				
				console.log(this.goodsImgList)
				
				this.assessHasData()
			},
			// 判断是否可以提交数据
			assessHasData(){
				this.hasData = this.goodsImg == '' || this.varieties == '' || this.attribute == '' || this.price == '' 
				
			},
			checkTitle(){
				this.assessHasData()
				uni.setStorageSync('goodsTitile',this.goodsTitile)
			},
			
			// 编辑图片
			editGoodsImgList(){
				uni.navigateTo({
					url:'/pages/middle/release/chooseImage/chooseImage'
				})
			},
			// 查看视频
			goVideo(url){
				uni.navigateTo({
					url:'/pages/common/video/video?url='+url
				})
			},
			
			goPage(index){
				switch (index){
					case 0:
					this.goVarieties()
						break;
					case 1:
					this.goAttribute()
						break;	
					case 2:
					this.goPrice()
						break;	
					default:
						break;
				}
			},
			// 去价格页面
			goPrice(){
				if(this.attribute == ''){
					T.tips('请先选择属性')
					return false
				}
				uni.navigateTo({
					url:'/pages/middle/release/price/price'
				})
			},
			// 去属性选择页面
			goAttribute(){
				if(this.varieties == ''){
					T.tips('请先选择品种')
					return false
				}
				uni.navigateTo({
					url:'/pages/middle/release/attribute/attribute'
				})
			},
			// 去品种选择页面
			goVarieties(){
				uni.navigateTo({
					url:'/pages/middle/release/varieties/varieties'
				})
			},
			// 货物描述
			textareaInput(e){
				this.num = e.detail.cursor
				this.textareaValue = e.detail.value
				uni.setStorageSync('textareaValue',this.textareaValue)
				this.assessHasData()
			},
			// 清空货物描述
			clearTextarea(){
				this.num = 0
				this.textareaValue = ''
			},
			actionSheetTap(){
				// uni.showActionSheet({
				// title: '选择类型',
				// itemList: ['拍摄照片或视频', '从手机相册选择'],
				// success: e => {
				// 	console.log(e.tapIndex);
				// 		if (e.tapIndex == 0) {
				// 			this.chooseVideo();
				// 		} else {
				// 			this.chooseImage();
				// 		}
				// 	}
				// });
				uni.navigateTo({
					url:'/pages/middle/release/chooseImage/chooseImage'
				})
			},
			// 选中图片
			chooseImage: function() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
				
			},
			
			//选中视频
			chooseVideo: function() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						self.src = res.tempFilePath;
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.relesase{
    .mt2{
      /* #ifdef H5 */
      margin-top: 36upx;
      /* #endif */
      /* #ifdef APP-PLUS */
      margin-top: 44upx;
      /* #endif */
    }
		padding-bottom: 60upx;
		.big-btn-active{
			margin: 30upx auto;
		}
		.nodata{
			background: #d9d9d9 !important;
		}
		.footer{
			background: #fff;
			padding: 30upx;
			.tips{
				height: 20upx;
				line-height: 20upx;
				margin: 20upx 0;
			}
			.textarea{
				background: #f5f5f5;
				padding: 20upx 20upx 10upx 20upx;
				margin-top: 20upx;
				position: relative;
				textarea{
					width: 100%;
					font-size: 24upx;
					color: #333;
				}
				
				.num{
					position: absolute;
					right: 30upx;
					bottom: 20upx;
					z-index: 99999;
					font-size: 20upx;
					color: #999999;
					.image{
						display: inline-block;
						width: 32upx;
						height: 32upx;
						position: relative;
            /* #ifdef H5 */
            top: -6upx;
            /* #endif */
            /* #ifdef APP-PLUS */
            top: -12upx;
            /* #endif */
						
						left: 10upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		.content{
			padding: 0upx 30upx;
			background: #fff;
			border-bottom: 20upx solid #F7F7F7;
			border-top: 20upx solid #F7F7F7;
			.title{
				.items{
					.item{
						height: 100upx;
						line-height: 100upx;
						border-top:  1upx solid #f7f7f7;
						.ellipsis{
							width: 600upx;
						}
						.fll{
							margin-right: 10upx;
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
				.name{
					margin: 20upx 0;
				}
				.input{
					color: #333;
					padding-bottom: 20upx;
				}
			}
			
		}
		.top{
			background: #fff;
			padding: 50upx 0 30upx 0;
			.edit{
				margin: 0 30upx;
				position: relative;
				.video{
					width: 60upx;
					height: 60upx;
					position: absolute;
					top: 50%;
					margin-top: -30upx;
					margin-left: 90upx;
					z-index: 9999;
					opacity: .7;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.image{
					width: 240upx;
					height: 240upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.btn{
					width:160upx;
					height:56upx;
					border:1upx solid rgba(230,230,230,1);
					border-radius:28upx;
					font-size: 28upx;
					color: #333;
					line-height: 56upx;
					text-align: center;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -28upx;
				}
			}
			.camera{
				.image{
					width: 140upx;
					height: 140upx;
					margin: 0 auto;
					text-align: center;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				text-align: center;
				.fs28{
					margin: 20upx 0 10upx 0;
				}
			}	
		}
	}
</style>
