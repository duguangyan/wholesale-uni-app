<template>
	<view class="classify">
		<view class="left fll">
			<view class="items">
				<view class="item" @click="checkClassfiy(index)" :class="{active: checkIndex == index}" v-for="(item,index) in left" :key="index">{{item.name}}</view>
			</view>
		</view>
		<scroll-view class="content fll" scroll-y :style="'height:'+scrollHeight+'px'" :scroll-with-animation="true" :scroll-into-view='intoView'>
			<view class="items cf" v-if="checkIndex == 0">
				<view @click="goSeach(item)" class="item fll"  v-for="(item,index) in left[0].categories" :key="index">{{item.name}}</view>
			</view>
			
			<view class="items cf" :id="item.type || ''" v-if="checkIndex !=0 && item" v-for="(item,index) in content" :key="index">
				
				<view class="tips fll">{{item.type || ''}}</view>
				<view class="item fll" v-for="(it,ix) in item.list" :key="ix" @click="goSeach(it)">{{it.name}}</view>
				
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
	import { mainSelectCategory } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				categoryId:0,
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
			// 获取系统信息
			let systemInfo    = uni.getSystemInfoSync();
			this.scrollHeight = systemInfo.windowHeight;
			
			// 获取查询分类
			this.getMainSelectCategory()
		},
		methods:{
			// 分类查询
			getMainSelectCategory(){
				let data = {
					categoryId: 0
				}
				mainSelectCategory(data).then(res=>{
					if(res.code == '1000'){
						this.left = res.data
						this.left.forEach(item=>{
							if(item.name.length>4){
								item.name = item.name.substr(0,2) + '...' + item.name.substr(item.name.length-2,2)
							}
						})
					}
					
				})
			},
			// 去搜索页面
			goSeach(item){
				uni.navigateTo({
					url:'/pages/order/goodsList/goodsList?categoryId='+item.id + '&level=' + item.level
				})
			},
			// 选择分类
			checkClassfiy(index){
				this.checkIndex = index
				this.categoryId = this.left[index].categoryId
				let data = {
					categoryId: this.categoryId
				}
				this.content = []
				mainSelectCategory(data).then(res=>{
					if(res.code == '1000'){
						if(res.data && res.data.length>0){
							let content = res.data[0].categories
								this.right.forEach((item,index)=>{
									let obj = {}
									content.forEach((it,ix)=>{
										// 超出4个字 中间...
										if(it.name.length>4){
											it.name = it.name.substr(0,2) + '...' + it.name.substr(it.name.length-2,2)
										}
										// 组装数据
										let initials = it.initials || 'A'
										if(item == initials.toUpperCase()){
											if(obj.type == initials.toUpperCase()){
												obj.list.push(it)
											}else{
												obj.type = initials.toUpperCase()
												obj.list = []
												obj.list.push(it)
											}
										}
									})
									if(obj.type){
										this.content.push(obj)
									}
									
								})
								console.log('content',this.content)
						}
					}
				})
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
			overflow: auto;
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
