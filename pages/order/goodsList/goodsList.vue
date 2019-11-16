<template>
	<div class="list">
		<div class="top cf">
			<div class="search fll">
				<div class="icon-30">
					<img src="@/static/img/icon-search2.png" width="15" height="15" alt />
				</div>
				<input class="fs28" type='text' confirm-type="search" @confirm="reset()" v-model="search.keywords" :placeholder="search.keywords || '请输入搜索内容'" />
			</div>
			<div class="flr">
				<div class="icon fs28 text-333" @click="reset()">搜索</div>
			</div>
		</div>

		<div class="sort-bar" :class="{'platform':platform==2, 'Android': platform == 1}">
			<div :class="['general',+search.sortMark===2?'actived':'']" @click="doUniSort">
				<span>综合排序</span>
				<!-- <img class="upon" :src="curOpt==='gen-asc'?icon.UponAct:icon.Upon" />
				<img class="downon" :src="curOpt==='gen-desc'?icon.DownonAct:icon.Downon"/> -->
			</div>
			<div :class="['fil-price',+search.sortMark===1?'actived':'']" @click="doPriceSort">
				<span>价格</span>
				
				<img class="upon" :src="+search.sortType===1?icon.UponAct:icon.Upon" width="6" height="4" />
				<img
				  class="downon"
				  :src="+search.sortType===0?icon.DownonAct:icon.Downon"
				  width="6"
				  height="4"
				/>
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
	var vm = {
		data() {
      vm = this;
			return {
				loading: false,
				hasData: false,
				search: {
				  // attrValueList: ["string"],
				  keywords: '',
				  attrValueList: [],
				  pageIndex: 1,
				  pageSize: 10,
				  areaId: "",
				  priceBegin: "",
				  priceEnd: "",
				  sortMark: /* 综合:2 价格：1 */ 2,
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
			if(options.keywords){
				this.search.keywords = options.keywords;
			}else{
				this.search.attrValueList = [];
				this.search.attrValueList.push(options.attrValueList);
			}
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			this.load();
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			reset(){
        vm.search.pageIndex = 1;
        vm.load()
      },
			doSearch(){
				this.search.attrValueList = []
				this.search.pageIndex = 1
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
				this.search.sortMark = 1;
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
				this.search.sortMark = 2;
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
			load(isRecord) {
			  if (isRecord) {
			    vm.search.pageIndex = 1;
			    vm.setRecord();
			  }
			  uni.showLoading({
			      title: '加载中'
			  });
			  let params = {};
			  for (let k in vm.search) {
			    if (vm.search[k] !== "") {
			      params[k] = vm.search[k];
			    }
			  }
			
			  if(params.sortMark === 2){
			    delete params.sortType
			  }
			  getList(params).then(data => {
			    vm.list = data.data.records;
			    vm.total = data.data.total;
			    // vm.$nextTick(() => {
			    //   lazyLoad.start();
			    // });
			    uni.hideLoading();
			  });
			  ++vm.search.pageIndex;
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
  export default vm
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
