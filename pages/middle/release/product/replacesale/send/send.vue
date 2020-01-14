<template>
	<view class="send">
		<view class="tip cf" v-if="isTip" @click="hideTip"><text class="fll">注：只有平台注册的代办和货主才有资格发布哦</text>  <text class="flr">x</text></view>
		<view class="title">
			我有货,找市场代卖
		</view>
		<view class="items">
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>货品名称</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>货品品种</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>产地</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>供货能力</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
			<view class="item cf fs24">
				<view class="fll"><text class="text-theme">*</text>规格描述</view>
				<view class="fll text-999 mgl-30">请选择</view>
			</view>
		</view>
		<view class="desc">
			<view>货品描述</view>
			<view class="imgs">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isTip: true
			};
		},
		methods:{
			hideTip(){
				this.isTip = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send{
		.items{
			padding: 0 20upx;
			.item{
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1upx solid #F0F0F0;
			}
		}
		.title{
			padding: 10upx 20upx;
			font-size: 34upx;
			color: #FE3B0B;
			font-weight: 600;
		}
		.tip{
			padding: 0 20upx;
			height:60upx;
			line-height: 60upx;
			background:rgba(255,239,235,1);
			font-size: 20upx;
			color: #FE3B0B;
		}
	}
</style>
