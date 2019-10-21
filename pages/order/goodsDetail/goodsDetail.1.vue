<template>
	<view class="detail">
		<view class="top">
			<view class="tips cf">
				<view class="fll" @click="goBack">
					<image src="../../../static/img/tag-back3.png" mode=""></image>
				</view>
				<view class="flr">
					<image src="../../../static/img/icon-share.png" mode=""></image>
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="index-top-warp">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item v-for="(item,index) in goodsImgVOList" :key="index" @click="goNextPage">
									<view class="swiper-item">
										<image :src="item.imgUrl"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>	
		</view>
		
		<view class="content">
			<view class="cf">
				<view class="fll text-red fs28" v-if="goods.maxPrice"> <text class="fs20">￥</text> {{goods.minPrice}} ~ <text class="fs20">￥</text>{{goods.maxPrice}} <text class="text-333 fs20 mgl-10">/{{goods.unitName}}</text></view>
				<view class="fll text-red fs28" v-if="!goods.maxPrice"> <text class="fs20">￥</text> {{goods.minPrice}}  <text class="text-333 fs20 mgl-10">/{{goods.unitName}}</text></view>
				<view class="flr text-999 fs24">{{goods.place}}</view>
			</view>
			<view class="fs28 text-333 title">{{goods.name}}</view>
			<view class="flex fs20">
				<view class="flex-1">{{goods.hits}}人看过</view>
				<view class="flex-1">订单数{{goods.spuSalesNum}}</view>
				<view class="flex-1" v-if="postSettingType===0" @click="goPostSetting">运费说明&gt;</view>
				<view class="flex-1" v-if="postSettingType!==0">全国包邮</view>
			</view>
		</view>
		
		<view class="item-1" v-if="goods.showStyle===3 || goods.showStyle===1 && goodsSkuList.length > 1">
			<view class="text-666"> <text>—</text>  <text class="po"></text> <text class="fs24 text-000">规格</text> <text class="po"></text> <text>—</text> </view>
			<view class="flex fs20 text-999 mgt-30">
				<view class="flex-1">1250人看过</view>
				<view class="flex-1">订单数1</view>
				<view class="flex-1">全国包邮</view>
			</view>
			<view class="flex fs20 text-999 mgt-30">
				<view class="flex-1">1250人看过</view>
				<view class="flex-1">订单数1</view>
				<view class="flex-1">全国包邮</view>
			</view>
			<view class="flex fs20 text-999 mgt-30">
				<view class="flex-1">1250人看过</view>
				<view class="flex-1">订单数1</view>
				<view class="flex-1">全国包邮</view>
			</view>
		</view>
		<view class="item-1 mgt-40">
			<view class="text-666"> <text>—</text>  <text class="po"></text> <text class="fs24 text-000">商品属性</text> <text class="po"></text> <text>—</text> </view>
			<view class="flex fs20 text-999 mgt-30" v-if="goodsDetailAttrList.length>0" v-for="(item,index) in goodsDetailAttrList" :key="index">
				<view class="flex-1">{{item.name}}</view>
				<view class="flex-2" v-if="item.inputType !==0" v-for="(it,idx) in item.goodsDetailAttrValueList" :key="idx">{{it.value}}</view>
				<view class="flex-2" v-if="item.inputType ===0" >{{item.goodsDetailAttrValueList[0].remark}}</view>
			</view>
		</view>
		
		<view class="item-1 mgt-40">
			<view class="text-666"> <text>—</text>  <text class="po"></text> <text class="fs24 text-000">商品详情</text> <text class="po"></text> <text>—</text> </view>
			<view class="flex fs24 detail-name">{{goods.detail}}</view>
			<image
			        v-for="(item,index) in goodsImgVOList"
			        :key="index"
			        :src="item.imgUrl"
			        width="100%"
			      />
		</view>
		<view class="lh100">
			
		</view>
		<view class="tipss" v-if="good.goods.status!==3">
			库存不足
		</view>
		<view class="order flex">
			<view class="flex-1 i-1" @click="changeCollect">
				<view class="icon-1"><image :src="hasColletion?'../../../static/img/icon-collect.png':'../../../static/img/icon-collect2.png'" mode=""></image></view>
				<view>收藏</view>
			</view>
			<view class="flex-1 i-2" @click="goOrder">
				<view class="icon-2"><image src="../../../static/img/icon-cart.png" mode=""></image></view>
				<view>进货单</view>
				<text class="num" v-if="counter>0">{{counter}}</text>
			</view>
			<view class="flex-4 i-4" v-if="good.goods.status!==3" @click="goBack">
				再逛逛
			</view>	  
			<view class="flex-2 i-3" v-if="good.goods.status===3" @click="showConfirm">
				加入进货单
			</view>
			<view class="flex-2 i-4" v-if="good.goods.status===3">
				立即购买
			</view>
		</view>
		<view class="sure-model-warp" v-if="isSure" @click="doClose"></view>
		<view class="sure-model" v-if="isSure">
			<view class="top cf">
				<view class="fll img">
					<image :src="goods.imgUri" mode=""></image>
				</view>
				<view class="fll mgl-20">
					<view class="text-red fs40"><text class="fs24">￥</text> <text> {{onePrice}} </text><text class="text-333 fs24">/{{goodsDetailSpecList[0].name}}</text></view>
					<!-- <view class="fs20 mgt-20 text-666">10箱起批</view> -->
				</view>
				<view class="flr close"  @click="doClose">
					<image src="../../../static/img/tag-close2.png" mode=""></image>
				</view>
			</view>
			<view class="t-1 bb-1" v-if="goods.showStyle!==2">
				<view class="fs30 text-333">规格</view>
				<view class="cf">
					<view class="" v-for="(item,index) in good.goodsDetailSpecList" :key="index">
						<view class="fll" :class="{active :checkIndex==idx}" v-for="(opt,idx) in item.goodsDetailSpecValueList" :key="idx" @click="doCheck(idx)">
							{{opt.value}}{{goods.unitName}}/{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="cf t-2 bb-1">
				<view class="fll fs30 text-333">数量</view>
				<view class="flr">
					<uni-number-box :value='goods.commentNum'  @change="bindNumberBoxChange"></uni-number-box>
				</view>
			</view>
			<view class="cf t-3">
				<view class="fll fs30 text-333">商品金额</view>
				<view class="flr fs40 text-red"> <text class="fs24">￥</text>{{totalPrice}}</view>
			</view>
			<view class="btn" @click="doOk">确定</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/common/uni-number-box/uni-number-box.vue"
	import { getDetail, setCollect, removeCollect, getGoodNums, getPostItem } from "@/api/goodsApi.js"
	import T from "@/utils/tips.js"
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				shopId: '',
				goodsId: '',
				goodsImgVOList: [],
				goodsSkuList:[],
				goodsDetailAttrList: [],
				goodsDetailSpecList:[],
				goods:'',
				good:'',
				postSettingType: 0,
				counter: 0,
				hasColletion: false,
				isSure: false,
				value: 0,
				totalPrice:0,
				onePrice:0,
				checkIndex:0
			};
		},
		components: {
		    uniNumberBox
		},
		onLoad(options) {
			this.shopId = options.shopId;
			this.goodsId = options.goodsId;
		},
		onShow() {
			// 获取数据
			// 获取进货单数量
			this.getGoodNums()
		},
		methods: {
			// 点击确定
			doOk(){
				
			},
			// 选择规格
			doCheck(index){
				this.checkIndex = index
			},
			//关闭弹窗
			doClose(){
				this.isSure = false
			},
			// 计算总价
			doTotalPrice(){
				this.totalPrice = util.formatMoney(util.mul(this.goods.commentNum,this.goodsSkuList[0].price))
			},
			// 添加数量
			bindNumberBoxChange(e){
				this.goods.commentNum = e
				this.doTotalPrice()
			},
			// 显示添加
			showConfirm(){
				this.isSure = true;
			},
			// 去进货单
			goOrder(){
				uni.switchTab({
				    url: '/pages/order/order'
				});
			},
			// 返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			changeCollect() {
			  if(this.hasColletion){
				  setCollect({
				  	goodsId: this.good.goods.id
				    }).then(res=>{
				  	  if(res.code == '1000'){
				  		  this.hasColletion = !this.hasColletion;
				  	  }else{
						  T.tips(res.message || '操作失败')
					  }
				    })
			  } else{
				  removeCollect({
				  	goodsId: this.good.goods.id
				    }).then(res=>{
				  	  if(res.code == '1000'){
				  		  this.hasColletion = !this.hasColletion;
				  	  }else{
						  T.tips(res.message || '操作失败')
					  }
				    })
			  }
			},
			// 去运费说明页
			goPostSetting(){
				
				uni.navigateTo({
					url:'/pages/order/prompt/prompt?id='+this.goods.postSettingId
				})
			},
			// 获取数据
			getDetailData(){
				let data = {
					shopId: this.shopId,
					goodsId: this.goodsId
				}
				getDetail(data).then(res=>{
					if(res.code === '1000'){
						this.goodsImgVOList = res.data.goodsDetail.goodsImgVOList;
						this.goods = res.data.goodsDetail.goods;
						if(this.goods.postSettingId) this.getPostSettingId(this.goods.postSettingId)
						
						this.goodsSkuList = res.data.goodsDetail.goodsSkuList;
						this.goodsDetailAttrList = res.data.goodsDetail.goodsDetailAttrList;
						this.goodsDetailSpecList = res.data.goodsDetail.goodsDetailSpecList;
						this.good = res.data.goodsDetail;
						this.hasColletion = this.good.hasColletion;
						this.onePrice =  util.formatMoney(this.goodsSkuList[0].price)
					}else{
						T.tips(res.message)
					}
				})    
			},
			// 获取运费详情
			getPostSettingId(postSettingId){
				getPostItem({
					id: postSettingId
				  }).then(res => {
					  if(res.code == '1000'){
						  this.postSettingType = res.data.type;
					  }
				  });
			},
			getGoodNums(){
				getGoodNums({
				status: ""
			  }).then(data => {
				this.counter = data.data.num;
			  });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		.sure-model-warp{
			width: 100%;
			height: 100%;
			background: #000;
			opacity: .3;
			position: fixed;
			z-index: 99999;
			top: 0;
		}
		.sure-model{
			width: 100%;
			min-height: 500upx;
			background: #fff;
			position: fixed;
			z-index: 999999;
			bottom: 0;
			border-top: 1upx solid #E5E5E5;
			.btn{
				width:640upx;
				height:80upx;
				background:rgba(252,45,45,1);
				border-radius:40upx;
				line-height: 80upx;
				text-align: center;
				font-size: 32upx;
				margin: 0 auto;
				color: #fff;
				margin-bottom: 50upx;
			}
			.t-2,.t-3{
				padding:20upx 30upx;
				height: 100upx;
			}
			.t-1{
				padding:20upx 30upx;
				padding-bottom: 40upx;
				.fs30{
					padding: 30upx 0;
				}
				.active{
					border:1px solid rgba(252,45,45,1) !important;
					color: #FC2D2D;
				}
				.close{
					background: #F5F5F5;
					position: relative;
					z-index: 999999;
				}
				.fll{
					width:150upx;
					height:50upx;
					border:1px solid rgba(217,217,217,1);
					border-radius:25upx;
					font-size: 24upx;
					text-align: center;
					line-height: 50upx;
					margin-right: 30upx;
				}
			}
			.top{
				padding:30upx;
				.close{
					width: 60upx;
					height: 60upx;
					position: relative;
					top: -10upx;
					right: -10upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.img{
					width: 180upx;
					height: 180upx;
					border-radius: 10upx;
					overflow: hidden;
					>image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.detail-name{
			padding: 30upx 0;
		}
		.tipss{
			height: 100upx;
			line-height: 100upx;
			position: fixed;
			bottom: 100upx;
			background: #000;
			color: #fff;
			opacity: .5;
			text-align: center;
			width: 100%;
			font-size: 20upx;
			z-index: 999999;
		}
		.order{
			height: 100upx;
			width: 100%;
			background: #fff;
			position: fixed;
			bottom: 0;
			z-index: 999999;
			text-align: center;
			border-top: 1upx solid #E5E5E5 ;
			.i-2{
				position: relative;
				.num{
					padding: 2upx 10upx;
					display: inline-block;
					border-radius: 50%;
					background: #FC2D2D;
					color: #fff;
					line-height: 26upx;
					font-size: 20upx;
					position: absolute;
					top: -5upx;
					right: 26upx;
				}
			}
			.i-3{
				background: #FFD07F;
			}
			.i-4{
				background: #FC2D2D;
			}
			.flex-1{
				font-size: 20upx;
			}
			.flex-2,.flex-4{
				font-size: 30upx;
				color: #fff;
				height: 100upx;
				line-height: 100upx;
			}
			.icon-1{
				width: 48upx;
				height: 44upx;
				margin: 0 auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.icon-2{
				width: 44upx;
				height: 46upx;
				margin: 0 auto;
				>image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.item-1{
			text-align: center;
			padding: 40upx;
			border-bottom: 20upx solid #F5F5F5;
			.flex{
				text-align: left;
			}
			.po{
				width: 6upx;
				height: 6upx;
				display: inline-block;
				background: #000;
				border-radius: 50%;
				position: relative;
				top: -6upx;
				margin: 0 20upx;
			}
		}
		.content{
			padding: 30upx;
			.title{
				margin: 20upx 0;
				font-weight: 600;
			}
			.flex{
				background: #E6FAED;
				color: #49C173;
				width: 690upx;
				height: 70upx;
				.flex-1{
					text-align: center;
				}
			}
		}
		.top{
			position: relative;
			.tips{
				margin: 0 30upx;
				position: absolute;
				top: 30upx;
				z-index: 999999;
				width: 100%;
				.fll,.flr{
					>image{
						width: 54upx;
						height: 54upx;
					}
				}
				.flr{
					position: relative;
					left: -60upx;
				}
			}
		}
	}
	
	.index-top-warp {
			width: 100%;
			overflow: hidden;
			background: #fff;
			swiper {
				height: 750upx
			}
			swiper-item {
				height: 750upx //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
			}
			.swiper-item {
				image {
					width: 100%;
					height: 750upx;
				}
			}
			.nav {
				padding: 0 40upx;
				text-align: left;
		
				&:after {
					content: "";
					height: 100upx;
					width: 1upx;
					background: #fff;
					display: inline-block;
					position: absolute;
					top: 50upx;
					left: 355upx;
					z-index: 9999;
				}
				height: 200upx;
		
				image {
					width: 100upx;
					height: 100upx;
				}
				position: relative;
				.item {
					text-align: center;
				}
		
			}
		
	}
	
</style>

