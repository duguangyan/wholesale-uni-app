<template>
	<view class="middle">
		<!-- 代办 -->
		<!-- <view v-if="roleId==2002">
			<agency></agency>
		</view> -->
		<!-- 货主 -->
		<view v-if="userApply!='' && (roleId==20001 || roleId==20002)">
			<agency :roleId='roleId'></agency>
		</view>
		<!-- 买家 -->
		<!-- <view v-if="roleId==20003">
			<buyer></buyer>
		</view> -->
		<!-- 已经实名 -->
		<view v-if="userApply==''">
			<view class="identity">
				<view class="item" v-for="(item,index) in items" :key="index" @click="goPage(index)">
					<view class="image">
						<image :src="item.imgUrl"></image>
					</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import agency from '@/components/middle/agency.vue'
	import buyer from '@/components/middle/buyer.vue'
	import shipper from '@/components/middle/shipper.vue'
	import util from '@/utils/util.js'
	import { getUserRealInfoAll } from '@/api/userApi.js'
	export default {
		data() {
			return {
				status: 1, // 登录用户状态
				roleId: '',
				userRealInfo:'',
				userApply:'',
				items:[
					{
						text:'我是代办',
						imgUrl:'../../static/imgs/icon-1.png'
					},
					{
						text:'我要卖货',
						imgUrl:'../../static/imgs/icon-2.png'
					}
				]
			};
		},
		components: {agency,buyer,shipper},
		onTabItemTap(e){
			
			// #ifdef  MP-WEIXIN
			if(!uni.getStorageSync('access_token')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			// #endif
			
		},
		onLoad(options) {
			if(options.roleId) this.roleId = options.roleId
			
		},
		onShow() {
			
			// 未登录状态跳转 微信和APP不一样
			// #ifdef  MP-WEIXIN
			if(!uni.getStorageSync('access_token')){
				if(uni.getStorageSync('pagePath') == 'main'){
					uni.switchTab({
						url:'/pages/main/main'
					})
				}else if(uni.getStorageSync('pagePath') == 'user'){
					uni.switchTab({
						url:'/pages/user/user'
					})
				} else{
					uni.switchTab({
						url:'/pages/main/main'
					})
				}
			}else{
				// 获取用户信息
				this.getUserRealInfoAll()
				// 获取进货单列表
				//this.getCartOrderList()
				// 设备样式兼容
				//this.platform = uni.getStorageSync('platform');
			}
			// #endif
			
			// #ifdef APP-PLUS || H5
			if(!uni.getStorageSync('access_token')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				// 获取用户信息
				this.getUserRealInfoAll()
				// 获取进货单列表
				//this.getCartOrderList()
				// 设备样式兼容
				//this.platform = uni.getStorageSync('platform');
			}
			// #endif
		},
		methods:{
			// 获取用户信息
			getUserRealInfoAll(){
				getUserRealInfoAll().then((res) => {
					let roleId = res.data.userRole.roleId || ''
				// 获取用户角色状态  2001 货主 2002 代办
				// uni.setStorageSync('roleId','2001')
				this.roleId = res.data.userRole.roleId || ''
				this.userRealInfo = res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : ''
				this.userApply = res.data.apply.id ? JSON.stringify(res.data.apply) : ''
				// 设置头部样式
				if(!this.roleId && this.userRealInfo){
					uni.setNavigationBarColor({
						backgroundColor:"#FFFFFF",
						frontColor:"#000000"
					})
					// 设置头部内容
					uni.setNavigationBarTitle({
					    title: '选择身份'
					});
				}else{
					uni.setNavigationBarColor({
						backgroundColor:"#FE3B0B",
						frontColor:"#ffffff"
					})
					// 设置头部内容
					let time =  util.doHandleYear()+ '年' + util.doHandleMonth() + '月'
					uni.setNavigationBarTitle({
					    title: time
					});
				}
				// 设置底部tab样式
				if(this.roleId == '20002'){
					uni.setTabBarItem({
					  index: 1,
					  text: '代办',
					  iconPath: '../../static/img/2.1.png',
					  selectedIconPath: '../../static/img/2.2.png'
					})
				} else if(this.roleId == '20001') {
					uni.setTabBarItem({
					  index: 1,
					  text: '我要卖',
					  iconPath: '../../static/img/4.1.png',
					  selectedIconPath: '../../static/img/4.2.png'
					})
				}
				
				})
			},
			goPage(index){
				switch (index){
					case 0:
					// 代办
						uni.navigateTo({
							url:'/pages/middle/identity/realname/agency?hasfrom=1'
						})
						break;
					case 1:
					// 货主
						uni.navigateTo({
							url:'/pages/middle/identity/realname/agency?hasfrom=2'
						})
						break;	
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.middle{
		background: #fff;
		min-height: 100vh;
		.identity{
			padding-top: 120upx;
			.item{
				text-align: center;
				padding-top: 120upx;
				.image{
					width: 180upx;
					height: 180upx;
					margin: 0 auto;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					font-size: 30upx;
					color: #333;
					margin-top: 20upx;
				}
			}
		}
		
	}
</style>
