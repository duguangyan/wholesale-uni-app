<template>
	<view class="category">
		<view class="seach">
			<view class="image">
				<image src="/static/img/icon-search2.png" mode=""></image>
			</view>
			<input type="text" placeholder="请输入采购的货品名称">
		</view>
		
		<view v-if="categores.length>0">
			<view class="record">
				<view class="title cf">
					<view class="fll">历史记录</view>
					<view class="flr" @click="del">
						<image src="/static/img/icon-delete.png" mode=""></image>
					</view>
				</view>
				<view class="items">
					<text class="item">烟薯</text>
				</view>
			</view>
			<view class="items">
				<view class="item">农产品 > 种苗 >红薯苗</view>
			</view>
		</view>
		
		
		<view class="nodata" v-if="categores.length<=0">
			<view class="image">
				<image src="/static/imgs/serach-1.png" mode=""></image>
			</view>
			<view class="text">
				没有搜到匹配的结果 建议换个关键词试试
			</view>
		</view>
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import Dialog from '@/components/common/Dialog.vue'
	import { supplyList } from '@/api/supply.js'
	export default {
		data() {
			return {
				title: '删全部历史记录吗？',
				isShow: false,
				categores:[]
			};
		},
		components:{Dialog},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 搜索
			doCheckSearch(){
				supplyListApp().then(res=>{
					if(res.code == '1000'){
						debugger
					}
				})
			},
			doConfirm(){
				this.isShow = false
			},
			doCancel(){
				this.isShow = false
			},
			// 删除历史记录
			del(){
				this.isShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category{
		height: 100vh;
		background: #fff;
		.nodata{
			width: 200upx;
			margin: 0 auto;
			margin-top: 300upx;
			.image{
				width: 200upx;
				height: 200upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 240upx;
				line-height: 40upx;
				margin-top: 30upx;
				font-size: 24upx;
				color: #999;
			}
		}
		.record{
			padding: 0 20upx;
			font-size: 24upx;
			color: #666666;
			margin-top: 40upx;
			.items{
				.item{
					padding: 0upx 30upx;
					height:58upx;
					line-height: 58upx;
					display: inline-block;
					text-align: center;
					font-size:24upx;
					color: #333333;
					background:rgba(244,244,244,1);
					border:1upx solid rgba(242, 242, 242, 1);
					border-radius:29upx;
				}
			}
			.title{
				height: 60upx;
				line-height: 60upx;
				.flr{
					width: 32upx;
					height: 32upx;
					position: relative;
					top: 18upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.items{
			.item{
				height: 100upx;
				line-height: 100upx;
				padding: 0 20upx;
				border-bottom: 1upx solid #f5f5f5;
				font-size: 30upx;
				color: #333;
				&:last-child{
					border-bottom: none;
				}
			}
		}
		.seach{
			width:690upx;
			height:62upx;
			background:rgba(245,245,245,1);
			border-radius:30upx;
			position: relative;
			left: 30upx;
			input{
				width: 600upx;
				height: 62upx;
				line-height: 62upx;
				font-size: 28upx;
				color: #919199;
				position: absolute;
				left: 60upx;
			}
			.image{
				width:28upx;
				height:28upx;
				position: absolute;
				top: 18upx;
				left: 20upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
</style>
