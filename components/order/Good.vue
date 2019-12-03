
<template>
	<view class="content" @click="goGoodsDetail">
		<view class="item cf">
			<view class="fll image">
				<image :src="item.imgUrl" mode=""></image>
			</view>
			<view class="fll info text-333 fs28">
				<view class="name ellipsis-line2">
					{{item.goodsName || ''}}
				</view>
				<view class="tip fs24 text-999 ellipsis">
					{{item.skuDesc || ''}}
				</view>
				<view class="cf" v-if="hasAgencyFee">
					<view class="fll">
						代办费:¥{{item.agentcyPrice || '0'}} 元<text v-if="item.goodsUnit">/</text>{{item.goodsUnit || '斤'}}
					</view>
					<view class="flr fs24 text-999">
						x{{item.num}}
					</view>
				</view>
				<view class="price text-theme">
					<view class="fll"> 
						价格:¥{{item.price || '0'}}元/{{item.goodsUnit || '斤'}}
					</view>
					<view class="flr fs24 text-999" v-if="!hasAgencyFee">
						x{{item.num}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goodx',
		props: {
			item: {
				type: Object,
				default: null
			},
			hasAgencyFee:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
			
			}
		},
		methods: {
			goGoodsDetail() {
				uni.navigateTo({
					url: '/pages/order/goodsDetail/goodsDetail?shopId=' + this.item.shopId + '&goodsId=' + this.item.goodsId
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		
		.item{
			.image{
				width: 200upx;
				height: 200upx;
				border-radius:10upx;
				overflow: hidden;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.info{
				width: 470upx;
				margin-left: 20upx;
				.name{
					width: 470upx;
					height: 74upx;
				}
				.tip{
					padding: 4upx 0;
					width: 470upx;
				}
				.price{
					margin-top: 20upx;
				}
			}
		}
		
	}
</style>

