<template>
	<view>
		<div class="success">
		    <div class="content">
		      <div class="img">
		        <img src="@/static/img/icon-finsh-order.png" alt="图片">
		      </div>
		      <div class="d1 fs-20 text-333 mt-20">
		        支付完成
		      </div>
		      <div class="text-red mt-10" v-if="this.query.payPrice">￥{{this.query.payPrice}}</div>
		      <div class="d2 flex text-333">
		        <p class="flex-1" @click="checkOrderDetal">查看订单</p>
		      </div>
		    </div>
		    <AdvertisingPosition></AdvertisingPosition>
		    <StrictlyGoods></StrictlyGoods>
		  </div>
	</view>
</template>

<script>
	 import StrictlyGoods from '@/components/common/StrictlyGoods.vue'
	  import AdvertisingPosition from '@/components/common/AdvertisingPosition.vue'
	export default {
		data() {
			return {
				orderSn:''
			};
		},
		components:{
			StrictlyGoods,
			AdvertisingPosition
		},
		onLoad(options) {
			this.orderSn = options.orderSn
		},
		onShow() {
			
			
		},
		methods: {
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
					url:'/pages/order/goodsDetail/goodsDetail?orderId='+this.orderSn
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
      margin-top: 200upx;
      .img{
        width: 80upx;
        height: 80upx;
        margin: 0 auto;
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
          margin-right: 20upx;
        }
      }
    }
  }
</style>