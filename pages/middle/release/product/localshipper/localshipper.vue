<template>
	<view class="localshipper">
		<view v-if="items.length>0">
			<view class="tip">
				以下为廊坊市地区货主联系方式
			</view>
			<view class="items">
				<view class="item flex" v-for="(item,index) in items" :key="index">
					<view class="flex-1 fs28 text-333">{{item.name}}</view>
					<view class="flex-2 fs28 text-666">{{item.phone}}</view>
					<view class="flex-1"><view class="btn" @click="callByPhone(item.phone)">联系货主</view></view>
				</view>
			</view>
		</view>
		<view class="nodata" v-if="items.length<=0">
			<view class="image">
				<image src="../../../../../static/imgs/localshipper.png" mode=""></image>
			</view>
			<view class="fs24 text-999">
				该地区还没有货主
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					{
						name:'农百集',
						phone:'15817390700'
					}
				]
			};
		},
		methods:{
			// 联系货主
			callByPhone(phoneNumber){
				uni.makePhoneCall({
				    phoneNumber 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.localshipper{
		background: #fff;
		min-height: 100vh;
		.nodata{
			text-align: center;
			.image{
				width: 200upx;
				height: 200upx;
				margin: 0 auto;
				padding-top: 300upx;
				padding-bottom: 20upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.items{
			.item{
				padding: 0 30upx;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1upx solid #f5f5f5;
				.btn{
					width:150upx;
					height:60upx;
					line-height: 60upx;
					text-align: center;
					background:rgba(254,59,11,1);
					border-radius:30upx;
					color: #fff;
					font-size: 28upx;
					position: relative;
					left: 20upx;
				}
			}
		}
		.tip{
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			font-size: 24upx;
			color: #999999;
			background: #f5f5f5;
		}
	}
</style>
