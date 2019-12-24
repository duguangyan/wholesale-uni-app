<template>
	<view class="detail">
		<view class="top">
			<view><text class="fs48 text-333">
			<text v-if="type==5">-</text>
			<text v-if="type==1 || type==3 || type==6">+</text>
			{{info.amount}}</text> <text class="fs24 text-333">元</text></view>
			<view class="fs24 text-999">{{type==5?'已提现':'付款记录'}}</view>
		</view>
		<view class="items" v-if="type == 5">
			<view class="item">
				<view class="fll fs30 text-333">到账银行</view>
				<view class="flr fs30 text-999">{{info.drawInfo.name}}({{info.drawInfo.receiveAccount}})</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">提现金额</view>
				<view class="flr fs24 text-999">{{info.drawInfo.amount || ''}}</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">申请时间</view>
				<view class="flr fs24 text-999">{{info.drawInfo.createTime || ''}}</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">到账时间</view>
				<view class="flr fs24 text-999">{{info.drawInfo.successTime || ''}}</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">提现单号</view>
				<view class="flr fs24 text-999">{{info.drawInfo.thirdTradeNo || ''}}</view>
			</view>
		</view>
		<view class="items" v-if="type == 1 || type == 3 || type == 6">
			<view class="item">
				<view class="fll fs30 text-333">付款人</view>
				<view class="flr fs30 text-999">{{info.orderInfo.payPersonName || ''}}</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">订单编号</view>
				<view class="flr fs24 text-999">{{info.orderInfo.outTradeNo || ''}}</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">货品</view>
				<view class="flr fs24 text-999">{{info.orderInfo.title || ''}}</view>
			</view>
			<view class="item">
				<view class="fll fs24 text-333">结算时间</view>
				<view class="flr fs24 text-999">{{info.orderInfo.payTime || ''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { fundRecordDetail } from '@/api/payApi.js' 
	export default {
		data() {
			return {
				id:'',
				info:'',
				type:''
			};
		},
		onLoad(options) {
			this.id = options.id
			this.type = options.type
		},
		onShow() {
			// 获取详情
			this.getFundRecordDetail()
		},
		methods:{
			// 获取详情
			getFundRecordDetail(){
				let data = {
					id: this.id
				}
				fundRecordDetail(data).then(res=>{
					if(res.code == '1000') {
						this.info = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		background: #FFFFFF;
		min-height: 100vh;
		.items{
			.item{
				height: 100upx;
				line-height: 100upx;
				margin-left: 30upx;
				padding-right: 30upx;
				border-bottom: 1upx solid #f5f5f5;
			}
		}
		.top{
			text-align: center;
			height: 100upx;
			padding: 30upx 0 60upx 0;
			border-top: 1upx solid #f5f5f5;
			border-bottom: 20upx solid #F5F5F5;
		}
	}
</style>
