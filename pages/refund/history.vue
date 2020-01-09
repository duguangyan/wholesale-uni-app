<template>
  <view class="history">
    <view v-for="(item,index) in list" :key="index" class="li">
      <view class="flex">
        <view class="master">
          {{item.auditorName}}
        </view>
        <view class="time">
          
        </view>
      </view>
      
      <view class="content">
        {{item.opinion}}
      </view>
      
    </view>
  </view>
</template>

<script>
  import { getNegoList } from '@/api/refund.js';
  var vm =  {
    data(){
      vm = this
      return {
        afterSaleId: '',
        list: []
      }
    },
    onLoad(options){
      vm.afterSaleId = options.id
    },
    onShow(){
      getNegoList({
        afterSaleId: vm.afterSaleId
      }).then(data=>{
        vm.list = data.data
      })
    }
  }
  export default vm
</script>

<style lang="scss" scoped>
  .history{
    padding-top: 20upx;
    .li{
      position: relative;
      background: #fff;
      padding: 20upx 30upx;
      .master{
        font-size: 34upx;
        color: #000;
        margin-bottom: 20upx;
      }
      .content{
        font-size: 30upx;
        color: #999;
      }
      .time{
        font-size: 24upx;
        color: #999;
      }
      .flex{
        justify-content: space-between;
        display: flex;
        align-items: center;
        
      }
    }
  }
</style>
