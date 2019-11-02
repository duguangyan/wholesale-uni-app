<template>
	<view class="attribute">
		<view class="edit fs28" @click="goAdd">新增属性</view>
		<view class="address" @click="showPicker" >
			<view>
				<uni-list>
					<uni-list-item :show-extra-icon="true" :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="请选择地址"></uni-list-item>
					 <view class="info fs28">{{addressInfo}}</view>
				</uni-list>
			</view>
		</view>
		<view class="content">
			<view class="list">
				<view class="title fs28"><uni-icons type="star-filled" color="#FC2D2D" size="12"></uni-icons>薯皮颜色</view>
				<view class="items cf">
					<button class="item fs28 fll mini-btn" :class="{'active': itemIndex == index}" @click='checkIndex(index)' size="mini" v-for="(item,index) in colors" :key="index">{{item}}</button>
				</view>
			</view>
			<view class="list">
				<view class="title fs28"><uni-icons type="star-filled" color="#FC2D2D" size="12"></uni-icons>薯心颜色</view>
				<view class="items cf">
					<button class="item fs28 fll mini-btn" :class="{'active': itemIndex == index}" @click='checkIndex(index)' size="mini" v-for="(item,index) in colors" :key="index">{{item}}</button>
				</view>
			</view>
			<view class="list">
				<view class="title fs28"><uni-icons type="star-filled" color="#FC2D2D" size="12"></uni-icons>用途</view>
				<view class="items cf">
					<button class="item fs28 fll mini-btn" :class="{'active': itemIndex == index}" @click='checkIndex(index)' size="mini" v-for="(item,index) in colors" :key="index">{{item}}</button>
				</view>
			</view>
			
			<view class="list">
				<view class="title fs28">储存条件</view>
				<view class="items cf">
					<button class="item fs28 fll mini-btn" :class="{'active': itemIndex == index}" @click='checkIndex(index)' size="mini" v-for="(item,index) in colors" :key="index">{{item}}</button>
				</view>
			</view>
		</view>
		
		<view class="footer cf">
			<button class="mini-btn flr" size="mini" @click="saveAttribute">保存</button>
		</view>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :isFullAddress='isFullAddress' :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
	
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				address:{},
				addressInfo:'',
				isFullAddress: false,
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				fullAddress:'',
				itemIndex: 0,
				colors:['红色1','红色2','红色3','红色4','红色5','红色6','红色7']
			};
		},
		components: {uniIcons,uniList,uniListItem,mpvueCityPicker},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 新增属性
			goAdd(){
				uni.navigateTo({
					url:'/pages/middle/release/attribute/add/add'
				})
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.fullAddress = e.label
				// full地址
				let arr = this.fullAddress.split('-')
				// 省
				this.address.province = arr[0]
				this.address.provinceId = e.ids[0]
				// 市
				this.address.city = arr[1]
				this.address.cityId = e.ids[1]
				
				this.addressInfo = this.address.province + '-' + this.address.city
				// 区
				// this.address.region = arr[2]
				// this.address.regionId = e.ids[2]
			},
			showPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			// 保存
			saveAttribute(){
				uni.setStorageSync('attribute',this.colors[this.itemIndex])
				uni.navigateBack({
					delta:1
				})
			},
			// 去地址页面
			goAddress(){
				
			},
			// 选择属性
			checkIndex(index){
				this.itemIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.attribute{
		.footer{
			position: fixed;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			bottom: 0;
			padding-right: 60upx;
			z-index: 999;
			button{
				background: #007AFF !important;
				color: #fff;
				position: relative;
				right: 30upx;
				top: 20upx;
			}
			background: #eee;
			
		}
		.content{
			padding-bottom: 200upx;
			.list{
				margin-top: 10upx;
				
				.items{
					margin-right: 5%;
					.item{
						min-width: 20%;
						margin-bottom: 20upx;
						background: #666;
						color: #fff;
						margin-left: 5%;
						text-align: center;
					}
					.active{
						background: #007AFF !important;
					}
				}
				.title{
					height: 100upx;
					line-height: 100upx;
					padding: 0 30upx;
					uni-icons{
						margin-right: 10upx;
					}
					
				}
			}
		}
		
		.edit{
			height: 100upx;
			line-height: 100upx;
			color: #007AFF;
			text-align: right;
			padding-right: 30upx;
		}
		.address{
			position: relative;
			.info{
				position: absolute;
				right: 90upx;
				top: 30upx;
			}
			
		}
		
	}
</style>
