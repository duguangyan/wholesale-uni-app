<template>
	<view class="agency">
		<view class="top fs28 text-fff">
			<view class="time">{{yearAndMonth}}</view>
			<view class="flex fs32">
				<view class="flex-1">
					<view><text class="fs32">{{orderInfos.tradingOrder || 0}}</text><text class="fs24">单</text></view>
					<view class="fs24">订单量</view>
				</view>
				<view class="flex-1">
					<view><text class="fs32">{{orderInfos.tradingMoney || 0}}</text><text class="fs24">元</text></view>
					<view class="fs24">{{roleId=='2002'?'代办费':'交易额'}}</view>
				</view>
				<view class="flex-1">
					<view><text class="fs32">{{orderInfos.statDate || 0}} </text><text class="">斤</text></view>
					<view class="fs24">交易量</view>
				</view>
			</view>
		</view>
		<view class="account">
			<view class="cf" v-if="userApply.status == 0" @click="goRealname">
				<view class="fll image"><image src="../../static/imgs/icon-1001.png" mode=""></image></view>
				<view class="fll">你的资料正在审核中，审核通过后可用</view>
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
			</view>
			<view class="cf" v-if="userApply.status == 1" @click="goAccount">
				<view class="fll image img44"><image src="../../static/imgs/icon-1010.png" mode=""></image></view>
				<view class="fll text-333">我的账户</view>
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
				<view class="flr mgr-20">{{totalPrice}}元</view>
			</view>
			<view class="cf" v-if="userApply.status == 2" @click="goRealnameFail(userApply.auditOpinion)">
				<view class="fll image"><image src="../../static/imgs/icon-1001.png" mode=""></image></view>
				<view class="fll">审核失败</view>
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
			</view>
			<view class="cf" v-if="userApply.status == 3" @click="goRealname">
				<view class="fll image"><image src="../../static/imgs/icon-1001.png" mode=""></image></view>
				<view class="fll">审核已撤回,请重新提交</view>
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
			</view>
		</view>
		<view class="goods">
			<view class="title">
				{{roleId=='2002'?'农产品':'我的商品'}}
			</view>
			<view class="list cf fs28" v-if="roleId == 20001">
				<view @click="goGoodsCheck(index)" class="fll" v-for="(item,index) in spGoodsByAgency" :key="index">
					<view class="img"><image :src="item.img" mode=""></image></view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
			<view class="list cf fs28" v-if="roleId == 20002">
				<view @click="goGoodsCheck(index)" class="fll" v-for="(item,index) in spGoodsByShipper" :key="index">
					<view class="img"><image :src="item.img" mode=""></image></view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		</view>
		<view class="goods orders">
			<view class="title cf" @click="goOrder">
				{{roleId=='2002'?'订单':'销售订单'}}
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
			</view>
			<view class="flex fs28">
				<view class="flex-1" v-for="(item,index) in spOrders" :key="index">
					<view class="img"><image :src="item.img" mode=""></image></view>
					<view class="text fs24">{{item.text}}</view>
					<view class="tip" v-if="item.tip != ''">{{item.tip}}</view>
				</view>
			</view>
		</view>

		<view class="bar" @click="goRelease" v-if="roleId ==  20001">
			<image src="../../static/imgs/icon-1009.png" mode=""></image>
		</view>
	</view>

</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import { getOrderStat, statOrderInfo } from '@/api/userApi.js'
	import { accountSub } from '@/api/payApi.js'
	import util from '@/utils/util.js'
	export default {
		name: 'agency',
		props: {
			item: {
				type: String,
				default: ''
			},
			roleId: {
				type: String,
				default: ''
			},
			userApply:{
				type: Object,
				default: null
			}
		},
		data() {
			return {
				orderInfos:'',
				totalPrice:'',
				yearAndMonth:'',
				shippers: ['我是代办', '我要卖货'],
				spListValue: '158.55',
				spGoodsByAgency: [{
						img: '../../static/imgs/icon-1003.png',
						text: '我的货品'
					},
					{
						img: '../../static/imgs/icon-1002.png',
						text: '本地代办'
					}
				],
				spGoodsByShipper: [{
						img: '../../static/imgs/icon-1031.png',
						text: '发布新品'
					},
					{
						img: '../../static/imgs/icon-1032.png',
						text: '农产品'
					},
					{
						img: '../../static/imgs/icon-1033.png',
						text: '货主'
					}
				],
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
				}]
			};
		},
		components: {
			uniList,
			uniListItem
		},
		mounted() {
			console.log('------')
			console.log(this.roleId)
			// 统计订单状态条数
			this.getOrderStat()
			// 主页订单交易统计
			this.getStatOrderInfo()
			// 获取资金账户
			this.getAccountSub()
			// 获取年月
			this.getYearAndMonth()
		},
		methods: {
			// 获取年月
			getYearAndMonth(){
				this.yearAndMonth = util.doHandleYear() + '年' + util.doHandleMonth() + '月'
			},
			// 获取资金账户
			getAccountSub(){
				accountSub().then(res=>{
					if(res.code == '1000'){
						this.totalPrice       = res.data.balance
						// this.bankCardNum      = res.data.bankCardNum
						// this.setPayPwd        = res.data.setPayPwd
						// this.accountSubDates  = res.data
					}
				})
			},
			// 主页订单交易统计
			getStatOrderInfo(){
				statOrderInfo().then(res=>{
					if(res.code == '1000'){
						this.orderInfos = res.data.orderStatVO
					}
					
				})
			},
			// 统计订单状态条数
			getOrderStat(){
				getOrderStat().then(res=>{
					//状态 -1 已取消 0 待支付 1 已支付   2 未发货  3 已发货  4已完成  5 已关闭 6 待审核"
					if(res.code == '1000'){
						let list = res.data
						list.forEach((item,index)=>{
							
							if(item.status == 0) this.spOrders[1].tip = item.num
							if(item.status == 2) this.spOrders[2].tip = item.num
							if(item.status == 3) this.spOrders[3].tip = item.num
							if(item.status == 4) this.spOrders[4].tip = item.num
							if(item.status == 6) this.spOrders[0].tip = item.num
							
						})
					}
					
				})
			},
			// 去审核失败页面
			goRealnameFail(auditOpinion){
				uni.navigateTo({
					url:'/pages/middle/identity/realname/auditFail?auditOpinion='+auditOpinion
				})
			},
			// 去审核页面
			goRealname(){
				let index = uni.getStorageSync('roleId') == '20001' ? 2 : 1
				uni.navigateTo({
					url: '/pages/middle/identity/realname/agency?hasfrom=' + index
				})
			},
			//  去订单页面
			goOrder(){
				uni.navigateTo({
					url: '/pages/user/order/list?from=order'
				})
			},
			// 去我的账户
			goAccount() {
				uni.navigateTo({
					url: '/pages/middle/release/account/account'
				})
			},
			// 去发布商品
			goRelease() {
				uni.navigateTo({
					url: '/pages/middle/release/release'
				})
			},
			// 产品页面
			goGoodsCheck(i){
				let index = i
				// 2001 货主  2002代办
				if(this.roleId == 20001){
					if(index === 0){
						uni.navigateTo({
							url:'/pages/middle/release/product/localproduct/localproduct'
						})
					}else if(index === 1){
						uni.navigateTo({
							url:'/pages/middle/release/product/localshipper/localshipper'
						})
					}
				}else if(this.roleId == 20002){
					if(index === 0){
						uni.navigateTo({
							url:'/pages/middle/release/product/localproduct/localproduct?index=0'
						})
					}else if(index === 1){
						uni.navigateTo({
							url:'/pages/middle/release/product/localproduct/localproduct?index=1'
						})
					}else if(index === 2){
						uni.navigateTo({
							url:'/pages/middle/release/product/localshipper/localshipper'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 货主
	.agency {
		background: #fff;
		min-height: 100vh;
		.account{
			padding-top: var(--status-bar-height);
			height: 100upx;
			line-height: 100upx;
			font-size: 28upx;
			color: #999;
			padding: 0 30upx;
			background: #F5F5F5;
			
			.cf{
				.image{
					width: 24upx;
					height: 24upx;
					margin-right: 20upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.img44{
					width: 44upx;
					height: 44upx;
					margin-right: 20upx;
					position: relative;
					top: 10upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.right{
					width: 24upx;
					height: 24upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
			
		}
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

		.orders {
			margin-top: 20upx;
			.img{
				width: 48upx;
				height: 48upx;
				margin: 10upx auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.flex{
				margin-top: 30upx !important;
			}
		}

		.goods {
			.list{
				margin: 0 30upx;
			}
			.title {
				line-height: 100upx;
				height: 100upx;
				font-size: 34upx;
				color: #333;
				margin: 0 0 0 30upx;
				border-bottom: 1upx solid #F5F5F5;
				font-weight: 600;
				.right{
					width: 24upx;
					height: 24upx;
					position: relative;
					right: 30upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.flex{
				.flex-1{
					position: relative;
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
						right: 34upx;
						top: -12upx;
					}
				}
			}
			
			.cf{
				.fll{
					width: 20%;
					text-align: center;
					margin-top: 20upx;
					.img{
						width: 50upx;
						height: 50upx;
						margin: 10upx auto;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.text{
					color: #333;
					font-size: 24upx;
				}
				
			}
			.flex {
				text-align: center;
				margin: 0 auto;
			}
		}

		.top {
			padding-top: 20upx;
			background: #FE3B0B;
			height: 260upx;
			text-align: center;

			.time {
				height: 100upx;
				line-height: 100upx;
				font-size: 40upx;
			}
			.flex{
				position: relative;
				top: 50upx;
			}
			.flex-1 {
				border-right: 1upx solid #fff;

			}

			.flex-1:last-child {
				border-right: none;
			}
		}


	}
</style>
