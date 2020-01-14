<template>
  <view class="price-detail">
    <view class="detail"></view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
  .price-detail{
    .base-title{
      color: #333;
      font-size: 28upx;
    }
    .detail{
      padding: 30upx;
      margin-top: 20upx;
      background: #fff;
      .title{
        display: flex;
        margin-bottom: 50upx;
        align-items: center;
        justify-content: space-between;
        font-size: 20upx;
        color: #999;
        text:first-child{
          color: #333;
          font-size: 28upx;
        }
      }
      .li{
        margin-bottom: 34upx;
        color: #999;
        font-size: 24upx;
        text{
          color: #333;
        }
      }
      .btns{
        display: flex;
        justify-content: space-between;
        padding: 0 40upx;
        .btn{
          width: 224upx;
          height: 64upx;
          color: #333;
          font-size: 28upx;
          padding: 0 44upx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          image{
            width: 36upx;
            height: 36upx;
            margin-right: 20upx;
          }
        }
      }
    }
    .redundent-time{
      padding: 30upx;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        @extend .base-title;
        margin-bottom: 64upx;
        text:last-child{
          color: #999;
          font-size: 20upx;
        }
      }
      .price{
        color: #999;
        text{
          font-size: 24upx;
          color: #333;
        }
      }
    }
    .spec{
      padding: 30upx;
      .title{
        @extend .base-title;
        margin-bottom: 30upx;
      }
      .images{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        image{
          width: 160upx;
          height: 160upx;
          margin-right: 20upx;
        }
      }
    }
  }
</style>
