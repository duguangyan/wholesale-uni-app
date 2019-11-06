<template>
	<view class="middle">
		<!-- 代办 -->
		<view class="shipper" v-if="status==0">
			<button type="primary" v-for="(item,index) in shippers" :key="index">{{item}}</button>
		</view>
		<!-- 货主 -->
		<view class="agency" v-if="status==1">
			<view class="top fs28 text-fff">
				<view class="time">2019年9月</view>
				<view class="flex fs32">
					<view class="flex-1">
						<view>1单</view>
						<view>订单量</view>
					</view>
					<view class="flex-1">
						<view>5050.05元</view>
						<view>交易额</view>
					</view>
					<view class="flex-1">
						<view>5000斤</view>
						<view>交易量</view>
					</view>
				</view>
			</view>
			
			<view>
				<uni-list>
				    <uni-list-item @click="goAccount" title="账户" note="达成交易越多,收益越多" :show-badge="true" :badge-text="spListValue+'元'"></uni-list-item>
				</uni-list>
			</view>
			<view class="goods">
				<uni-list>
				    <uni-list-item title="我的商品" :show-arrow="false"></uni-list-item>
				</uni-list>
				<view class="flex fs28">
					<view class="flex-1" v-for="(item,index) in spGoods" :key="index">
						<view class="img"></view>
						<view class="text">{{item.text}}</view>
					</view>
				</view>
			</view>
			<view class="goods orders">
				<uni-list>
				    <uni-list-item title="销售订单"></uni-list-item>
				</uni-list>
				<view class="flex fs28">
					<view class="flex-1" v-for="(item,index) in spOrders" :key="index">
						<view class="img"></view>
						<view class="text">{{item.text}}</view>
					</view>
				</view>
			</view>
			
			<view class="bar" @click="goRelease">+</view>
		</view>
		<!-- 买家 -->
		<view class="buyer" v-if="status==2"></view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				status: 1, // 登录用户状态
				shippers:['我是代办','我要卖货'],
				spListValue: '158.55',
				spGoods:[{
					img:'',
					text:'我的货品'
				},
				{
					img:'',
					text:'本地代办'
				}],
				spOrders:[
					{
						img:'',
						text:'待确认'
					},{
						img:'',
						text:'待买家支付'
					},{
						img:'',
						text:'代办发货'
					},{
						img:'',
						text:'待买家收货'
					},{
						img:'',
						text:'已完成'
					}
				]
			};
		},
		components: {uniList,uniListItem},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			// 去我的账户
			goAccount(){
				uni.navigateTo({
					url:'/pages/middle/release/account/account'
				})
			},
			// 去发布商品
			goRelease(){
				uni.navigateTo({
					url:'/pages/middle/release/release'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.middle{
		// 代办
		.shipper{
			margin: 300upx 0 100upx 0;
			padding: 0 60upx;
			button{
				margin-top: 100upx;
			}
			
		}
		// 货主
		.agency{
			
			.bar{
				width: 100upx;
				height: 100upx;
				line-height: 100upx;
				background: #007AFF;
				font-size: 80upx;
				color: #fff;
				border-radius: 50%;
				position: fixed;
				right: 60upx;
				bottom: 100upx;
				text-align: center;
				z-index: 9999;
				box-shadow: 1upx 1upx 1upx #999;
			}
			.orders{
				margin-top: 40upx;
			}
			.goods{
				uni-list-item{
					background: #E5E5E5;
				}
				.title{
					line-height: 100upx;
					background: #666;
					color: #fff;
					padding: 0 30upx;
				}
				.flex{
					text-align: center;
					margin:  0 auto;
					.img{
						margin:  40upx auto;
						margin-bottom: 20upx;
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
						background: #888888;
						>img{
							width: 100%;
							height: 100%;
						}
					}
					
				}
			}
			.top{
				padding-top: 100upx;
				background: #FE9A2E;
				height: 200upx;
				text-align: center;
				.time{
					height: 100upx;
					line-height: 100upx;
				}
				.flex-1{
					border-right: 1upx solid #fff;
					
				}
				.flex-1:last-child{
					border-right: none;
				}
			}
			
			
		}
		// 买家
		.buyer{
			
		}
	}
</style>
