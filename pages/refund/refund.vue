<template>
	<view class="refund">
    <view class="list" v-if="list.length>0">
      <view v-for="(item,index) in list" :key="item.id + index" class="li" >
        <view class="company">
          <image src="/static/imgs/icon-shop.png" mode=""></image>
          <text>{{item.shopName}}</text>
        </view>
        <view class="good">
          <view class="photo">
            <image :src="item.imgUrl" mode=""></image>
          </view>
          <view class="content">
            <view class="good-title">{{item.goodsName}}</view>
            <view class="good-attr"></view>
            <view class="good-price">退款: <text class="text-red fs32">￥{{item.refundMoney}}</text></view>
          </view>
        </view>
        <view class="reason">
          {{item.statusReason}}
        </view>
        <view class="btn" @click="navToDetail(item.id)">
          查看详情
        </view>
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
		getRefundList,
	} from "@/api/refund.js";
	import T from '@/utils/tips.js'
	var vm = {
		data() {
      vm = this
			return {
        businessType: /*1:卖家;2:买家*/ '1',
				loading: false,
				search: {
					pageIndex: 1,
					pageSize: 10,
          status: '', //-1 关闭 0 取消 1 新建 2商家审核中 3商家审核通过 4 商家审核不通过 5 平台审核 6 平台审核通过 7 平台审核不通过 8 进行中 9 平台退款失败 默认查全部
				},
				list: [],
				platform: '0'
			};
		},
		onLoad(options) {
			vm.businessType = options.businessType
		},
		onReachBottom() {
			this.loadMore()
		},
		onShow() {
      vm.list = []
      // 如果认证状态，打回认证
      if(uni.getStorageSync('needIdentify')){
        return uni.navigateTo({
          url: '/pages/middle/identity/identity'
        })
      }
			// 设备样式兼容
			vm.platform = uni.getStorageSync('platform')
      vm.load()
      
		},
		methods: {
      navToDetail(id){
        uni.navigateTo({
          url: '/pages/refund/detail?id=' + id + '&businessType=' + vm.businessType
        })
      },
			load() {
				getRefundList(Object.assign(vm.search,{businessType:vm.businessType})).then(data => {
					if (data.code == '1000') {
						vm.list = vm.list.concat(data.data.records)
						vm.loading = vm.list.length < data.data.total
					} else {
						T.tips(data.message || '操作失败')
					}

				});
			},
			loadMore() {
				if (vm.loading) {
					vm.search.pageIndex++
					vm.load()
				}

			},
		}
	}
  export default vm
</script>

<style lang="scss" scoped>
  .title{
    color: #333;
    font-size: 28upx;
  }
  .refund{
    
    min-height: 100vh;
    background: #f5f5f5;
    .center-p{
      text-align: center;
      padding: 20upx 0;
     }
    .no-data{
      padding-top: 300upx;
      font-size: 32upx;
      color: #000;
      text-align: center;
      image{
        width: 200upx;
        height: 200upx;
        margin-bottom: 20upx;
      }
    }
    .li{
      padding: 30upx 30upx 140upx 30upx;
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
        @extend .title;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        image{
          margin-right: 10upx;
          width: 40upx;
          height: 40upx;
        }
      }
      .content{
        flex-grow: 1;
        height: 200upx;
        position: relative;
      }
      .photo{
        width: 200upx;
        height: 200upx;
        border-radius: 20upx;
        margin-right: 20upx;
        overflow: hidden;
        image{
          width: 200upx;
          height: 200upx;
        }
      }
      .good-desc{
        position: relative;
      }
      .good-attr{
        position: absolute;
        top: 70upx;
      }
      .good-price{
        position: absolute;
        bottom: 0;
        font-size: 28upx;
      }
      .reason{
        border-radius: 20upx;
        background: #f5f5f5;
        line-height: 90upx;
        margin-top: 30upx;
        color: #999;
        font-size: 24upx;
        padding: 0 30upx;
        // margin-bottom: 100upx;
      }
      .btn{
        width: 190upx;
        line-height: 64upx;
        border-radius: 64upx;
        font-size: 32upx;
        color: #000;
        border: 1px solid #d9d9d9;
        text-align: center;
        float: right;
        margin-top: 40upx;
      }
    }
  }
</style>
