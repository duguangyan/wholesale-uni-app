<template>
	<view>
		<div class="search">
			<div class="top cf">
				<div class="search fll">
					<div class="icon-30">
						<img :class="{'platform':platform==2}" src="@/static/img/icon-search2.png" />
					</div>
					<input class="fs28" v-model="search" placeholder="输入商品名称" />
				</div>
				<div class="flr">
					<div class="icon fs28 text-333" @click="toSearch($event)">搜索</div>
				</div>
			</div>

			<div class="history">
				<div class="title">
					<span>历史搜索</span>
					<div class="icon-20">
						<img v-if="records.length > 0" src="@/static/img/icon-delete.png" width="20" height="20" @click="delRecord($event)" />
					</div>

				</div>
				<div class="list">
					<li v-for="(item,index) in records" :key="index" @click="toSearch($event,item)">{{item}}</li>
				</div>
			</div>
		</div>
		<Dialog :title='title' :isShow='isShow' @doConfirm="doConfirm" @doCancel="doCancel"> </Dialog>
	</view>
</template>

<script>
	import Dialog from '@/components/common/Dialog.vue'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				title: '确认删除所有历史记录吗?',
				isShow: false,
				search: "",
				records: [],
				loading: false,
				index: '',
				platform: 0,
			};
		},
		components:{
			Dialog
		},
		onLoad() {
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
		},
		onShow() {
			this.getRecord();
		},
		methods: {
			doConfirm() {
				let records = this.records;
				if (this.index == 1) {
					index = records.indexOf(item);
					records.splice(index, 1);
					uni.setStorageSync("records", JSON.stringify(records));
				} else {
					records.splice(0, records.length);
					uni.setStorageSync("records", JSON.stringify(records));
				}
				this.isShow = false
			},
			doCancel() {
				this.isShow = false
			},
			toSearch(e, data) {
				if (data) {
					this.search = data;
				}
				if (!this.search) {
					return T.tips("请输入搜索内容");
				}
				this.setRecord(this.search);
				uni.navigateTo({
					url:'/pages/order/goodsList/goodsList?search='+this.search
				})
			},
			getRecord() {
				let records = uni.getStorageSync("records");
				if (records) {
					try {
						records = JSON.parse(records);
					} catch (e) {
						return console.log(e);
					}
					if (records instanceof Array) {
						this.records = records;
					}
				}
			},
			setRecord(item) {
				let records = this.records;
				let index = records.indexOf(item);
				if (index > -1) {
					records.splice(index, 1);
				}
				records.unshift(item);
				uni.setStorageSync("records", JSON.stringify(records));
			},
			delRecord(e, item) {
				let records = this.records;
				let index;
				if (item !== undefined) {
					this.index = 1
				} else {
					this.index = 2
				}
				this.isShow = true
			}
		}
	}
</script>


<style lang="scss" scoped>
	.search {
		width: 750upx;
		overflow-x: hidden;
		background: #fff;
		height: 100vh;
		li {
			list-style: none;
		}

		.icon-20 {
			width: 40upx;
			height: 40upx;
			position: relative;
			left: -82upx;

			>img {
				width: 100%;
				height: 100%;
			}
		}

		.top {
			position: relative;

			.search {
				width: 590upx;
				height: 60upx;
				border-radius: 60upx;
				background-color: #F5F5F5;
				position: relative;
				left: 30upx;
				top: 10upx;
				overflow: hidden;

				input {
					position: absolute;
					top: 14upx;
					left: 68upx;
					width: 84%;
					height: 40upx;
					min-height:40upx;
					font-size: 28upx;
					overflow: hidden;
					text-align: left;
				}

				.icon-30 {
					width: 36upx;
					height: 36upx;
					position: absolute;
					left: 20upx;
					top: 8upx;

					>img {
						width: 100%;
						height: 100%;
					}
				}
				
				/* #ifdef APP-PLUS || APP-PLUS-NVUE */
				.icon-30 {
					width: 30upx;
					height: 30upx;
					top: 12upx;
				}
				/* #endif */
				
				.platform{
					position: relative;
					top: -10upx;
				}
			}

			.fll {
				text-align: center;
			}

			.flr {
				position: absolute;
				right: 40upx;
				top: 20upx;
			}
		}

		.history {
			width: 100%;
			margin-top: 44upx;
			padding: 0 30upx;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 32upx;
				font-size: 24upx;
				color: #666;
			}

			img {
				vertical-align: top;
			}

			.records {
				display: flex;
				flex-wrap: wrap;
			}

			li {
				display: inline-block;
				padding: 10upx 26upx;
				background-color: #f4f4f4;
				border-radius: 50upx;
				color: #333;
				margin-bottom: 20upx;
				margin-right: 20upx;
				font-size: 24upx;
			}
		}
	}
</style>
