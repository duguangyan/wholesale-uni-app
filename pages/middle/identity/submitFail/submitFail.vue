<template>
	<view class="agency">

		<view class="content">
			<view class="img">
				<image src="/static/imgs/submit-2.png" mode=""></image>
			</view>
			<view class="p">
				审核失败
			</view>
			<view class="s">
				提示:图片内容不清晰请重新上传
			</view>
		</view>
		<view class="big-btn-active" @click="finsh">去修改</view>
	</view>
</template>

<script>

	export default {
		name: 'agency',
		data() {
			return {
				progress:['填写资料','审核中','审核通过'],
			};
		},
		components: {
			
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			finsh(){
				uni.redirectTo({
					url:'/pages/middle/identity/realname/agency'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 货主
	.agency {
		background: #fff;
		height: 100vh;
		.big-btn-active{
			margin-top: 100upx;
		}
		.content{
			text-align: center;
			padding-top: 100upx;
			.img{
				width: 120upx;
				height: 120upx;
				text-align: center;
				margin: 0 auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.p{
				font-size: 32upx;
				color: #48484C;
				margin: 20upx 0;
			}
			.s{
				font-size: 24upx;
				color: #999999;
			}
		}
		.user{
			padding: 0 30upx;
			border-bottom: 20upx solid #F5F5F5;
			.item-2{
				height: 100upx;
				line-height: 100upx;
				.v-1{
					font-size: 30upx;
					color: #333;
					width: 20%;
				}
				.v-2{
					width: 56%;
					input{
						position: relative;
						top: 30upx;
						font-size: 30upx;
						padding-bottom: 30upx;
					}
				}
				.v-3{
					width: 24%;
					font-size: 30upx;
				}
			}
			.item-1{
				height: 100upx;
				line-height: 100upx;
				.fll{
					font-size: 30upx;
					color: #333;
					width: 20%;
				}
				.flr{
					width: 80%;
					input{
						position: relative;
						top: 30upx;
						padding-bottom: 30upx;
						font-size: 30upx;
						border-bottom: 1upx solid #F0F0F0;
					}
				}
			}
		}
		.top{
			height: 140upx;
			line-height: 140upx;
			padding: 0 30upx;
			padding-left: 40upx;
			.item{
				.garden{
					display: inline-block;
					position: relative;
					top: 46upx;
					width: 44upx;
					height: 44upx;
					border-radius: 50%;
					line-height: 44upx;
					text-align: center;
					background: #C2C2CC;
					font-size: 32upx;
					color: #fff;
				}
				.text{
					color: #999999;
					margin-left: 20upx;
					width: 100upx;
					font-size: 24upx;
				}
				.label{
					display: inline-block;
					width: 24upx;
					height: 24upx;
					margin-left: 20upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.activeGarden{
					background: #FE3B0B;
				}
				.activeText{
					color: #FE3B0B;
				}
			}
		}
		


	}
</style>
