<template>
	<view class="bankcard">
		<view class="items">
			<view class="item cf">
				<view class="left fll">
					<view class="image">
						<image src="../../../../../static/imgs/icon-1017.png" mode=""></image>
					</view>
				</view>
				<view class="right fll">
					<view class="title fs30">
						中国银行
					</view>
					<view class="tip fs24">
						储蓄卡
					</view>
					<view class="number fs34">
						**** **** **** 6688
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="big-btn-active" @click="addBankcard">+添加银行卡</view>
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
			addBankcard(){
				uni.redirectTo({
					url:'/pages/middle/release/account/bankcard/add'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bankcard{
		.footer{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
		.items{
			margin-bottom: 160upx;
			margin-top: 20upx;
			.item{
				background:rgba(242,70,82,1);
				border-radius:10upx;
				margin: 10upx 30upx;
				height: 180upx;
				color: #fff;
				.left{
					width: 20%;
					.image{
						width: 70upx;
						height: 70upx;
						position: relative;
						top: 30upx;
						left: 60upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				.right{
					text-align: left;
					padding-left: 20upx;
					padding-top: 30upx;
				}
			}
		}
	}
</style>
