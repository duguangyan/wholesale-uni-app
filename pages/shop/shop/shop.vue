<template>
  <div class="shop">
    <div class="info">
      <div class="avatar"><img src="../../../static/imgs/shop-avatar.png" width="100%" alt="" /></div>
      <div>
        <div class="shop-name fs30">{{ shopInfo.shopName }}</div>
        <div class="shop-cla fs24">主营:&nbsp;{{ shopInfo.categoryName }}</div>
        <div class="shop-ad fs24">经营地:&nbsp;{{ shopInfo.area }}</div>
      </div>
    </div>
    <div class="count fs30 text-999">供应({{ totalProduct }})</div>
    <div class="list"><Good v-for="(item, index) in list" :key="item.id" :item="item" :level="2" scoped="shop" /></div>
  </div>
</template>

<script>
import { getList, getShopInfo } from '@/api/goodsApi.js';
import Good from '@/components/common/Good.vue';

var vm = {
  data() {
    vm = this;
    return {
      shopInfo: {
        shopName: '',
        categoryName: '',
        address: '',
        area: ''
      },
      list: [],
      shopId: '',
      pageIndex: 1,
      isLoadMore: true,
      totalProduct: 0
    };
  },
  methods: {
    load() {
      getList({
        shopId: vm.shopId,
        pageIndex: vm.pageIndex
      }).then(data => {
        vm.pageIndex++;
        vm.list = data.data.records;
        vm.totalProduct = data.data.total;
      });
    },
    loadMore() {
      if (vm.isLoadMore) {
        getList({
          shopId: vm.shopId,
          pageIndex: vm.pageIndex
        }).then(data => {
          if(data.data.records.length>0){
            vm.pageIndex++;
            vm.list = vm.list.concat(data.data.records);
          }else{
            vm.isLoadMore = false
          }
          
        });
      }
    }
  },
  components: {
    Good
  },
  onReachBottom() {
    vm.loadMore();
  },
  onLoad(options) {
    vm.shopId = options.shopId;
  },
  onShow() {
    vm.pageIndex = 1;
    // 加载店铺信息
    getShopInfo({
      shopId: vm.shopId
    }).then(data => {
      let info = data.data;
      vm.shopInfo.shopName = info.name;
      vm.shopInfo.categoryName = info.categoryName;
      // vm.shopInfo.address = `${info.province}${info.city}${info.region}`;
      vm.shopInfo.area = info.area
    });

    // 加载商品信息
    vm.load();
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.shop {
  .count {
    line-height: 70upx;
    padding-left: 30upx;
    background-color: #f5f5f5;
  }
  .info {
    height: 130upx;
    background-color: #fe3b0b;
    padding: 40upx 0 0 30upx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: #fff;
    line-height: 1;
    .avatar {
      width: 90upx;
      height: 90upx;
      border-radius: 50%;
      overflow: hidden;
      background-color: #fff;
      margin-right: 30upx;
    }
    .shop-name {
      margin-bottom: 16upx;
      font-weight: 700;
    }
    .shop-cla {
      margin-bottom: 8upx;
    }
    .shop-ad {
    }
  }
}
</style>
