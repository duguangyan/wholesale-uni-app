<template>
	<view class="add">
		<view class="items">
			<view class="item cf">
				<view class="fll">银行</view>
				<view class="flr">
					<input type="text" v-model="bank" disabled placeholder="请输入持卡人姓名">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">卡类型</view>
				<view class="flr">
					<input type="text" v-model="type" disabled placeholder="请输入卡号">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">身份证</view>
				<view class="flr">
					<input type="text" placeholder="请输入身份证">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">手机号</view>
				<view class="flr">
					<input type="text" placeholder="请输入银行卡预留手机号">
				</view>
			</view>
		</view>
		<view class="big-btn-active" @click="goBack">
			下一步
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bank:'中国银行',
				type:'储蓄卡'
			};
		},
		methods:{
			
			getBankInsert(){
				getBankInsert(data).then(res=>{
					if(res.code== '1000'){
						// uni.redirectTo({
						// 	url:'/pages/middle/release/account/bankcard/addinfo'
						// })
					}else{
						T.tips(res.message || '银行卡新增失败')
					}
				})
			},
			
			
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		background: #fff;
		min-height: 100vh;
		.big-btn-active{
			margin-top: 60upx;
		}
		.items{
			margin: 0 30upx;
			.item{
				height: 100upx;
				line-height: 100upx;
				font-size: 30upx;
				color: #333;
				.fll{
					width: 30%;
				}
				.flr{
					width: 70%;
					
					// border-bottom: 1upx solid #f5f5f5;
					>input{
						font-size: 30upx;
						padding-bottom: 30upx;
						position: relative;
						top: 30upx;
						border-bottom: 1upx solid #f5f5f5;
					}
				}
			}
		}
	}
</style>
