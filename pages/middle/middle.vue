<template>
	<view class="middle">
		<!-- 代办 -->
		<view v-if="status==0">
			<shipper></shipper>
		</view>
		<!-- 货主 -->
		<view v-if="status==1">
			<agency></agency>
		</view>
		<!-- 买家 -->
		<view v-if="status==2">
			<buyer></buyer>
		</view>
	</view>
</template>

<script>
	import agency from '@/components/middle/agency.vue'
	import buyer from '@/components/middle/buyer.vue'
	import shipper from '@/components/middle/shipper.vue'
	export default {
		data() {
			return {
				status: 1, // 登录用户状态
			};
		},
		components: {agency,buyer,shipper},
		onLoad(options) {
			if(options.status) this.status = options.status
		},
		onShow() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.middle{
		
	}
</style>
