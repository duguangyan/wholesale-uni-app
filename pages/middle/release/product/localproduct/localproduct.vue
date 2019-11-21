<template>
	<view class="localproduct">
		<view class="top-warp">
			<view class="tags-con">
				<view class="tabs cf">
					<view class="fll li" v-for="(item,index) in navs" :key="index" @click="checkNav(index)">
						<text :class="{navActive:navIndex==index}">{{item.t}} <text v-if="item.n!=''">({{item.n}})</text> </text>
						<i v-if="navIndex==index"></i>
					</view>
				</view>
			</view>
		</view>
		<view class="item">
			<Goodx :item="item"></Goodx>
		</view>
		
		<view class="nodata" v-if="false">
			<view class="image">
				<image src="../../../../../static/imgs/localproduct.png" mode=""></image>
			</view>
			<view class="fs24 text-999">还没有货品</view>
		</view>
	</view>
</template>

<script>
	import { getShopInfo , fromIdGetAgent } from '@/api/userApi.js'
	import Goodx from '@/components/common/Goodx.vue'
	export default {
		data() {
			return {
				navs:[
					{
						t:'销售中',
						n:''
					},
					{
						t:'审核中',
						n:''
					},
					{
						t:'已下架',
						n:''
					},
					{
						t:'待修改',
						n:''
					},
				],
				items:[
					
				],
				item:'',
				roleId:'',
				index: 0,
				navIndex:0
			};
		},
		components:{Goodx},
		onLoad(options) {
			// 获取上级nav参数
			if(options.index) this.index = options.index
		},
		onShow() {
			// 判断用户角色
			this.assessUserType()
			// 获取店铺信息
			this.getShopInfo()
			
		},
		methods:{
			// 判断用户角色
			assessUserType(){
				this.roleId = uni.getStorageSync('roleId')
				if(this.roleId == '20001'){
					uni.setNavigationBarTitle({
					    title: '我的货品'
					});
				}else if(this.roleId == '20002'){
					if(this.index == 0) {
						uni.setNavigationBarTitle({
						    title: '新发布'
						});
					}else{
						uni.setNavigationBarTitle({
						    title: '本地货品'
						});
					}
				}
			},
			// 获取店铺信息
			getShopInfo(){
				getShopInfo().then(res=>{
					
				})
			},
			// nav 切换
			checkNav(index){
				this.navIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.localproduct{
		// min-height: 100vh;
		// background: #fff;
		.item{
			background: #fff;
		}
		.tags-con {
			background-color: #fff;
			position: relative;
			margin-bottom: 20upx;
			.tabs {
				height: 80upx;
				line-height: 80upx;
				position: relative;
		
				.li {
					font-size: 30upx;
					width: 25%;
					text-align: center;
					position: relative;
		
					.navActive {
						color: #fc2d2d;
					}
		
					i {
						position: absolute;
						bottom: 0;
						height: 6upx;
						width: 25%;
						display: block;
						background: #fc2d2d;
						margin-left: 40%;
					}
					.tip{
						width:32upx;
						height:32upx;
						background:rgba(254,59,11,1);
						border:2upx solid rgba(255,255,255,1);
						border-radius:50%;
						font-size: 16upx;
						color: #fff;
						text-align: center;
						line-height: 32upx;
						position: absolute;
						right: 10upx;
						top: 0upx;
					}
				}
		
			}
		
			.flag {
				width: 34upx;
				height: 6upx;
				position: absolute;
				bottom: 0;
				background-color: #fc2d2d;
				left: 60upx;
				z-index: 2;
				transition: left 0.5s;
			}
		}
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
	}
</style>
