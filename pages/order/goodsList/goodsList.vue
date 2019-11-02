<template>
	<div class="list">
		<div class="top cf">
			<div class="search fll">
				<div class="icon-30">
					<img src="@/static/img/icon-search2.png" width="15" height="15" alt />
				</div>
				<input class="fs28" v-model="search.keywords" :placeholder="search.keywords || '请输入搜索内容'" />
			</div>
			<div class="flr">
				<div class="icon fs28 text-333" @click="doSearch($event)">搜索</div>
			</div>
		</div>

		<div class="sort-bar" :class="{'platform':platform==2, 'Android': platform == 1}">
			<div :class="['general',curOpt==='gen-asc' || curOpt==='gen-desc'?'actived':'']" @click="doUniSort">
				<span>综合排序</span>
				<!-- <img class="upon" :src="curOpt==='gen-asc'?icon.UponAct:icon.Upon" />
				<img class="downon" :src="curOpt==='gen-desc'?icon.DownonAct:icon.Downon"/> -->
			</div>
			<div :class="['fil-price',(curOpt==='pri-desc'||curOpt==='pri-asc')?'actived':'']" @click="doPriceSort">
				<span>价格</span>
				
				<img class="upon" :src="curOpt==='pri-asc'?icon.UponAct:icon.Upon"/>
				<img class="downon" :src="curOpt==='pri-desc'?icon.DownonAct:icon.Downon"/>
			</div>
			<div :class="['filter',(search.priceBegin || search.priceEnd || search.place)?'actived':'']" @click="isShow = true">
				<span>筛选</span>
				<img class='icon-sx' :src="(search.priceBegin || search.priceEnd || search.place)?icon.FilterAct:icon.Filter" alt width="8" height="10" />
			</div>
		</div>

		<div class="list" v-if="!hasData">
			<Good v-for="(item,index) in list" :key="index" :item="item" :level="2" />
			<p class='center-p fs20 text-999'>{{loading?'数据加载中...':'数据加载完毕'}}</p>
		</div>
		<div class="no-data" v-if="hasData">
			<img src="@/static/img/icon-search-no.png">
			<p class="fs24 text-999">哦噢，没有搜到您的商品 换个关键词试试</p>
		</div>
		<Panel :show="isShow" @close="panelClose" @filter="doFilter" />
	</div>
</template>

<script>
	import Panel from "@/components/search/Panel.vue";
	import Upon from "@/static/img/icon-upon.png";
	import Downon from "@/static/img/icon-downon.png";
	import Filter from "@/static/img/icon-filter.png";
	import UponAct from "@/static/img/icon-upon2.png";
	import DownonAct from "@/static/img/icon-downon2.png";
	import FilterAct from "@/static/img/icon-filter2.png";
	import Good from "@/components/common/Good.vue";

	import {
		getList
	} from "@/api/goodsApi.js";
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				loading: false,
				hasData: false,
				search: {
					// attrValueList: ["string"],
					platform:0,
					keywords: '',
					pageIndex: 1,
					pageSize: 10,
					place: "",
					priceBegin: "",
					priceEnd: "",
					sortColumn: /* 综合:universal 价格：price */ "universal",
					sortType: /* 排序类型（0.降序 1.升序） */ 0
				},
				list: [],
				icon: {
					Upon,
					Downon,
					Filter,
					UponAct,
					DownonAct,
					FilterAct
				},
				curOpt: "gen-desc",
				isShow: false,
				platform: 0
			};
		},
		components: {
			Panel,Good
		},
		onLoad(options) {
			this.search.keywords = options.search
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			this.load();
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			
			doSearch(){
				this.pageIndex = 1
				this.list = []
				this.load();
			},
			panelClose() {
				this.isShow = false;
			},
			triFilter() {
				this.curOpt = "filter";
				this.isShow = true;
			},
			doPriceSort() {
				this.search.sortColumn = "price";
				if (this.curOpt === "pri-desc") {
					this.curOpt = "pri-asc";
					this.search.sortType = 1;
				} else {
					this.curOpt = "pri-desc";
					this.search.sortType = 0;
				}
				
				this.search.pageIndex = 1;
				this.list = [];
				this.load();
			},
			doUniSort() {
				this.search.sortColumn = "universal";
				if (this.curOpt === "gen-desc") {
					this.curOpt = "gen-asc";
					//this.search.sortType = 1;
				} else {
					this.curOpt = "gen-desc";
					//this.search.sortType = 0;
				}
				this.search.sortType = 1;
				this.search.pageIndex = 1;
				this.list = [];
				this.load();
			},
			load() {
				let params = {};
				for (let k in this.search) {
					if (this.search[k] !== "") {
						params[k] = this.search[k];
					}
				}
				getList(params).then(data => {
					if(data.code == '1000'){
						
						this.list = this.list.concat(data.data.records)
						this.hasData = this.list.length <= 0
						this.loading = this.list.length < data.data.total
					}else{
						T.tips(data.message || '操作失败')
						this.hasData = this.list.length <= 0
					}
					
				});
			},
			loadMore() {
				if(this.loading){
					this.search.pageIndex++
					this.load()
				}
				
			},
			doFilter(data) {
				this.search = Object.assign({}, this.search, data);
				this.search.pageIndex = 1;
				this.list = [];
				this.load();
				this.isShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		height: 100vh;
		background: #fff;
		.center-p{
			text-align: center;
			margin: 20upx 0;
		}
		.no-data{
			text-align: center;
			margin-top: 150upx;
			>p{
				width: 220upx;
				margin: 0 auto;
			}
			>img{
				width: 240upx;
				height: 240upx;
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
					top: 12upx;
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
					left: 22upx;
					top: 6upx;

					>img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.fll {
				text-align: center;
			}

			.flr {
				position: absolute;
				right: 30upx;
				top: 20upx;
			}
		}

		.icon-30{
			width: 30upx;
			height: 30upx;
			>img{
				width: 100%;
				height: 100%;
			}
		}
		li {
			list-style: none;
		}

		.sort-bar {
			height: 120upx;
			display: flex;
			padding: 0 30upx;
			align-items: center;
			justify-content: space-between;
			color: #999;
			font-size: 28upx;
			.icon-sx{
				width: 16upx;
				height: 20upx;
			}
			.general,
			.fil-price,
			.filter {
				position: relative;

				&.actived {
					color: #000;
					font-size: 28upx;
				}

				// transition: font-size 0.2s;
			}

			.fil-price,
			.general {
				padding-right: 16upx;
			}

			.upon,
			.downon {
				position: absolute;
				right: 0;
				width: 12upx;
				height: 8upx;
			}

			.upon {
				top: 12upx;
			}

			.downon {
				bottom: 12upx;
			}
			
			.Android{
				.upon {
					top: 8upx;
				}
				
				.downon {
					bottom: 8upx;
				}
			}
			
			/* #ifdef APP-PLUS */  
			// .upon {
			// 	top: 8upx !important;
			// }
			
			// .downon {
			// 	bottom: 8upx !important;
			// }
			/* #endif */
		
		}
		// .platform{
		// 	.upon {
		// 		top: 4upx !important;
		// 	}
			
		// 	.downon {
		// 		bottom: 4upx!important;
		// 	}
			
		// }
	}
</style>
