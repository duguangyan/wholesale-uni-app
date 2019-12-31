<template>
	<view class="middle" v-if="roleId!=''">
		<!-- 代办 -->
		<!-- <view v-if="roleId==20002">
			<agency></agency>
		</view> -->
		<!-- 货主 -->
		<view v-if="userApply!='' && (roleId=='20001' || roleId=='20002' || roleId=='20004')">
			<agency :spGoodsByAgency='spGoodsByAgency' :roleId='roleId' :userApply='userApply' :yearAndMonth='yearAndMonth' :totalPrice="totalPrice" :orderInfos='orderInfos' :spOrders="spOrders"></agency>
		</view>
		<!-- 买家 -->
		<!-- <view v-if="roleId==20003">
			<buyer></buyer>
		</view> -->
		<!-- 已经实名 -->
		<view v-if="userApply=='' && roleId =='20003'">
			<view class="identity cf">
				<view class="item fll" v-for="(item,index) in items" :key="index" @click="goPage(index)">
					<view class="image">
						<image :src="item.imgUrl"></image>
					</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import agency from '@/components/middle/agency.vue'
	import buyer from '@/components/middle/buyer.vue'
	import shipper from '@/components/middle/shipper.vue'
	import util from '@/utils/util.js'
	import { getUserRealInfoAll, getShopIdByUser, getOrderStat, statOrderInfo } from '@/api/userApi.js'
	import { accountSub } from '@/api/payApi.js'
	export default {
		data() {
			return {
				loginClock:0,
				access_token:'',
				yearAndMonth:'',
				totalPrice:'',
				orderInfos:{
					tradingOrder:0,
					tradingMoney:0,
					tradingNum:0
				},
				spOrders: [{
					img: '../../static/imgs/icon-1004.png',
					text: '待确认',
					tip: ''
				}, {
					img: '../../static/imgs/icon-1005.png',
					text: '待买家支付',
					tip: ''
				}, {
					img: '../../static/imgs/icon-1006.png',
					text: '代办发货',
					tip: ''
				}, {
					img: '../../static/imgs/icon-1007.png',
					text: '待买家收货',
					tip: ''
				}, {
					img: '../../static/imgs/icon-1008.png',
					text: '已完成',
					tip: ''
				}],
				status: 1, // 登录用户状态
				roleId: '',
				userRealInfo:'',
				userApply:'',
				items:[
					{
						text:'我是代办',
						imgUrl:'/static/imgs/icon-1.png'
					},
					{
						text:'我是种植户',
						imgUrl:'/static/imgs/icon-2.png'
					},
					{
						text:'我是采购商',
						imgUrl:'/static/imgs/icon-3.png'
					},
					{
						text:'我是企业',
						imgUrl:'/static/imgs/icon-4.png'
					}
				],
				spGoodsByAgency: [{
						img: '/static/imgs/icon-1003.png',
						text: '我的货品'
					},
					{
						img: '/static/imgs/icon-1002.png',
						text: '本地代办'
					}
				]
			};
		},
		components: {agency,buyer,shipper},
		onTabItemTap(e){
			// #ifdef  H5
			this.loginClock = 1
			uni.setStorageSync('loginClock',this.loginClock)
			// #endif
			// #ifdef  MP-WEIXIN || H5
			if(!uni.getStorageSync('access_token')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			// #endif
		},
		onLoad(options) {
			// 获取用户类型
			if(options.roleId) this.roleId = options.roleId
		},
		onShow() {	
			// 根据不同状态获取不同业务
			this.items = []
			this.getUserType()
			// 未登录状态跳转 微信和APP不一样
			// #ifdef  MP-WEIXIN || H5
			if(!uni.getStorageSync('access_token')){
				// #ifdef  MP-WEIXIN 
				if(uni.getStorageSync('pagePath') == 'main'){
					uni.switchTab({
						url:'/pages/main/main'
					})
				}else if(uni.getStorageSync('pagePath') == 'user'){
					uni.switchTab({
						url:'/pages/user/user'
					})
				} else{
					uni.switchTab({
						url:'/pages/main/main'
					})
				}
				// #endif
				
				// #ifdef H5
				let loginClock = uni.getStorageSync('loginClock')
					if(loginClock == 0){
						if(uni.getStorageSync('pagePath') == 'main'){
							uni.switchTab({
								url:'/pages/main/main'
							})
						}else if(uni.getStorageSync('pagePath') == 'user'){
							uni.switchTab({
								url:'/pages/user/user'
							})
						} else{
							uni.switchTab({
								url:'/pages/main/main'
							})
						}
					}
				// #endif
				
			}else{
				// 获取用户信息
				if(uni.getStorageSync('roleId') == '20003' && !uni.getStorageSync('userRealInfo')){
					// uni.navigateTo({
					// 	url:'/pages/middle/identity/identity'
					// })
				}else{
					// 获取用户信息
					this.getUserRealInfoAll()
					
					// 统计订单状态条数
					this.getOrderStat()
					// 主页订单交易统计
					this.getStatOrderInfo()
					// 获取资金账户
					this.getAccountSub()
					// 获取年月
					this.getYearAndMonth()
				}
			}
			// #endif
			
			// #ifdef APP-PLUS
			if(!uni.getStorageSync('access_token')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				// 获取用户信息
				if(uni.getStorageSync('roleId') == '20003' && !uni.getStorageSync('userRealInfo')){
					// uni.navigateTo({
					// 	url:'/pages/middle/identity/identity'
					// })
				}else{
					// 获取用户信息
					this.getUserRealInfoAll()
			
					// 统计订单状态条数
					this.getOrderStat()
					// 主页订单交易统计
					this.getStatOrderInfo()
					// 获取资金账户
					this.getAccountSub()
					// 获取年月
					this.getYearAndMonth()
				}
				
			}
			// #endif
		},
		methods:{
			// 获取用户类型
			getUserType(){
				if(uni.getStorageSync('roleId')) this.roleId = uni.getStorageSync('roleId')
				if(uni.getStorageSync('userRealInfo'))this.userRealInfo = uni.getStorageSync('userRealInfo')
				if(uni.getStorageSync('access_token')) this.access_token = uni.getStorageSync('access_token')
				// if(this.access_token != '' && this.userRealInfo == ''){
				// 	uni.navigateTo({
				// 		url: '/pages/middle/identity/identity'
				// 	})
				// }
				if(this.roleId == '20003' && uni.getStorageSync('userRealInfo')){
					this.items=[
						{
							text:'我是代办',
							imgUrl:'/static/imgs/icon-1.png'
						},
						{
							text:'我是种植户',
							imgUrl:'/static/imgs/icon-2.png'
						}
					]
				}else{
					this.items=[
						{
							text:'我是代办',
							imgUrl:'/static/imgs/icon-1.png'
						},
						{
							text:'我是种植户',
							imgUrl:'/static/imgs/icon-2.png'
						},
						{
							text:'我是采购商',
							imgUrl:'/static/imgs/icon-3.png'
						},
						{
							text:'我是企业',
							imgUrl:'/static/imgs/icon-4.png'
						}
					]
				}
				
				let userApply = ''
				if(uni.getStorageSync('userApply')){
					userApply = JSON.parse(uni.getStorageSync('userApply'))
					if(userApply.isAgentcy == '0'){
						this.spGoodsByAgency = [{
								img: '/static/imgs/icon-1003.png',
								text: '我的货品'
							}
						]
					}else{
						this.spGoodsByAgency =[{
								img: '/static/imgs/icon-1003.png',
								text: '我的货品'
							},
							{
								img: '/static/imgs/icon-1002.png',
								text: '本地代办'
							}
						]
					}
				}
				
				
				
				
				
			},
			// 获取年月
			getYearAndMonth(){
				this.yearAndMonth = util.doHandleYear() + '年' + util.doHandleMonth() + '月'
			},
			// 获取资金账户
			getAccountSub(){
				accountSub().then(res=>{
					if(res.code == '1000'){
						this.totalPrice       = JSON.stringify(res.data.balance)
						// this.bankCardNum      = res.data.bankCardNum
						// this.setPayPwd        = res.data.setPayPwd
						// this.accountSubDates  = res.data
					}
				})
			},
			// 主页订单交易统计
			getStatOrderInfo(){
				let roleId = uni.getStorageSync('roleId')
				let data   = ''
				if(roleId == '20002'){
					data = {
						businessType: 2   // 1货主 2代办
					}
				}else{
					data = {
						businessType: 1   // 1货主 2代办
					}
				}
				statOrderInfo(data).then(res=>{
					if(res.code == '1000' && res.data){
						this.orderInfos = res.data
					}
				})
			},
			// 统计订单状态条数
			getOrderStat(){
				let data = {
					businessType: 1   // 1销售订单  2我的订单
				}
				getOrderStat(data).then(res=>{
					//状态 -1 已取消 0 待支付 1 已支付   2 未发货  3 已发货  4已完成  5 已关闭 6 待审核"
					if(res.code == '1000'){
						let list = res.data
						let userApply = ''
						if(uni.getStorageSync('userApply')){
							userApply = JSON.parse(uni.getStorageSync('userApply'))
						}
						
						this.spOrders = [{
							img: '/static/imgs/icon-1004.png',
							text: '待确认',
							tip: ''
						}, {
							img: '/static/imgs/icon-1005.png',
							text: '待买家支付',
							tip: ''
						}, {
							img: '/static/imgs/icon-1006.png',
							text: userApply.isAgentcy == 0 ?'发货':'代办发货',
							tip: ''
						}, {
							img: '/static/imgs/icon-1007.png',
							text: '待买家收货',
							tip: ''
						}, {
							img: '/static/imgs/icon-1008.png',
							text: '已完成',
							tip: ''
						}]
						
						list.forEach((item,index)=>{
							let roleId = uni.getStorageSync('roleId')
							if(roleId == '20001' || roleId == '20004') {
								if(item.status == 6) this.spOrders[0].tip = item.num	
								if(this.userApply.isAgentcy == 0){
									if(item.status == 2) this.spOrders[2].tip = item.num
								}
							}
							if(roleId == '20002'){
								if(item.status == 2) this.spOrders[2].tip = item.num
							}
							if(item.status == 0) this.spOrders[1].tip = item.num
							if(item.status == 3) this.spOrders[3].tip = item.num
						})
					}
					
				})
			},
			
			// 获取店铺ID
			getShopIdByUser(){
				getShopIdByUser().then(res=>{
					
				})
			},
			// 获取用户信息
			getUserRealInfoAll(){
				getUserRealInfoAll().then((res) => {
					if(res.code == '1000'){
						let roleId = res.data.userRole.roleId || ''
						// 获取用户角色状态  2001 货主 2002 代办
						// uni.setStorageSync('roleId','2001')
						this.roleId       = res.data.userRole.roleId || ''
						this.userRealInfo = res.data.userRealInfo ? res.data.userRealInfo : ''
						
						if(res.data.apply.id){
							this.userApply = res.data.apply 
							uni.setStorageSync('userApply', JSON.stringify(res.data.apply))
						}
										
						uni.setStorageSync('roleId', roleId)
						uni.setStorageSync('userRealInfo',res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : '')	
						
							
						// 设置头部样式
						if(!this.roleId && this.userRealInfo){
							uni.setNavigationBarColor({
								backgroundColor:"#FFFFFF",
								frontColor:"#000000"
							})
							// 设置头部内容
							uni.setNavigationBarTitle({
								title: '选择身份'
							});
						}else{
							uni.setNavigationBarColor({
								backgroundColor:"#FE3B0B",
								frontColor:"#ffffff"
							})
							// 设置头部内容
							let time =  util.doHandleYear()+ '年' + util.doHandleMonth() + '月'
							uni.setNavigationBarTitle({
								title: time
							});
						}
						// 设置底部tab样式
						if(this.roleId == '20002'){
							if(uni.getStorageSync('platform') == '1'){
								uni.setTabBarItem({
								  index: 1,
								  text: '代办',
								  iconPath: 'static/img/2.2.png',
								  selectedIconPath: 'static/img/2.1.png'
								})
							}else{
								uni.setTabBarItem({
								  index: 1,
								  text: '代办',
								  iconPath: 'static/img/2.1.png',
								  selectedIconPath: 'static/img/2.2.png'
								})
							}
							
						}else if( this.roleId == '20003'){
							
							if(uni.getStorageSync('platform') == '1' || uni.getStorageSync('platform') == '5'){
								uni.setTabBarItem({
								  index: 1,
								  text: '入驻',
								  iconPath: 'static/img/2.2.png',
								  selectedIconPath: 'static/img/2.1.png'
								})
							}else{
								uni.setTabBarItem({
								  index: 1,
								  text: '入驻',
								  iconPath: 'static/img/2.1.png',
								  selectedIconPath: 'static/img/2.2.png'
								})
							}
							
						} else if(this.roleId == '20001' || this.roleId == '20004'){
							
							
							if(uni.getStorageSync('platform') == '1'|| uni.getStorageSync('platform') == '5'){
								uni.setTabBarItem({
								  index: 1,
								  text: '发布',
								  iconPath: 'static/img/4.2.png',
								  selectedIconPath: 'static/img/4.1.png'
								})
							}else{
								uni.setTabBarItem({
								  index: 1,
								  text: '发布',
								  iconPath: 'static/img/4.1.png',
								  selectedIconPath: 'static/img/4.2.png'
								})
							}
							
						}
						
						
						
						// 根据不同状态获取不同业务
						this.getUserType()
						
						// // 统计订单状态条数
						// this.getOrderStat()
						// // 主页订单交易统计
						// this.getStatOrderInfo()
						// // 获取资金账户
						// this.getAccountSub()
						// // 获取年月
						// this.getYearAndMonth()
						
					}
					
					
				})
			},
			// 跳转页面
			goPage(index){
				switch (index){
					case 0:
					// 代办
						uni.navigateTo({
							url:'/pages/middle/identity/realname/agency?hasfrom=1'
						})
						break;
					case 1:
					// 货主
						uni.navigateTo({
							url:'/pages/middle/identity/realname/agency?hasfrom=2'
						})
						break;
					// 买家		
					case 2:
						uni.navigateTo({
							url:'/pages/middle/identity/realname/buyer'
						})
						break;
					// 买家
					case 3:
						uni.navigateTo({
							url:'/pages/middle/identity/realname/company'
						})	
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.middle{
		background: #fff;
		min-height: 100vh;
		.identity{
			padding-top: 120upx;
			.item{
				text-align: center;
				padding-top: 120upx;
				width: 50%;
				.image{
					width: 180upx;
					height: 180upx;
					margin: 0 auto;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					font-size: 30upx;
					color: #333;
					margin-top: 20upx;
				}
			}
		}
		
	}
</style>
