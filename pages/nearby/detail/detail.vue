<template>
	<view class="detail">
		<NavigationBar :title="title" :isArrow="isArrow" :isClick="isClick" :clickTitle="clickTitle" @doClick="doNavBarClick"></NavigationBar>
		<view class="items">
			<view class="item cf">
				<view class="fll image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
				<view class="fll text">于是乎</view>
			</view>
			<view class="item cf">
				<view class="fll image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
				<view class="fll text">于是乎</view>
			</view>
			<view class="item cf">
				<view class="fll image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
				<view class="fll text">于是乎</view>
			</view>
			<view class="item cf">
				<view class="fll image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
				<view class="fll text">于是乎</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavigationBar from '@/components/common/NavigationBar.vue'
	export default {
		data() {
			return {
				title: '货主',
				isClick: true,
				clickTitle: '广州市',
				isArrow: true,
			};
		},
		components:{
			NavigationBar
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			doNavBarClick(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		.items{
			
			.item{
				height:140upx;
				line-height: 140upx;
				background:rgba(255,255,255,1);
				padding: 0 20upx;
				border-bottom: 1upx solid #f5f5f5;
				.text{
					font-size: 30upx;
					margin-left: 10upx;
				}
				.image{
					width:90upx;
					height:90upx;
					background:rgba(245,245,245,1);
					border-radius:50%;
					position: relative;
					top: 30upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
