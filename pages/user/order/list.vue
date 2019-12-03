<template>
	<view class="ordlist">
		<view class="top-warp">
			<view class="tags-con">
				<view class="tabs cf">
					<view class="fll li" v-for="(item,index) in tabs" :key="index" @click="changePosi(index)">
						<text :class="{navActive:navIndex==index}">{{item.name}}</text>
						<i v-if="navIndex==index"></i>
						<view class="tip" v-if="item.tip!=''">{{item.tip}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-no-data" v-if="hasOrders">
			<img src="../../../static/imgs/records-icon.png" alt="图片">
				<view class="text-999 fs28">您还没有相关订单</view>
		</view>
		<view class="list" v-if="!hasOrders">

			<view class="ul">
				<view class="li" v-for="(item, index) in orders" :key="item.id">
					<view class="title cf fs28 text-333">
						<text class="fll fs-w">货主:</text>
						<text class="fll fs-w">{{item.sellName}} </text>
						<view class="image fll">
							<image src="../../../static/imgs/right.png" mode=""></image>
						</view>
						<text class="status flr text-theme">
							<!-- 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核 -->
							<text v-if="item.status === -1">已取消</text>
							<text v-if="item.status === 0">待买家付款</text>
							<text v-if="item.status === 2 && roleId != 20002">待代办发货</text>
							<text v-if="item.status === 2 && roleId == 20002">待发货</text>
							<text v-if="item.status === 3">待收货</text>
							<text class="text-999" v-if="item.status === 4">已完成</text>
							<text v-if="item.status === 5">已关闭</text>
							<text v-if="item.status === 6">待货主审核</text>
						</text>
					</view>
					<view class="mgb-20">
						<Good v-for="good in item.orderDetailList" :key="good.id" :item="good"></Good>
					</view>
					
					<view class="accu fs24">订单金额:￥<text class='fs32 fs-w'>{{roleId == '20001'?item.orderMoney:item.payMoney}}</text></view>
					<view class="operator">
						<!-- // 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核 -->
						<!-- <view tag="view" class="check-phy" v-if="item.status === 3" @click="goFreight(index)">查看物流</view> -->
						<view tag="view" class="check-ord" @click="goDetail(index)">查看订单</view>
						<view class="receive" v-if="item.status == 3" @click="postOrderConfirm(index)">确认收货</view>
						<view class="receive" v-if="item.status == 0 && businessType == 2" @click="showPay(index)">去支付</view>
						<view class="receive" v-if="item.status == 2 && roleId == '20002'" @click="deliverGoods(index)">发货</view>
						
						
						<view class="receive" v-if="item.status == 6 && roleId == '20001'" @click="sellerCancel(index)">取消订单</view>
						<view class="receive" v-if="item.status == 6 && roleId == '20001'" @click="sellerConfirm(index)">确认订单</view>
					</view>
				</view>
			</view>

			<view class="ts-center text-999 fs24 load-text">{{loadText}}</view>
		</view>
		<!--    // orderId：支付订单-->
		<!--    // show：支付上拉框是否弹起-->
		<!--    // isWX：是否只有微信支付-->
		<!--    // price： 支付价格-->
		<!--    // function payClose：关闭支付弹窗-->
		<!--    // function doPay: 点击支付按钮事件-->
		<Pay :orderId="payOrderId" :shopId='shopId' :platform='platform' :show="isPayShow" v-on:close="payClose" v-on:doPay="doPay" :price="nowIndexPrice"></Pay>
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import Good from '@/components/order/Good.vue'
	import Pay from '@/components/common/Pay.vue'
	import Dialog from '@/components/common/Dialog.vue'
	import {
		getOrderPageMyOrder,
		postOrderConfirm,
		getOrderStat,
		sellerCancel,
		sellerConfirm
	} from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		name: 'ordlist',
		data() {
			return {
				title: '确认收货吗?',
				hasOrders: false,
				isShow: false,
				orderId: '',
				shopId: '',
				orders: [],
				// 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核
				tabs: [{
						name: '全部',
						status: '',
						tip:''
					},
					{
						name: '待确认',
						status: 6,
						tip:''
					},
					{
						name: '待支付',
						status: 0,
						tip:''
					},
					{
						name: '待发货',
						status: 2,
						tip:''
					},
					{
						name: '待收货',
						status: 3,
						tip:''
					}
				],
				pageIndex: 1, // 当前页数
				pageSize: 10, // 每页10条
				status: '', // 订单状态状态 '' 全部 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭
				allLoaded: false,
				loadText: '上拉加载更多...',
				isPayShow: false,
				nowIndexPrice: 0,
				isWx: true,
				payOrderId: '',
				navIndex: 0,
				platform: 0,
				from:'',
				roleId:'',
				businessType:''
			}
		},
		components: {
			Good,
			Pay,
			Dialog
		},
		onReachBottom() {
			this.loadBottom()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log('refresh');
			// 获取订单列表
			this.orders = []
			this.getOrders()
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onLoad(options) {
			if(options.from) this.from = options.from
			// (1:销售订单,2:我的订单)"
			if(options.businessType) this.businessType = options.businessType
			
			if(this.businessType == 1){
				// 设置头部内容
				uni.setNavigationBarTitle({
				    title: '销售订单'
				});
			}else{
				// 设置头部内容
				uni.setNavigationBarTitle({
				    title: '我的订单'
				});
			}
		},
		onShow() {
			this.roleId = uni.getStorageSync('roleId')
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			console.log('platform:', this.platform)
			let orderNavIndex = uni.getStorageSync('orderNavIndex')
			if (orderNavIndex) {
				this.status = orderNavIndex - 1
				if(orderNavIndex == '1') this.status = 6
				if(orderNavIndex == '2') this.status = 0
				this.navIndex = orderNavIndex
			}
			// 获取订单列表
			this.orders = []
			this.getOrders()
			// 统计订单状态条数
			this.getOrderStat()
		},
		methods: {
			// 货主取消订单
			sellerCancel(index){
				let itemList = ['已断货','售罄','其他']
				this.orderId = this.orders[index].orderId;
				this.shopId = this.orders[index].shopId;
				let _this = this
				uni.showActionSheet({
				    itemList,
				    success: function (res) {
						let data = {
							orderId: _this.orderId,
							cancelReason : itemList[res.tapIndex]
						}
						sellerCancel(data).then(res=>{
							if(res.code == '1000'){
								// 获取订单列表
								_this.orders = []
								_this.getOrders()
								// 统计订单状态条数
								_this.getOrderStat()
							}
						})
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
				
				
			},
			// 货主确认订单
			sellerConfirm(index){
				this.orderId = this.orders[index].orderId;
				this.shopId = this.orders[index].shopId;
				let data = {
					orderId: this.orderId
				}
				sellerConfirm(data).then(res=>{
					if(res.code == '1000'){
						// 获取订单列表
						this.orders = []
						this.getOrders()
						// 统计订单状态条数
						this.getOrderStat()
					}
				})
			},
			// 发货
			deliverGoods(index){
				let item = this.orders[index]
				uni.navigateTo({
					url:'/pages/user/order/delivery?shopId='+item.shopId + '&orderId=' + item.orderId
				})
			},
			// 统计订单状态条数
			getOrderStat(){
				let data = {
					businessType: this.businessType
				}
				getOrderStat(data).then(res=>{
					//状态 -1 已取消 0 待支付 1 已支付   2 未发货  3 已发货  4已完成  5 已关闭 6 待审核"
					if(res.code == '1000'){
						let list = res.data
						// 获取用户类型 20001 货主 20002 代办   20003 买家
						let roleId = uni.getStorageSync('roleId')
						list.forEach((item,index)=>{
							// (1:销售订单,2:我的订单)"
							if(this.businessType == 1){
								if(roleId == '20001') {
									if(item.status == 6) this.tabs[1].tip = item.num	
								}
								if(roleId == '20002'){
									if(item.status == 2) this.tabs[3].tip = item.num
								}
							}else{
								if(item.status == 0) this.tabs[2].tip = item.num
								if(item.status == 3) this.tabs[4].tip = item.num
							}
						})
					}
				})
			},
			doConfirm() {
				let data = {
					orderId: this.orderId,
					shopId: this.shopId
				}
				if (this.orderId && this.shopId) {
					postOrderConfirm(data).then(res => {
						if (res.code === '1000') {
							// 去收货成功页面
							this.isShow = false
							this.goFinshPage()
						} else {
							T.tips(res.message || '确认收货失败')
						}
					}).catch(err => {
						T.tips(err.message || '确认收货失败')
					})
				} else {
					T.tips('确认收货失败')
				}
			},
			doCancel() {
				this.isShow = false
			},
			goDetail(index, orderId, shopId) {
				let item = this.orders[index]
				uni.navigateTo({
					url: '/pages/user/order/detail?orderId=' + item.orderId + '&shopId=' + item.shopId + '&businessType='+ this.businessType
				})
			},
			goFreight(index) {
				let item = this.orders[index]
				uni.navigateTo({
					url: '/pages/user/order/freight?orderId=' + item.orderId + '&shopId=' + item.shopId
				})
			},
			// 去收货完成页面
			goFinshPage() {
				// orderId, shopId
				uni.navigateTo({
					url: '/pages/user/order/success?orderId=' + this.orderId + '&shopId=' + this.shopId
				})
			},
			// 去支付
			doPay(params) {

				// params 0:微信支付 1:支付宝支付

			},
			// 确认收货
			postOrderConfirm(index) {

				this.isShow = true;
				this.orderId = this.orders[index].orderId;
				this.shopId = this.orders[index].shopId;

			},
			// 显示支付弹窗
			showPay(index) {
				this.nowIndexPrice = this.orders[index].payMoney
				this.payOrderId = this.orders[index].orderId
				this.shopId = this.orders[index].shopId
				this.isPayShow = !this.isPayShow
			},
			// 关闭支付弹窗
			payClose(params) {
				this.isPayShow = !this.isPayShow
			},
			// nav订单状态切换
			changePosi(index) {
				this.navIndex = index
				uni.setStorageSync('orderNavIndex', index)
				// 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核
				this.status = this.tabs[index].status
				this.orders = []
				this.pageIndex = 1
				this.allLoaded = false
				this.loadText = '上拉加载更多...'
				this.getOrders()
			},
			// 下拉加载更多
			loadBottom() {
				setTimeout(() => {
					if (!this.allLoaded) {
						this.pageIndex++
						this.getOrders()
					}
				}, 500)
			},
			// 获取订单列表
			getOrders() {
				let data = {
					pageIndex: this.pageIndex,
					status: this.status,
					pageSize: this.pageSize,
					businessType: this.businessType
				}
			
				// 1:货主,2:代办,3:买家
				//let roleId = uni.getStorageSync('roleId')
				// if (roleId == 20001) {
				// 	data.businessType = 1
				// } else if (roleId == 20002) {
				// 	data.businessType = 2
				// } else if (roleId == 20003) {
				// 	data.businessType = 2
				// }

				getOrderPageMyOrder(data).then((res) => {
					if (res.code === '1000') {
						this.orders = this.orders.concat(res.data.records)
						this.hasOrders = this.orders.length <= 0
						if (this.orders.length >= res.data.total) {
							this.allLoaded = true
							this.loadText = '数据已经加载完毕'
						}
					} else {
						T.tips(res.message || '获取订单列表失败')
						this.hasOrders = this.orders.length <= 0
					}

				}).catch(err => {

					T.tips(err.message || '获取订单列表失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ordlist {
		.ts-center {
			text-align: center;
		}

		.top-warp {
			position: fixed;
			top: 0;
			width: 100%;
			background: #fff;
			z-index: 99999;
		}
		
		/*  #ifdef  H5  */
		.top-warp{
			top: 80upx;
		}
		/*  #endif  */
		.load-text {
			padding: 20upx 0;
		}

		.order-no-data {
			text-align: center;
			padding-top: 340upx;

			>img {
				width: 240upx;
				height: 240upx;
			}
		}

		min-height: 100vh;
		background-color: #f5f5f5;

		li {
			list-style: none;
		}

		.tags-con {
			background-color: #fff;
			position: relative;

			.tabs {
				height: 80upx;
				line-height: 80upx;
				position: relative;

				.li {
					font-size: 30upx;
					width: 20%;
					text-align: center;
					position: relative;

					.navActive {
						color: #fc2d2d;
					}

					i {
						position: absolute;
						bottom: 0;
						height: 6upx;
						width: 20%;
						display: block;
						background: #fc2d2d;
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
				background-color: #fc2d2d;
				left: 60upx;
				z-index: 2;
				transition: left 0.5s;
			}
		}

		.list {
			margin-top: 100upx;

			.li {
				padding: 0 30upx 30upx 30upx;
				background-color: #fff;
				margin-bottom: 20upx;
			}

			.title {
				height: 80upx;
				line-height: 80upx;

				.image {
					width: 24upx;
					height: 24upx;
					position: relative;
					top: 4upx;
					left: 10upx;

					>image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.accu {
				margin-top: -5upx;
				text-align: right;

				span {
					font-weight: bold;
				}
			}

			.operator {
				display: flex;
				justify-content: flex-end;
				margin-top: 30upx;

				&>view {
					width: 140upx;
					line-height: 60upx;
					border: 1upx solid #d9d9d9;
					border-radius: 60upx;
					text-align: center;
					margin-left: 20upx;
					font-size: 24upx;
					color: #666;

					&.receive {
						color: #FC2D2D;
						border: 1upx solid #FC2D2D;
					}
				}
			}
		}
	}
</style>
