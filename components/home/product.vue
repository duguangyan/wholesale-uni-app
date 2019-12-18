<template>
  <div class="item">
    <div class="img">
      <img :src="item.goodsDetailResp.goodsImgVOList[0].imgUrl" alt="">
    </div>
    <div class="bottom">
      <p class="title">{{item.goodsDetailResp.goods.name}}</p>
      <div class="des">
        <span class="price">￥{{item.goodsDetailResp.goods.minPrice}}</span>
        <span class="place">{{item.goodsDetailResp.goods.minPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeProduct',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
  .item{
    width: 170px;
    height: 260px;
    float: left;
    margin: 0 5px 5px 0;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    .img{
      width: 170px;
      height: 178px;
      margin-bottom: 8px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .bottom{
      padding: 0 7px;
      .title{
        height: 32px;
        line-height: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 15px;
        font-size: 14px;
        color: #000;
      }
      .des{
        padding: 0 2px;
        height: 26px;
        span{
          display: inline-block;
          height: 26px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 26px;
        }
        .price{
          width: 95px;
          color: #FE3B0B;
          font-size: 18px;
          float: left;
          font-weight: bold;
        }
        .place{
          width: 55px;
          color: #999;
          font-size: 10px;
          text-align: right;
          float: right;
        }
      }
    }
  }
</style>
