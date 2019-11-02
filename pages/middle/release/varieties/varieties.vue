<template>
	<view class="varieties">
		<view class="title fs28">根据你的经营类目，只能发布红薯货品</view>
		
		<view class="items cf">
			<button class="item fs28 fll mini-btn" :class="{'active': itenIndex == index}" @click='checkIndex(index)' size="mini" v-for="(item,index) in list" :key="index">{{item}}</button>
		</view>
		
		<view class="footer cf">
			<button class="mini-btn flr" size="mini" @click="chooseVarieties">选择品种</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['红薯1','红薯红薯红薯红薯红薯红薯红薯红薯2','红薯3','红薯4','红薯5','红薯6','红薯7','红薯8'],
				itenIndex : 0
			};
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 确认选择品种
			chooseVarieties(){
				uni.setStorageSync('varieties',this.list[this.itenIndex])
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
		.footer{
			position: fixed;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			bottom: 0;
			padding-right: 60upx;
			z-index: 999999;
			button{
				background: #007AFF !important;
				color: #fff;
				position: relative;
				right: 30upx;
				top: 20upx;
			}
			background: #eee;
			
		}
		.items{
			margin-bottom: 100upx;
			margin-right: 5%;
			.item{
				min-width: 25%;
				margin-top: 20upx;
				background: #666;
				color: #fff;
				margin-left: 8%;
				text-align: center;
			}
			.active{
				background: #007AFF !important;
			}
		}
		.title{
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			
		}
	}
</style>
