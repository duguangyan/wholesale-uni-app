<template>
	<view class="classify">
		<view class="left fll">
			<view class="items">
				<view class="item" @click="checkClassfiy(index)" :class="{active: checkIndex == index}" v-for="(item,index) in left" :key="index">{{item}}</view>
			</view>
		</view>
		<scroll-view class="content fll" scroll-y :style="'height:'+scrollHeight+'px'" :scroll-with-animation="true" :scroll-into-view='intoView'>
			<view class="all"><view>全部</view></view>
			<view class="items cf" id="A">
				<view class="tips fll">A</view>
				<view @click="goSeach(item)" class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
			<view class="items cf">
				<view class="tips fll">B</view>
				<view class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
			<view class="items cf">
				<view class="tips fll">C</view>
				<view class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
			<view class="items cf">
				<view class="tips fll">D</view>
				<view class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
			<view class="items cf">
				<view class="tips fll">E</view>
				<view class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
			<view class="items cf">
				<view class="tips fll">F</view>
				<view class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
			<view class="items cf" id="G">
				<view class="tips fll">G</view>
				<view class="item fll" v-for="(item,index) in content" :key="index">{{item}}</view>
			</view>
		</scroll-view>
		<view class="right flr">
			<view class="item" v-for="(item,index) in right" :key="index" @click="checkPoint(item)">
				{{item}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkIndex:0,
				intoView:'A',
				scrollHeight:'',
				left:['热门推荐','蔬菜','水产'],
				content:['红薯','红薯','红薯','红薯','红薯','红薯'],
				right:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
			};
		},
		onLoad() {
			
		},
		onShow() {
			let systemInfo = uni.getSystemInfoSync();
			this.scrollHeight = systemInfo.windowHeight;
		},
		methods:{
			// 去搜索页面
			goSeach(item){
				uni.navigateTo({
					url:'/pages/order/goodsList/goodsList?keywords='+item
				})
			},
			// 选择分类
			checkClassfiy(index){
				this.checkIndex = index
			},
			// 点击锚点
			checkPoint(item){
				console.log(item)
				this.intoView = item
			}
		}
	}
</script>

<style lang="scss">
	.classify{
		background: #fff;
		height: 100vh;
		border-top: 1upx solid #E6E6E6;
		.left{
			width: 180upx;
			height: 100%;
			background: #F5F5F5;
			.items{
				
				.item{
					font-size: 28upx;
					color: #333;
					text-align: center;
					height: 90upx;
					line-height: 90upx;
					position: relative;
				}
				.active{
					background: #fff !important;
					color: #FE3B0B !important;
				}
				.active:after{
					content: " ";
					width: 8upx;
					height: 40upx;
					display: block;
					background: #FE3B0B;
					position: absolute;
					left: 0;
					top: 25upx;
				}
			}
			
		}
		.content{
			width: 520upx;
			font-size: 30upx;
			color: #666;
			.tips,.all{
				width: 520upx;
				height: 70upx;
				line-height: 70upx;
				font-size: 28upx;
				color: #333;
				margin: 20upx  0 0 20upx;
			}
			.all{
				view{
					width: 150upx;
					height: 70upx;
					line-height: 70upx;
					text-align: center;
					border: 1upx solid #E6E6E6;
				}
			}
			.items{
				.item{
					width: 150upx;
					height: 70upx;
					line-height: 70upx;
					text-align: center;
					border: 1upx solid #E6E6E6;
					margin: 20upx 0 20upx 20upx;
				}
			}
		}
		.right{
			position: relative;
			top: 120upx;
			.item{
				font-size: 20upx;
				color: #333;
				width: 40upx;
				text-align: center;
				height: 34upx;
				line-height: 34upx;
			}
			
		}
	}
</style>
