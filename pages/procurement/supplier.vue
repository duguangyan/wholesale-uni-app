<template>
  <view class="supplier">
    <view class="bar">
      <view></view>
      <view></view>
      <view></view>
    </view>
    
    <view class="list">
      <view class="li">
        <image src="" mode=""></image>
        <text></text>
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style>
  .supplier{
    .bar{
      height: 88upx;
      display: flex;
      justify-content: space-between;
      padding: 0 30upx;
      align-items: center;
    }
    .li{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #000;
      height: 140upx;
      font-size: 30upx;
      padding: 0 30upx;
      border-bottom: 1px solid #f5f5f5;
      image{
        margin-right: 20upx;
      }
    }
  }
</style>
