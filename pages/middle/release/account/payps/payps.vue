<template>
	<view class="payps">
		<uni-list>
			<uni-list-item @click="goReset" title="重置支付密码"></uni-list-item>
			<uni-list-item @click="goRevise" title="修改支付密码"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				
			};
		},
		components: {uniIcons,uniList,uniListItem},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 去重置密码页面
			goReset(){
				
			},
			// 去修改密码页面
			goRevise(){
				
			}
			
		}
	}
</script>

<style lang="scss">

</style>
