<template>
	<view class="replacesale">
		
		<view class="items" @click="goDetail">
			
			<view class="progress fs28 text-333">
				<text>进度: </text><text class="text-999">审核未通过</text>
			</view>
			
			<view class="item">
				<view class="li cf fs30">
					<view class="fll text-999">品&nbsp&nbsp&nbsp&nbsp种:</view>
					<view class="fll text-333">西瓜红</view>
				</view>
				<view class="li cf fs24">
					<view class="fll text-999">产&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp地:</view>
					<view class="fll text-333">河北省</view>
				</view>
				<view class="li cf fs24">
					<view class="fll text-999">供货能力:</view>
					<view class="fll text-333">8000斤</view>
				</view>
				<view class="li cf fs24">
					<view class="fll text-999">规格属性:</view>
					<view class="fll text-333">三两</view>
				</view>
			</view>
			<view class="footer cf">
				<view class="btn flr">重新发布</view>
			</view>
			
		</view>
		
		<view class="send" @click="doSend">
			<image src="/static/imgs/send.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 发布
			doSend(){
				uni.navigateTo({
					url:'/pages/middle/release/product/replacesale/send/send'
				})
			},
			// 去详情
			goDetail(){
				uni.navigateTo({
					url:'/pages/middle/release/product/replacesale/detail/detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.replacesale{
		.send{
			position: fixed;
			bottom: 80upx;
			right: 30upx;
			image{
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
			}
		}
		.footer{
			.btn{
				width:160upx;
				height:54upx;
				line-height: 54upx;
				font-size: 28upx;
				text-align: center;
				background:rgba(254,59,11,1);
				border-radius:27upx;
				color: #fff;
			}
		}
		.items{
			width: 690upx;
			height: 370upx;
			margin: 30upx;
			padding: 10upx;
			background: #FFFFFF;
			.item{
				.li{
					height: 60upx;
					line-height: 60upx;
					// .spacing{
					// 	letter-spacing:20upx
					// }
					// .spacing-1{
					// 	letter-spacing:30upx
					// }
					.fll{
						width: 120upx;
					}
				}
			}
			.progress{
				height: 60upx;
				line-height: 60upx;
				border-bottom: 1upx solid #f5f5f5;
			}
		}
	}
</style>
