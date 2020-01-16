<template>
  <view class="refund">
    <view v-if="businessType != 2" class="filter">
      <view :class="{ actived: search.status == 8 }" @click="triLoad('8')">
        进行中({{nums}})
        <view class="line"></view>
      </view>
      <view :class="{ actived: search.status == '' }"  @click="triLoad('')">
        全部
        <view class="line"></view>
      </view>
    </view>
    <view class="list" v-if="list.length > 0">
      <view v-for="(item, index) in list" :key="index" class="li">
        <view class="company" @click="item.shopName ? navToShop(item.shopId) : ''">
          <image src="/static/imgs/icon-shop.png" mode=""></image>
          <text>{{ item.shopName || item.realName }}</text>
        </view>
        <view class="good">
          <view class="photo"><image :src="item.imgUrl" mode=""></image></view>
          <view class="content">
            <view class="good-title">{{ item.goodsName }}</view>
            <view class="good-attr">{{ item.skuDesc }}</view>
            <view class="good-price">
              退款:
              <text class="text-red fs32">￥{{ businessType == 2 ? item.refundMoney : (item.refundMoney * 100 - item.agentcyRefundMoney * 100) / 100 }}</text>
            </view>
          </view>
        </view>
        <view class="reason">{{ item.statusReason }}</view>
        <view class="btn" @click="navToDetail(item.id,item.status)">查看详情</view>
      </view>
      <view class="center-p fs20 text-999">{{ loading ? '数据加载中...' : '数据加载完毕' }}</view>
    </view>

    <view class="no-data" v-else>
      <image src="/static/imgs/img-no-fund.png" />
      <p class="fs28 text-999">啊哦,没有退款中数据哦,继续保持^^</p>
    </view>
  </view>
</template>

<script>
import { getRefundList } from '@/api/refund.js';
import T from '@/utils/tips.js';
var vm = {
  data() {
    vm = this;
    return {
      nums: -1,
      businessType: /*1:卖家;2:买家*/ '1',
      loading: false,
      search: {
        pageIndex: 1,
        pageSize: 10,
        status: '8' //-1 关闭 0 取消 1 新建 2货主审核中 3货主审核通过 4 货主审核不通过 5 平台审核 6 平台审核通过 7 平台审核不通过 8 进行中 9 平台退款失败 默认查全部
      },
      list: [],
      platform: '0'
    };
  },
  onLoad(options) {
    vm.businessType = options.businessType;
	console.log('businessType',vm.businessType)
  },
  onReachBottom() {
    this.loadMore();
  },
  onShow() {
    vm.search.status = vm.businessType == 2?'':'8'
    vm.list = [];
    // 如果认证状态，打回认证
    if (uni.getStorageSync('needIdentify')) {
      return uni.navigateTo({
        url: '/pages/middle/identity/identity'
      });
    }
    // 设备样式兼容
    vm.platform = uni.getStorageSync('platform');
    vm.load();
  },
  methods: {
    navToShop(shopId) {
      uni.navigateTo({
        url: '/pages/shop/shop?shopId=' + shopId
      });
    },
    navToDetail(id,status) {
      uni.navigateTo({
        url: `/pages/refund/detail?id=${id}&businessType=${vm.businessType}&status=${status}`
      });
    },
    triLoad(status){
      vm.search.status = status
      vm.search.pageIndex = 1
      vm.load()
    },
    load() {
      getRefundList(Object.assign(vm.search, { businessType: vm.businessType })).then(data => {
        if (data.code == '1000') {
          if(vm.search.pageIndex == 1){
            vm.list = data.data.records
            if(vm.search.status == 8){
              vm.nums = data.data.total
            }
          }else{
            vm.list = vm.list.concat(data.data.records);
          }
          
          vm.loading = vm.list.length < data.data.total;
        } else {
          T.tips(data.message || '操作失败');
        }
      });
    },
    loadMore() {
      if (vm.loading) {
        vm.search.pageIndex++;
        vm.load();
      }
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.title {
  color: #333;
  font-size: 28upx;
}
.refund {
  min-height: 100vh;
  background: #f5f5f5;
  .filter {
    background: #fff;
    line-height: 70upx;
    color: #333;
    font-size: 28upx;
    text-align: center;
    display: flex;
    view {
      flex-grow: 1;
      width: 50%;
      position: relative;
    }
    .line {
      opacity: 0;
      position: absolute;
      bottom: 0;
      width: 34upx;
      height: 6upx;
      left: 50%;
      transform: translateX(-50%);
      background: #FE3B0B;
    }
    .actived {
      color: #fe3b0b;
      .line {
        opacity: 1;
      }
    }
  }
  .center-p {
    text-align: center;
    padding: 20upx 0;
  }
  .no-data {
    padding-top: 300upx;
    font-size: 32upx;
    color: #000;
    text-align: center;
    image {
      width: 200upx;
      height: 200upx;
      margin-bottom: 20upx;
    }
  }
  .li {
    padding: 30upx 30upx 140upx 30upx;
    background: #fff;
    margin-top: 20upx;
    .icon {
      margin: 10upx;
    }
    .good-name {
      @extend .title;
    }
    .company,
    .good {
      display: flex;
      justify-content: flex-start;
    }
    .company {
      font-weight: bold;
      margin-bottom: 26upx;
      @extend .title;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      image {
        margin-right: 10upx;
        width: 40upx;
        height: 40upx;
      }
    }
    .content {
      flex-grow: 1;
      height: 200upx;
      position: relative;
    }
    .photo {
      min-width: 200upx;
      width: 200upx;
      height: 200upx;
      border-radius: 20upx;
      margin-right: 20upx;
      overflow: hidden;
      image {
        width: 200upx;
        height: 200upx;
      }
    }
    .good-desc {
      position: relative;
    }
    .good-attr {
      position: absolute;
      top: 80upx;
      font-size: 24upx;
      color: #999;
    }
    .good-price {
      position: absolute;
      bottom: 0;
      font-size: 28upx;
    }
    .reason {
      border-radius: 20upx;
      background: #f5f5f5;
      line-height: 90upx;
      margin-top: 30upx;
      color: #999;
      font-size: 24upx;
      padding: 0 30upx;
      // margin-bottom: 100upx;
    }
    .btn {
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
