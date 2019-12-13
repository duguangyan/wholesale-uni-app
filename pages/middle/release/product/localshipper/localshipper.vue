<template>
	<view class="localshipper">
		<view v-if="items.length>0 && (roleId == '20001' || roleId == '20002')">
			<view>
				<view class="tip">
					以下为{{userApply.province + userApply.city}}地区{{roleId == 20002?'货主':'代办'}}联系方式
				</view>
				<view class="items">
					<view class="item flex" v-for="(item,index) in items" :key="index">
						<view class="flex-1 fs28 text-333 ellipsis">{{item.realName || ''}}</view>
						<view class="flex-2 fs28 text-666">{{item.phone || ''}}</view>
						<view class="flex-1"><view class="btn" @click="callByPhone(item.phone)">联系{{roleId == 20002?'货主':'代办'}}</view></view>
					</view>
				</view>
			</view>
			<view class="nodata" v-if="items.length<=0">
				<view class="image">
					<image src="/static/imgs/localshipper.png" mode=""></image>
				</view>
				<view class="fs24 text-999">
					该地区还没有 {{roleId == '20002'?'货主':'代办'}}
				</view>
			</view>
			
		</view>
		
		
		<view v-if="items.length>0 && roleId == '20004'">
			
			<view v-for="(item,index) in items" :key="index">
				<view>
					<view class="tip">
						以下为{{item.address}}地区代办联系方式
					</view>
					<view class="items">
						<view class="item flex" v-for="(it,ix) in item.list" :key="ix">
							<view class="flex-1 fs28 text-333 ellipsis">{{it.realName || ''}}</view>
							<view class="flex-2 fs28 text-666">{{it.phone || ''}}</view>
							<view class="flex-1"><view class="btn" @click="callByPhone(it.phone)">联系代办</view></view>
						</view>
					</view>
				</view>
				<view class="nodata" v-if="items.length<=0">
					<view class="image">
						<image src="/static/imgs/localshipper.png" mode=""></image>
					</view>
					<view class="fs24 text-999">
						该地区还没有代办
					</view>
				</view>
			</view>
			
			
			
		</view>
		
		
		
		
	</view>
</template>

<script>
	import { getShopInfo , fromIdGetAgent ,fromIdGetAgentUserInfo,fromIdGetShopUserInfo } from '@/api/userApi.js'
	import { enterpriseAgentUserInfo } from '@/api/goodsApi.js'
	export default {
		data() {
			return {
				items:[
					{
						realName:'农百集',
						phone:'15817390700'
					}
				],
				roleId:'',
				userApply:''
			};
		},
		onShow() {
			// 判断用户类型
			this.assessUserType()
			
		},
		methods:{
			
			// 判断用户类型
			assessUserType(){
				this.roleId = uni.getStorageSync('roleId')
				this.userApply = JSON.parse(uni.getStorageSync('userApply'))
				if(this.roleId == '20001' || this.roleId == '20004'){
					uni.setNavigationBarTitle({
					    title: '本地代办'
					});
					if(this.roleId == '20001'){
						this.fromIdGetAgentUserInfo()
					}else{
						this.getEnterpriseAgentUserInfo()
					}
					
				}else if(this.roleId == '20002'){
					uni.setNavigationBarTitle({
					    title: '本地货主'
					});
					this.fromIdGetShopUserInfo()
				}
			},
			// 企业
			getEnterpriseAgentUserInfo(){
				enterpriseAgentUserInfo().then(res=>{
					if(res.code == '1000'){
						this.items = res.data
					}
				})
			},
			// 代办
			fromIdGetAgentUserInfo(){
				fromIdGetAgentUserInfo().then(res=>{
					if(res.code == '1000'){
						this.items = res.data
					}
				})
			},
			// 货主
			fromIdGetShopUserInfo(){
				fromIdGetShopUserInfo().then(res=>{
					if(res.code == '1000'){
						this.items = res.data
					}
				})
			},
			// 获取代办列表
			fromIdGetAgent(shopId){
				let data = {
					shopId
				}
				fromIdGetAgent(data).then(res=>{
					
				})
			},
			// 联系货主
			callByPhone(phoneNumber){
				uni.makePhoneCall({
				    phoneNumber 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.localshipper{
		background: #fff;
		min-height: 100vh;
		.nodata{
			text-align: center;
			.image{
				width: 200upx;
				height: 200upx;
				margin: 0 auto;
				padding-top: 300upx;
				padding-bottom: 20upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.items{
			.item{
				padding: 0 30upx;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1upx solid #f5f5f5;
				.ellipsis{
					padding-right: 20upx;
					height: 100upx;
					line-height: 100upx;
				}
				.btn{
					width:150upx;
					height:60upx;
					line-height: 60upx;
					text-align: center;
					background:rgba(254,59,11,1);
					border-radius:30upx;
					color: #fff;
					font-size: 28upx;
					position: relative;
					left: 20upx;
				}
			}
		}
		.tip{
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			font-size: 24upx;
			color: #999999;
			background: #f5f5f5;
		}
	}
</style>
