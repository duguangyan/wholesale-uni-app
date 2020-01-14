<template>
	<view class="city">
		<view class="current cf">
			<view class="fll image">
				<image src="/static/imgs/city-icon.png" mode=""></image>
			</view>
			<view class="fll" @click="getCurrentCity">
				当前:{{currentCity}}
			</view>
		</view>
		
		<view class="warp cf">
			<view class="left fll">
				<view class="item ellipsis" :class="{'active':provincesIndex == index}" v-for="(item,index) in provinces" :key="index" @click="getCitys(index,item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="right fll cf">
				<view class="item ellipsis fll" :class="{'active':citysIndex == index}" v-for="(item,index) in citys" :key="index" @click="checkCity(item)">
					{{item.name}}
				</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	import { getChildrenByPId } from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				provinces:[],
				citys:[],
				provincesIndex: 0,
				citysIndex: 0,
				currentCity:'获取当前城市'
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getAddressArr(0)
			// 获取首页获取的地址
			let userLocation = uni.getStorageSync('userLocation')
			if(userLocation){
				this.currentCity = JSON.parse(userLocation).address.city
			}
		},
		methods:{
			// 选择城市
			checkCity(item){
				let nearbyAddress = []
				nearbyAddress[0] = this.provinces[this.provincesIndex].name
				nearbyAddress[1] = item.name
				uni.setStorageSync('nearbyAddress',nearbyAddress)
				uni.navigateBack({
					delta:1
				})
			},
			// 获取当前城市
			getCurrentCity(){
				if(this.currentCity == '获取当前城市'){
					uni.getLocation({
					    type: 'wgs84',
						geocode: true,
					    success: function (res) {
							console.log('userLocation',res)
							uni.setStorageSync('userLocation', JSON.stringify(res))
							this.currentCity = res.address.city
					    }
					});
				}
			},
			// 获取城市
			getCitys(index,id){
				this.provincesIndex = index
				let data = {
					parentId: id,
					isLoading:1
				}
				getChildrenByPId(data).then(res=>{
					console.log(res);
					if(res.code == '1000'){
						this.citys = res.data
						this.citysIndex = 0
					}else{
						T.tips(res.message || '获取城市失败')
					}
				})
			},
			// 根据ID获取地址
			getAddressArr(id) {
				let data = {
					parentId: id,
					isLoading:1
				}
				// 获取省份
				getChildrenByPId(data).then(res=>{
					console.log(res);
					if(res.code == '1000'){
						this.provinces = res.data
						// 获取城市
						let data = {
							parentId: this.provinces[0].id,
							isLoading:1
						}
						getChildrenByPId(data).then(res=>{
							console.log(res);
							if(res.code == '1000'){
								this.citys = res.data
							}else{
								T.tips(res.message || '获取城市失败')
							}
						})
					}else{
						T.tips(res.message || '获取省份失败')
					}
				})
			}
				
		}
	}
</script>

<style lang="scss" scoped>
	.city{
		
		.warp{
			padding: 0 20upx;
			height: 1100upx;
			overflow:hidden;
			
			.right{
				width: 500upx;
				height: 100%;
				overflow-y: auto;
				.item{
					padding: 0 4upx;
					width:100upx;
					height:50upx;
					line-height: 50upx;
					background:#F5F5F5;
					border:1px solid #F5F5F5;
					border-radius:3upx;
					margin: 20upx 0upx 10upx 20upx;
					text-align: center;
					font-size: 24upx;
					color: #999;
				}
				.active{
					background: #FE3B0B;
					color: #FFFFFF;
				}
			}
			.left{
				height: 100%;
				overflow-y: auto;
				border-right: 1upx solid #F0F0F0;
				.active{
					color: #FE3B0B;
					font-weight: 600;
				}
				.item{
					width: 180upx;
					padding-right: 20upx;
					height: 80upx;
					line-height: 80upx;
					text-align: center;
				}
			}
		}
		.current{
			height: 100upx;
			line-height: 100upx;
			background: #f0f0f0;
			padding: 0 20upx;
			color: #333;
			.image{
				width: 18upx;
				height: 24upx;
				position: relative;
				top: 40upx;
				margin-right: 20upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
