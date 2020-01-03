<template>
	<div class="refund">
		<div class="top cf">
			
		</div>

		<div class="list" v-if="list.length>0">
			<p class='center-p fs20 text-999'>{{loading?'数据加载中...':'数据加载完毕'}}</p>
		</div>
    
		<div class="no-data" v-else>
			<img src="/static/imgs/img-no-fund.png">
			<p class="fs28 text-999">啊哦,没有退款中数据哦,继续保持^^</p>
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
  .refund{
    .no-data{
      padding-top: 300upx;
      font-size: 32upx;
      color: #000;
      text-align: center;
      img{
        width: 200upx;
        margin-bottom: 20upx;
      }
    }
  }
</style>
