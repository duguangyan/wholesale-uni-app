<template>
	<view class="content">
		<view class="item cf">
			<view class="img fll">
				<image :src="item.imgUri" mode=""></image>
			</view>
			<view class="warp fll">
				<view class="fs28 ellipsis-line2">
					我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称我是名称
				</view>
				<view class="deliver">
					<text class="fs20 text-999">河北廊坊固安县</text>
					<text class="tip fs20 text-999">红心</text>
					<text class="tip fs20 text-999">紫皮</text>
				</view>
				<view class="price">
					<view class="fs34 text-red"><text class="fs24">￥</text>128<text class="fs24">元/斤起</text></view>
				</view>
				<view class="address cf">
					<view class="fll img">
						<image src="../../../../../static/imgs/main-icon-1.png" mode=""></image>
					</view>
					<view class="fll fs20 text-999">河北省廊坊市固安县 <text class="mgl-20">舒尚飞</text></view>
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
			}
		},
		data() {
			return {
			
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		
	
		.item {
			padding: 0 30upx;
			width: 100%;
			height: 250upx;
			border-radius: 10upx;
			overflow: hidden;
			background: #fff;
			margin-bottom: 20upx;
			border-bottom: 1upx solid #f5f5f5;
			.warp {
				padding: 4upx 20upx;
				position: relative;
				width: 460upx;
				.deliver{
					.tip{
						background: #999;
						color: #fff;
						display: inline-block;
						border-radius: 20upx;
						margin-left: 10upx;
						padding: 2upx 4upx;
					}
				}
				.address{
					.img{
						width: 28upx;
						height: 22upx;
						margin-right: 6upx;
						>image{
							width: 100%;
							height: 100%;
							position: relative;
							top: -12upx;
							
						}
					}
				}
				.ellipsis-line2 {
					height: 78upx;
					line-height: 39upx;
					font-size: 30upx;
					color: #48484C;
				}
	
				.add {
					position: absolute;
					right: 20upx;
					bottom: 12upx;
				}
	
				.mgt-20 {
					margin-top: 26upx !important;
					width: 100%;
				}
			}
	
			.Android {
				.add {}
			}
	
			>.img {
				
				background-image: url('~@/static/img/default-shouye.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				width: 220upx;
				height: 220upx;
				border-radius: 20upx;
				overflow: hidden;
				>image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
