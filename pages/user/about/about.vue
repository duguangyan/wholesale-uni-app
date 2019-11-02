<template>
	<view>
		<div class="about">
			<div class="img">
				<img src="@/static/img/icon-logo.png" >
			</div>
		    <div class="text">沁绿农业科技有限公司</div>
		    <div class="text">{{v}}</div>
		  </div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				v:''
			}
		},
		onLoad() {
			this.v = uni.getStorageSync('v')
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
		margin-top: 340upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
  text-align: center;
  color: #999;
  font-size: 28upx;
  &>img{
    margin-top: 360upx;
  }
  .text{
    margin-top: 36upx;
    &:last-child{
      margin-top: 14upx;
    }
  }
}
</style>