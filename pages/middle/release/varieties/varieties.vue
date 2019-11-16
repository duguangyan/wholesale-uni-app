<template>
	<view class="varieties">
		<view class="title fs24 text-999">根据你的经营类目，只能发布红薯货品</view>
		
		<view class="items cf">
			
			<view class="item fs28 fll mini-btn" :class="{'active': itenIndex == index}" @click='checkIndex(index)' v-for="(item,index) in list" :key="index">
				<view>{{item.name}}</view>
				<view class="act" v-if="itenIndex == index"><image src="../../../../static/imgs/icon-1039.png" mode=""></image></view>
			</view>
		</view>
		<view class="big-btn-active" @click="chooseVarieties">确定</view>
	</view>
</template>

<script>
	import { selectCategoryTreeNode } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				list:[],
				itenIndex : 0
			};
		},
		onLoad() {
			
		},
		onShow() {
			// 获取商品分类数据
			this.getCateNode()
		},
		methods:{
			// 获取商品分类数据
			getCateNode(){
				selectCategoryTreeNode().then(res => {
					if(res.code == '1000'){
						this.list = res.data
						
						// 有缓存获取缓存
						let varieties = uni.getStorageSync('varieties')
						if(varieties){
							this.list.forEach((item,index)=>{
								if(item.id == JSON.parse(varieties).id){
									this.itenIndex = index
								}
							})
						}
						
					}else{
						T.tips(res.message || '获取品种信息失败')
					}
				})
			},
			// 确认选择品种
			chooseVarieties(){
				
				uni.setStorageSync('varieties', JSON.stringify(this.list[this.itenIndex]))
				uni.navigateBack({
					delta:1
				})
			},
			// 选择品种
			checkIndex(index){
				this.itenIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.varieties{
		background: #fff;
		min-height: 100vh;
		.big-btn-active{
			position: fixed;
			bottom: 30upx;
			left: 55upx;
		}
		padding-bottom: 120upx;
		.items{
			margin: 0 30upx;
			margin-top: 30upx;
			position: relative;
			width: 740upx;
			.item{
				width: 200upx;
				height: 70upx;
				line-height: 70upx;
				margin-top: 20upx;
				border:1upx solid rgba(230,230,230,1);
				border-radius:5upx;
				font-size: 24upx;
				color: #666;
				text-align: center;
				margin-right: 40upx;
				border-radius:5upx;
				position: relative;
				.act{
					width: 27upx;
					height: 27upx;
					position: absolute;
					right: 0;
					bottom: 19upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.active{
				border:1upx solid #FE3B0B !important;
				color: #FE3B0B;
			}
		}
		.title{
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			background: #F5F5F5;
		}
	}
</style>
