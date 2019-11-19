<template>
	<view class="bankcard">
		<view class="items">
			<view class="item cf" v-for="(item,index) in records" :key="index">
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
			<view class="big-btn-active" @click="addBankcard">+添加银行卡</view>
		</view>
		
	</view>
</template>

<script>
	import { getBankList } from '@/api/payApi.js'
	export default {
		data() {
			return {
				pageIndex:1,
				records:[]
			};
		},
		onReachBottom(){
			this.pageIndex++
			this.getBankList()
		},
		onShow() {
			// 获取银行卡信息
			this.records = []
			this.pageIndex = 1
			this.getBankList()
		},
		methods:{
			addBankcard(){
				uni.redirectTo({
					url:'/pages/middle/release/account/bankcard/add'
				})
			},
			// 获取银行卡信息
			getBankList(){
				let data = {
					pageIndex:this.pageIndex
				}
				getBankList(data).then(res=>{
					if(res.code == '1000'){
						let list = res.data.records
						list.forEach(item=>{
							// 1-借记卡 2-贷记合一 3-贷记卡
							if(item.cardType == 1){
								item.cardName = '借记卡'
							}else if(item.cardType == 2){
								item.cardName = '贷记合一'
							} else if(item.cardType == 3){
								item.cardName = '贷记卡'
							}
							item.cardNo = "**** **** " + item.cardNo.substr(-4)
						})
						
						this.records = this.records.concat(list)
					}
				})
			},
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
