<template>
	<view>
		<div class="success">
			<div class="content">
				<div class="img">
					<img src="@/static/img/icon-finsh-order.png" alt="图片">
				</div>
				<div class="d1 fs38 text-333 mt-20">
					交易完成
				</div>
				<div class="d2 flex text-333 fs28">
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
				shopId: ''
			};
		},
		components: {
			StrictlyGoods
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.shopId = options.shopId;
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
					url: '/pages/order/goodsDetail/goodsDetail?orderId=' + this.orderId + '&shopId=' + this.shopId
				})
			},
			// 返回首页
			goHome() {
				uni.switchTab({
					url: '/pages/main/main'
				})
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
		    width: 200px;
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
		  }
		}
	}
</style>
