<template>
	<view class="bankcard">
		<view class="items">
			<view class="item cf" :style="{color:item.sizColor,background:item.bgcolor}">
				<view class="left fll">
					<view class="image">
						<image :src="item.bankLogo || '/static/imgs/bank-icon.png'" mode=""></image>
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
			let item = JSON.parse(options.item)
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
			this.item = item
		},
		onShow() {
			
		},
		methods:{
			// 确定
			doConfirm(){
				uni.redirectTo({
					url:'/pages/middle/release/account/payps/resPassword?from=delBank&id='+ this.item.id
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
