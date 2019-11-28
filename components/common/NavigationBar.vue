<template>
  <view class="navigationBar">
	  <view class="content cf">
		  <view class="img fll" @click="goBack" v-if="isBack">
			  <!--  #ifdef  APP-PLUS || H5 -->
			  <image src="../../../../static/img/tag-back.png"></image>
			  <!--  #endif -->
			  <!--  #ifdef  MP-WEIXIN -->
			  <image src="../../static/img/tag-back.png"></image>
			  <!--  #endif -->
		  </view>
		  <view class="title fs28" :class="{'Android': platform == 1}">{{title}}</view>
		  <!--  #ifdef  APP-PLUS || H5 || MP-WEIXIN -->
		  <view class="click flr fs24" v-if="isClick" @click="doClick">{{clickTitle}}</view>
		  <!--  #endif -->
		  
	  </view>
	  
  </view>
</template>
<script>
export default {
  name: "navigationBar",
  props: {
    title: {
      type: String,
      default: "标题"
    },
	clickTitle: {
	  type: String,
	  default: "按钮"
	},
	isClick: {
	  type: Boolean,
	  default: false
	},
	isBack: {
	  type: Boolean,
	  default: true
	}
  },
  data() {
    return {
		autoplay: true,
		videoCtx:'',
		platform: 0
	};
  },
  created() {
	// console.log('created')
	
  },
  mounted() {
	// 设备样式兼容
	this.platform = uni.getStorageSync('platform');
  },
  methods: {
	  // 返回上一级
	  goBack(){
		  uni.navigateBack({
		  	delta:1
		  })
		  //this.$emit("goBack", false);
	  },
	  doClick(){
		  this.$emit("doClick", false);
	  }
  }
};
</script>

<style lang="scss" scoped>
	.Android{
		position: relative;
		top: -12upx;
	}
	.navigationBar{
		padding-top: var(--status-bar-height);
		height: 80upx;
		position: fixed;
		top: 0;
		width: 100%;
		background: #fff;
		z-index: 999999;
		.content{
			height: 80upx;
			line-height: 80upx;
			position: absolute;
			width: 100%;
			bottom: 0;
			// background: red;
			.img{
				width: 40upx;
				height: 40upx;
				position: absolute;
				left: 30upx;
				z-index: 99999;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				text-align: center;
				position: relative;
				z-index: 9999;
				font-size: 38upx;
				
			}
			.click{
				position: absolute;
				right: 30upx;
				top: 0upx;
				z-index: 99999;
			}
			
			/* #ifdef MP-WEIXIN */  
			.click{
				right: 180upx;
			}
			/* #endif */ 
			
		}
	}
</style>
