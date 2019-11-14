<template>
	<view class="record">
		<view @click="goDetail">
			<view class="title fs24 text-999">2019年9月</view>
			<view class="items">
				<view class="item cf">
					<view class="fll">
						<view class="fs30 text-333">农百集付款</view>
						<view class="tip fs20 text-999">2019-12-20 10:15</view>
					</view>
					<view class="flr fs30 text-333">
						+5000.00
					</view>
				</view>
			</view>
		</view>
		
		<view @click="goDetail">
			<view class="title fs24 text-999">2019年9月</view>
			<view class="items">
				<view class="item cf">
					<view class="fll">
						<view class="fs30 text-333">农百集付款</view>
						<view class="tip fs20 text-999">2019-12-20 10:15</view>
					</view>
					<view class="flr fs30 text-333">
						+5000.00
					</view>
				</view>
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
				is50: true
			};
		},
		components: {uniIcons,uniList,uniListItem},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 去订单详情
			goDetail(){
				uni.navigateTo({
					url:'/pages/middle/release/account/record/detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record{
		background: #FFFFFF;
		min-height: 100vh;
		.item{
			height: 100upx;
			line-height: 100upx;
			padding:0 30upx 0 0;
			margin-left: 30upx;
			border-bottom: 1upx solid #f5f5f5;
			.fll{
				line-height: 30upx;
				position: relative;
				top: 24upx;
			}
		}
		.title{
			height: 80upx;
			line-height: 80upx;
			background: #F5F5F5;
			padding-left: 30upx;
		}
	}
</style>
