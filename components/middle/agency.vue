<template>
	<view class="agency">
		<view class="top fs28 text-fff">
			<view class="time">2019年10月</view>
			<view class="flex fs32">
				<view class="flex-1">
					<view><text class="fs32">1</text><text class="fs24">单</text></view>
					<view class="fs24">订单量</view>
				</view>
				<view class="flex-1">
					<view><text class="fs32">5050.05</text><text class="fs24">元</text></view>
					<view class="fs24">{{roleId=='2002'?'代办费':'交易额'}}</view>
				</view>
				<view class="flex-1">
					<view><text class="fs32">5000 </text><text class="">斤</text></view>
					<view class="fs24">交易量</view>
				</view>
			</view>
		</view>
		<view class="account">
			<view class="cf" v-if="userApply.status == 0" @click="goRealname">
				<view class="fll image"><image src="../../static/imgs/icon-1001.png" mode=""></image></view>
				<view class="fll">{{userApply.status == 0?'你的资料正在审核中，审核通过后可用':userApply.auditOpinion}}</view>
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
			</view>
			<view class="cf" v-if="userApply.status == 1" @click="goAccount">
				<view class="fll image img44"><image src="../../static/imgs/icon-1010.png" mode=""></image></view>
				<view class="fll text-333">我的账户</view>
				<view class="flr right"><image src="../../static/imgs/right.png" mode=""></view>
				<view class="flr mgr-20">886.00元</view>
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
			<view class="title" @click="goOrder">
				{{roleId=='2002'?'订单':'销售订单'}}
			</view>
			<view class="flex fs28">
				<view class="flex-1" v-for="(item,index) in spOrders" :key="index">
					<view class="img"><image :src="item.img" mode=""></image></view>
					<view class="text fs24">{{item.text}}</view>
				</view>
			</view>
		</view>

		<view class="bar" @click="goRelease">
			<image src="../../static/imgs/icon-1009.png" mode=""></image>
		</view>
	</view>

</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
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
				default: new Object()
			}
		},
		data() {
			return {
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
						text: '全部产品'
					},
					{
						img: '../../static/imgs/icon-1033.png',
						text: '货主'
					}
				],
				spOrders: [{
					img: '../../static/imgs/icon-1004.png',
					text: '待确认'
				}, {
					img: '../../static/imgs/icon-1005.png',
					text: '待买家支付'
				}, {
					img: '../../static/imgs/icon-1006.png',
					text: '代办发货'
				}, {
					img: '../../static/imgs/icon-1007.png',
					text: '待买家收货'
				}, {
					img: '../../static/imgs/icon-1008.png',
					text: '已完成'
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

		},
		methods: {
			// 去审核页面
			goRealname(){
				uni.navigateTo({
					url: '/pages/middle/identity/realname/agency'
				})
			},
			//  去订单页面
			goOrder(){
				uni.navigateTo({
					url: '/pages/order/goodsList/goodsList'
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
				if(this.roleId == 2001){
					if(index === 1){
						uni.navigateTo({
							url:'/pages/middle/release/product/localproduct/localproduct'
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
