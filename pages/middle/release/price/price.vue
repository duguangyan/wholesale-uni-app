<template>
	<view class="price">
		
		<view class="unit cf" @click="getUnit" >
			<view class="fll"> <text class="text-theme mgr-10">*</text> <text>计量单位</text></view>
			<view class="flr image"><image src="../../../../static/imgs/right.png" mode=""></image></view>
			<view class="flr text-999 mgr-20" :class="{'text-333':unit!=''}">{{unit?unit:'选择计量单位'}}</view>
		</view>
		
		<view class="num cf" >
			<view class="fll"> <text class="text-theme mgr-10">*</text> <text>库存</text></view>
			<view class="input flr text-333 mgr-20">
				<input type="number" maxlength="30" @input="checkStock" v-model="stock" placeholder="请输入库存">
			</view>
		</view>
		
		<view class="title fs24">
			<text class="text-theme mgr-10">*</text>
			<text class="fs30">价格</text>
			<text class="fs24 text-999">（只需填写货品价格，运费由买家线下支付）</text>
		</view>
		
		<view class="ul fs24">
			<view class="li cf"  v-for="(item,index) in priceExpList" :key="index">
				<view class="fll">起批量</view>
				<view class="fll"><input type="number" maxlength="10" @input="checkName" v-model="item.startQuantity" /></view>
				<view class="fll">价格(元)</view>
				<view class="fll"><input type="number" maxlength="10" @input="checkValue" v-model="item.price" /></view>
				<view class="fll add" v-if='index == 0' @click="add">新增</view>
				<view class="fll del" v-if='index != 0' @click="del(index)">删除</view>
			</view>
		</view>
	
		<view class="big-btn-active" :class="{nodata:hasData}" @click="save">保存</view>
	</view>
</template>

<script>
	import { getCategoryUnitList } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				hasData:true,
				unit: '',
				unitId:'',
				stock:'',
				is70: true,
				unitList:[],
				unitLists:[],
				priceExpList:[
					{
						startQuantity: '',
						price:''
					}
				]
			};
		},
		components: {},
		onLoad() {
			
		},
		onShow() {
			// 获取分类单位
			this.getCategoryUnitList()
			// 获取缓存数据
			if(uni.getStorageSync('goodsSkuList')){
				let goodsSkuList = uni.getStorageSync('goodsSkuList')
				this.stock = goodsSkuList[0].stock
				this.unit  = goodsSkuList[0].unit
				this.priceExpList = goodsSkuList[0].priceExpList
				this.assessHasData()
			}
			
		},
		methods:{
			checkName(){
				this.assessHasData()
			},
			checkValue(){
				this.assessHasData()
			},
			// 库存输入框
			checkStock(){
				this.assessHasData()
			},
			// 判断数据是否完整
			assessHasData(){
				this.hasData =  this.unit == '' || this.stock == '' || this.priceExpList[0].name =='' || this.priceExpList[0].value ==''
				
			},
			// 获取分类单位
			getCategoryUnitList(){
				let data = {
					categoryId : JSON.parse(uni.getStorageSync('varieties')).id ,
					status: 1
				}
				getCategoryUnitList(data).then(res=>{
					if(res.code == '1000'){
						this.unitLists = res.data
						this.unitList = []
						res.data.forEach(item=>{
							this.unitList.push(item.name)
						})
						 
					}
				})
			},
			getUnit(){
				let _this = this
				uni.showActionSheet({
				    itemList: this.unitList,
				    success: function (res) {
						_this.unit = _this.unitList[res.tapIndex]
						_this.unitId = _this.unitLists[res.tapIndex].id
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						// 判断数据是否完整
						_this.assessHasData()
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			// 新增报价
			add(){
				let obj = {
					startQuantity: '',
					price:''
				}
				this.priceExpList.push(obj);
			},
			// 删除报价
			del(index){
				if(index > 0){
					this.priceExpList.splice(index,1)
				}
				// 判断数据是否完整
				this.assessHasData()
			},
			// 保存
			save(){
				if(this.unit == '') {
					T.tips('请选择计量单位')
					return false
				}
				if(this.stock == '') {
					T.tips('请填写库存')
					return false
				}
				if(this.priceExpList[0].startQuantity == '' && this.priceExpList[0].price == '' ) {
					T.tips('至少填写一个起批量和价格')
					return false
				}
				
				let arr = []
				this.priceExpList.forEach((item,index)=>{
					if(item.startQuantity != '' && item.price !=''){
						arr.push(item)
					}
				})
				this.priceExpList = arr
				
				let goodsSkuList = [
					{
						id:'',
						unitId:this.unitId,
						price:'',
						priceType:2,
						sort:1,
						startNum:'',
						stock: this.stock,
						unit: this.unit,
						volume:'',
						weight:'',
						skuAttrValues:[{
							name:this.unit,
							skuId:'',
							value:1
						}],
						priceExpList:this.priceExpList
					}
				]
				
				uni.setStorageSync('goodsSkuList',goodsSkuList)
				uni.navigateBack({
					delta:1
				})
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.price{
		background: #fff;
		min-height: 100vh;
		padding-bottom: 120upx;
		.big-btn-active{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
		.nodata{
			background: #D9D9D9 !important;
		}
		.text-333{
			color: #333 !important;
		}
		.unit,.num{
			position: relative;
			height: 80upx;
			height: 80upx;
			line-height: 80upx;
			border-bottom: 1upx solid #f5f5f5;
			margin: 0 30upx;
			padding-top: 20upx;
			.input{
				width:200upx;
				height:56upx;
				border:1upx solid rgba(230,230,230,1);
				border-radius:28upx;
				font-size: 30upx;
				text-align: center;
				position: relative;
				top: 10upx;
				input{
					position: relative;
					top: 10upx;
				}
			}
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
		.footer{
			position: fixed;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			bottom: 0;
			padding-right: 60upx;
			z-index: 999999;
			button{
				background: #007AFF !important;
				color: #fff;
				position: relative;
				right: 30upx;
				top: 20upx;
			}
			background: #eee;
		}
		.ul{
			margin:0 30upx 30upx 30upx;
			.li{
				height: 56upx;
				line-height: 56upx;
				font-size: 28upx;
				color: #333;
				margin: 20upx 0;
				input{
					width:160upx;
					height:56upx;
					border:1upx solid #E6E6E6;
					border-radius:28upx;
					margin: 0 20upx;
					text-align: center;
				}
				.add{
					width:90upx;
					height:56upx;
					line-height: 56upx;
					background:rgba(254,59,11,1);
					border-radius:28upx;
					color: #fff;
					text-align: center;
				}
				.del{
					width:90upx;
					height:56upx;
					border:1upx solid rgba(254,59,11,1);
					border-radius:28upx;
					color: #FE3B0B;
					background: #fff;
					text-align: center;
				}
				
			}
		}
		.title{
			padding-top: 40upx;
			height: 40upx;
			line-height: 40upx;
			text-align: left;
			margin-left: 30upx;
		}
		.item{
			padding: 0 30upx;
			height: 100upx;
			line-height: 100upx;
			.icon{
				margin-right: 20upx;
			}
			.input{
				border-bottom: 1upx solid #eee;
				position: relative;
				top: 20upx;
				width: 100upx;
			}
		}
	}
</style>
