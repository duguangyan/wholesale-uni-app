<template>
	<view class="cash">
		<view class="top cf" @click="goBankList">
			<view class="fll fs32 text-333">提现到银行卡</view>
			<view class="flr img"><image src="/static/imgs/right.png" mode=""></image></view>
			<view class="flr fs28 text-theme mgr-20">{{bankCard.bankName}}({{bankCard.cardNo}})</view>
		</view>
		<view class="content">
			<view class="cf">
				<view class="fll fs26 text-333 price-icon">￥</view>
				<view class="fll">
					<input class="text-333" @input="assessData" v-model="totalPrice" type="digit" placeholder="请输入金额">
				</view>
				<view class="flr fs24 text-333" @click="getAllCash">
					全部提现
				</view>
			</view>
		</view>
		<view class="tip cf" @click="clickTip">
			<view class="img fll">
				<image src="/static/imgs/icon-1018.png" mode=""></image>
			</view>
			<view class="text fs24 text-999 fll">
				账户余额¥{{accountSubDates.balance}}，其中¥{{accountSubDates.freezeBalance}}不可提现
			</view>
		</view>
		<view class="big-btn-active" :class="{nodta: hasData}" @click="getCash">提现</view>
	</view>
</template>

<script>
	import { getBankList, postPayApply } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				accountSubDates:'',
				totalPrice:'',
				bankCard:'',
				bankCardList:[],
				bankChcekIndex:0,
				hasData:true
			};
		},
		onLoad(options) {
			this.accountSubDates = JSON.parse(options.accountSubDates) 
		},
		onShow() {
			// 获取银行卡信息
			this.bankChcekIndex = 0
			this.getBankCardList()
		},
		methods:{
			// 提示
			clickTip (){
				T.tips('买家未确认收货的余额不能提现')
			},
			// 验证数据
			assessData(){
				this.hasData = this.totalPrice == ''
			},
			// 提现提交
			getCash(){
				
				if(this.hasData){
					return false
				}
				if(this.totalPrice>this.accountSubDates.availableBalance){
					T.tips('提现金额不能大于可提现金额')
					return false
				}
				uni.navigateTo({
					url:'/pages/middle/release/account/payps/resPassword?from=cash&amount='+this.totalPrice+'&receiveAccount='+this.bankCardList[this.bankChcekIndex].id
				})
			},
			// 全部提现
			getAllCash(){
				this.totalPrice = this.accountSubDates.availableBalance
			},
			//获取银行卡信息
			getBankCardList(){
				let data = {
					pageIndex:1
				}
				getBankList(data).then(res=>{
					if(res.code == '1000'){
						this.bankCardList = res.data
						this.bankCard = res.data[0]
						let cardNo = this.bankCard.cardNo
						cardNo = cardNo.substr(cardNo.length-4)
						this.bankCard.cardNo = cardNo
						
					}
				})
			},
			// 去银行列表
			goBankList(){
				let _this = this
				// 组装数据
				let itemList = [];
				this.bankCardList.forEach((item,index)=>{
					if(item.cardType == 1){
						item.cardName = '借记卡'
					}else if(item.cardType == 2){
						item.cardName = '贷记合一'
					} else if(item.cardType == 3){
						item.cardName = '贷记卡'
					}
					let str = item.bankName + ' ' + item.cardName + ' ' + '('+item.cardNo.substr(item.cardNo.length-4)+')'
					itemList.push(str)					
				})
				itemList.push(' + 使用新卡提现')
				// 弹起选择框
				uni.showActionSheet({
				    itemList,
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex == _this.bankCardList.length){
							// 点击后新增银行卡
							uni.navigateTo({
								url:'/pages/middle/release/account/bankcard/add'
							})
						}else{
							_this.bankChcekIndex = res.tapIndex
							_this.bankCard = _this.bankCardList[res.tapIndex]
							let cardNo = _this.bankCard.cardNo
							cardNo = cardNo.substr(cardNo.length-4)
							_this.bankCard.cardNo = cardNo
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash{
		background: #fff;
		min-height: 100vh;
		padding-top: 30upx;
		.nodta{
			background: #d9d9d9;
		}
		.tip{
			margin: 30upx 0 50upx 30upx;
			
			.img{
				width: 24upx;
				height: 24upx;
				position: relative;
				top: -2upx;
				margin-right: 10upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.content{
			height: 100upx;
			line-height: 100upx;
			margin: 0 30upx;
			margin-top: 30upx;
			border-bottom: 1upx solid #f5f5f5;
			.price-icon{
				position: relative;
				top: 10upx;
				font-weight: 600;
			}
			.cf{
				input{
					position: relative;
					top: 30upx;
					padding-left: 20upx;
					font-weight: 600;
					font-size: 40upx;
				}
			}
		}
		.top{
			height: 90upx;
			margin: 0 30upx;
			padding: 0 30upx;
			line-height: 90upx;
			background: #F5F5F5;
			.img{
				width: 24upx;
				height: 24upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
