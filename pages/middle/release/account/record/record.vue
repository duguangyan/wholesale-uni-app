<template>
	<view class="record">
		<view @click="goDetail" v-if="records.length > 0" v-for="(item,index) in records" :key="index">
			<view class="title fs24 text-999">{{item.month}}</view>
			<view class="items">
				<view class="item cf" v-for="(it,ix) in item.list" :key="ix" @click="goDetail(it.id,it.type)">
					<view class="fll">
						<view class="fs30 text-333 ellipsis">{{it.remark}}</view>
						<view class="tip fs20 text-999">{{it.createTime}}</view>
					</view>
					<view class="flr fs30 text-333">
						<text v-if="it.type==5">-</text>
						<text v-if="it.type==6">+</text>
						{{it.amount}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="records<=0" class="nodata">
			<view class="image"><image src="../../../../../static/imgs/records-icon.png" mode=""></image></view>
			<view class="text">还没有你的账单记录</view>
		</view>
	</view>
</template>

<script>
	import { fundRecordList } from '@/api/payApi.js'
	export default {
		data() {
			return {
				is50: true,
				pageIndex:1,
				records:[]
			};
		},
		components: {},
		onLoad() {
			
		},
		onShow() {
			//  获取账单列表
			this.getFundRecordList()
		},
		methods:{
			//  获取账单列表
			getFundRecordList(){
				let data = {
					pageIndex: this.pageIndex
				}
				fundRecordList(data).then(res=>{
					if(res.code == '1000') {
						this.records = res.data
					}
				})
			},
			// 去订单详情
			goDetail(id,type){
				uni.navigateTo({
					url:'/pages/middle/release/account/record/detail?id='+ id +'&type=' + type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record{
		background: #FFFFFF;
		min-height: 100vh;
		.ellipsis{
			width: 600upx;
			height: 30upx;
			line-height: 30upx;
		}
		.nodata{
			.image{
				width: 200upx;
				height: 200upx;
				margin: 0 auto;
				padding-top: 300upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				font-size: 20upx;
				color: 999;
				margin-top: 30upx;
				text-align: center;
			}
		}
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
