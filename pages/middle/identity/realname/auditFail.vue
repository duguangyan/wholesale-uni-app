<template>
	<view class="auditFail">
		<view class="image">
			<image src="../../../../static/imgs/submit-2.png" mode=""></image>
		</view>
		<view class="title fs32 text-333">
			审核失败
		</view>
		<view class="tip fs24 text-999">
			审核提示: {{auditOpinion || '暂无数据'}}
		</view>
		
		<view class="big-btn-active" @click="goRealname">去修改</view>
	</view>
</template>

<script>
	
	import T from '@/utils/tips.js'
	export default {
		name: 'auditFail',
		data() {
			return {
				auditOpinion:''
			};
		},
		components: {
			
		},
		onLoad(options) {
			this.auditOpinion = options.auditOpinion
			
		},
		onShow() {
			
		},
		
		methods: {
			goRealname(){
				uni.redirectTo({
					url:'/pages/middle/identity/realname/agency?from=auditFail'
				})
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.auditFail{
		background: #fff;
		min-height: 100vh;
		text-align: center;
		.title{
			margin-top: 20upx;
		}
		.tip{
			margin-top: 10upx;
			margin-bottom: 50upx;
		}
		.image{
			width: 120upx;
			height: 120upx;
			margin: 0 auto;
			padding-top: 100upx;
			>image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
