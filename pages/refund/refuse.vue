<template>
  <view class="refuse">
    <textarea v-model="refuseReason" placeholder="请输入拒绝退款的原因：如商品无损坏...." />
    <view class="btn" @click="submit">提交</view>
  </view>
</template>

<script>
  import { checkRefund } from '@/api/refund.js';
  import Toast from '@/utils/tips.js'
  var vm = {
    data(){
      vm = this
      return {
        id: '',
        refuseMoney: '',
        refuseReason: ''
      }
    },
    onLoad(options){
      vm.id = options.id
      vm.refundMoney = options.price
    },
    methods:{
      submit(){
        checkRefund({
          auditorType: 2,
          id: vm.id,
          refundMoney: vm.refundMoney,
          refuseReason: vm.refuseReason,
          status: 0
        }).then(res=>{
          if(res.code == 1000){
            uni.navigateBack()
          }else{
            Toast.tip('拒绝失败!')
          }
          
        })
      }
    }
  }
  export default vm
</script>

<style lang="scss" scoped>
  .refuse{
    background: #fff;
    height: 100vh;
    padding: 30upx;
    textarea::place-holder{
      color: #999;
      
    }
    textarea{
      color: #333;
      font-size: 28upx;
      border-radius: 20upx;
      background: #F5F5F5;
      width: 100%;
      // padding: 30upx;
      text-indent: 30upx;
      padding-top: 30upx;
    }
   .btn{
     position: fixed;
     width: 640upx;
     left: 55upx;
     bottom: 60upx;
     line-height: 64upx;
     border-radius: 64upx;
     background: #FE3B0B;
     color: #fff;
     text-align: center;
     font-size: 32upx;
   }
  }
</style>
