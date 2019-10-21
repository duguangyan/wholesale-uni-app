<template>
  <div class="item">
    <div class="photo">
      <img :src="item.imgUrl" height="100%" alt />
    </div>
    <div class="content">
      <div class="name">{{item.goodsName}}</div>
      <div class="standard">{{item.skuDesc}}</div>
    </div>
    <div class="content2">
      <div class="price">￥{{item.price}}</div>
      <div class="num">x{{item.num}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ordgood',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 24upx;
  color: #000;
  padding: 20upx 0;
  .content {
    flex-grow: 1;
    position: relative;
  }
  .content2 {
    position: relative;
  }
  .photo {
    width: 160upx;
    height: 160upx;
    border-radius: 10upx;
    overflow: hidden;
    margin-right: 20upx;
	>img{
		width: 100%;
		height: 100%;
	}
  }
  .name {
    line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .standard {
    padding: 4upx 10upx;
    background-color: #f5f5f5;
    font-size: 20upx;
    color: #666;
    display: inline-block;
    position: absolute;
    top: 56upx;
    left: 0;
  }
  .num {
    position: absolute;
    color: #999;
    top: 56upx;
    right: 0;
  }
}
</style>
