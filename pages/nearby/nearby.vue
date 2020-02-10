<template>
	<view class="nearby">
		<NavigationBar :title="title" :isArrow="isArrow" :isClick="isClick" :clickTitle="clickTitle" @doClick="doNavBarClick"></NavigationBar>
		
		<view class="items" v-if="shippers.length>0">
			<view class="title cf fs28 text-333" @click="goNearbyDetail(1)">
				<view class="fll">本地货主</view>
				<view class="flr arrow-right"></view>
			</view>
			<view class="item cf" v-for="(item,index) in shippers" :key="index">
				<view class="li fll" @click="goChat(item)">
					<view class="image">
						<image :src="item.headImgUrl" mode=""></image>
					</view>
					<view class="text ellipsis">{{item.nickName || item.username}}</view>
				</view>
			</view>
		</view>
		
		<view class="items" v-if="agencys.length>0">
			<view class="title cf fs28 text-333" @click="goNearbyDetail(2)">
				<view class="fll">代办</view>
				<view class="flr arrow-right"></view>
			</view>
			<view class="item cf" v-for="(item,index) in agencys" :key="index">
				<view class="li fll" @click="goChat(item)">
					<view class="image">
						<image :src="item.headImgUrl" mode=""></image>
					</view>
					<view class="text ellipsis">{{item.nickName || item.username}}</view>
				</view>
			</view>
		</view>
		
		<view class="items" v-if="purchasers.length>0">
			<view class="title cf fs28 text-333" @click="goNearbyDetail(3)">
				<view class="fll">采购商</view>
				<view class="flr arrow-right" v-if="purchasers.length>5"></view>
			</view>
			<view class="item cf" v-for="(item,index) in purchasers" :key="index">
				<view class="li fll" @click="goChat(item)">
					<view class="image">
						<image :src="item.headImgUrl" mode=""></image>
					</view>
					<view class="text ellipsis">{{item.nickName || item.username}}</view>
				</view>
				
			</view>
		</view>
		
		<view class="items">
			<view class="title cf fs28 text-333" @click="goNearbyDetail(3)">
				<view class="fll">采购商</view>
				<view class="flr arrow-right"></view>
			</view>
			<view class="item cf">
				<view class="li fll">
					<view class="image">
						<image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image>
					</view>
					<view class="text ellipsis">xxxxxx</view>
				</view>
				<view class="li fll">
					<view class="image">
						<image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image>
					</view>
					<view class="text ellipsis">xxxxxxxxxxxxxxxxxxxxxxxxx</view>
				</view>
				<view class="li fll">
					<view class="image">
						<image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image>
					</view>
					<view class="text ellipsis">xxxxxx</view>
				</view>
				<view class="li fll">
					<view class="image">
						<image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image>
					</view>
					<view class="text ellipsis">xxxxxx</view>
				</view>
				<view class="li fll">
					<view class="image">
						<image src="http://wsgoods.qinlvny.com/act/73d6c36cb8b04127848553f2f77fdc93.png" mode=""></image>
					</view>
					<view class="text ellipsis">xxxxxx</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import NavigationBar from '@/components/common/NavigationBar.vue'
	import T from '@/utils/tips.js'
	// import mpvueCityPicker from '@/components/common/mpvue-citypicker/mpvueCityPicker.vue'
	import { getUserRealByArea, getUser4Area } from '@/api/supply.js'
	import { getImToken } from '@/api/userApi.js'
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
				shippers:[],
				agencys:[],
				purchasers:[],
				nearbyAddress:[],
				pageIndex:1,
				pageSize:6
			};
		},
		components: {
			NavigationBar
		},
		onLoad() {
			
		},
		onShow() {
			// 获取附近的人列表
			console.log(uni.getStorageSync('nearbyAddress'))
			if(uni.getStorageSync('nearbyAddress')){
				this.clickTitle = uni.getStorageSync('nearbyAddress')[1]
				this.nearbyAddress = uni.getStorageSync('nearbyAddress')
				this.userRealByArea(1)
				this.userRealByArea(2)
				this.user4Area()
			}
		},
		methods:{
			// 去聊天窗口
			goChat(item){
			  getImToken().then(res => {
				if (res.code == "1000") {
					let id   = uni.getStorageSync('uid')
					let tk   = res.data
					let tid  = item.id
					let name = item.nickName || item.username
					// let url = 'https://im.qinlvny.com/#/chat/p2p-' + tid + '?id=' + id + '&tk=' + tk
					// console.log('url', url)
					uni.navigateTo({
						url: '/pages/user/chat/chat?tid=' + tid + '&id=' + id + '&tk=' + tk + '&name=' + name
					})
				} else {
					T.tips("请求IM数据失败")
				}
			  })
			},
			// 获取附近的人列表  type 1:货主 2:代办
			userRealByArea(type){ 
				let data = {
					city: this.nearbyAddress[1],
					province: this.nearbyAddress[0],
					pageIndex: this.pageIndex,
					type: type, 
					pageSize: this.pageSize
				}
				getUserRealByArea(data).then(res=>{
					console.log('getUserRealByArea',res)
					if(res.code == '1000'){
						if(type == 1) {
							this.shippers = res.data
						}else{
							this.agencys = res.data
						}
						
					}else{
						T.tips(res.message || '参数错误')
					}
				}).catch(err=>{
					T.tips(err.message || '获取城市失败')
				})
			},
			// 根据地区获取用户身份信息 APP-附近的人  采购商
			user4Area(){
				let data = {
					city: this.nearbyAddress[1],
					province: this.nearbyAddress[0],
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
				getUser4Area(data).then(res=>{
					console.log('getUser4Area',res)
					if(res.code == "1000"){
						this.purchasers = res.data
					}
				})
			},
			// 去附近的人详情
			goNearbyDetail(index){
				uni.navigateTo({
					url:'/pages/nearby/detail/detail?index=1'
				})
			},
			// NavBar 选择
			doNavBarClick(){
				uni.navigateTo({
					url:'/pages/nearby/chooseCity/chooseCity'
				})
				// this.$refs.mpvueCityPicker.show()
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
