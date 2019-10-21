<template>
  <div class="ordlist">
    <div class="top-warp">

      <div class="tags-con">
        <div class="tabs cf">
          <div class="fll li" :class="{navActive : navIndex==index}" v-for="(item,index) in tabs" :key="index" @click="changePosi(index)">{{item.name}}</div>
        </div>
      </div>

    </div>
    <div class="order-no-data" v-if="orders.length<=0">
      <img src="@/static/img/icon-order-no.png" alt="图片">
      <div class="text-999 fs-12">您还没有相关订单</div>
    </div>
    <div class="list" v-if="orders.length>0">

      <ul>
        <li v-for="(item, index) in orders" :key="item.id">
          <div class="title">
			  <div class="icon">
				  <img src="@/static/img/icon-plat.png" width="15" height="15" alt />
			  </div>
            
            <span class="platform">{{item.shopName}}</span>
            <span class="status">
            <span v-if="item.status === -1">已取消</span>
            <span v-if="item.status === 0">待付款</span>
            <span v-if="item.status === 2">待发货</span>
            <span v-if="item.status === 3">代收款</span>
            <span v-if="item.status === 4">已完成</span>
          </span>
          </div>
          <Good v-for="good in item.orderDetailList" :key="good.id" :item="good"></Good>
          <div class="accu">共{{item.orderDetailList.length}}件商品&nbsp;合计:￥<span>{{item.payMoney}}</span></div>
          <div class="operator">
            <div tag="div" class="check-phy" v-if="item.status === 3" @click="goFreight(index)">查看物流</div>
            <div tag="div" class="check-ord" @click="goDetail(index)">查看订单</div>
            <div class="receive" v-if="item.status === 3" @click="postOrderConfirm(index)">确认收货</div>
            <div class="receive" v-if="item.status === 0" @click="showPay(index)">去支付</div>
<!--            <div class="receive" @click="goFinshPage(index)"></div>-->
          </div>
        </li>
      </ul>

<!--      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomDistance="10" ref="loadmore">-->
<!--        -->
<!--      </mt-loadmore>-->
      <div class="ts-center text-999 fs24 load-text">{{loadText}}</div>
    </div>
    <!--    // orderId：支付订单-->
    <!--    // show：支付上拉框是否弹起-->
    <!--    // isWX：是否只有微信支付-->
    <!--    // price： 支付价格-->
    <!--    // function payClose：关闭支付弹窗-->
    <!--    // function doPay: 点击支付按钮事件-->
    <Pay :orderId="payOrderId" :show="isPayShow"  v-on:close="payClose" v-on:doPay="doPay" :price="nowIndexPrice"></Pay>
	<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
  </div>
</template>

<script>
import Good from '@/components/order/Good.vue'
import Pay from '@/components/common/Pay.vue'
import Dialog from '@/components/common/Dialog.vue'
import { getOrderPageMyOrder, postOrderConfirm } from '@/api/userApi.js'
import T from '@/utils/tips.js'
export default {
  name: 'ordlist',
  data() {
    return {
		title: '确认收货吗?',
		isShow: false,
		orderId: '',
		shopId: '',
      orders: [],
      tabs: [
        {
          name: '全部',
          status: ''
        },
        {
          name: '待付款',
          status: 0
        },
        {
          name: '待发货',
          status: 2
        },
        {
          name: '待收货',
          status: 3
        },
        {
          name: '已完成',
          status: 4
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
	  navIndex:0
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
  onLoad() {
  	
  },
  onShow() {
    let orderNavIndex = uni.getStorageSync('orderNavIndex')
	if (orderNavIndex) {
	  this.status = orderNavIndex === '1' ? 0 : orderNavIndex
	  this.navIndex = orderNavIndex
	}
	// 获取订单列表
	this.getOrders()
  },
  methods: {
	  doConfirm(){
		  let data = {
		    orderId:this.orderId,
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
	  doCancel(){
		  this.isShow = false
	  },
	  goDetail(index,orderId,shopId){
		  let item = this.orders[index]
		  uni.navigateTo({
		  	url:'/pages/user/order/detail?orderId='+item.orderId+'&shopId='+item.shopId
		  })
	  },
	goFreight(index){
		let item = this.orders[index]
		uni.navigateTo({
			url:'/pages/user/order/freight?orderId='+item.orderId+'&shopId='+item.item.shopId
		})
	},
    // 去收货完成页面
    goFinshPage(index) {
      // orderId, shopId
	  uni.navigateTo({
	  	url:'/pages/user/order/success?orderId='+this.orders[index].orderId+'&shopId='+this.orders[index].shopId
	  })
    },
    // 去支付
    doPay(params) {

      // params 0:微信支付 1:支付宝支付

    },
    // 确认收货
    postOrderConfirm(index) {
		
		this.isShow  = true;
		this.orderId = this.orders[index].orderId;
		this.shopId  = this.orders[index].shopId;

    },
    // 显示支付弹窗
    showPay(index) {
      this.nowIndexPrice = this.orders[index].payMoney
      this.payOrderId = this.orders[index].orderId
      this.isPayShow = !this.isPayShow
    },
    // 关闭支付弹窗
    payClose(params) {
      this.isPayShow = !this.isPayShow
    },
    // nav订单状态切换
    changePosi(index) {
		this.navIndex = index
      uni.setStorageSync('orderNavIndex',index)
      // this.$refs.tabs.style.backgroundPosition = `${75 * index - 300}upx 0%`
      // this.$refs.flag.style.left = `${75 * index + 29}upx`
      this.status = this.tabs[index].status
      this.orders = []
      this.pageIndex = 1
      this.allLoaded = false
      this.loadText  = '上拉加载更多...'
      this.getOrders()
    },
    // 下拉加载更多
    loadBottom(){
      setTimeout(() => {
        if (!this.allLoaded) {
          this.pageIndex++
          this.getOrders()
        }
      },500)
    },
    // 获取订单列表
    getOrders() {
      let data = {
        pageIndex: this.pageIndex,
        status: this.status,
        pageSize: this.pageSize
      }
      
      getOrderPageMyOrder(data).then((res) => {
        if (res.code === '1000') {
          this.orders = this.orders.concat(res.data.records)
          if (this.orders.length >= res.data.total) {
            this.allLoaded = true
            this.loadText  = '数据已经加载完毕'
          }
        } else {
          T.tips(res.message || '获取订单列表失败')
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
	.ts-center{
		text-align: center;
	}
  .top-warp{
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 99999;
  }
  .load-text{
    padding: 20upx 0;
  }
  .order-no-data{
    text-align: center;
    padding-top: 240upx;
    >img{
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
		height: 70upx;
		line-height: 70upx;
		.navActive{
			border-bottom: 4upx solid #fc2d2d;
			color: #fc2d2d;
		}
		.li{
			text-align: center;
			margin: 0 35upx;
			font-size: 30upx;
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
    li {
      padding: 15upx;
      background-color: #fff;
      margin-top: 10upx;
    }
    .title {
      padding: 0 0 5upx 0;
      display: flex;
      justify-content: flex-start;
      font-size: 24upx;
	  .icon{
		  width: 30upx;
		  height: 30upx;
		  >img{
			  width: 100%;
			  height: 100%;
		  }
	  }
      .platform {
        color: #000;
        margin-left: 5upx;
        font-weight: bold;
        flex-grow: 1;
      }
      .status {
        color: #fc2d2d;
      }
    }
    .accu{
      margin-top: -5upx;
      text-align: right;
      span{
        font-weight: bold;
      }
    }
    .operator{
      display: flex;
      justify-content: flex-end;
      margin-top: 30upx;
      &>div{
        width: 140upx;
        line-height: 60upx;
        border: 1upx solid #d9d9d9;
        border-radius: 30upx;
        text-align: center;
        margin-left: 20upx;
        font-size: 24upx;
        color: #666;
        &.receive{
          color: #FC2D2D;
          border: 1upx solid #FC2D2D;
        }
      }
    }
  }
}
</style>
