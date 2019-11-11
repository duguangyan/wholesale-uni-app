<template>
	<view class="bankcard">
		<view class="items">
			<view class="item cf">
				<view class="left fll">
					<view class="image">
						<image src="../../../../../static/imgs/icon-1017.png" mode=""></image>
					</view>
					
				</view>
				<view class="right flr">
					<view class="title">
						中国银行
					</view>
					<view class="tip">
						储蓄卡
					</view>
					<view class="number">
						**** **** 6688
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.bankcard{
		.items{
			margin-top: 20upx;
			.item{
				background: #F24652;
				margin: 10upx 30upx;
				.left{
					width: 20%;
					.image{
						width: 70upx;
						height: 70upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.right{
					
				}
			}
		}
	}
</style>
