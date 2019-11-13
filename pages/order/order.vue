<template>
	<div class="cart" :class="{'access_token':access_token!=''}">
		<div class="edit cf" v-if="!hasData">
			<view class="fll image" @click="goBack"><image src="../../static/img/tag-back.png"></image></view>
			<div class="title fll fs38">进货单({{validTotal}})</div>
			<div class="icon flr fs30" @click="isEdit = !isEdit">{{isEdit?'完成':'编辑'}}</div>
		</div>
		<div class="cart-nodata" v-if="hasData">
			<div class="img">
				<img src="@/static/img/icon-cart-nodata.png" alt="图片">
			</div>
			<div class="p text-999 fs28">
				进货单上还没有商品赶快去添加吧！
			</div>
			<div class="text-fff shop-btn" @click="goHome">去购物</div>
		</div>
		<div class="list" v-if="!hasData">
			<div v-for="(item,index) in list" :key="index" style="margin-top: 10upx" :class="{'Android': platform == 1}">
				<div class="cf parent-title"  >
					<div class="fll parent-icon" @click="checkParentIcon(index)">
						<img :src="item.checked !== 0 ? Checked : Uncheck" alt="icon">
					</div>
					<div class="fll plat">
						<img :src="Plat" alt="图标">
					</div>
					<span class="fll text">{{item.shopName}}</span>
				</div>
				<ul>
					<li class="cf" v-for="(it,idx) in item.items" :key="idx">
						<div class="fll icon" @click="checkChildrenIcon(index,idx)"  v-if="it.status !== 4 || isEdit">
							<img :src="it.checked !== 0 ? Checked : Uncheck" alt="icon">
						</div>
						<div class="fll icon" v-if="it.status === 4 && !isEdit">
						  <div class="yuan"></div>
						</div>
						<div class="fll img" @click="goDetail(item.shopId, it.goodsId)">
							<img :src="it.imgUrl || defaultUrl" alt="图片">
						</div>
						<div class="fll ml-10 info">
							<p class="fs28 p1 ellipsis ellipsis-line2" @click="goDetail(item.shopId, it.goodsId)">{{it.goodsName || ''}}</p>
							<p class="p4 text-666 fs20 ellipsis ellipsis-line3" @click="goDetail(item.shopId, it.goodsId)">{{it.skuDesc || '--'}}</p>
							<!--              status 商品状态(-1 已删除 0待审核 1审核中  2审核驳回  3已上架   4已下架  5 锁定 6 申请解锁")-->
							<p v-if="it.status !== 4" class="text-red fs-14 p2" @click="goDetail(item.shopId, it.goodsId)">￥ <span class="fs-18">{{it.price}}</span></p>
							<p v-if="it.status === 4" class="text-red fs-14 p3"> <span>下架商品</span></p>
							<!-- 数量操作 -->
							<div class="count" v-if="!isEdit && it.status !== 4">
								<span :class="{ 'text-999' : it.isColor999 }" @click="doCalculation(0,index,idx)">-</span>
								
								<input type="number" v-model="it.num" @click="clickInput(index,idx)" @change="changInput($event,index,idx)" />
								
								<span @click="doCalculation(1,index,idx)">+</span>
							</div>

						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="footer" :class="{'footer-Android': platform == 1}" v-if="list.length>0">
			<div v-if="isEdit">
				<div class="del" @click="preDel">删除</div>
			</div>
			<div v-if="!isEdit">
				<div class="icon-img fll">
					<img :src="isCheckAll?Checked:Uncheck" alt width="17" height="17" @click="checkAll" />
				</div>
				<span class="fll checkall fs28" @click="checkAll">全选</span>
				<div class="total-money fll fs28">
					合计:&nbsp;
					<span class="money">{{totalMoney}}</span>
				</div>
				<div class="settle flr" @click="goPay" :class="{'bg-999': totalMoney <= 0}">结算</div>
			</div>
		</div>
		<Dialog :title='title' :confirmText='confirmText' :cancelText='cancelText' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
		
		<!-- <TabBar :checkIndex='checkIndex'></TabBar> -->
	</div>
</template>

<script>
	import Checked from '../../static/img/icon-checked.png'
	import Uncheck from '../../static/img/icon-uncheck.png'
	import Plat from '../../static/img/icon-plat.png'
	import Dialog from '@/components/common/Dialog.vue'
	import util from '@/utils/util.js'
	import T from '@/utils/tips.js'
	import validator from '@/utils/validator.js'
	import TabBar from '@/components/common/TabBar.vue'
	import {
		getCartOrderList,
		getCartCheck,
		getCartUncheck,
		getCartChangeNum,
		getCartRemove,
		getOrderCart
	} from '@/api/cartApi.js'
	export default {
		data() {
			return {
				checkIndex: 1,
				hasData: false,
				title:'您确定删除商品吗?',
				confirmText:'删除',
				cancelText:'再想想',
				isShow: false,
				list: [],
				defaultUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2180358788,168891397&fm=26&gp=0.jpg',
				isEdit: false,
				Checked,
				Uncheck,
				Plat,
				isCheckAll: false,
				validTotal: /* 有效的商品总数 */ 0,
				validChecked: 0,
				totalMoney: 0,
				clickNum: 0, //点击商品当前数量
				isColor999: false, // 数量减法最低颜色
				isclock: false, // 锁
				clock: true,
				platform:0,
			}
		},
		components: {
			Dialog, TabBar
		},
		onTabItemTap(e){
			
			// #ifdef  MP-WEIXIN
			if(!uni.getStorageSync('access_token')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			// #endif
			
		},
		onLoad() {
			console.log('onLoad')
		},
		onShow() {
			// #ifdef  MP-WEIXIN
			if(!uni.getStorageSync('access_token')){
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
			}else{
				// 获取进货单列表
				this.getCartOrderList()
				// 设备样式兼容
				this.platform = uni.getStorageSync('platform');
			}
			// #endif
			
			// #ifdef APP-PLUS || H5
			if(!uni.getStorageSync('access_token')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				// 获取进货单列表
				this.getCartOrderList()
				// 设备样式兼容
				this.platform = uni.getStorageSync('platform');
			}
			// #endif
			
		},
		methods: {
			// 返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			doConfirm(){
				this.doDel()
			},
			doCancel(){
				this.isShow = false
			},
			// 去详情
			goDetail(shopId, orderId) {
				uni.navigateTo({
					url:'/pages/order/goodsDetail/goodsDetail?shopId='+shopId+'&goodsId='+orderId
				})
			},
			// 结算
			submit() {
				if(!this.clock) return false
				this.clock = false
				let cartIdList = []
				this.list.forEach(item => {
					item.items.forEach(it => {
						if (it.checked == 1 && item.status != 4) {
							cartIdList.push(it.cartId)
						}
					})
				})
				let userId = uni.getStorageSync('uid')
				let data = {
					userId,
					cartIdList
				}
				getOrderCart(data).then(res => {
					if (res.code === '1000') {
						this.clock = true
						uni.navigateTo({
							url:'/pages/order/submit/submit?submitData='+JSON.stringify(res.data)
						})
					} else {
						T.tips(res.message || '结算失败')
						this.clock = true
					}
				}).catch(err => {
					T.tips(err.message || '结算失败')
					this.clock = true
				})
			},
			// 去结算
			goPay() {
				if (this.totalMoney > 0) {
					this.submit()
				} else {
					T.tips('请选择进货单商品')
				}
			},
			// 计算总价格 totalMoney
			calculationTotalMoney() {
				this.totalMoney = 0
				this.validTotal = 0
				this.list.forEach(item => {
					item.items.forEach(it => {
						if (it.checked === 1 && it.status!==4) {
							 this.totalMoney =  util.accAdd(this.totalMoney,it.totalPrice)
							this.validTotal++
						}
					})
				})
			},
			clickInput(index, idx) {
				this.clickNum = this.list[index].items[idx].num
			},
			// 数量input改变
			    changInput(e,index,idx) {
			      let val = e.target.value
			      if (validator.isNumber(val)) {
			        if (val < this.list[index].items[idx].startNum) {
			          T.tips('数量不能小于起批量:'+this.list[index].items[idx].startNum)
			          this.list[index].items[idx].num = this.list[index].items[idx].startNum
			          this.changeNum(index,idx,this.list[index].items[idx].skuId, this.list[index].items[idx].startNum)
			        } else if(val > this.list[index].items[idx].stock){
			          T.tips('数量不能超过库存量:'+this.list[index].items[idx].stock)
			          this.list[index].items[idx].num = this.list[index].items[idx].stock
			          this.changeNum(index,idx,this.list[index].items[idx].skuId, this.list[index].items[idx].stock)
			        }else {
			          this.changeNum(index,idx,this.list[index].items[idx].skuId, val)
			        }
			      } else {
			        T.tips('请输入正确的数量')
			        this.changeNum(index,idx,this.list[index].items[idx].skuId, this.list[index].items[idx].startNum)
			      }
			    },
			// 改变数量
			changeNum(index, idx, skuId, num) {
				if (this.isclock) {
					// T.tips('数据正在请求中,请稍等')
					return
				}
				let data = {
					num,
					skuId,
					isLoading:1
				}
				this.isclock = true
				getCartChangeNum(data).then(res => {
					if (res.code === '1000') {
						this.list[index].items[idx].num = res.data.num
						this.list[index].items[idx].price = res.data.price
						this.list[index].items[idx].totalPrice = res.data.totalPrice
						this.list[index].items[idx].isColor999 = false
						this.calculationTotalMoney()
						this.isclock = false
					} else {
						T.tips(res.message || '修改数量失败')
						this.list[index].items[idx].isColor999 = true
						this.isclock = false
						console.log(this.list);
					}
				}).catch(err => {
					T.tips(err.message || '修改数量失败')
					this.isColor999 = true
					this.isclock = false
				})
			},
			// 购买数量计算  isCalculation: 0为减法 1为加法
			    doCalculation(isCalculation, index, idx) {
			      if (isCalculation === 0) {
			        if (this.list[index].items[idx].num > this.list[index].items[idx].startNum) {
			          let num = this.list[index].items[idx].num
			          num--
			          console.log(this.clickNum)
			          this.changeNum(index,idx,this.list[index].items[idx].skuId,num)
			        } else {
			          T.tips('数量不能小于起批量:'+this.list[index].items[idx].startNum)
			        }
			      } else {
			        if(this.list[index].items[idx].num < this.list[index].items[idx].stock){
			          let num = this.list[index].items[idx].num
			          num++
			          this.changeNum(index,idx,this.list[index].items[idx].skuId,num)
			        } else {
			          T.tips('购买数量不能超过库存量:'+this.list[index].items[idx].stock)
			        }
			
			      }
			    },
			// 选中SKU
			getCartHasCheck(m, index, idx) {
				let data = {
					skuId: this.list[index].items[idx].skuId
				}
				if (m === 1) {
					getCartCheck(data).then(res => {
						this.list[index].items[idx].checked = m
						console.log(this.list)
						this.list.forEach((item, index) => {
							this.hasShopCheckedAll(index)
						})
						this.hasCheckedAll()
					}).catch(err => {
						T.tips(err.message || '选中失败')
					})
				} else {
					getCartUncheck(data).then(res => {
						this.list[index].items[idx].checked = m
						console.log(this.list)
						this.list.forEach((item, index) => {
							this.hasShopCheckedAll(index)
						})
						this.hasCheckedAll()
					}).catch(err => {
						T.tips(err.message || '选中失败')
					})
				}
			},
			// 子元素选择
			checkChildrenIcon(index, idx) {
				let m = this.list[index].items[idx].checked === 0 ? 1 : 0
				this.getCartHasCheck(m, index, idx)
			},
			// 判断所有是否全选
			hasCheckedAll() {
				let n = 0
				this.list.forEach(item => {
					if (item.checked === 1) {
						n++
					}
				})
				this.isCheckAll = n === this.list.length
			},
			// 判断店铺是否全选
			hasShopCheckedAll(index) {
				let n = 0
				this.list[index].items.forEach(item => {
					if (item.checked === 1) {
						n++
					}
				})
				this.list[index].checked = n === this.list[index].items.length ? 1 : 0
				this.$set(this.list[index], 'isColor999', false)
				// this.list[index].isColor999 = false
				// 计算总金额
				this.calculationTotalMoney()
			},
			// 全选
			checkAll() {
				let m = 1
				if (this.isCheckAll) {
					m = 0
				}
				this.isCheckAll = m === 1
				this.list.forEach((item, index) => {
					item.checked = m
					this.list[index].items.forEach((it, idx) => {
						this.list[index].items[idx].checked = m;
					})
				})

				console.log(this.list)
				// 计算总金额
				this.calculationTotalMoney()
			},
			// 店铺全选
			checkParentIcon(index) {
				let m = 1
				if (this.list[index].checked === 1) {
					m = 0
				}
				this.list[index].checked = m
				this.list[index].items.forEach(item => {
					item.checked = m;
				})
				this.hasCheckedAll()
				// 计算总金额
				this.calculationTotalMoney()
			},
			// 去首页
			goHome() {
				uni.switchTab({
					url:'/pages/main/main'
				})
			},
			getCartOrderList() {
				this.list = []
				getCartOrderList().then((res) => {
					if (res.code === '1000') {
						this.hasData = res.data.cartLines.length <= 0
						if (res.data.cartLines && res.data.cartLines.length > 0) {
							this.list = res.data.cartLines
							if (this.list.length > 0) {
								this.list.forEach((item, index) => {
									item.checked = 0;
									this.hasShopCheckedAll(index)
								})
								this.hasCheckedAll()
							}

						}
					}else{
						this.hasData = true
					}
				})
			},
			preDel() {
				this.isShow = true
			},
			doDel() {
				let rmskuIds = []
				this.list.forEach(item => {
					item.items.forEach(it => {
						if (it.checked === 1) {
							rmskuIds.push(it.skuId)
						}
					})
				})
				console.log(rmskuIds)
				let skuIds = ''
				rmskuIds.forEach((item, index) => {
					rmskuIds.length - 1 === index ? skuIds += item : skuIds += item + ','
				})
				let data = {
					skuIds
				}
				// 发送请求
				getCartRemove(data).then(res => {
					if (res.code === '1000') {
						this.isShow = false;
						if (rmskuIds.length > 0) {
							// rmskuIds.forEach((t1, i1) => {
							// 	this.list.forEach((t2, i2) => {
							// 		if (t2.items.length > 0) {
							// 			t2.items.forEach((t3, i3) => {
							// 				if (t1 === t3.skuId) {
							// 					this.list[i2].items.splice(i3, 1);
							// 					if (this.list[i2].items.length <= 0) {
							// 						this.list.splice(i2, 1);
							// 					}
							// 					T.tips('删除成功')
							// 					this.calculationTotalMoney()
							// 				}
							// 			})
							// 		}
							// 	})
							// })
							// 获取进货单列表
							this.list = []
							this.getCartOrderList()
						} else {
							T.tips('请选择有效进货单')
						}
					} else {
						T.tips(res.message || '删除进货单失败')
					}
				}).catch(err => {
					T.tips(err.message || '删除进货单失败')
				})

			}
		}
	}
</script>
<style lang="scss" scoped>
	.access_token{
		background: #000;
	}
	.cart {
		// padding-bottom: 100upx;
		.bb1{
			position: fixed;
			height: 0.5upx;
			bottom: 0upx;
			background: #f0f0f0;
			width: 100%;
		}
		min-height: 100vh;
		padding-bottom: 140upx;
		background-color: #f0f0f0;
		.yuan{
			width: 18px;
			height: 18px;
			border-radius: 50%;
			background: #e2e2e2;
		  }
		.edit {
			text-align: right;
			background-color: #fff;
			padding: 10upx 30upx 20upx 10upx;
			position: relative;
			padding-top: var(--status-bar-height);
			.image{
				width: 40upx;
				height: 40upx;
				position: absolute;
				left: 30upx;
				top: var(--status-bar-height);
				margin-top: 6upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.title {
				text-align: center;
				width: 100%;
			}
			.icon {
				position: absolute;
				top: var(--status-bar-height);
				right: 30upx;
				text-underline: underline ;
				margin-top: 10upx;
			}
			/* #ifdef MP-WEIXIN */  
			.icon {
				right: 200upx;
			}
			/* #endif */
			
		}

		.list {
			margin-top: 100upx;
			margin-bottom: 30upx;
			overflow: auto;
			.count {
				position: absolute;
				bottom: 20upx;
				right: 16upx;
				display: flex;
				align-items: center;

				span {
					font-size: 40upx;
					position: relative;
					top: -4upx;
					margin: 0 20upx;
				}

				input {
					width: 60upx;
					height: 20upx !important;
					line-height: 20upx !important;
					background-color: #f5f5f5;
					margin-left: 8upx;
					margin-right: 8upx;
					font-size: 24upx;
					color: #333;
					text-align: center;
					border: none;
					outline: none;
					border-radius: 3upx;
					overflow: hidden;
				}
			}

			.parent-title {
				margin-top: 20upx;
				.text {
					margin-left: 20upx;
					font-size: 30upx;
					position: relative;
					top: 2upx;
				}

				.plat {
					width: 40upx;
					height: 40upx;
					margin-left: 30upx;

					>img {
						width: 100%;
						height: 100%;
					}
				}

				.parent-icon {
					width: 36upx;
					height: 36upx;
					margin: 0upx 0upx 0 30upx;
					position: relative;
					top: -4upx;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			

			ul {
				margin-top: 10upx;

				li {
					background: #fff;
					padding: 20upx 30upx 30upx 30upx;
					border-bottom: 1upx solid #F5F5F5;
					position: relative;

					.icon {
						width: 34upx;
						height: 34upx;
						margin-right: 30upx;
						margin-top: 80upx;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.img {
						width: 200upx;
						height: 200upx;
						border-radius: 20upx;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.info {
						width: 400upx;
						margin-left: 20upx;
						.p1{
							 // height: 80upx;
							 line-height: 40upx;
							// margin-top: 8upx;
						}
						.p2 {
							position: absolute;
							bottom: 30upx;
							font-size: 32upx;
						}

						.p3 {
							display: inline-block;
							width: 120upx;
							height: 32upx;
							line-height: 32upx;
							text-align: center;
							border-radius: 28upx;
							background: #F5F5F5;
							color: #666;
							font-size: 24upx;
							position: absolute;
							bottom: 20upx;
							margin-left: -56upx;
						}

						.p4 {
							background: #F5F5F5;
							border-radius: 20upx;
							display: inline-block;
							padding: 4upx 14upx;
							font-size: 20upx;
							
						}
						
						/* #ifdef APP-PLUS */  
						.p4 {
							padding-bottom: 8upx;
						}
						/* #endif */ 
					}

					.info-edit {
						width: 460upx;
					}
				}
			}
		}
		.Android{
			.parent-title {
				margin-top: 30upx !important;
				.text{
					top: 8upx !important;
				}
				.parent-icon{
					top: 6upx!important;
				}
			}
			ul{
				li{
					.info{
						.p4{
							margin-top: 20upx !important;
							padding-top: 8upx !important;
						}
					}
				}
			}
			
		}
		.cart-nodata {
			padding-top: 400upx;

			.img {
				width: 240upx;
				height: 240upx;
				margin: 0 auto;

				>img {
					width: 100%;
					height: 100%;
				}
			}

			.p {
				width: 250upx;
				margin: 0 auto;
				text-align: center;
				line-height: 40upx;
			}

			.shop-btn {
				width: 140upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				margin: 0 auto;
				border-radius: 60upx;
				margin-top: 20upx;
				font-size: 28upx;
				background: #FC2D2D;
			}
		}

		.list {
			margin-top: 20upx;
			background-color: #fff;

			.title {
				img:first-child {
					margin-right: 30upx;
					transform: translateY(2upx);
				}
				padding: 0 0 10upx 30upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 24upx;

				.platform {
					color: #000;
					margin-left: 10upx;
					font-weight: bold;
					flex-grow: 1;
				}
			}
		}

		.footer {
			
			>div {
				width: 100%;
				padding-top: 30upx;
			}

			display: flex;
			background-color: #fff;
			height: 100upx;
			align-items: center;
			justify-content: flex-start;
			font-size: 24upx;
			color: #000;
			position: fixed;
			z-index: 999;
			bottom: 1upx;
			left: 0;
			width: 100%;
			padding: 0 30upx;
			.checkall{
				position: relative;
				top: -2upx;
			}
			.icon-img {

				width: 34upx;
				height: 34upx;
				margin-right: 16upx;
				position: relative;
				top: -2upx;
				>img {
					width: 100%;
					height: 100%;
				}

			}

			.total-money {
				flex-grow: 1;
				margin-left: 30upx;
				
				span {
					margin-left: 8upx;
					color: #fc2d2d;
					font-size: 34upx;
					line-height: 24upx;
					position: relative;
					top: 2upx;
					&::before {
						content: '￥';
						display: inline-block;
						font-size: 24upx;
					}
				}
			}

			.settle {
				width: 150upx;
				line-height: 64upx;
				color: #fff;
				text-align: center;
				border-radius: 32upx;
				background-color: #fc2d2d;
				position: relative;
				left: -60upx;
				top: -15upx;
				font-size: 30upx;
			}

			.del {
				width: 150upx;
				line-height: 60upx;
				height: 60upx;
				color: #fc2d2d;
				border: 2upx solid #fc2d2d;
				text-align: center;
				border-radius: 32upx;
				position: absolute;
				right: 90upx;
				top: 15upx;
			}
		}
		.footer-Android{
			>div{
				padding-top: 50rpx;

			}
			.icon-img{
				top: -2rpx;
			}
		}
	}
</style>
