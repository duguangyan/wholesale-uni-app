<template>
	<view class="account">
		<view class="top">
			<view> <text class="fs48">{{totalPrice}}</text> <text class="fs24">元</text></view>
			<view class="fs24">我的金额</view>
		</view>
		<view class="content">
			
			<view class="item cf" v-for="(item,index) in icons" :key="index" @click="doClick(index)">
				<view class="left fll"><image :src="item.url" mode=""></image></view>
				<view class="fll">{{item.title}}</view>
				<view class="right flr"><image src="../../../../static/imgs/right.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				totalPrice: '158.85',
				is70: true,
				icons:[
					{
						title:'账单',
						url:'../../../../static/imgs/icon-1011.png'
					},
					{
						title:'我的银行卡',
						url:'../../../../static/imgs/icon-1012.png'
					},
					{
						title:'支付密码',
						url:'../../../../static/imgs/icon-1013.png'
					},
					{
						title:'提现',
						url:'../../../../static/imgs/icon-1014.png'
					}
				]
			};
		},
		components: {uniIcons,uniList,uniListItem},
		onLoad() {
			// 设置头部样式
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:"#FE3B0B"
			})
		},
		onShow() {
			
		},
		methods:{
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
				uni.navigateTo({
					url:'/pages/middle/release/account/bankcard/bankcard'
				})
			},
			// 去支付密码页面
			goPayps(){
				uni.navigateTo({
					url:'/pages/middle/release/account/payps/payps'
				})
			},
			// 提现
			goCash(){
				uni.navigateTo({
					url:'/pages/middle/release/account/cash/cash'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.account{
		background: #fff;
		.content{
			.item{
				height: 100upx;
				line-height: 100upx;
				font-size: 30upx;
				color: #333;
				margin-left: 30upx;
				border-bottom: 1upx solid #f5f5f5;
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
		.btn{
			margin: 0 30upx;
			margin-top: 500upx;
		}
		.top{
			height: 150upx;
			background: #FE3B0B;
			color: #fff;
			text-align: center;
			padding: 80upx 0 30upx 0;
		}
	}
</style>
