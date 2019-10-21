<template>
	<!--  精品严选  -->
	<div class="goods">
		<div class="title">
			<img :src="list[0].list[0].imgPath" alt="图片">
		</div>

		<div class="items">
			<ul class="cf">
				<li class="fll" @click="goGoodsDetail(item)" v-for="(item,index) in goodsObj.goodsDetailRespList" :key="index">
					<div class="img">
						<img :src="item.imgUri" alt="图片">
					</div>
					<div class="content">
						<div class="name ellipsis-line2">{{item.name}}</div>
						<div class="cf">
							<div class="fll text-red fs36"><span class="fs-14">￥</span>{{item.minPrice}}</div>
							<div class="flr text-999 fs24">{{item.valueAddr}}</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
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
				 this.$router.push({ path: 'gooddetail/' + item.shopId +'/'+item.id})
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
			padding: 30upx 0;
			margin: 0 auto;
			margin-top: 40upx;
			width: 300upx;
			height: 40upx;

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
					border-radius: 20upx;
					margin-top: 20upx;
					width: 340upx;
					height: 520upx;
					overflow: hidden;

					.content {
						padding: 10upx;

						.cf {
							.flr {
								position: relative;
								left: -10upx;
								top: 10upx;
							}
						}

						.name {
							margin: 10upx 0 20upx 0;
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
