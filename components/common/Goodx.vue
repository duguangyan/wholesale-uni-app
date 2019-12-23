<template>
	<view class="content">
		<view class="item cf">
			<view class="img fll">
				<image :src="item.imgUri" mode=""></image>
			</view>
			<view class="warp fll">
				<view class="fs28 cf">
					<view class="ellipsis-line2 fll" :class="{'with300':item.status == 0 || item.status == 2}">{{item.name || '暂无'}}</view>
					<view class="flr fs24 text-theme status ellipsis" v-if="item.status == 0">审核中</view>
					<view class="flr fs24 text-theme status ellipsis" v-if="item.status == 2">审核不通过</view>
					<!-- {{item.rejectReason || ''}} -->
				</view>
				<view class="deliver ellipsis fs24 text-999">
					<text v-for="(item,index) in item.attrValDesc" :key="index">{{" " + item}}</text>
					<!-- <text class="fs20 text-999">{{item.place || ''}}</text>
					<text class="tip fs20 text-999" v-if="ix<2" v-for="(it,ix) in item.attrValDesc" :key="ix">{{it || ' '}}</text> -->
				</view>
				<view class="price cf" :class="{'role':roleId=='20001' || roleId=='20004'}">
					<view class="fs36 text-red fll"  :class="{'platformOPPO':platform == 1}">
            <text class="">
						￥{{item.minprice || item.minPrice}} 
						<text v-if="item.maxprice && item.maxprice!=item.minprice">~{{item.maxprice}}</text>
            </text>
						<text class="fs24">元/{{item.unitName}}起</text>
					</view>
					<view class="fs28 text-999 flr" :class="{'platformOPPOSales':platform == 1}" v-if="roleId=='20001'">
						销量:{{item.spuSalesNum}}斤
					</view>
				</view>
				<view class="address cf" v-if="roleId!='20001' && roleId!='20004'">
					<view class="fll img">
						<image :class="{'platformOPPO':platform == 1, 'platformXiaomi':platform == 5}" :src="'/static/imgs/main-icon-1.png'" mode=""></image>
					</view>
					<view class="fll fs24 text-999 ellipsis">{{item.realName || ''}}<text class="mgl-10" v-for="(area,areaIdx) in item.shopArea" :key="areaIdx">{{area}}</text> </view>
					<view class="flr fs24 text-999" v-if="item.createTimeName">{{item.createTimeName}}小时前</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goodx',
		props: {
			item: {
				type: Object,
				default: null
			},
			roleId: {
				type: String | Number,
				default: null
			}
		},
		data() {
			return {
				attrValDescString: '',
				platform:''
			}
		},
		mounted() {
			// 拼接商品规格
			// if(this.item.place ) this.attrValDescString += ' ' + this.item.place
			// if(this.item.attrValDesc && this.item.attrValDesc.length>0){
			// 	this.item.attrValDesc.forEach(it=>{
			// 		if(it) this.attrValDescString += ' ' + it
			// 	})
			// }
			this.platform = uni.getStorageSync('platform')
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.fbold{
      font-weight: bold;
    }
	
		.item {
			padding: 20upx 30upx;
			width: 100%;
			height: 220upx;
			border-radius: 10upx;
			overflow: hidden;
			background: #fff;
			margin-bottom: 20upx;
			border-bottom: 1upx solid #f5f5f5;
			.warp {
				padding: 4upx 20upx;
				position: relative;
				width: 460upx;
				.status{
					position: relative;
					top: 8upx;
					width: 120upx;
				}
				.deliver{
					height: 40upx;
					line-height: 40upx;
				}
				.price{
					margin-top: 18upx;
					margin-bottom: 10upx;
					.platformOPPO{
						margin-top: 12upx;
					}
					.platformOPPOSales{
						position: relative;
						top: 10upx;
					}
					
				}
				.role{
					margin-top: 60upx;
				}
				.address{
					.img{
						width: 28upx;
						height: 24upx;
            vertical-align: top;
						margin-right: 6upx;
						>image{
							width: 100%;
							height: 100%;
							position: relative;
							top: 4upx; 
							/*  #ifdef  MP-WEIXIN  */
							top: -8upx; 
							/*  #endif  */
							/*  #ifdef  H5  */
							top: -6upx; 
							/*  #endif  */
						}
						.platformOPPO{
							top:0upx !important;
						}
						.platformXiaomi{
							top: -20upx !important;
						}
					}
					.ellipsis{
						width: 70%;
					}
				}
				.with300{
					width: 300upx;
				}
				.ellipsis-line2 {
					
					height: 78upx;
					line-height: 39upx;
					font-size: 32upx;
					color: #000;
				}
	
				.add {
					position: absolute;
					right: 20upx;
					bottom: 12upx;
				}
	
				.mgt-20 {
					margin-top: 26upx !important;
					width: 100%;
				}
			}
	
			.Android {
				.add {}
			}
	
			>.img {
				
				background-image: url('~@/static/img/default-shouye.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				width: 220upx;
				height: 220upx;
				border-radius: 20upx;
				overflow: hidden;
				>image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
