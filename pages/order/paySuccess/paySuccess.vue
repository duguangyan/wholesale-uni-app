<template>
	<view>
		<div class="success">
		    <div class="content">
		      <div class="img">
		        <img src="@/static/img/icon-finsh-order.png" alt="图片">
		      </div>
		      <div class="d1 fs-20 text-333 mt-20">
		        交易已完成
		      </div>
		      <div class="text-red mt-10" v-if="this.payPrice">￥{{this.payPrice}}</div>
		      <div class="d2 flex text-333">
		        <p class="flex-1" @click="checkOrderDetal">查看订单</p>
		      </div>
		    </div>
		    <AdvertisingPosition></AdvertisingPosition>
		    <StrictlyGoods></StrictlyGoods>
			<Dialog :title='title' :confirmText='confirmText' :cancelText='cancelText' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
		  </div>
	</view>
</template>

<script>
	 import StrictlyGoods from '@/components/common/StrictlyGoods.vue'
	  import AdvertisingPosition from '@/components/common/AdvertisingPosition.vue'
	  import Dialog from '@/components/common/Dialog.vue'
	export default {
		data() {
			return {
				orderSn:'',
				payPrice:'',
				title:'请确认微信支付是否完成',
				cancelText:'遇到问题',
				confirmText:'已完成',
				isShow: true
			};
		},
		components:{
			StrictlyGoods,
			AdvertisingPosition,
			Dialog
		},
		onLoad(options) {
			this.orderSn = options.orderId
			this.payPrice = options.payPrice
		},
		onShow() {
			
			
		},
		methods: {
			doConfirm(){
				this.isShow = false
				
			},
			doCancel(){
				uni.navigateTo({
					url:'/pages/user/order/detail?orderId='+this.orderSn
				})
			},
		      // 广告位url跳转
		      goPath(url) {
		        if (url) {
		          location.href = url
		        }
		      },
		      // 查看订单详情
		      checkOrderDetal() {
		        // 详情需要 orderId, shopId
				uni.navigateTo({
					url:'/pages/user/order/detail?orderId='+this.orderSn
				})
		      },
		      // 返回首页
		      goHome() {
				  uni.switchTab({
				  	url:'/pages/main/main'
				  })
		      }
		    }
	}
</script>


<style lang="scss" scoped>
  .success{
    .top{
      position: fixed;
      top: 0;
      width: 100%;
      text-align: center;
    }
    .content{
      text-align: center;
      padding-top: 150upx;
	  background: #fff;
	  padding-bottom: 40upx;
      .img{
        width: 80upx;
        height: 80upx;
        margin: 10upx auto;
        >img{
          width: 100%;
		  height: 100%;
        }
      }
      .d2{
        width: 400upx;
        margin: 0 auto;
        margin-top: 40upx;
        >p{
          display: inline-block;
          border: 1upx solid #f0f0f0;
          padding: 10upx;
          border-radius: 40upx;
        }
        :first-child{
          margin-right: 40upx;
        }
      }
    }
  }
</style>