<template>
	<view>
		<div class="success">
			<div class="content">
				<div class="img">
					<img src="@/static/imgs/order-icon-1001.png" alt="图片">
				</div>
				<div class="d1 fs38 text-333 mt-20">
					订单提交成功,请等待货主确认
				</div>
				<div class="d2 flex text-333 fs28">
					<!-- <p class="flex-1" v-if="isAgentcy == 1" @click="makePhoneCall">联系代办</p> -->
					<p class="flex-1" @click="checkOrderDetal">查看订单</p>
					<p class="flex-1" @click="goHome">返回首页</p>
				</div>
			</div>
			<StrictlyGoods></StrictlyGoods>
		</div>
	</view>
</template>

<script>
	import StrictlyGoods from '@/components/common/StrictlyGoods.vue'
	export default {
		data() {
			return {
				query: '', // 获取传递参数
				adPositione: '', // 获取广告位信息
				orderId: '',
				shopId: '',
				phone: '',
				isAgentcy: 0
			};
		},
		components: {
			StrictlyGoods
		},
		onLoad(options) {
			this.orderId = options.orderId
			this.shopId  = options.shopId
			this.phone   = options.phone
			console.log(this.phone)
		},
		onShow() {
			// 判断是否需要代办
			this.isAgentcy = JSON.parse(uni.getStorageSync('userApply')).isAgentcy
		},
		methods: {
			// 广告位url跳转
			goPath(url) {
				if (url) {
					location.href = url
				}
			},
			// 查看订单详情
			checkOrderDetal() {
				// 详情需要 orderId, shopId
				uni.navigateTo({
					url: '/pages/user/order/detail?orderId=' + this.orderId + '&shopId=' + this.shopId
				})
			},
			// 返回首页
			goHome() {
				uni.switchTab({
					url: '/pages/main/main'
				})
			},
			makePhoneCall(){
				uni.makePhoneCall({
				    phoneNumber: this.phone 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.success {
		.top {
			position: fixed;
			top: 0;
		}
		.big-btn-active{
			margin-top: 40upx;
		}
		.content{
		  text-align: center;
		  padding-top: 80upx;
		  padding-bottom: 40upx;
		  background: #fff;
		  .img{
		    width: 80upx;
		    height: 80upx;
		    margin: 20upx auto;
			position: relative;
			top: -10upx;
		    >img{
		      width: 100%;
			  height: 100%;
		    }
		  }
		  .d2{
		    width: 300px;
		    margin: 0 auto;
		    margin-top: 20px;
		    >p{
		      display: inline-block;
		      border: 1px solid #f0f0f0;
		      padding: 5px;
		      border-radius: 20px;
		    }
		    :first-child{
		      margin-right: 20px;
		    }
			:last-child{
				margin-left: 20px;
			}
		  }
		}
	}
</style>
