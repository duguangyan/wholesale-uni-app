<template>
	<view>
		<NavigationBar title="收藏" :isClick="isClick" :clickTitle="clickTitle" @doClick="doClick"></NavigationBar>
		<div class="collection">
			

			<div class="collection-no-data" v-if="list.length<=0">
				<img src="@/static/img/icon-collection-no.png" alt="图片">
				<div class="text-999 fs28">收藏夹还没有你的收藏 已是空空如也</div>
			</div>
			<div class="list" v-if="list.length>0">
				<ul>
					<li class="cf" v-for="(item,index) in list" :key="index">
						<div class="fll icon" v-if="isEdit" @click="doListCheck(index)">
							<img :src="item.isCheck ? Checked : Uncheck" alt="icon">
						</div>
						<div class="fll img" @click="goDetail(item.id, item.goodsId)">
							<img :src="item.imgUrl" alt="图片">
						</div>
						<div class="fll ml-10 info" v-bind:class="{ 'info-edit' : !isEdit }">
							<p class="fs28 p1 ellipsis-line2">{{item.name}}</p>
							<p class="p4 text-666 fs24">{{item.skuDesc || ''}}</p>
							<p v-if="item.status !== 4" class="text-red fs28 p2">￥ <span class="fs36">{{item.price}}</span></p>
							<p v-if="item.status === 4" class="p3">下架商品</p>
						</div>
					</li>
				</ul>
				<div class="ts-center text-999 fs24 load-text">{{loadText}}</div>
			</div>
			<div class="footer" v-if="isEdit && list.length>0">
				<div class='icon'>
					<img :src="hasAllCheck ? Checked : Uncheck" width="20" height="20" @click="doCheckAll" />
				</div>

				<span>
					<span @click="doCheckAll">全选</span>
				</span>
				<div class="del" @click="preDel">删除</div>
			</div>
		</div>
		<!--  #ifdef  MP-WEIXIN -->
		<div class="btn" v-if="list.length>0" @click="edit">{{isEdit?'完成':'管理'}}</div>
		<!--  #endif -->
		
		
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import Checked from '@/static/img/icon-checked.png'
	import Uncheck from '@/static/img/icon-uncheck.png'
	import {
		getCollectGoodsList,
		getCollectGoodsRemove
	} from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	import Dialog from '@/components/common/Dialog.vue'
	import NavigationBar from '@/components/common/NavigationBar.vue'
	export default {
		data() {
			return {
				currentPage: 1,
				list: [],
				isEdit: false,
				countChecked: 0 /* 选中的计数器 */ ,
				total: 0,
				Checked,
				Uncheck,
				pageSize: 10,
				allLoaded: false,
				loadText: '上拉加载更多...',
				hasAllCheck: false,
				ids: [],
				isShow: false,
				title:'您确定从收藏夹删除吗?',
				clickTitle:'管理',
				isClick: true
			};
		},
		components:{
			Dialog, NavigationBar
		},
		onLoad() {
			// status 商品状态(-1 已删除 0待审核 1审核中  2审核驳回  3已上架   4已下架  5 锁定 6 申请解锁")
			this.getCollectionData()
		},
		onShow() {
			
		},
		onReachBottom() {
			this.loadBottom()
		},
		methods: {
			doClick(e){
				this.isEdit = !this.isEdit;
				let res = this.list.map((item) => {
					item.isEdit = this.isEdit;
					return item
				});
				this.list = res;
				this.clickTitle = this.isEdit ? '完成' : '管理';
				
			},
			doConfirm() {
				this.doDel()				
			},
			doCancel(){
				this.isShow = false
			},
			// 去详情
			goDetail(shopId, orderId) {
				uni.navigateTo({
					url:'/pages/order/goodsDetail/goodsDetail?shopId='+shopId + '&goodsId='+orderId
				})
			},
			// 全选
			doCheckAll() {
				this.ids = []
				if (this.hasAllCheck) {
					this.hasAllCheck = false
					this.list.forEach((item, index) => {
						item.isCheck = false
						this.ids = []
					})
				} else {
					this.hasAllCheck = true
					this.list.forEach((item, index) => {
						item.isCheck = true
						this.ids.push(this.list[index].goodsId)
					})
				}
			},
			// 判断是否全选
			hasAllChecked() {
				this.hasAllCheck = true
				this.countChecked = 0
				this.ids = []
				this.list.forEach((item, index) => {
					if (!item.isCheck) {
						this.hasAllCheck = false
					} else {
						this.countChecked++
						this.ids.push(this.list[index].goodsId)
					}
				})
				console.log(this.countChecked)
			},
			// 选择动作
			doListCheck(index) {
				this.list[index].isCheck = !this.list[index].isCheck
				this.hasAllChecked()
			},
			// 上拉加载更多
			loadBottom() {
				// this.$refs.loadmore.onBottomLoaded();
				setTimeout(() => {
					if (!this.allLoaded) {
						this.currentPage++;
						this.getCollectionData()
					}
				}, 500)
			},
			getCollectionData() {
				let data = {
					pageIndex: this.currentPage,
					pageSize: this.pageSize
				};
				getCollectGoodsList(data).then((res) => {
					if (res.code === '1000') {
						let total = 0;
						this.list = this.list.concat(res.data.records);
						this.total = total;
						this.isClick = this.list.length > 0;
						if (this.list.length >= res.data.total) {
							this.allLoaded = true;
							this.loadText = '数据已经加载完毕'
						}
					} else {
						T.tips(res.message || '获取收藏列表失败')
					}
				}).catch(err => {
					T.tips(err.message || '获取收藏列表失败');
				})
			},
			edit() {
				this.isEdit = !this.isEdit;
				let res = this.list.map((item) => {
					item.isEdit = this.isEdit;
					return item
				});
				this.list = res
			},
			preDel() {
				if (this.ids.length < 1) {
					return T.tips('请先选择商品!')
				}
				this.isShow = true
			},
			doDel() {
				this.isShow = false
				let goodsId = ''
				this.ids.forEach((item, index) => {
					goodsId += index === this.ids.length - 1 ? item : item + ','
				})
				let data = {
					goodsId
				}
				getCollectGoodsRemove(data).then(res => {
					if (res.code === '1000') {
						this.ids.forEach((item, index) => {
							this.list.forEach((it, i) => {
								if (item === it.goodsId) {
									this.list.splice(i, 1);
								}
							})
						});
						this.ids = []
						this.isClick = this.list.length > 0;
						// this.list = []
						// this.getCollectionData()
					} else {
						T.tips(res.message || '删除失败')
					}
				}).catch(err => {
					T.tips(err.message || '删除失败')
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.btn{
		width: 640upx;
		line-height: 80upx;
		text-align: center;
		color: #fff;
		border-radius: 40upx;
		font-size: 32upx;
		margin: 40upx auto auto;
		background: #fc2d2d;
		position: fixed;
		bottom: 120upx;
		left: 50%;
		margin-left: -320upx;
	}
	.collection {
		padding-top: 160upx;
		
		
		/*  #ifdef  MP-WEIXIN  */
		padding-top: 120upx;
		padding-bottom: 200upx;
		/*  #endif  */
		
		

		.load-text {
			padding: 20upx 0;
		}

		.top {
			position: fixed;
			top: 0;
		}

		.collection-no-data {
			text-align: center;
			padding-top: 300upx;

			>img {
				width: 240upx;
				height: 240upx;
			}

			>div {
				width: 300upx;
				line-height: 40upx;
				margin: 0 auto;
			}
		}

		min-height: 100vh;
		background-color: #f5f5f5;

		.list {
			margin-bottom: 30upx;
			overflow: auto;

			ul {
				margin-top: 20upx;

				li {
					background: #fff;
					padding: 20upx 30upx;
					border-bottom: 1upx solid #F5F5F5;
					position: relative;

					.icon {
						width: 40upx;
						height: 40upx;
						margin-right: 30upx;
						margin-top: 80upx;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.img {
						width: 200upx;
						height: 200upx;
						border-radius: 20upx;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.info {
						width: 400upx;
						margin-left: 20upx;

						.p2 {
							position: absolute;
							bottom: 20upx;
						}

						.p3 {
							display: inline-block;
							width: 120upx;
							height: 32upx;
							line-height: 32upx;
							text-align: center;
							border-radius: 28upx;
							background: #F5F5F5;
							color: #666;
							font-size: 24upx;
							position: absolute;
							bottom: 20upx;
							margin-left: -60upx;
						}

						.p4 {
							background: #F5F5F5;
							border-radius: 10upx;
							display: inline-block;
							padding: 0upx 8upx 4upx 8upx;
						}
					}

					.info-edit {
						width: 460upx;
					}
				}
			}
		}

		.ts-center {
			text-align: center;
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			display: flex;
			padding: 0 30upx;
			align-items: center;
			justify-content: flex-start;
			height: 100upx;
			transition: all .5s linear;

			.icon {
				width: 40upx;
				height: 40upx;

				>img {
					width: 100%;
					height: 100%;
				}
			}

			&>span {
				flex-grow: 1;
				color: #000;
				font-size: 24upx;
				margin-left: 20upx;
			}

			.del {
				width: 120upx;
				line-height: 60upx;
				border: 1upx solid #fc2d2d;
				color: #fc2d2d;
				font-size: 30upx;
				text-align: center;
				border-radius: 32upx;
				position: relative;
				right: 60upx;
			}
		}

		.good {
			border-bottom: 1upx solid #f0f0f0;
		}

		.footer-enter-active,
		.footer-leave-active {
			transition: 0.5s;
		}

		.footer-enter,
		.footer-leave-to {
			opacity: 0;
			transform: translateY(100%);
		}

		.footer-enter-to,
		.footer-leave {
			transform: translateY(0%);
			opacity: 1;
		}
	}
</style>
