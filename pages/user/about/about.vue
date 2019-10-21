<template>
	<view>
		<div class="about">
			<div class="img">
				<img src="@/static/img/icon-logo.png" >
			</div>
		    <div class="text">沁绿农业科技有限公司</div>
		    <div class="text">V1.0.0</div>
		  </div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.about{
	.img{
		width: 100upx;
		height: 100upx;
		margin: 0 auto;
		margin-top: 200upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
  text-align: center;
  color: #999;
  font-size: 24upx;
  &>img{
    margin-top: 360upx;
  }
  .text{
    margin-top: 72upx;
    &:last-child{
      margin-top: 26upx;
    }
  }
}
</style>