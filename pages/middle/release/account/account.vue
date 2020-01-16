<template>
	<view class="account">
		<view class="top">
			<view> <text class="fs48">{{totalPrice}}</text> <text class="fs24">元</text></view>
			<view class="fs24">我的金额</view>
		</view>
		<view class="content">
			
			<view class="item cf" v-for="(item,index) in icons" :key="index" @click="doClick(index)">
				<view class="left fll"><image class="mt30" :src="item.url" mode=""></image></view>
				<view class="fll">{{item.title}}</view>
				<view class="right flr"><image class="mt36" src="/static/imgs/right.png"></image></view>
			</view>
		</view>
    
    <div class="btn" @click="goCash">提现</div>
		<Dialog :title='title' :confirmText='confirmText' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import { accountSub, getBankList } from '@/api/payApi.js' 
	import Dialog from '@/components/common/Dialog.vue'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				roleId:'',
				accountSubDates:'',
				availableBalance:'',
				freezeBalance:'',
				confirmText:'添加银行卡',
				title:'使用提现功能需要绑定一张支持提现的储蓄卡',
				isShow:false,
				setPayPwd:'',
				bankCardNum:'',
				totalPrice: '0.00',
				is70: true,
				icons:[
					{
						title:'账单',
						url:'/static/imgs/icon-1011.png'
					},
					{
						title:'我的银行卡',
						url:'/static/imgs/icon-1012.png'
					},
					{
						title:'支付密码',
						url:'/static/imgs/icon-1013.png'
					},
					// {
					// 	title:'提现',
					// 	url:'/static/imgs/icon-1014.png'
					// }
				]
			};
		},
		components: {uniIcons,uniList,uniListItem,Dialog},
		onLoad() {
			// 设置头部样式
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:"#FE3B0B"
			})
		},
		onShow() {
			// 获取资金账户
			this.getAccountSub()
			this.roleId = uni.getStorageSync('roleId')
		},
		methods:{
			// 获取资金账户
			getAccountSub(){
				accountSub().then(res=>{
					if(res.code == '1000'){
						this.totalPrice       = res.data.balance
						this.bankCardNum      = res.data.bankCardNum
						this.setPayPwd        = res.data.setPayPwd
						this.accountSubDates  = res.data
					}
				})
			},
			// 点击事件
			doClick(index){
				switch (index){
					case 0:
					this.goRecord()
						break;
					case 1:
					this.goBankcard()
						break;
					case 2:
					this.goPayps()
						break;
					case 3:
					this.goCash()
						break;
					default:
						break;
				}
			},
			// 去账单记录
			goRecord(){
				uni.navigateTo({
					url:'/pages/middle/release/account/record/record'
				})
			},
			// 去银行卡页面
			goBankcard(){
				
				if(!this.setPayPwd){
					uni.navigateTo({
						url:'/pages/middle/release/account/payps/verifiyPhone'
					})
				}else{
					if(this.roleId == '20004'){ // 企业
						let data = {
							pageIndex:1 
						}
						if(this.bankCardNum == 0) {
							uni.navigateTo({
								url:'/pages/middle/release/account/bankcard/bankcard'
							})
						}else{
							getBankList(data).then(res=>{
								if(res.code == '1000'){
									if(res.data[0].status == 3){ // 打款完成
										uni.navigateTo({
											url:'/pages/middle/release/account/bankcard/paid?item='+ JSON.stringify(res.data[0])
										})
									}else{ // 审核 1完成 2失败  0中
										uni.navigateTo({
											url:'/pages/middle/release/account/bankcard/bankcard'
										})
									}
								}
							})
						}
						
					}else{ // 个人
						uni.navigateTo({
							url:'/pages/middle/release/account/bankcard/bankcard'
						})
					}
					
					
					
					
				}
				
			},
			// 去支付密码页面
			goPayps(){
				if(!this.setPayPwd){
					uni.navigateTo({
						url:'/pages/middle/release/account/payps/verifiyPhone?from=bank'
					})
				}else{
					uni.navigateTo({
						url:'/pages/middle/release/account/payps/payps'
					})
				}
				
			},
			// 点击确定
			doConfirm(){
				this.isShow = false
				// uni.navigateTo({
				// 	url:'/pages/middle/release/account/bankcard/add'
				// })
				uni.navigateTo({
					url:'/pages/middle/release/account/payps/resPassword?from=addBank'
				})
			},
			// 点击取消
			doCancel(){
				this.isShow = false
			},
			// 提现
			goCash(){
				if(this.totalPrice <= 0){
					T.tips('我的金额（可提现金额）必须大于零')
					return false
				}
				if(this.setPayPwd && this.bankCardNum>0){
					uni.navigateTo({
						url:'/pages/middle/release/account/cash/cash?accountSubDates=' + JSON.stringify(this.accountSubDates)
					})
				}else{
					if(!this.setPayPwd){
						uni.navigateTo({
							url:'/pages/middle/release/account/payps/verifiyPhone'
						})
					}else{
						if(this.bankCardNum<=0){
							this.isShow = true
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account{
		
    padding-bottom: 20upx;
		.content{
      background: #fff;
			.item{
				height: 100upx;
				line-height: 100upx;
				font-size: 30upx;
				color: #333;
				margin-left: 30upx;
				border-bottom: 1upx solid #f5f5f5;
        .mt30{
          margin-top: 30upx;
        }
        .mt36{
          margin-top: 40upx;
        }
				.left{
					width: 34upx;
					height: 34upx;
					position: relative;
					margin-right: 20upx;
					top: 2px;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.right{
					width: 24upx;
					height: 24upx;
					margin-right: 30upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.btn {
			width: 640upx;
			line-height: 80upx;
			text-align: center;
			color: #fff;
			background-color: #FE3B0B;
			border-radius: 40upx;
			margin: 40upx auto 30upx auto;
		
			&.actived {
				background-color: #FE3B0B;
			}
		}
		.top{
			height: 136upx;
			background: #FE3B0B;
			color: #fff;
			text-align: center;
			padding: 80upx 0 30upx 0;
		}
	}
</style>
