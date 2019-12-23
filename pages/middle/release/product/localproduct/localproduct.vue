<template>
	<view class="localproduct">
		<view class="top-warp" v-if="roleId == '20001' || roleId == '20004'">
			<view class="tags-con">
				<view class="tabs cf">
					<view class="fll li" v-for="(item,index) in navs" :key="index" @click="checkNav(index)">
						<text :class="{navActive:navIndex==index}">{{item.t}} <text v-if="item.n>0">({{item.n}})</text> </text>
						<i v-if="navIndex==index"></i>
					</view>
				</view>
			</view>
		</view>
		<view class="item" v-if="records.length>0">
			<view class="li" v-for="(item,index) in records" :key="index">
				<view  @click="goDetail(item)">
					<Goodx :item="item" :roleId='roleId'></Goodx>
				</view>
				
				<view class="role cf" v-if="roleId == '20001' || roleId == '20004'">
					<view class="btn flr" v-if="navIndex == 0" @click="clickHandledDialog(1,item)"><view>下架</view></view>
					<view class="btn flr" v-if="navIndex == 1" @click="clickHandledDialog(2,item)"><view>撤销</view></view>
					<view class="btn flr cf" v-if="navIndex == 2"><view class="fll"  @click="clickHandledDialog(3,item)">修改</view> <view class="fll"  @click="clickHandledDialog(4,item)">上架</view></view>
					<view class="btn flr" v-if="navIndex == 3" @click="clickHandledDialog(5,item)"><view>修改</view></view>
				</view>
			</view>
			
			<view class="footerText">{{hasData?'数据加载中':'数据加载完毕'}}</view>
		</view>
		
		<view class="nodata" v-if="records.length<=0">
			<view class="image">
				<image src="/static/imgs/localproduct.png" mode=""></image>
			</view>
			<view class="fs24 text-999">还没有货品</view>
		</view>
		<view class="bar" @click="goRelease" v-if="(roleId == '20001' || roleId == '20004') && userApply.status == 1">
			<image src="/static/imgs/icon-1009.png" mode=""></image>
		</view>
		
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import { getShopInfo , fromIdGetAgent, shopAreaFromUserId } from '@/api/userApi.js'
	import { getPageGoods, getPageGoodsSearch, statisticsGoods, handlerGoods } from '@/api/goodsApi.js'
	import Goodx from '@/components/common/Goodx.vue'
	import Dialog from'@/components/common/Dialog.vue'
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				title:'提示',
				isShow:false,
				navs:[
					{
						t:'销售中',
						n:0
					},
					{
						t:'审核中',
						n:0
					},
					{
						t:'已下架',
						n:0
					},
					{
						t:'待修改',
						n:0
					},
				],
				records:[
					
				],
				item:'',
				roleId:'',
				shopId:'',
				navIndex:0,
				index:0,
				pageIndex:1, // 分页
				status:3,   // 商品状态  0: 待审核 1：待修改，2：审核驳回 3：已上架，4：已下架 5：已通过
				hasData: true,
				statisticsGoods:[], // 统计商品数量
				itemDialogData:'',
				itemDialogIndex:'',
				userApply:''
			};
		},
		components:{Goodx,Dialog},
		onLoad(options) {
			// 获取上级nav参数
			if(options.index) this.index = options.index
		},
		onShow() {
			this.shopAreaFromUserId()
		},
		onPullDownRefresh(){
			this.dataInit()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			if(this.hasData){
				this.pageIndex++
				this.getPageGoods()
			}
		},
		methods:{
			// 获取经营地区IDs
			shopAreaFromUserId(){
				shopAreaFromUserId().then(res=>{
					if(res.code == '1000'){
						this.userAreas = ''
						if(res.data.length>0){
							res.data.forEach((item,index)=>{
								// this.userAreas.push(item.cityId)
								if(res.data.length <= 1){
									this.userAreas = item.cityId
								}else{
									if(index == (res.data.length - 1)){
										this.userAreas = this.userAreas + item.cityId
									}else{
										this.userAreas = this.userAreas + item.cityId + ','
									}
								}
							})
						}
						this.dataInit()
					}
				})
			},
			// 初始化
			dataInit(){
				// 判断用户角色
				this.assessUserType()
				// 商品列表 APP-我的货品
				this.records = []
				this.pageIndex = 1
				this.getPageGoods()
				// 获取商品统计数量
				if(uni.getStorageSync('roleId') == '20001' || uni.getStorageSync('roleId') == '20004'){
					this.getStatisticsGoods()
				}
			},
			// 弹窗取消
			doCancel(){
				this.isShow = false
			},
			// 弹窗确定
			doConfirm(){
				this.clickHandled(this.itemDialogData,this.itemDialogIndex)
				this.isShow = false
			},
			// 点击操作事件
			clickHandledDialog(index,item){
				this.itemDialogData = item
				this.itemDialogIndex = index
				switch (index){
					case 1:
						this.isShow = true
						this.title = '是否下架该货品?'
						break;
					case 2:
						this.isShow = true
						this.title = '是否撤回该货品?'
						break;
					case 3:
						uni.navigateTo({
							url:'/pages/middle/release/release?goodsId='+ item.id + '&shopId='+ item.shopId
						})
						break;	
					case 4:
						this.isShow = true
						this.title = '是否上架该货品?'
						break;
					case 5:
						uni.navigateTo({
							url:'/pages/middle/release/release?goodsId='+ item.id + '&shopId='+ item.shopId
						})
						break;	
					default:
						break;
				}
			},
			//商品操作(批量) 0.上架 1.下架 2.待修改 3.申请驳回
			clickHandled(item,index){ // id 商品ID n 按钮索引
				switch (index){
					case 1:
						this.doHandlerGoods(item.id,1)
						break;
					case 2:
						this.doHandlerGoods(item.id,2)
						break;	
					case 4:
						this.doHandlerGoods(item.id,0)
						break;	
					default:
						break;
				}
			},
			// 操作下架 上架 修改
			doHandlerGoods(goodsIds, type){
				let data = {
					goodsIds:[goodsIds],
					handlerType:type,
					reason:''
				}
				handlerGoods(data).then(res=>{
					if(res.code == '1000'){
						// 商品列表 APP-我的货品
						this.records = []
						this.pageIndex = 1
						this.getPageGoods()
						// 获取商品统计数量
						this.getStatisticsGoods()
					}
				})
			},
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
				uni.removeStorageSync('categorysDates')
			},
			// 去发布商品
			goRelease() {
				this.doClearStorageSync()
				uni.navigateTo({
					url: '/pages/middle/release/release'
				})
			},
			// 获取商品统计数量  状态 0待审核 1待修改 2审核驳回 3已上架 4已下架
			getStatisticsGoods(){
				statisticsGoods().then(res=>{
					if(res.code == '1000'){
						this.navs[3].n = 0
						res.data.forEach((item,index)=>{
							switch (item.status){
								case 3:
									this.navs[0].n = item.goodsNum
								break;
								case 0:
									this.navs[1].n = item.goodsNum
									break;
								case 4:
									this.navs[2].n = item.goodsNum		
								default:
									break;
							}
							if(item.status == 1 || item.status == 2){
								this.navs[3].n += parseInt(item.goodsNum) 
							}
						})	
					}
				})
			},
			// 去商品详情
			goDetail(item){
				uni.navigateTo({
					url:'/pages/order/goodsDetail/goodsDetail?shopId='+item.shopId + '&goodsId=' + item.id
				})
			},
			// 商品列表 APP-我的货品 
			getPageGoods(){
				let roleId = uni.getStorageSync('roleId')
				if(roleId == '20001' || roleId == '20004'){ // 货主
					let data = {
						pageIndex: this.pageIndex,
						status: this.status,
						shopRegionId: this.userAreas
					}
					getPageGoods(data).then(res=>{
						if(res.code == '1000' && res.data){
							this.records = this.records.concat(res.data.records)
							if(this.records.length>= res.data.total){
								this.hasData = false
							}else{
								this.hasData = true
							}
						}
					})
				}else{ // 代办
					let data = {
						pageIndex: this.pageIndex,
						shopRegionId:this.userAreas
					}
					// 代办农产品
					if(this.index == 1) {
						data.shopId = this.shopId
					}
					// 发布新品
					if(this.index == 0){
						data.timeEnd = util.getNowFormatDate()
						data.timeStart = util.getNowFormatDateTo24() 
					}
					getPageGoodsSearch(data).then(res=>{
						if(res.code == '1000') {
							if(res.data.records.length>0 && res.data){
								res.data.records.forEach((item,index)=>{
									if(item.sellTime){
										let pass = (new Date(item.sellTime)).getTime()
										let now  = (new Date(util.getNowFormatDate())).getTime()
										let time = parseInt(now - pass)
										time = parseInt(time / (60*60*1000)) 
										if(time>=24){
											time = '>24'
										}else if(time<1){
											time = '<1'
										}
										item.createTimeName = time
									}
								})
								
								this.records = this.records.concat(res.data.records)
								if(this.records.length>= res.data.total){
									this.hasData = false
								}else{
									this.hasData = true
								}
							}
							
						}
						
					})
				}
				
			},
			// 获取用户角色信息
			getShopInfo(){
				getShopInfo().then(res=>{
					if(res.code == '1000'){
						this.shopId = res.data.id
					}
				})
			},
			// 判断用户角色
			assessUserType(){
				this.roleId    = uni.getStorageSync('roleId')
				this.userApply = JSON.parse(uni.getStorageSync('userApply')) 
				if(this.roleId == '20001' || this.roleId == '20004'){
					uni.setNavigationBarTitle({
					    title: '我的货品'
					});
				}else if(this.roleId == '20002'){
					if(this.index == 0) {
						uni.setNavigationBarTitle({
						    title: '新发布'
						});
					}else{
						uni.setNavigationBarTitle({
						    title: '本地货品'
						});
					}
				}
			},
		
			// nav 切换
			checkNav(index){
				this.navIndex = index
				// 商品状态(0: 待审核 1：待修改，2：审核驳回 3：已上架，4：已下架 5：已通过)
				switch (index){
					case 0:
					this.status = 3
						break;
					case 1:
					this.status = 0
						break;
					case 2:
					this.status = 4
						break;
					case 3:
					this.status = 1
						break;
					default:
						break;
				}
				this.records = []
				this.pageIndex = 1
				this.getPageGoods()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.localproduct{
		// min-height: 100vh;
		// background: #fff;
		width: 750upx;
		margin: 0 auto;
		overflow-x: hidden;
		.bar {
			position: fixed;
			right: 40upx;
			bottom: 180upx;
			z-index: 9999;
			width: 120upx;
			height: 120upx;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.item{
			background: #fff;
			.li{
				border-bottom: 20upx solid #f7f7f7;
				.role{
					height: 76upx;
					line-height: 76upx;
					.btn{
						view{
							margin-right: 20upx;
							width:120upx;
							height:54upx;
							line-height: 54upx;
							text-align: center;
							border:1px solid #666;
							border-radius:36upx;
							color: #666;
							font-size: 28upx;
						}
					}
				}
			}
			
		}
		.footerText{
			height: 60upx;
			line-height: 60upx;
			color: #999;
			text-align: center;
			font-size: 24upx;
			background: #f7f7f7;
		}
		.tags-con {
			background-color: #fff;
			position: relative;
			margin-bottom: 20upx;
			.tabs {
				height: 80upx;
				line-height: 80upx;
				position: relative;
		
				.li {
					font-size: 30upx;
					width: 25%;
					text-align: center;
					position: relative;
		
					.navActive {
						color: #FE3B0B;
					}
		
					i {
						position: absolute;
						bottom: 0;
						height: 6upx;
						width: 25%;
						display: block;
						background: #FE3B0B;
						margin-left: 40%;
					}
					.tip{
						width:32upx;
						height:32upx;
						background:rgba(254,59,11,1);
						border:2upx solid rgba(255,255,255,1);
						border-radius:50%;
						font-size: 16upx;
						color: #fff;
						text-align: center;
						line-height: 32upx;
						position: absolute;
						right: 10upx;
						top: 0upx;
					}
				}
		
			}
		
			.flag {
				width: 34upx;
				height: 6upx;
				position: absolute;
				bottom: 0;
				background-color: #FE3B0B;
				left: 60upx;
				z-index: 2;
				transition: left 0.5s;
			}
		}
		.nodata{
			text-align: center;
			.image{
				width: 200upx;
				height: 200upx;
				margin: 0 auto;
				padding-top: 300upx;
				padding-bottom: 20upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
