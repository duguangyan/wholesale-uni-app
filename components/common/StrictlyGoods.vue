<template>
	<!--  精品严选  -->
	<scroll-view>
		<div class="goods">
			<div class="title">
				<img :src="list[0].list[0].imgPath" alt="图片">
			</div>
		
			<div class="items">
				<ul class="cf">
					<li class="fll" @click="goGoodsDetail(item)" v-for="(item,index) in goodsObj.goodsDetailRespList" :key="index">
						<div class="img">
							<image :lazy-load="true" :src="item.imgUri" alt="图片">
						</div>
						<div class="content">
							<div class="name ellipsis-line2">{{item.name}}</div>
							<div class="cf">
								<div class="fll text-red fs28"><span>￥</span>{{item.minPrice}}  <span class="fs28">{{'/'+item.unitName}}</span> </div>
								<div class="flr text-999 fs24">{{item.valueAddr}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</scroll-view>
	
</template>

<script>
	import {
		getPageLayout
	} from '@/api/userApi.js'
	export default {
		name: 'StrictlyGoods',
		props: {
			// query: {
			//   type: Array,
			//   default: []
			// }
		},
		data() {
			return {
				goodsObj: '',
				list: []
			}
		},
		mounted() {
			this.getPageLayoutList()
		},
		methods: {
			goGoodsDetail(item) {
				if(item.type == 1){
					uni.navigateTo({
						url:'/pages/common/webview/webview?url='+item.url
					})
				} else {
					uni.navigateTo({
						url:'/pages/order/goodsDetail/goodsDetail?shopId='+item.shopId + '&goodsId='+ item.id
					})
				}
				
			},
			// 获取严选好物列表
			getPageLayoutList() {
				let data = {
					parentId: '1-5'
				}
				getPageLayout(data).then(res => {
					if (res.code === '1000') {
						let list = res.data.list
						this.list = res.data.list
						list.forEach(item => {
							if (item.componentType === 5) {
								item.goodsDetailRespList.forEach(item => {
									item.valueAddr = item.valueAddr.substring(0,5)
								})
								this.goodsObj = item
							}
						})
					}
				})
			},
			toForeach(item) {
				let arr = []
				if (item.list) {
					item.list.forEach(item => {
						arr.push(item)
					})
				}
				return arr
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods {
		background: #F7F7F7;
		padding-bottom: 160upx;

		.title {
			text-align: center;
			padding: 5upx 0;
			margin: 0 auto;
			margin-top: 20upx;
			width: 265upx;
			height: 43upx;

			>img {
				width: 100%;
				height: 100%;
			}
		}

		.items {
			margin: 0 30upx;

			ul {
				li:nth-of-type(even) {
					margin-left: 16upx;
				}

				li {
					background: #fff;
					border-radius: 10upx;
					margin-top: 20upx;
					width: 340upx;
					height: 520upx;
					overflow: hidden;

					.content {
						// padding: 20upx;

						.cf {
							padding: 0 10upx;
							.flr {
								position: relative;
								left: -10upx;
								top: 10upx;
							}
						}

						.name {
							margin: 10upx 20upx 20upx 20upx;
							font-size: 28upx;
							height: 76upx;
							
						}
					}

					.img {
						width: 340upx;
						height: 356upx;
						overflow: hidden;

						>img {
							width: 100%;
							height: 100%;
						}
					}
				}



			}
		}
	}
</style>
