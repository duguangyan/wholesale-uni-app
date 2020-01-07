<template>
	<view class="price">
		
		<view class="unit cf" @click="getUnit" >
			<view class="fll fs30"> <text class="text-theme mgr-10">*</text> <text>计量单位</text></view>
			<view class="flr image"><image src="/static/imgs/right.png" mode=""></image></view>
			<view class="flr text-999" :class="{'text-333':unit!=''}">{{unit?unit:'选择计量单位'}}</view>
		</view>
		
		<view class="num cf" >
			<view class="fll"> <text class="text-theme mgr-10 fs30">*</text> <text>库存</text></view>
			<view class="input flr text-333">
				<input type="number" maxlength="8" @input="checkStock" @blur="blurStock" v-model="stock" placeholder="请输入库存">
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
				<view class="fll"><input type="number" @input="inputStartQuantity($event,index)" @blur="blurStartQuantity($event,index)" maxlength="8" v-model="item.startQuantity" /></view>
				<view class="fll">价格(元)</view>
				<view class="fll"><input type="digit" maxlength="8" @input="checkValue($event,index)" @blur='blurValue($event,index)' v-model="item.price" /></view>
				<view class="flr add mr15" v-if='index == 0' @click="add(index)">新增</view>
				<view class="flr del mr15" v-if='index != 0' @click="del(index)">删除</view>
			</view>
		</view>
	
		<view class="big-btn-active" :class="{nodata:hasData}" @click="save">保存</view>
	</view>
</template>

<script>
	import { getCategoryUnitList } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	import util from '@/utils/util.js'
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
				let goodsSkuList  = uni.getStorageSync('goodsSkuList')
				this.stock        = goodsSkuList[0].stock
				this.unit         = goodsSkuList[0].unit
				this.unitId       = goodsSkuList[0].unitId 
				this.priceExpList = goodsSkuList[0].priceExpList
				this.assessHasData()
			}
		},
		methods:{
			checkName(){
				setTimeout(()=>{
					this.assessHasData()
				},10)
			},
			inputStartQuantity(e,index){
				let val = e.target.value + ''
				let startQuantity = ''
				if(val[0] != '0'){
					startQuantity = val.replace(/[^\d]/g,'');
				}
				this.$nextTick(function(){
					this.priceExpList[index].startQuantity = startQuantity
				})
				
			},
			blurStartQuantity(e,index){
				
				let value = e.target.value.replace(/[^\d]/g,'');
				this.$nextTick(function(){
					this.priceExpList[index].startQuantity = value
				})

				if(index > 0){
					let n = this.priceExpList[index].startQuantity
					let m = this.priceExpList[index - 1].startQuantity
					if(parseInt(n) <= parseInt(m)){
						T.tips('第'+ (index+1) + '阶梯起批量必须大于第' + index + '阶梯起批量')
						// this.priceExpList[index].startQuantity = n < m ? (parseInt(m)  + 1) : n
						this.hasData = true
					}
				}
			},
			blurValue(e,index){
				
				// let price = this.priceExpList[index].price + ''
				// if(price.indexOf('.') != -1){
				// 	let arr = price.split('.')
				// 	if(arr[0] == '')arr[0] = '0'
				// 	price = arr[0] + '.' + arr[1].substr(0,2)
				// }
				// if(price == 0 || price == 0.0 || price == 0.00) price = '0.01'
				
				// let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
				// let bool = reg.test(price)
				// if(!bool) {
				// 	price = '0.01'
				// }
				// this.priceExpList[index].price = price
				
				let price = e.target.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
				price = price.replace(/^\./g,""); //验证第一个字符是数字
				price = price.replace(/\.{2,}/g,""); //只保留第一个, 清除多余的
				price = price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
				price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
				this.$nextTick(function(){
					this.priceExpList[index].price = price
				})
				
				
				if(index>0){
					// this.priceExpList[index].price = this.priceExpList[index].price >= this.priceExpList[index - 1].price ? util.accSub(this.priceExpList[index - 1].price,0.01) : this.priceExpList[index].price
					if(this.priceExpList[index].price >= this.priceExpList[index - 1].price){
						T.tips('第'+ (index+1) + '阶梯起批价格必须小于第' + index + '阶梯起批量价格')
						this.hasData = true
						if(this.priceExpList[index].price == '0.00'){
							this.priceExpList[index].price = ''
							this.hasData = true
						} 
					}
				}
			},
			checkValue(e,index){
				
				let val = e.target.value + ''
				let price = ''
				if(val[0] != '0'){
					price = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
					price = price.replace(/^\./g,""); //验证第一个字符是数字
					price = price.replace(/\.{2,}/g,""); //只保留第一个, 清除多余的
					price = price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
					price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
				}
				
				this.$nextTick(function(){
					this.priceExpList[index].price = price
				})
				setTimeout(()=>{
					this.assessHasData()
				},10)
				
			},
			// 库存输入框
			checkStock(e){
				let val = e.target.value + ''
				let stock = ''
				if(val[0] != '0'){
					stock = val.replace(/[^\d]/g,'');
				}
				this.$nextTick(function(){
					this.stock = stock
				})
				this.assessHasData()
				console.log(this.stock )
			},
			blurStock(e){
				let stock = e.target.value.replace(/[^\d]/g,'');
				this.$nextTick(function(){
					this.stock = stock
				})
			},
			// 判断数据是否完整
			assessHasData(){
				this.hasData = this.unit == '' || this.stock == '' || this.priceExpList[0].name == '' || this.priceExpList[0].value == ''
				// 判断价格和起批量
				this.assessPriceExpList()
			},
			// 判断价格和起批量
			assessPriceExpList(){
				if(this.priceExpList.length == 2){
					let s0 = parseInt(this.priceExpList[0].startQuantity)
					let p0 = this.priceExpList[0].price
					let s1 = parseInt(this.priceExpList[1].startQuantity)
					let p1 = this.priceExpList[1].price
					if(s1 <= s0){
						T.tips('第2阶梯起批量不能小于第1阶梯起批量')
						this.hasData = true
					}
					if(util.mul(p0,100) <= util.mul(p1,100)){
						T.tips('第2阶梯起批量价格不能大于第1阶梯起批量价格')
						this.hasData = true
					}
				}
				if(this.priceExpList.length == 3){
					let s2 = parseInt(this.priceExpList[1].startQuantity)
					let p2 = this.priceExpList[1].price
					let s3 = parseInt(this.priceExpList[2].startQuantity)
					let p3 = this.priceExpList[2].price
					if(s3 <= s2){
						T.tips('第3阶梯起批量不能小于第3阶梯起批量')
						this.hasData = true
					}
					if(util.mul(p2,100) <= util.mul(p3,100)){
						T.tips('第3阶梯起批量价格不能大于第2阶梯起批量价格')
						this.hasData = true
					}
					
					let s0 = parseInt(this.priceExpList[0].startQuantity)
					let p0 = this.priceExpList[0].price
					let s1 = parseInt(this.priceExpList[1].startQuantity)
					let p1 = this.priceExpList[1].price
					if(s1 <= s0){
						T.tips('第2阶梯起批量不能小于第1阶梯起批量')
						this.hasData = true
					}
					if(util.mul(p0,100) <= util.mul(p1,100)){
						T.tips('第2阶梯起批量价格不能大于第1阶梯起批量价格')
						this.hasData = true
					}
					
				}
				
				this.priceExpList.forEach(item=>{
					if(item.startQuantity == '' || item.price == ''){
						this.hasData = true
					}
				})
				
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
			add(index){
				let le = this.priceExpList.length - 1
				if(this.priceExpList[le].startQuantity == '' || this.priceExpList[le].price == ''){
					T.tips('请先填写正确的起批量和价格')
					return false
				}
				
				if(this.priceExpList[le].price == '0.01'){
					T.tips('第'+(le+1)+'阶梯价格为0.01，已是最低价格')
					return false
				}
				
				if(this.priceExpList.length>=3){
					T.tips('最多新增3条起批量')
					return false
				}
				let obj = {
					startQuantity:'',
					price: ''
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
				console.log(this.hasData)
				// 判断价格和起批量
				this.assessPriceExpList()
				
				if(this.hasData){
					return false
				}
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
  .mr15{
    margin-right: 30upx;
  }
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
				line-height:56upx;
				border:1upx solid rgba(230,230,230,1);
				border-radius:28upx;
				font-size: 30upx;
				text-align: center;
				position: relative;
				top: 10upx;
				input{
					position: relative;
					// top: 10upx; 
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
        margin-top: 28upx;
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
			margin:0 0 30upx 30upx;
			.li{
				height: 56upx;
				line-height: 56upx;
				font-size: 28upx;
				color: #333;
				margin: 30upx 0;
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
