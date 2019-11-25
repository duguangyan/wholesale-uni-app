<template>
  <view class="shop">
    <div class="info">
      <div class="avatar"></div>
      <div>
        <div class="shop-name fs30"></div>
        <div class="shop-cla fs24"></div>
        <div class="shop-ad fs24"></div>
      </div>
    </div>
    <div class="goods"></div>
  </view>
</template>

<script>
import { getList, getShopInfo } from '@/api/goodsApi.js';
import Good from '@/components/common/Good.vue';

var vm = {
  data() {
    return {
      shopInfo: {
        shopName: '',
        categoryName: '',
        address: ''
      },
      list: [],
      shopId: ''
    };
  },
  methods: {
    load(){
      getList({
        shopId: vm.shopId
      }).then(data=>{
        
      })
    }
  },
  components: {
    Good
  },
  onLoad(options) {
    vm.shopId = options.shopId
    
    // 加载店铺信息
    getShopInfo({
      shopId: vm.shopId
    }).then(data=>{
      let info = data.data
      vm.shopName = info.name
      vm.categoryName = info.categoryName
      vm.address = `${info.province}${info.city}${info.region}${info.address}`
    })
    
    // 加载商品信息
    
  },
  
};
export default vm
</script>

<style>
.shop {
  .info {
    height: 160upx;
    background-color: #fe3b0b;
    padding: 30upx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .avatar {
      border-radius: 50%;
      overflow: hidden;
    }
    .shop-name {
      margin-bottom: 10upx;
    }
    .shop-cla {
      margin-bottom: 8upx;
    }
    .shop-ad {
    }
  }
}
</style>
