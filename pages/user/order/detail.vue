<template>
	<div class="detail">
		<div class="top">
			<div class="img">
				<!-- 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核 -->
				<img v-if="status == -1" src="/static/img/icon-order-5.png" alt="图片">
				<img v-if="status == 0" src="/static/img/icon-order-2.png" alt="图片">
				<img v-if="status == 1" src="/static/img/icon-order-5.png" alt="图片">
				<img v-if="status == 2" src="/static/img/icon-order-1.png" alt="图片">
				<img v-if="status == 3" src="/static/img/icon-order-4.png" alt="图片">
				<img v-if="status == 4" src="/static/img/icon-order-6.png" alt="图片">
				<img v-if="status == 5" src="/static/img/icon-order-5.png" alt="图片">
				<img v-if="status == 6" src="/static/img/icon-order-6.png" alt="图片">
			</div>
			<div class="annoc">
				<!--      状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭-->
				<!-- <div class="title" v-if="order.shopOrder">{{statusText}}</div>
				<div class="sub tick cf" v-if="order.expiresTime && order.expiresTime>0">
					<div class="icon fll" :class="{'Android': platform == 1}">
						<img src="@/static/img/icon-tick.png" width="10" height="10" alt="">
					</div>
					<span v-if="status == 0 || status == 6" class="fll fs24">剩{{expiresTime}}自动关闭</span>
					<span v-if="status == 3" class="fll fs24">剩{{expiresTime}}系统将自动确认收货</span>
				</div> -->
				<view v-if="roleId == '20002' || roleId == '20003'">
					<div class="title" v-if="order.shopOrder && (status == 1 || status == 2 || status == 4 || status == 5)">
						{{statusText}}
					</div>
					<view v-if="businessType == 2 && order.shopOrder && (status == 0 || status == 6 || status == 3)">
						<div class="title" v-if="status == 6">
							等待货主确认
						</div>
						<div class="title" v-if="status == 0 || status == 3">
							确认倒计时: 
							<span v-if="order.expiresTime && order.expiresTime>0">{{expiresTime}}</span>
						</div>
						<div class="sub tick cf" v-if="status == 0 || status == 3">
							<span class="fll fs24">{{statusText}}</span>
						</div>
					</view>
					<view v-if="businessType == 1 && order.shopOrder && (status == 0 || status == 6 || status == 3)">
						<div class="title" v-if="order.shopOrder && (status == 0 || status == 6 || status == 3)">
							确认倒计时: 
							<span v-if="order.expiresTime && order.expiresTime>0">{{expiresTime}}</span>
						</div>
						<div class="sub tick cf" v-if="status == 0 || status == 6 || status == 3">
							<span class="fll fs24">{{statusText}}</span>
						</div>
					</view>
					
					
					<div class="title" v-if="order.shopOrder && (status == -1)">
						{{statusText}}
					</div>
					<div class="sub tick cf" v-if="status == -1 && cancelReason">
						<span class="fll fs24">原因:{{cancelReason != null?cancelReason:''}}</span>
					</div>
				</view>
				
				<view v-if="roleId == '20001' || roleId == '20004'">
					<div class="title" v-if="order.shopOrder && (status == 0 || status == 1 || status == 2 || status == 4 || status == 5)">
						{{statusText}}
					</div>
					<div class="sub tick cf" v-if="status == 0">
						<span class="fll fs24" v-if="order.shopOrder.enterpriseStatus == 0 && order.needAgentcy == 1">你也可以联系代办协调买家支付</span>
						<span class="fll fs24" v-if="order.needAgentcy == 0">你也可以联系{{order.shopOrder.enterpriseStatus == 1?'企业':'买家'}}协调支付</span>
					</div>
					<div class="sub tick cf" v-if="status == 1">
						<span class="fll fs24">请联系代办尽快安排装车发货</span>
					</div>
					<div class="title" v-if="order.shopOrder && (status == 6 || status == 3)">
						确认倒计时: 
						<span v-if="order.expiresTime && order.expiresTime>0">{{expiresTime}}</span>
					</div>
					<div class="sub tick cf" v-if="status == 6 || status == 3">
						<span class="fll fs24">{{statusText}}</span>
					</div>
					
					<div class="title" v-if="order.shopOrder && (status == -1)">
						{{statusText}}
					</div>
					<div class="sub tick cf" v-if="status == -1 && cancelReason">
						<span class="fll fs24">原因:{{cancelReason != null?cancelReason:''}}</span>
					</div>
				</view>
			</div>
		</div>
		<div class="body">
			<!-- <div class="bus" @click="goFreight">
				<div class="icon-48">
					<img src="@/static/img/icon-bus.png" width="24" height="24" alt />
				</div>

				<div class="address-content" v-if="order.expressDetails">
					<div class="title">{{order.expressDetails.traceList[0].context}}</div>
					<div class="time">{{order.shopOrder.sendTime}}</div>
				</div>
				<div v-else>暂无物流信息</div>
				<div class="icon-20"><img v-if="order.expressDetails" src="@/static/img/tag-go.png" width="10" height="10" alt /></div>
			</div> -->
			<!-- <div class="location" v-if="order.orderShipping">
				<div class="icon-48">
					<img src="@/static/img/icon-location.png" width="24" height="24" alt />
				</div>

				<div>
					<div class="name">
						{{order.orderShipping.receiver}}
						<span class="phone">{{order.orderShipping.phone}}</span>
					</div>
					<div class="address">{{order.orderShipping.province + order.orderShipping.city + order.orderShipping.region + order.orderShipping.address}}</div>
				</div>
			</div> -->
			
			
		<!-- 	<view class="phone cf" v-if="roleId != 20002">
				<view class="fll" v-if="order.shopOrder.enterpriseStatus == 0">{{roleId=='20001' || roleId=='20003' || roleId=='20004'?'代办人':'货主'}}:{{roleId=='20001' || roleId=='20003' || roleId=='20004'?order.agentcyUserName : order.sellerName}}</view>
				<view class="fll" v-if="order.shopOrder.enterpriseStatus == 1">企业:{{order.shopOrder.shopName}}</view>
				
				
				<view class="flr" @click="callPhone(roleId=='20001' || roleId=='20003' || roleId=='20004'?order.agentcyPhone:order.sellerPhone)">
					<view class="image">
						<image src="/static/imgs/icon-phone.png" mode=""></image>
					</view>
					<text v-if="order.shopOrder.enterpriseStatus == 0">联系{{roleId=='20001'|| roleId=='20003' || roleId=='20004'?'代办':'货主'}}</text>
					<text v-if="order.shopOrder.enterpriseStatus == 1">联系企业</text>
				</view>
			</view> -->
			
			
			<view class="phone cf" @click="goCompany(order.shopOrder.shopId)" v-if="businessType == 2 && roleId != 20002 && order.shopOrder.enterpriseStatus == 1 && order.needAgentcy == 0">
				<view class="fll">企业: {{order.shopOrder.shopName}}</view>
				<view class="flr" @click="callPhone(order.sellerPhone)">
					<view class="image">
						<image src="/static/imgs/icon-phone.png" mode=""></image>
					</view>
					<text>联系企业</text>
				</view>
			</view>
			<view class="phone cf" v-if="businessType == 2 && roleId != 20002 && order.needAgentcy == 1">
				<view class="fll">代办: {{order.agentcyPhone}}</view>
				<view class="flr" @click="callPhone(order.agentcyPhone)">
					<view class="image">
						<image src="/static/imgs/icon-phone.png" mode=""></image>
					</view>
					<text>联系代办</text>
				</view>
			</view>
			
			<view class="phone cf" v-if="businessType == 2 && roleId != 20002 && order.shopOrder.enterpriseStatus == 0 && order.needAgentcy == 0">
				<view class="fll">货主: {{order.sellerPhone}}</view>
				<view class="flr" @click="callPhone(order.sellerPhone)">
					<view class="image">
						<image src="/static/imgs/icon-phone.png" mode=""></image>
					</view>
					<text>联系货主</text>
				</view>
			</view>
			
			<view class="phone cf" v-if="businessType == 1 && order.phone && (roleId == 20002 || roleId == 20004)">
				<view class="fll">买家:{{order.userName || '暂无'}}</view>
				<view class="flr" @click="callPhone(order.phone)">
					<view class="image">
						<image src="/static/imgs/icon-phone.png" mode=""></image>
					</view>
					<text>联系买家</text>
				</view>
			</view>
			<view class="phone cf" v-if="order.shopOrder.sendType">
				<view class="fll">物流方式:</view>
				<view class="flr" @click="showCarInfo">
					<text class="text-theme">{{order.shopOrder.sendType == 1 ?'平台选车':'自驾车辆'}}</text>
					<view class="right" v-if="order.shopOrder.sendType == 1">
						<image src="/static/imgs/right.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="logistics bb1 fs28" v-if="order.orderShipping.receiver">
				<view class="cf title">
					<view class="fll ellipsis">收货人: {{order.orderShipping.receiver || ''}}</view>
					<view class="flr">{{order.orderShipping.phone || ''}}</view>
				</view>
				<view class="address">
					收货地址: {{order.orderShipping.province + order.orderShipping.city + order.orderShipping.region + order.orderShipping.address}}
				</view>
			</view>
			
			<div class="list" v-if="order.shopOrder">
				<div class="title">
					<!-- <div class='icon-30' :class="{'Android': platform == 1}">
						<img src="@/static/img/icon-plat.png" width="15" height="15" alt />
					</div>

					<span class="platform">{{order.shopOrder.shopName || ''}}</span> -->
					<!-- // 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核 -->
					<span class="status">
						<span v-if="order.shopOrder.status == -1">已取消</span>
						<span v-if="order.shopOrder.status == 0">待付款</span>
						<span v-if="order.shopOrder.status == 2">待发货</span>
						<span v-if="order.shopOrder.status == 3">待收货</span>
						<span v-if="order.shopOrder.status == 4">已完成</span>
						<span v-if="order.shopOrder.status == 5">已关闭</span>
						<span v-if="order.shopOrder.status == 6">待审核</span>
					</span>
				</div>
				<view class="mgb-30" v-for="good in order.shopOrder.orderDetailList" :key="good.id" >
					<Good :item="good" :status="order.shopOrder.status" :roleId="roleId" :isAgentcy="isAgentcy" :goDetailNumber='goDetailNumber' :isDeatail="isDeatail" :businessType="businessType"></Good>
				</view>
				
				<div class="goods-price">
					<span>商品总价</span>
					<span class="money">￥{{ order.shopOrder.orderMoney}}</span>
				</div>
				<div class="freight">
					<span>运费  <span class="fs24 text-999 mgl-10"> (运费买家线下支付)</span> </span>
					<span class="money">￥{{order.shopOrder.deliverMoney}}</span>
				</div>
				<div class="total-price bb1">
					<span class="fs28">订单总价</span>
					<!-- <span class="fs32" v-if="order.shopOrder.sellerId == uid">￥{{(roleId == '20001' || roleId == '20004')? order.shopOrder.orderMoney : order.shopOrder.totalMoney}}</span> -->
					<span class="fs32" v-if="businessType == 1">￥{{order.shopOrder.orderMoney}}</span>
					<span class="fs32" v-if="businessType == 2">￥{{order.shopOrder.totalMoney}}</span>
				</div>
				<div class="msg cf">
					<span class="span-1 fll">买家留言</span>
					<span class="mgl-20 text-666 span-2 flr">{{order.postscript || ''}}</span>
				</div>
			</div>

			<div class="info" v-if="order.shopOrder">
				<div class="title">订单信息</div>
				<div class="item">订单编号：{{order.shopOrder.orderId || ''}}</div>
				<div class="item">下单时间：{{order.shopOrder.createTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.payTime">货主确认：{{order.shopOrder.comfirmTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.payTime">支付时间：{{order.shopOrder.payTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.sendTime">发货时间：{{order.shopOrder.sendTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.finishTime">收货时间：{{order.shopOrder.finishTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.sellCancelTime">货主取消：{{order.shopOrder.sellCancelTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.buyerCancelTime">买家取消：{{order.shopOrder.buyerCancelTime || ''}}</div>
				<div class="item" v-if="order.shopOrder.closeTime">取消订单：{{order.shopOrder.closeTime || ''}}</div>
			</div>
		</div>

		<div class="footer" v-if="status == 0 || status == 3 || status == 6 || status == 2">
			<!-- 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核 -->
			<div class="btn-black btn" v-if="status == 0 && businessType == 2" @click="postOrderCancel">取消订单</div>
			<div class="btn-red btn" v-if="status == 0 && businessType == 2" @click="showPay">去付款</div>
			<div class="btn-red btn" v-if="status == 3 && businessType == 2" @click="postOrderConfirm">确认收货</div>
			<view class="btn-red btn" v-if="status == 2 && roleId == '20002' && businessType == 1" @click="deliverGoods">发货</view>
			
			<view class="btn-red btn" v-if="status == 2 && userApply.isAgentcy == 0 && businessType == 1" @click="deliverGoods">发货</view>
			
			<view class="btn-red btn" v-if="status == 6 && (roleId == '20001' || roleId == '20004') && order.shopOrder.sellerId == uid && businessType == 2" @click="sellerCancel">取消订单</view>
			<view class="btn-red btn" v-if="status == 6 && (roleId == '20001' || roleId == '20004') && order.shopOrder.sellerId == uid && businessType == 1" @click="sellerConfirm">确认订单</view>

		</div>
		
		<div class="big-btn-active" v-if="status == -1 && businessType == 2" @click="goSubmit">重新购买</div>
		
		<Pay :orderId="orderId" :shopId="shopId" :platform='platform' :show="isPayShow" v-on:close="payClose" v-on:doPay="doPay" :price="nowIndexPrice"></Pay>
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
		<luPopupWrapper ref="luPopupWrapper" 
		    :type="type"
		    :transition="transition"
		    :backgroundColor="backgroundColor"
		    :active="active"
		    :height="height"
		    :width="width"
		    :popupId="popupId"
		    :maskShow="maskShow"
		    :maskClick="maskClick"
		    :closeCallback="closeCallback"
		    >
		    <view class="luPopupWrapper-content">
				<view class="title">
					<text class="text-theme fs36">司机信息</text>
					<view class="close" @click="close"><image src="/static/img/tag-close2.png" mode=""></image></view>
				</view>
				<view class="item">
					司机姓名: {{order.orderShipping.driver || ''}}
				</view>
				<view class="item">
					车牌: {{order.orderShipping.carLicense || ''}}
				</view>
				<view class="item" @click="callPhone(order.orderShipping.driverPhone)">
					电话: {{order.orderShipping.driverPhone || ''}}
          <view class="call-btn">立即拨打</view>
				</view>
			</view>
		</luPopupWrapper>
		
	</div>
</template>

<script>
	import Good from '@/components/order/Good'
	import Pay from '@/components/common/Pay'
	import {
		getOrderDetailById,
		postOrderCancel,
		postOrderConfirm,
		sellerConfirm,
		sellerCancel,
		orderDelivery
	} from '@/api/userApi.js'
	import {
		getOrderCart
	} from '@/api/cartApi.js'
	import T from '@/utils/tips.js'
	import util from '@/utils/util.js'
	import Dialog from '@/components/common/Dialog.vue'
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	export default {
		name: 'orddetail',
		data() {
			return {
				isDeatail:'1',
				goDetailNumber:'1',
				uid:'',
				businessType:'',
				cancelReason:'',
				title: '确认收货吗?',
				isShow: false,
				isWx: false,
				isPayShow: false,
				order: '',
				orderId: '',
				shopId: '',
				statusText: '',
				status: -2,
				nowIndexPrice: 0,
				isOrderDialog: 0,
				isPay: 0,
				platform: 0,
				timer: '',
				expiresTime: '',
				roleId:'', // 用户类型
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"40%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
				clock: true,
				userApply:''
			}
		},
		components: {
			Good,
			Pay,
			Dialog,
			luPopupWrapper
		},
		onLoad(options) {
			this.orderId      = options.orderId
			this.shopId       = options.shopId || 1
			this.businessType = uni.getStorageSync('businessType')
			console.log(this.orderId,this.shopId)
			console.log('this.businessType',this.businessType)
		},
		onShow() {
			// 用户类型
			this.roleId    = uni.getStorageSync('roleId')
			this.uid       = uni.getStorageSync('uid')
			if(uni.getStorageSync('userApply')){
				this.userApply = JSON.parse(uni.getStorageSync('userApply'))
				this.isAgentcy = this.userApply.isAgentcy
			}
			// 设备样式兼容
			this.platform  = uni.getStorageSync('platform');
			// 获取参数
			if (this.orderId) {
				this.getOrderDetailById(this.orderId, this.shopId)
			} else {
				T.tips('订单ID或店铺ID不能为空')
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/main/main'
					})
				}, 1500)
			}
		},
		methods: {
			// 退款
			refundMoney(){
				
			},
			// 去企业店铺
			goCompany(id){
				uni.navigateTo({
					url:'/pages/shop/shop?shopId='+id
				})
			},
			// 重新购买
			goSubmit(){
				console.log(this.order)
				let submitData = JSON.stringify({
				  addressId: '',
				  goodsCount: this.order.shopOrder.orderDetailList[0].num,
				  goodsId: this.order.shopOrder.orderDetailList[0].goodsId,
				  shopId: this.order.shopOrder.orderDetailList[0].shopId,
				  skuId: this.order.shopOrder.orderDetailList[0].skuId
				});
				uni.navigateTo({
				  url: '/pages/order/submit/submit?submitData=' + submitData + '&isBuyNow=1'
				});
			},
			// 货主取消订单
			sellerCancel(){
				let itemList = ['已断货','售罄','其他']
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
								T.tips('取消订单成功')
								_this.getOrderDetailById(_this.orderId, _this.shopId)
							}
						})
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
				
				
			},
			// 货主确认订单
			sellerConfirm(){
				let data = {
					orderId: this.orderId
				}
				sellerConfirm(data).then(res=>{
					if(res.code == '1000'){
						T.tips('确认订单成功')
						this.getOrderDetailById(this.orderId, this.shopId)
					}
				})
			},
			// 弹窗事件
			show() {
				this.$refs.luPopupWrapper.show();
			},
			close() {
				this.$refs.luPopupWrapper.close();
			},
			closeCallback() {
				console.log("关闭后回调");
			},
			
			// 显示司机信息
			showCarInfo(){
				// 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核
				if(this.status >= 3){
					if(this.order.shopOrder.sendType == 1){
						this.show()
					}
				}
			},
			// 拨打联系人电话
			callPhone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone 
				});
			},
			doCancel() {
				this.isShow = false
			},
			// 发货
			deliverGoods(){
				let n = 0
				// this.order.shopOrder.orderDetailList.forEach(item=>{
				// 	if(item.isAfterSale == 1){
				// 		n++
				// 		T.tips("该订单有部分商品退款未完成，无法进行发货")
				// 		return false
				// 	}
				// })
				if(n == 0){
					if(this.order.shopOrder.sendType == 1){
						uni.navigateTo({
							url:'/pages/user/order/delivery?shopId='+this.shopId + '&orderId=' + this.orderId
						})
					}else{
						let data = {
							orderId: this.orderId,
							shopId: this.shopId
						}
						orderDelivery(data).then(res=>{
							if(res.code == '1000'){
								T.tips('发货成功')
								this.getOrderDetailById(this.orderId, this.shopId)
							}else{
								T.tips(res.message || '发货失败')
							}
						})
					}
				}
				
				
			},
			doConfirm() {
				let _this = this

				if (_this.isOrderDialog == 0) {
					if (this.orderId) {
						let data = {
							orderId: this.orderId
						}
						postOrderCancel(data).then(res => {
							if (res.code === '1000') {
								T.tips('取消订单成功')
								_this.status = -1
								_this.statusText = '已取消'
								_this.expiresTime = ''
								clearInterval(this.timer)
								_this.isShow = false
							} else {
								T.tips(res.message || '取消订单失败')
							}
						}).catch(err => {
							T.tips(err.message || '取消订单失败')
						})
					}
				} else {
					let data = {
						orderId: this.order.shopOrder.orderId,
						shopId: this.order.shopOrder.shopId
					}
					if (_this.order.shopOrder.orderId && _this.order.shopOrder.shopId) {
						postOrderConfirm(data).then(res => {
							if (res.code === '1000') {
								T.tips('确认收货成功')
								// 去完成收货页面
								_this.isShow = false
								_this.goFinshPage()
							} else {
								T.tips(res.message || '确认收货失败')
							}
						}).catch(err => {
							T.tips(err.message || '确认收货失败')
						})
					} else {
						T.tips('确认收货失败')
					}
				}

			},
			// 去支付
			doPay(params) {

			},
			// 弹起支付框
			showPay() {
				this.isPayShow = !this.isPayShow
				this.nowIndexPrice = this.order.shopOrder.totalMoney
			},
			// 关闭支付弹窗
			payClose() {
				this.isPayShow = !this.isPayShow
			},
			// 去收货完成页面
			goFinshPage(index) {
				// orderId, shopId
				uni.navigateTo({
					url: '/pages/user/order/success?orderId=' + this.orderId + '&shopId=' + this.shopId
				})
			},
			// 确认收货
			postOrderConfirm() {
				let _this = this
				let n = 0
				this.order.shopOrder.orderDetailList.forEach(item=>{
					if(item.isAfterSale == 1){
						n++
						// T.tips("该订单有部分商品退款未完成，无法进行收货")
						// return false
					}
				})
				this.isOrderDialog = 1
				if(n == 0){
					this.isShow = true
					this.title = '确认收货吗?'
				}else{
					uni.showModal({
					    title: '',
					    content: '订单有退款中的商品，确认收货后将关闭退款',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								_this.doConfirm()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
			},
			// 去物流信息页面
			goFreight() {
				if (this.order.expressDetails) {
					if (this.order.shopOrder.orderId && this.order.shopOrder.shopId) {
						uni.navigateTo({
							url: '/pages/user/order/freight?orderId=' + this.order.shopOrder.orderId + '&shopId=' + this.order.shopOrder.shopId
						})
					} else {
						T.tips('此订单异常，请联系管理员')
					}
				}
			},
			// 取消订单
			postOrderCancel() {
				this.isShow = true
				this.title = '确认取消订单吗?'
				this.isOrderDialog = 0
			},
			// 获取订单详情
			getOrderDetailById(orderId, shopId) {
				let _this = this
				let data = {
					orderId,
					businessType: this.businessType
				}
				if (shopId) {
					data.shopId = shopId
				}
				getOrderDetailById(data).then(res => {
					if (res.code === '1000') {
						this.order = res.data
						
						if(this.order.shopOrder.status == 0 || this.order.shopOrder.status == 3 || this.order.shopOrder.status == 6){
									 let expiresTime = ''
									 let nowData = ''
									 // if(_this.order.shopOrder.status == 0){
										// nowData =  parseInt((new Date()).getTime() / 1000) * 1000
										// expiresTime = this.order.expiresTime - nowData
									 // }else{
										// expiresTime = this.order.expiresTime
									 // }
									console.log(expiresTime)
									expiresTime = this.order.expiresTime
									 this.timer = setInterval(()=>{
										 if(_this.order.shopOrder.status == 0){
											 expiresTime = expiresTime - 1000;
										 }
										  _this.expiresTime = _this.order.shopOrder.status == 0 ? util.MillisecondToDate(expiresTime) : util.getLeftTime(expiresTime);
										  if(expiresTime<= 0){
											  clearInterval(_this.timer)
											  if(_this.order.shopOrder.status == 6) { // 待审核
												  _this.getOrderDetailById(this.orderId, this.shopId)
											  }else{  // 待支付 待发货
												  _this.isOrderDialog = 1
												  _this.doConfirm()
											  }
										  }
									 },1000)
						}
						this.statusText = ''
						if (this.order.shopOrder) {
							this.status = this.order.shopOrder.status;
							console.log('status', this.status)
							// 状态 -1 已取消 0 待支付 1 已支付 2 未发货 3 已发货 4已完成 5 已关闭 6 待审核
							if(this.roleId == '20002' || this.roleId == '20001' ||  this.roleId == '20004'){ // 代办 买家 企业
								switch (this.status) {
									case -1:
										this.statusText = '订单已取消'
										this.cancelReason = this.order.cancelReason
										break
									case 0:
										this.statusText = '等待买家支付'
										break
									case 1:
										this.statusText = '已支付'
										break
									case 2:
										this.statusText = this.order.needAgentcy == 0 ? '等待发货':'等待代办发货'
										break
									case 3:
										this.statusText = '等待买家收货'
										break
									case 4:
										this.statusText = '订单已完成'
										break
									case 5:
										this.statusText = '已关闭'
									case 6:
										this.statusText = '等待货主确认'
										break
								}
							}else{  // 货主
								switch (this.status) {
									case -1:
										this.statusText = '订单已取消'
										this.cancelReason = this.order.cancelReason
										break
									case 0:
										this.statusText = '等待买家支付'
										break
									case 1:
										this.statusText = '买家已支付'
										break
									case 2:
										this.statusText = '等待货主发货'
										break
									case 3:
										this.statusText = '等待买家收货'
										break
									case 4:
										this.statusText = '订单已完成'
										break
									case 5:
										this.statusText = '已关闭'
									case 6:
									//等待货主确认
										this.statusText = '请尽快确认,超时订单自动取消'
										break
								}
							}
							
						}

					} else {
						T.tips(res.message || '获取订单详情失败')
					}
				}).catch(err => {
					T.tips(err.message || '订单详情获取失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .call-btn{
    line-height: 30px;
    border-radius: 15px;
    color: #FE3B0B;
    border: 1px solid #FE3B0B;
    font-size: 14px;
    text-align: center;
    width: 120px;
    position: absolute;
    right: 30px;
    top: 10px;
  }
	.big-btn-active{
		margin-top: 60upx;
		margin-bottom: 60upx;
	}
	.logistics{
		min-height: 100upx;
		padding: 30upx;
		background: #fff;
		color: #333;
		.title{
			height: 60upx;
			line-height: 60upx;
			.fll{
				width: 500upx;
			}
		}
		// .address{
		// 	height: 60upx;
		// 	line-height: 60upx;
		// }
	}
	.luPopupWrapper-content{
		padding: 0 30upx;
		width: 100%;
		padding-bottom: 30upx;
		position: absolute;
		top: 0;
		.item{
			line-height: 100upx;
			height: 100upx;
			border-bottom: 1upx solid #f5f5f5;
			color: #333333;
      position: relative;
		}
		.title{
			position: relative;
			text-align: center;
			line-height: 100upx;
			height: 100upx;
			.close{
				width: 48upx;
				height: 48upx;
				position: absolute;
				right: 60upx;
				top: 15upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.icon-20 {
		width: 20upx;
		height: 20upx;

		>img {
			width: 100%;
			height: 100%;
		}
	}

	.icon-30 {
		width: 36upx;
		height: 36upx;

		>img {
			width: 100%;
			height: 100%;
		}
	}

	.icon-48 {
		width: 48upx;
		height: 48upx;
		margin-right: 10upx;
		position: relative;
		top: 4upx;
		left: -10upx;

		>img {
			width: 100%;
			height: 100%;
		}
	}

	.icon {
		width: 30upx;
		height: 30upx;
		margin-right: 10upx;
		position: relative;
		top: 4upx;

		>img {
			width: 100%;
			height: 100%;
		}
	}

	.detail {
		.top {
			position: relative;
			// top: 0;
			z-index: 99;
			width: 100%;
			height: 200upx;
			background: red;
			left: 0;

			.img {
				width: 150upx;
				height: 150upx;
				position: absolute;
				right: 60upx;
				bottom: 20upx;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 140upx;

		.annoc {
			color: #fefefe;
			margin-top: 40upx;
			position: absolute;
			left: 30upx;
			top: 30upx;

			.title {
				font-size: 34upx;
			}

			.sub {
				font-size: 20upx;
				margin-top: 8upx;
			}

			.Android {
				position: relative;
				top: 4upx;
			}
		}

		.body {
			.phone{
				height: 100upx;
				line-height: 100upx;
				background: #fff;
				padding: 0 30upx;
				font-size: 28upx;
				color: #333;
				margin-bottom: 20upx;
				.flr{
					
					.right{
						width: 24upx;
						height: 24upx;
						display: inline-block;
						position: relative;
						left: 10upx;
						top: 38upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
					
					.image{
						width: 34upx;
						height: 34upx;
						display: inline-block;
						position: relative;
						right:10upx;
						top: 36upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			// margin-top: 100upx;
			.address-content {
				width: 720upx;
			}
		}

		.com {
			padding: 24upx 30upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background-color: #fff;
			margin-bottom: 20upx;
			color: #000;
			font-size: 24upx;
		}

		.bus {
			// margin-top: 230upx;
			@extend .com;

			img:first-child {
				margin-right: 30upx;
			}

			.time {
				color: #999;
				font-size: 20upx;
				margin-top: 8upx;
			}

			img:last-child {}
		}

		.location {
			@extend .com;

			img:first-child {
				margin-right: 30upx;
			}

			.name {
				font-size: 28upx;
				font-weight: bold;
			}

			.phone {
				color: #999;
				font-size: 24upx;
				margin-left: 12upx;
			}

			.address {
				color: #999;
				margin-top: 8upx;
			}
		}

		.flex {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.list {
			padding: 30upx 0upx 0 30upx;
			
			background-color: #fff;
			margin-bottom: 20upx;
			.goods-price,.freight,.total-price,.msg {
				padding-right: 30upx;
			}
			.title {
				padding: 0 0 10upx 0;
				display: flex;
				justify-content: flex-start;
				font-size: 24upx;

				.platform {
					color: #000;
					margin-left: 10upx;
					flex-grow: 1;
					font-size: 28upx;
					margin-left: 10upx;
				}

				.Android {
					position: relative;
					top: -6upx;
				}

				.status {
					color: #FE3B0B;
				}
			}

			.freight,
			.goods-price {
				@extend .flex;
				color: #000;
				font-size: 24upx;
		
				.money {
					font-weight: bold;
				}
			}

			.goods-price {
				padding-top: 30upx;
				padding-bottom: 10upx;
			}

			.freight {
				padding-top: 20upx;
				padding-bottom: 36upx;
				border-bottom: 1upx solid #f0f0f0;
			}

			.total-price {
				@extend .flex;
				height: 90upx;
				font-weight: bold;
				font-size: 24upx;

				&>*:first-child {
					font-size: 28upx;
				}
			}

			.msg {
				padding: 20upx 0 30upx 0;
				font-size: 28upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				&>*:last-child {
					margin-left: 20upx;
					color: #999;
				}

				.span-1 {
					width: 20%
				}

				.span-2 {
					width: 80%;
				}
			}
		}

		.info {
			padding: 30upx;
			background-color: #fff;

			.title {
				font-size: 28upx;
				padding-bottom: 6upx;
			}

			.item {
				color: #999;
				font-size: 24upx;
				margin-top: 20upx;
        position: relative;
			}
		}

		.footer {
			padding-right: 30upx;
			background-color: #fff;
			height: 100upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			// box-shadow: 0 -1upx 0 0 #f0f0f0;
			border-top: 1upx solid #f0f0f0;

			.btn {
				width: 190upx;
				line-height: 56upx;
				border-radius: 36upx;
				text-align: center;
				margin-left: 20upx;
				font-size: 32upx;
				padding: 5upx 0;
			}

			.btn-red {
				border: 1upx solid #FE3B0B;
				color: #FE3B0B;
				margin-right: 30upx;
			}

			.btn-black {
				border: 1upx solid #d9d9d9;
				color: #000;
				margin-right: 20upx;
			}
		}
	}
</style>
