<template>
	<view class="bankcard">
		<view class="tips" @click="toDetail()" v-if="roleId == '20004' && status == 0">您的账户认证中， <text class="text-theme">查看进度</text></view>
		<view class="tips" @click="toDetail()" v-if="roleId == '20004' && status == 2">您的账户认证失败， <text class="text-theme">查看进度</text></view>
		
		<view class="items">
			<view class="item cf" :style="{color:item.sizColor || '',background:item.bgcolor || ''}" v-for="(item,index) in records" :key="index" @click="goDel(item)">
				<view class="left fll">
					<view class="image">
						<image :src="item.bankLogo || '/static/imgs/bank-icon.png'" mode="aspectFit"></image>
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
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				pageIndex:1,
				records:[],
				record:'',
				status:'',
				roleId:''
			};
		},
		onLoad() {
			
		},
		onShow() {
			// 用户类型
			this.roleId = uni.getStorageSync('roleId')
			// 获取银行卡信息
			this.records = []
			this.pageIndex = 1
			this.getBankLists()
		},
		methods:{
			// 查看进度
			toDetail(){
				if(this.record){
					let item = this.record;
					uni.navigateTo({
						url:'/pages/middle/release/account/bankcard/add?from=toDetail&item='+ JSON.stringify(item)
					})
				}
			},
			//删除银行卡
			goDel(item){
				if(this.status == 0 || this.status == 2){
					T.tips('您的账户认证中')
				}else{
					uni.navigateTo({
						url:'/pages/middle/release/account/bankcard/del?item='+ JSON.stringify(item) 
					})
				}
				
			},
			// 添加银行卡
			addBankcard(){
				if(this.roleId == '20004' && this.records.length > 0){
					T.tips('你已绑定银行卡，如有更换请先解绑')
				}else{
					uni.navigateTo({
						url:'/pages/middle/release/account/payps/resPassword?from=addBank'
					})
				}
				
			},
			// 获取银行卡信息
			getBankLists(){
				let data = {
					pageIndex:this.pageIndex
				}
				getBankList(data).then(res=>{
					if(res.code == '1000'){
						// 0 认证中 1认证通过 2不通过 
						let list = res.data
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
							
							
							// 国家开发银行#ed1c24
							// 中国工商银行#c7000b
							// 中国农业银行#319c8b
							// 中国银行#a71e32
							// 中国建设银行#0066b3
							// 中国邮政储蓄银行#00754b
							// 交通银行#00367a
							// 招商银行#b1120d
							// 上海浦东发展银行#000073
							// 兴业银行#0080d8
							// 华夏银行#d80b18
							// 中信银行#d70010
							// 中国民生银行#0072bc
							// 中国光大银行#6a1685
							// 平安银行#ff6600
							
							let banks = [
								{
									name:'国家开发银行',
									bgcolor:'#ed1c24',
									sizColor:'#fff'
								},
								{
									name:'中国工商银行',
									bgcolor:'#c7000b',
									sizColor:'#fff'
								},
								{
									name:'中国农业银行',
									bgcolor:'#319c8b',
									sizColor:'#fff'
								},
								{
									name:'中国银行',
									bgcolor:'#a71e32',
									sizColor:'#fff'
								},
								{
									name:'中国建设银行',
									bgcolor:'#0066b3',
									sizColor:'#fff'
								},
								{
									name:'中国邮政储蓄银行',
									bgcolor:'#00754b',
									sizColor:'#fff'
								},
								{
									name:'交通银行',
									bgcolor:'#00367a',
									sizColor:'#fff'
								},
								{
									name:'招商银行',
									bgcolor:'#b1120d',
									sizColor:'#fff'
								},
								{
									name:'上海浦东发展银行',
									bgcolor:'#000073',
									sizColor:'#fff'
								},
								{
									name:'兴业银行',
									bgcolor:'#0080d8',
									sizColor:'#fff'
								},
								{
									name:'华夏银行',
									bgcolor:'#d80b18',
									sizColor:'#fff'
								},
								{
									name:'中信银行',
									bgcolor:'#d70010',
									sizColor:'#fff'
								},
								{
									name:'中国民生银行',
									bgcolor:'#0072bc',
									sizColor:'#fff'
								},
								{
									name:'中国光大银行',
									bgcolor:'#6a1685',
									sizColor:'#fff'
								},
								{
									name:'平安银行',
									bgcolor:'#ff6600',
									sizColor:'#fff'
								}
							]
							
							banks.forEach((it,ix)=>{
								if(item.bankName.indexOf(it.name) > -1){
									item.bgcolor = it.bgcolor
									item.sizColor = it.sizColor
								}
							})
							
						})
						this.records = this.records.concat(list)
						if(this.records.length>0) {
							this.record = this.records[0]
							this.status = this.record.status
						}
						
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bankcard{
		min-height: 100vh;
		.height200{
			height: 200upx;
		}
		.tips{
			height: 60upx;
			line-height: 60upx;
			padding: 0 40upx;
			background: #fff;
			font-size: 24upx;
		}
		.footer{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
			z-index: 99999;
			margin-left: 30upx 0 30upx 55upx;
		}
		.items{
			
			margin-top: 20upx;
			.item{
				background:#fff;
				border-radius:10upx;
				margin: 10upx 30upx;
				height: 180upx;
				color: #333;
				.left{
					width: 20%;
					.image{
						width: 80upx;
						height: 80upx;
						position: relative;
						background: #f5f5f5;
						border-radius: 50%;
						top: 30upx;
						left: 50upx;
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

