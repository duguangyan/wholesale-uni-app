<template>
	<view class="middle">
		<!-- 代办 -->
		<view v-if="roleId==2002">
			<shipper></shipper>
		</view>
		<!-- 货主 -->
		<view v-if="roleId==2001">
			<agency></agency>
		</view>
		<!-- 买家 -->
		<view v-if="roleId==2003">
			<buyer></buyer>
		</view>
		<!-- 已经实名 -->
		<view v-if="roleId==1000">
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
	export default {
		data() {
			return {
				status: 1, // 登录用户状态
				roleId: '',
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
			
			// 获取用户角色状态  
			uni.setStorageSync('roleId','2001')
			this.roleId = uni.getStorageSync('roleId')
			// 设置头部样式
			uni.setNavigationBarColor({
				backgroundColor:"#FE3B0B",
				frontColor:"#ffffff"
			})
			// 设置头部内容
			let time =  util.doHandleYear()+ '年' + util.doHandleMonth() + '月'
			uni.setNavigationBarTitle({
			    title: time
			});
			
			// 设置底部tab样式
			if(this.roleId == '2002'){
				uni.setTabBarItem({
				  index: 1,
				  text: '代办',
				  iconPath: '../../static/img/2.1.png',
				  selectedIconPath: '../../static/img/2.2.png'
				})
			} else if(this.roleId == '2001') {
				uni.setTabBarItem({
				  index: 1,
				  text: '我要卖',
				  iconPath: '../../static/img/4.1.png',
				  selectedIconPath: '../../static/img/4.2.png'
				})
			}
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
				// 获取进货单列表
				//this.getCartOrderList()
				// 设备样式兼容
				//this.platform = uni.getStorageSync('platform');
			}
			// #endif
		},
		methods:{
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
		.identity{
			margin-top: 300upx;
			.item{
				text-align: center;
				margin-top: 120upx;
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
