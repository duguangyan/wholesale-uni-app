<template>
	<view class="add">
		<view class="items">
			<view class="item cf">
				<view class="fll">银行</view>
				<view class="flr">
					<input type="text" v-model="bankName" disabled placeholder="请输入持卡人姓名">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">卡类型</view>
				<view class="flr">
					<input type="text" v-model="typeName" disabled placeholder="请输入卡号">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">身份证</view>
				<view class="flr">
					<input type="idcard" @input="assessData" v-model="card" placeholder="请输入身份证">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">手机号</view>
				<view class="flr">
					<input type="number" @input="assessData" v-model="phone" placeholder="请输入银行卡预留手机号">
				</view>
			</view>
		</view>
		<view class="big-btn-active" :class="{'nodata':hasData}" @click="getBankInsert">
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
				bankName:'中国银行',
				typeName:'储蓄卡',
				hasData:true,
				card:'',
				phone:'',
				cardType:'',
				cardNo:'',
				realName:'',
				bankCode:''
			};
		},
		onLoad(options) {
			// 1-储蓄卡 2-贷记合一 3-信用卡
			this.cardType = options.cardType
			switch (this.cardType){
				case 1:
				this.typeName = '储蓄卡'
					break;
				case 2:
				this.typeName = '贷记合一'
					break;
				case 3:
				this.typeName = '信用卡'
					break;
				default:
				this.typeName = '暂无数据'
					break;
			}
			this.bankName = options.bankName || '暂无数据'
			this.cardNo   = options.cardNo || '暂无数据'
			this.realName = options.realName || '暂无数据'
			this.bankCode = options.bankCode || '暂无数据'
		},
		methods:{
			// 验证数据是否添加
			assessData(){
				this.hasData = this.card == '' || this.phone == ''
			},
			// 提交信息
			getBankInsert(){
				if(this.hasData) {
					return false
				}
				// let data = {
				// 	userCardNo :this.card,
				// 	phone :this.phone ,
				// 	cardType :this.cardType,
				// 	bankName :this.bankName,
				// 	cardNo: this.cardNo,
				// 	realName:this.realName,
				// 	bankCode: this.bankCode
				// }
				
				let data = {
					userCardNo : '513821199012116170',
					phone : '15817390700' ,
					cardType :1,
					bankName :'中国银行',
					cardNo: '6217211107001880725',
					realName:'李强',
					bankCode: 'ICI'
				}
				
				getBankInsert(data).then(res=>{
					if(res.code== '1000'){
						uni.navigateBack({
							delta:1
						})
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
		.nodata{
			background: #d9d9d9;
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
