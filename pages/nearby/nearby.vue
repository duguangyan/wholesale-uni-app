<template>
	<view class="nearby">
		<NavigationBar :title="title" :isArrow="isArrow" :isClick="isClick" :clickTitle="clickTitle" @doClick="doNavBarClick"></NavigationBar>
		
		<view class="items">
			<view class="title cf fs28 text-333" @click="goNearbyDetail(index)">
				<view class="fll">本地货主</view>
				<view class="flr arrow-right"></view>
			</view>
			<view class="item cf">
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
				<view class="li fll">
					<view class="image"><image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image></view>
					<view class="text ellipsis">北京北京北京北京北京</view>
				</view>
			</view>
		</view>
		<mpvue-city-picker :hasArea="hasArea" :themeColor="themeColor" ref="mpvueCityPicker" :isFullAddress='isFullAddress' :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import NavigationBar from '@/components/common/NavigationBar.vue'
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				title: '附近的人',
				isClick: true,
				clickTitle: '广州市',
				isArrow: true,
				themeColor: '#007AFF',
				hasArea:false,
				isFullAddress: false,
				cityPickerValueDefault: [0, 0, 1],
				list:[
					{
						tit:'本地货主',
						items:[
							{
								t:'北京北京北京北京',
								i:'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
							},
							{
								t:'北京北京北京北京',
								i:'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
							},
						]
					},
					{
						tit:'代办',
						items:[
							{
								t:'北京北京北京北京',
								i:'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
							},
							{
								t:'北京北京北京北京',
								i:'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
							},
						]
					},
					{
						tit:'采购商',
						items:[
							{
								t:'北京北京北京北京',
								i:'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
							},
							{
								t:'北京北京北京北京',
								i:'http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png'
							},
						]
					}
				]
			};
		},
		components: {
			NavigationBar,mpvueCityPicker
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 去附近的人详情
			goNearbyDetail(index){
				uni.navigateTo({
					url:'/pages/nearby/detail/detail?index=1'
				})
			},
			// NavBar 选择
			doNavBarClick(){
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.fullAddress = e.label
				// full地址
				let arr = this.fullAddress.split('-')
				// 省
				// this.address.province = arr[0]
				// this.address.provinceId = e.ids[0] || 1
				// // 市
				// this.address.city = arr[1]
				// this.address.cityId = e.ids[1] || 67748
				// this.addressInfo = this.address.province + '-' + this.address.city
				
				debugger
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nearby{
		.items{
			background: #fff;
			border-top: 20upx solid #F5F5F5;
			padding: 0 20upx;
			.title{
				height: 80upx;
				line-height: 80upx;
				position: relative;
				border-bottom: 1upx solid #F5F5F5;
			}
			.item{
				
				.li{
					width: 20%;
					height: 150upx;
					text-align: center;
					margin-top: 0upx;
					.image{
						width:72upx;
						height:72upx;
						border-radius:50%;
						margin: 0 auto;
						margin-top: 20upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.text{
						font-size: 24upx;
						color: #333333;
						margin-top: 10upx;
						width: 70%;
						position: relative;
						left: 15%;
					}
				}
			}
		}
		.arrow-right {
			border-right: 2upx solid #000000;
			border-top: 2upx solid #000000;
			height: 10upx;
			width: 10upx;
			transform: rotate(-135deg);
			border-left: 2upx solid transparent;
			border-bottom: 2upx solid transparent;
			display: inline-block;
			-webkit-transform: rotate(-315deg);
			-moz-transform: rotate(-315deg);
			-ms-transform: rotate(-315deg);
			-o-transform: rotate(-315deg);
			position: relative;
			top: 30upx;
			
		}
	}
</style>
