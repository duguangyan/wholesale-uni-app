<template>
	<view class="add">
		<view class="items">
			<view class="item cf">
				<view class="fll">账户名</view>
				<view class="flr">
					<input type="text" v-model="realName" placeholder="请输入持卡人姓名">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">银行卡卡号</view>
				<view class="flr">
					<input type="text" v-model="cardNo" placeholder="请输入卡号">
				</view>
			</view>
		</view>
		<view class="big-btn-active" @click="addInfo">
			提交
		</view>
	</view>
</template>

<script>
	import { getBankInsert } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				cardNo:'',
				realName:''
			};
		},
		methods:{
			addInfo(){
				if(this.realName == ''){
					T.tips('账户名不能为空')
					return false
				}
				if(this.cardNo == ''){
					T.tips('银行卡不能为空')
					return false
				}
				let data = {
					cardNo:this.cardNo,
					realName:this.realName
				}
				getBankInsert(data).then(res=>{
					if(res.code== '1000'){
						uni.redirectTo({
							url:'/pages/middle/release/account/bankcard/addinfo'
						})
					}else{
						T.tips(res.message || '银行卡新增失败')
					}
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
