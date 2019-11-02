<template>
  <view class="TabBar">
	 <view class="list flex">
		 <view class="item flex-1" @click="goCheckPage(item.pagePath)" v-for="(item,index) in list" :key="index">
			<view class="icon"><image :src="checkIndex == index ? item.selectedIconPath : item.iconPath" mode=""></image></view>
			<view class="text" :class="{'active': checkIndex == index}">{{item.text}}</view>
		 </view>
	 </view>
  </view>
</template>
<script>
export default {
  name: "navigationBar",
  props: {
    checkIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
		list: [{
			"pagePath": "/pages/main/main",
			"text": "首页",
			"iconPath": "../../static/img/1.1.png",
			"selectedIconPath": "../../static/img/1.2.png"
		}, {
			"pagePath": "/pages/order/order",
			"text": "进货单",
			"iconPath": "../../static/img/2.1.png",
			"selectedIconPath": "../../static/img/2.2.png"
		}, {
			"pagePath": "/pages/user/user",
			"text": "我的",
			"iconPath": "../../static/img/3.1.png",
			"selectedIconPath": "../../static/img/3.2.png"
		}]
	};
  },
  created() {
	// console.log('created')
	
  },
  mounted() {
	
  },
  methods: {
	  goCheckPage(pagePath){
		  uni.reLaunch({
		      url: pagePath
		  });
	  }
  }
};
</script>

<style lang="scss" scoped>
	.TabBar{
		height: 100upx;
		width: 100%;
		position: fixed;
		z-index: 999999;
		bottom: 0;
		background: #fff;
		border-top: 0.5upx solid #f5f5f5;
		.list{
			width: 80%;
			margin: 0 auto;
			.item{
				font-size: 22upx;
				text-align: center;
				margin-top: 10upx;
				.icon{
					width: 48upx;
					height: 48upx;
					margin: 0 auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					color: #D9D9D9;
					margin-top: 10upx;
				}
				.active{
					color: #FC2D2D;
				}
			}
		}
	}
</style>
