<template>
  <view class="refuse">
    <textarea v-model="refuseReason" placeholder="请输入拒绝退款的原因：如商品无损坏...." />
    <view class="btn" @click="submit">提交</view>
  </view>
</template>

<script>
  import { checkRefund } from '@/api/refund.js';
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
        }).then(data=>{
          
        })
      }
    }
  }
  export default vm
</script>

<style lang="scss" scoped>
  .refuse{
    padding: 30upx;
    textarea::place-holder{
      color: #999;
      
    }
    textarea{
      color: #333;
      font-size: 28upx;
      border-radius: 20upx;
      background: #F5F5F5;
    }
   .btn{
     position: fixed;
     width: 640upx;
     line-height: 64upx;
     border-radius: 64upx;
     background: #FE3B0B;
     color: #fff;
     text-align: center;
     font-size: 32upx;
   }
  }
</style>
