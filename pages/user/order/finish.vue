<template>
  <div class="finish">
    <div class="body">
		<div class="icon-40">
			<img src="/static/img/icon-finish.png" width="40" height="40" alt />
		</div>
      
      <div class="title">交易完成</div>
      <div class="operator">
        <div class="btn">查看订单</div>
        <div class="btn">返回首页</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'finish',
  data() {
    return {}
  },
  components: {
  
  }
}
</script>

<style lang="scss" scoped>
.finish {
  text-align: center;
  .icon-40{
	  width: 40upx;
	  height: 40upx;
	  >img{
		  width: 100%;
		  height: 100%;
	  }
  }
  .body{
    background-color: #fff;
  }
  img {
    margin-top: 100upx;
  }
  .title {
    margin-top: 20upx;
  }
  .operator {
    margin-top: 20upx;
    display: flex;
    margin-left: auto;
    right: auto;
    .btn {
      width: 160upx;
      line-height: 60upx;
      border: 1upx solid #f0f0f0;
      border-radius: 30upx;
      color: #333;
      font-size: 24upx;
      &:first-child {
        margin-right: 20upx;
      }
    }
  }
}
</style>
