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
						{{item.bankName}}
					</view>
					<view class="tip fs24">
						{{item.cardName}}
					</view>
					<view class="number fs34">
						{{item.cardNo}}
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="big-btn-active" @click="del">解绑银行卡</view>
		</view>
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import Dialog from '@/components/common/Dialog.vue'
	export default {
		data() {
			return {
				isShow: false,
				title:'确认解绑此银行卡？',
				item:''
			};
		},
		components:{ Dialog },
		onLoad(options) {
			this.item = JSON.parse(options.item)
		},
		onShow() {
			
		},
		methods:{
			// 确定
			doConfirm(){
				uni.redirectTo({
					url:'/pages/middle/release/account/payps/resPassword?id='+ this.item.id
				})
			},
			// 取消
			doCancel(){
				this.isShow = false
			},
			// 删除
			del(){
				this.isShow = true
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
