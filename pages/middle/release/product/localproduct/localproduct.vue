<template>
	<view class="localproduct">
		<!-- <view v-for="(item,index) in items" :key="index">
			<Goodx :item="item"></Goodx>
		</view> -->
		<Goodx :item="item"></Goodx>
		<view class="nodata" v-if="false">
			<view class="image">
				<image src="../../../../../static/imgs/localproduct.png" mode=""></image>
			</view>
			<view class="fs24 text-999">还没有货品</view>
		</view>
	</view>
</template>

<script>
	import Goodx from '@/components/common/Goodx.vue'
	export default {
		data() {
			return {
				items:[
					
				],
				item:'',
				roleId:'',
				index: 0
			};
		},
		components:{Goodx},
		onLoad(options) {
			if(options.index) this.index = options.index
		},
		onShow() {
			this.roleId = uni.getStorageSync('roleId')
			if(this.roleId == '20001'){
				uni.setNavigationBarTitle({
				    title: '我的货品'
				});
			}else if(this.roleId == '20002'){
				if(this.index == 0) {
					uni.setNavigationBarTitle({
					    title: '新发布'
					});
				}else{
					uni.setNavigationBarTitle({
					    title: '本地货品'
					});
				}
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.localproduct{
		min-height: 100vh;
		background: #fff;
		.nodata{
			text-align: center;
			.image{
				width: 200upx;
				height: 200upx;
				margin: 0 auto;
				padding-top: 300upx;
				padding-bottom: 20upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
