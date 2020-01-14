<template>
  <view class="proc-home">
    <view class="nav">
      <view class="item" v-for="(nav,index) in navs" :key="index">
      	<view class="tag"></view>
      </view>
    </view>
    
    <view class="list">
      <view class="li" v-for="(item,index) in list">
        <div class="kind"></div>
        <div class="nums"></div>
        <div class="require"></div>
        <div class="master"></div>
        <div class="time"></div>
        <div class="state"></div>
      </view>
    </view>
    
    <view class="icon-publish">
      <image src="" mode=""></image>
    </view>
  </view>
</template>

<script>
  export default{
    data(){
      return {
        list: [],
        type: ''
      }
    },
    methods: {
      load(){
        search: {
          pageIndex: 1,
          pageSize: 20,
          type: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .proc-home{
    .nav{
      background: #fff;
      line-height: 70upx;
      display: flex;
      justify-content: space-arround;
      color: #000;
      font-size: 24upx;
      .item{
        position: relative;
      }
      .tag{
        width: 36upx;
        height: 6upx;
        background: #FE3B0B;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        opacity: 0;
      }
      &.actived{
        color: #FE3B0B;
        opacity: 1;
      }
      
    }
    
    .list{
      padding: 30upx;
      .li{
        background: #fff;
        border-radius: 20upx;
        overflow: hidden;
        padding: 30upx 20upx;
        margin-bottom: 20upx;
        position: relative;
        .kind{
          color: #333;
          font-size: 30upx;
          margin-bottom: 10upx;
        }
        .nums,
        .require,
        .master
        {
          margin-bottom: 10upx;
          color: #999;
          font-size: 24upx;
          text{
            color: #333;
          }
        }
        .iden{
          display: flex;
          margin-top: 10upx;
          justify-content: flex-start;
          image{
            margin-right: 8upx;
          }
          text{
            margin-right: 12upx;
          }
          color: #333;
          font-size: 24upx;
        }
        .time{
          right: 20upx;
          top: 20upx;
          position: absolute;
          color: #999;
          font-size: 20upx;
          
        }
        .state{
          width: 140upx;
          line-height: 52upx;
          text-align: center;
          color: #fff;
          background: #FE3B0B;
          border: 1px solid #FE3B0B;
          border-radius: 54upx;
          &.done{
            border: 1px solid #999;
            color: #333;
            position: absolute;
            bottom: 44upx;
            right: 20upx;
          }
        }
      }
    }
    
    .icon-publish{
      position: fixed;
      bottom: 150upx;
      right: 50upx;
      width: 90upx;
      height: 90upx;
      overflow: hidden;
      border-radius: 50%;
      image{
        width: 90upx;
        height: 90upx;
      }
    }
  }
</style>
