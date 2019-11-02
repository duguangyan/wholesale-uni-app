<template>
	<view class="record">
		<view class="title">2019年9月</view>
		<view class="items">
			<view class="item">
				<uni-list>
				    <uni-list-item title="张三付款" note="2019-0--25 12:14:11" :is50='is50' :show-badge="true" badge-text="+5050.05"></uni-list-item>
				    <uni-list-item title="张三付款" note="2019-0--25 12:14:11" :is50='is50' :show-badge="true" badge-text="+5050.05"></uni-list-item>
				    <uni-list-item title="张三付款" note="2019-0--25 12:14:11" :is50='is50' :show-badge="true" badge-text="+5050.05"></uni-list-item>
				    <uni-list-item title="张三付款" note="2019-0--25 12:14:11" :is50='is50' :show-badge="true" badge-text="+5050.05"></uni-list-item>
				    <uni-list-item title="张三付款" note="2019-0--25 12:14:11" :is50='is50' :show-badge="true" badge-text="+5050.05"></uni-list-item>
				    <uni-list-item title="张三付款" note="2019-0--25 12:14:11" :is50='is50' :show-badge="true" badge-text="+5050.05"></uni-list-item>
				</uni-list>
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
			
		}
	}
</script>

<style lang="scss" scoped>
	.record{
		.title{
			height: 100upx;
			line-height: 100upx;
			margin-left: 30upx;
		}
	}
</style>
