<template>
	<view class="add">
		<view class="title" v-if="from!=''">认证信息</view>
		<view class="items">
			<view class="item cf">
				<view class="fll">账户名称</view>
				<view class="flr">
					<input type="text" :disabled="disabled || from!=''" v-model="realName" @input="assessValue" placeholder="请输入持卡人姓名">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">银行卡号</view>
				<view class="flr">
					<input type="text" :disabled="from!=''" v-model="cardNo" @input="assessValue" placeholder="请输入卡号">
				</view>
			</view>
			<view class="item cf" v-if="roleId == '20004'">
				<view class="fll">开户银行</view>
				<view class="flr">
					<input type="text" :disabled="from!=''" v-model="bankName" @input="assessValue" placeholder="如：中信银行郑州航海路支行">
				</view>
			</view>
		</view>
		<view class="tip" v-if="roleId == '20004' && item == ''">
			为了能尽快审核通过，请仔细核对银行信息
		</view>
		<view class="tip" v-if="roleId == '20004' && item.status == 2">失败原因：{{item.remark}}</view>
		<view class="big-btn-active" :class="{nodata: hasData}" @click="addInfo">
			{{btnText}}
		</view>
	</view>
</template>

<script>
	import { getBankInsert, bankCardCertification, enterpriseInsert, enterpriseUpdate } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				btnText:'提交',
				cardNo:'',
				realName:'',
				bankName:'',
				hasData: true,
				roleId: '',
				disabled: false,
				from:'',
				item:''
			};
		},
		onLoad(options) {
			if(options.from) {
				this.hasData = false
				this.from = options.from
				if(this.from == 'toDetail'){
					this.item = JSON.parse(options.item) 
				}
			}
		},
		onShow() {
			// 用户类型
			this.roleId = uni.getStorageSync('roleId')
			
			if(this.roleId == '20004'){
				if(this.item != ''){
					this.realName = this.item.realName
					this.cardNo = this.item.cardNo
					this.bankName = this.item.bankName
					this.disabled = true
					if(this.item.status == 0){
						uni.setNavigationBarTitle({
							title: '认证中'
						});
					}else{
						uni.setNavigationBarTitle({
							title: '认证失败'
						});
					}
					
					this.btnText = '修改资料'
				}
			}else{
				this.disabled = false
				this.btnText = '提交'
				uni.setNavigationBarTitle({
					title: '添加银行卡'
				});
			}
		},
		methods:{
			assessValue(){
				if(this.roleId == '20004'){
					this.hasData = this.cardNo == '' || this.realName == '' || this.bankName == ''
				}else{
					this.hasData = this.cardNo == '' || this.realName == ''
				}
			},
			addInfo(){
				let _this = this
				let cardNo = this.cardNo.replace(/\s*/g,"");
				if(this.from != '') { // 企业审核
					uni.showModal({
					    title: '提示',
					    content: '您的资料正在审核，修改资料影响审核进度',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								_this.from = ''
								_this.btnText = '提交认证'
								uni.setNavigationBarTitle({
									title: '认证银行卡银行卡'
								});
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else{  // 新增
					if(this.cardNo.indexOf('****') > -1 ){
						T.tips('请输入正确的银行卡卡号')
						return false
					}
					if(this.hasData) {
						return false
					}
					if(this.realName == ''){
						T.tips('账户名不能为空')
						return false
					}
					if(this.cardNo == ''){
						T.tips('银行卡不能为空')
						return false
					}
					let data = ''
					if(this.roleId == '20004'){ // 企业 
						if(this.bankName == ''){
							T.tips('开户行名称不能为空')
							return false
						}
						data = {
							cardNo: cardNo,
							realName:this.realName,
							bankName:this.bankName
						}
						if(this.btnText == '提交认证'){ // 更新
							enterpriseUpdate(data).then(res=>{
								if(res.code == '1000'){
									uni.redirectTo({
										url:'/pages/middle/release/account/bankcard/compSendSuccess'
									})
								}else{
									T.tips(res.message || '银行卡新增失败')
								}
							}).catch(err=>{
								T.tips(err.message || '银行卡新增失败')
							})
						}else{  // 提交
							enterpriseInsert(data).then(res=>{
								if(res.code == '1000'){
									uni.redirectTo({
										url:'/pages/middle/release/account/bankcard/compSendSuccess'
									})
								}else{
									T.tips(res.message || '银行卡新增失败')
								}
							}).catch(err=>{
								T.tips(err.message || '银行卡新增失败')
							})
						}
						
						
					}else{// 个人
						data = {
							acctPan:cardNo,
							acctName:this.realName
						}
						
						bankCardCertification(data).then(res=>{
							if(res.code== '1000'){
								uni.redirectTo({
									url:'/pages/middle/release/account/bankcard/addinfo?bankName='+ res.data.data.bank_name + '&cardType='+ res.data.data.card_type +'&realName=' +this.realName +'&cardNo=' + this.cardNo
								})
							}else{
								T.tips(res.message || '银行卡新增失败')
							}
						}).catch(err=>{
							T.tips(err.message || '银行卡新增失败')
						})
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		background: #fff;
		min-height: 100vh;
		.title{
			padding: 0 30upx;
			height: 80upx;
			line-height: 80upx;
			font-size: 32upx;
		}
		.tip{
			padding: 0 30upx;
			height: 60upx;
			line-height: 60upx;
			font-size: 24upx;
			color: #999;
		}
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
