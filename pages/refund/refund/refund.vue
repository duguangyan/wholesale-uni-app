<template>
	<div class="list">
		<div class="top cf">
			<div class="search fll">
				<div class="icon-30">
					<img src="@/static/img/icon-search2.png" width="15" height="15" alt />
				</div>
				<input class="fs28" type='text' confirm-type="search" @confirm="doSearch($event)" v-model="search.keywords"
				 :placeholder="search.keywords || '请输入搜索内容'" />
			</div>
			<div class="flr">
				<div class="icon fs28 text-333" @click="doSearch($event)">搜索</div>
			</div>
		</div>

		<div class="list" v-if="!hasData">
			<Good v-for="(item,index) in list" :key="item.id" :item="item" :level="2" />
			<p class='center-p fs20 text-999'>{{loading?'数据加载中...':'数据加载完毕'}}</p>
		</div>
    
		<div class="no-data" v-if="hasData">
			<img src="@/static/imgs/serach-1.png">
			<p class="fs28 text-999">哦噢，没有搜到您的商品 换个关键词试试</p>
		</div>
	</div>
</template>

<script>

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
					pageIndex: 1,
					pageSize: 10,
				},
				list: [],
				platform: '0'
			};
		},
		onLoad(options) {
			
		},
		onReachBottom() {
			this.loadMore()
		},
		onShow() {
      // 如果认证状态，打回认证
      if(uni.getStorageSync('needIdentify')){
        return uni.navigateTo({
          url: '/pages/middle/identity/identity'
        })
      }
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform')
		},
		methods: {

		
			load() {
				let params = {};
				for (let k in this.search) {
					if (this.search[k] !== "") {
						params[k] = this.search[k];
					}
				}
				getList(params).then(data => {
					if (data.code == '1000') {

						this.list = this.list.concat(data.data.records)
						this.hasData = this.list.length <= 0
						this.loading = this.list.length < data.data.total
					} else {
						T.tips(data.message || '操作失败')
						this.hasData = this.list.length <= 0
					}

				});
			},
			loadMore() {
				if (this.loading) {
					this.search.pageIndex++
					this.load()
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
