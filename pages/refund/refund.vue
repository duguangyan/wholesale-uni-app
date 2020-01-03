<template>
	<view class="refund">
		<view class="top cf">
			
		</view>

		<view class="list" v-if="list.length>0">
      <view class="li">
        <view class="company"></view>
        <view class="good"></view>
        <view class="reason"></view>
        <view class="btn"></view>
      </view>
			<view class='center-p fs20 text-999'>{{loading?'数据加载中...':'数据加载完毕'}}</view>
		</view>
    
		<view class="no-data" v-else>
			<image src="/static/imgs/img-no-fund.png" />
			<p class="fs28 text-999">啊哦,没有退款中数据哦,继续保持^^</p>
		</view>
	</view>
</template>

<script>

	import {
		getRefundList
	} from "@/api/refund.js";
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
				let params = {
          
        };
				getRefundList(params).then(data => {
					if (data.code == '1000') {
						this.list = this.list.concat(data.data.records)
						this.loading = this.list.length < data.data.total
					} else {
						T.tips(data.message || '操作失败')
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
  .title{
    color: #333;
    font-size: 28upx;
  }
  .refund{
    min-height: 100vh;
    background: #f5f5f5;
    .no-data{
      padding-top: 300upx;
      font-size: 32upx;
      color: #000;
      text-align: center;
      image{
        width: 200upx;
        margin-bottom: 20upx;
      }
    }
    .li{
      padding: 30upx;
      background: #fff;
      margin-top: 20upx;
      .icon{
        margin: 10upx;
      }
      .good-name{
        @extend .title;
      }
      .company,
      .good{
        display: flex;
        justify-content: flex-start;
      }
      .company{
        font-weight: bold;
        margin-bottom: 26upx;
        @extend .title
      }
      .photo{
        width: 200upx;
        height: 200upx;
        border-radius: 20upx;
        margin-right: 20upx;
      }
      .good-desc{
        position: relative;
      }
      .good-attr{
        position: absolute;
        top: 70upx;
      }
      .price{
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
