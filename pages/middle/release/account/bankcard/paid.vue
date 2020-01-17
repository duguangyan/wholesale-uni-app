<template>
	<view class="add">
		<view class="img">
			<image src="/static/imgs/icon-1019.png" mode=""></image>
		</view>
		<view class="title fs28 text-333">
			沁绿农业已于{{item.transferTime}}向{{item.realName}}（{{item.cardNo}}）提交一笔1元以下的打款申请，请于到账后 <text class="text-theme">7日内</text>在此确认打款金额
		</view>
		<view class="tip fs24 text-999">
			<view>
				1、您需要查询银行卡的收支明细，确认打款
			</view>
			<view>
				2、由于银行返回打款成功信息有延迟，如未查询到打款信息，请一天后重新查询
			</view>
		</view>
		
		<view class="items">
			<view class="item">
				开户银行：{{item.bankName}}
			</view>
			<view class="item">
				银行卡号：{{item.cardNo}}
			</view>
			<view class="item">
				开户名称：{{item.realName}}
			</view>
			<view class="item">
				打款金额:  
				<view class="input"> <input @input="changeInput" @blur="changeBlur" v-model="price" type="digit" maxlength="4" placeholder="输入0.01~0.99" /></view>   
				元
			</view>
		</view>
		
		<view class="big-btn-active" @click="doSubmit">
			提交认证
		</view>
	</view>
</template>

<script>
	import { getBankInsert, enterpriseAuditCheckUp } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				price: '',
				hasData: true,
				item:''
			};
		},
		onLoad(options) {
			this.item = JSON.parse(options.item)
		},
		onShow() {
			
		},
		methods:{
			doSubmit(){
				if(this.price.indexOf('.')>0){
					let arr = this.price.split('.')
					arr[1] = arr[1].substr(0,2)
					if(arr[0] == 0 && arr[1]>0){
						this.price = '0.' + arr[1]
					}else{
						T.tips('输入0.01~0.99的金额')
						return false
					}
				}else{
					T.tips('输入0.01~0.99的金额')
					return false
				}
				
				let data = {
					id: this.item.id,
					transferAmount: this.price
				}
				enterpriseAuditCheckUp(data).then(res=>{
					if(res.code == '1000'){
						uni.redirectTo({
							url: '/pages/middle/release/account/bankcard/bankcard'
						});
					}else{
						if(res.code== 'pay-1009'){
							uni.navigateTo({
								url:'/pages/middle/release/account/bankcard/add?from=toDetail&item='+ JSON.stringify(this.item)
							})
						}else{
							T.tips(res.message || '提交失败')
						}
						
					}
				})
			},
			changeInput(){
				// if(this.price.indexOf('.')>0){
				// 	this.hasData = true
				// 	let arr = this.price.split('.')
				// 	arr[1] = arr[1].substr(0,2)
				// 	if(arr[0] == 0 && arr[1]>0){
				// 		this.hasData = true
				// 		this.price = '0.' + arr[1]
				// 	}else{
				// 		this.hasData = false
				// 	}
				// }else{
				// 	this.hasData = false
				// }
			},
			limitFloat(obj) {
				this.maxlength = 8
			
				obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				obj = obj.replace(/^\./g, ""); //验证第一个字符是数字而不是字符
				obj = obj.replace(/\.{2,}/g, "."); //只保留第一个.清除多余的
				obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
			
				if (obj.indexOf(".") < 0 && obj != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					if (obj.length > 1) {
						obj = obj.replace(/\b(0+)/gi, "")
					}
				}
				if (obj[0] == '0' && obj[1] == '0') {
					obj = '0'
				}
				if (obj == '0.00' || obj == '00') {
					obj = '0'
				}
				return obj
			},
			changeBlur(){
				let reg = /^0\.(?!00)\d{1,2}$/;
				if(!reg.test(this.price) || this.price == '0.0'){
					this.price = ''
					T.tips('请输入0.01~0.99之间的金额')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		background: #fff;
		min-height: 100vh;
		.hasData{
			background: #D9D9D9;
		}
		.items{
			padding: 0 100upx;
			margin-bottom: 100upx;
			.item{
				line-height: 60upx;
				.input{
					display: inline-block;
					position: relative;
					top: 10upx;
					padding-left: 20upx;
					border-bottom: 1upx solid #f5f5f5;
				}
			}
		}
		.img{
			width: 120upx;
			height: 120upx;
			>image{
				width: 100%;
				height: 100%;
			}
			margin: 0 auto;
			padding-top: 100upx;
		}
		.title{
			margin: 60upx 0 30upx 0;
		}
		.title,.tip{
			text-align: left;
			line-height: 40upx;
			padding: 0 100upx;
		}
		.tip{
			margin-bottom: 100upx;
			
		}
	}
</style>
