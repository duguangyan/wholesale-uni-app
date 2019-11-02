<template>
	<view class="account">
		<view class="top">
			{{totalPrice}}元
		</view>
		<view class="content">
			<uni-list>
				<uni-list-item @click="goRecord" :show-extra-icon="true"  show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="账单" badge-text="收支记录"></uni-list-item>
			</uni-list>
			<uni-list>
				<uni-list-item @click="goBankcard" :show-extra-icon="true"  show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="我的银行卡" badge-text="银行卡"></uni-list-item>
			</uni-list>
			<uni-list>
				<uni-list-item @click="goPayps" :show-extra-icon="true" :is70='is70'  show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="支付密码" badge-text="修改/设置支付密码"></uni-list-item>
			</uni-list>
		</view>
		
		<view class="btn">
			<button type="primary">提现</button>
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
				
			};
		},
		components: {uniIcons,uniList,uniListItem},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
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
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.account{
		.btn{
			margin: 0 30upx;
			margin-top: 500upx;
		}
		.top{
			height: 300upx;
			line-height: 300upx;
			background: #007AFF;
			color: #fff;
			text-align: center;
		}
	}
</style>
