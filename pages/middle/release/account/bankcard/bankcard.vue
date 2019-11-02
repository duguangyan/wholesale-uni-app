<template>
	<view class="bankcard">
		<view class="edit fs28">添加银行卡</view>
		<view class="content">
			<view class="items">
				<view class="item cf fs28">
					<view class="fll fll-1">
						<view class="img">
							<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572270677721&di=f8586856b15afb9b758b298947069668&imgtype=0&src=http%3A%2F%2Fszsqhrnzbgl.com%2FUploadFile%2Fcolumn%2F2016120739289213.png" mode=""></image>
						</view>
						
					</view>
					<view class="fll fll-2">
						<view>中国银行</view>
						<view class="fs24">储蓄卡</view>
					</view>
					<view class="fll fll-3">
						111111111111111
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
		.content{
			.items{
				.item{
					height: 100upx;
					padding: 20upx 30upx;
					color: #fff;
					background: #007AFF;
					.fll-1{
						width: 20%;
						.img{
							width: 100upx;
							height: 100upx;
							border-radius: 50%;
							overflow: hidden;
							>image{
								width: 100%;
								height: 100%;
							}
						}
					}
					.fll-2{
						width: 20%;
						line-height: 50upx;
					}
					.fll-3{
						width: 60%;
						line-height: 100upx;
						text-align: right;
					}
				}
			}
		}
		.edit{
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			position: relative;
			right: 30upx;
			color: #007AFF;
		}
	}
</style>
