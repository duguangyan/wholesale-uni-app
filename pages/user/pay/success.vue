<template>
  <div class="success">
    <div class="content">
      <div class="img">
        <img src="@/static/img/icon-finsh-order.png" alt="图片">
      </div>
      <div class="d1 fs38 text-333 mt-20">
        支付完成
      </div>
      <div class="text-red mt-10" v-if="payPrice">￥{{payPrice}}</div>
      <div class="d2 flex text-333 fs28">
		<p class="flex-1" @click="checkOrderDetal">查看订单</p>
		<p class="flex-1" @click="goHome">返回首页</p>
      </div>
    </div>
    <AdvertisingPosition></AdvertisingPosition>
    <StrictlyGoods></StrictlyGoods>
  </div>

</template>

<script>
  import StrictlyGoods from '@/components/common/StrictlyGoods'
  import AdvertisingPosition from '@/components/common/AdvertisingPosition'
  import T from '@/utils/tips.js'
  export default {
    name: "success",
    data() {
      return {
        query: '', // 获取传递参数
        adPositione: '', // 获取广告位信息
		orderId:'',
		payPrice:''
      }
    },
    components: {
      StrictlyGoods,
      AdvertisingPosition
    },
    onLoad(options) {
      this.orderId = options.orderId
	  this.payPrice = options.payPrice
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
			url:'/pages/user/order/detail?orderId=' + this.orderId
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
      padding-top: 80upx;
	  padding-bottom: 40upx;
	  background: #fff;
      .img{
        width: 80upx;
        height: 80upx;
        margin: 20upx auto;
		position: relative;
		top: -10upx;
        >img{
          width: 100%;
		  height: 100%;
        }
      }
      .d2{
        width: 200px;
        margin: 0 auto;
        margin-top: 20px;
        >p{
          display: inline-block;
          border: 1px solid #f0f0f0;
          padding: 5px;
          border-radius: 20px;
        }
        :first-child{
          margin-right: 20px;
        }
      }
    }
  }
</style>
