<template>
  <div class="item cf">
    <div class="photo fll">
      <image :src="item.imgUrl"/>
    </div>
    <div class="content fll">
      <div class="name ellipsis-line2">{{item.goodsName}}</div>
      <div class="standard" :class="{'Android': platform == 1}">{{item.skuDesc}}</div>
    </div>
    <div class="content2 flr">
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
  },
  data() {
  	return {
  		  platform: 0
  	};
  },
  mounted() {
  	// 设备样式兼容
  	this.platform = uni.getStorageSync('platform');
	// console.log('platform:',this.platform)
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 24upx;
  color: #000;
  padding: 20upx 0;
  .content {
	width: 60%;
	margin-left: 20upx;
  }
  .content2 {
    position: relative;
  }
  .photo {
    width: 160upx;
    height: 160upx;
    border-radius: 10upx;
    overflow: hidden;
	background: red;
	>image{
		width: 160upx;
		height: 160upx;
		text-align: center;
	}
  }
  .name {
    // height: 80upx;
	width: 90%;
	line-height: 40upx;
  }
  .Android{
	  padding-top: 10upx!important;
  }
  .standard {
    padding: 6upx 14upx;
	border-radius: 22upx;
    background-color: #f5f5f5;
    font-size: 20upx;
    color: #666;
    display: inline-block;
	margin-top: 20upx;
  }
  .num {
    position: absolute;
    color: #999;
    top: 46upx;
    right: 0;
  }
}
</style>
