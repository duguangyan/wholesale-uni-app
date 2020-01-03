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
  
	<div class="operator flex">
		<div class="flex-1 li" @click="goChat">聊一聊</div>
		<div class="flex-1" @click="makeCall">联系货主</div>
	</div>
  
  </div>
</template>

<script>
import { getList, getShopInfo } from '@/api/goodsApi.js';
import { getImToken } from '@/api/userApi.js'
import Good from '@/components/common/Good.vue';

var vm = {
  data() {
    vm = this;
    return {
      shopInfo: {
        shopName: '',
        categoryName: '',
        address: '',
        area: '',
		userId:'',
		userName:'',
		phone:''
      },
      list: [],
      shopId: '',
      pageIndex: 1,
      isLoadMore: true,
      totalProduct: 0
    };
  },
  methods: {
	  // 去聊天窗口
	  goChat(){
		  getImToken().then(res => {
		  	if (res.code == "1000") {
		  		let id  = uni.getStorageSync('uid')
		  		let tk  = res.data
				let tid = this.shopInfo.userId
		  		let url = 'http://im.qinlvny.com/#/chat/p2p-' + tid + '?id=' + id + '&tk=' + tk
		  		console.log('url', url)
		  		uni.navigateTo({
		  			url: '/pages/user/chat/chat?url=' + url
		  		})
		  	} else {
		  		T.tips("请求IM数据失败")
		  	}
		  
		  })
	  },
	  // 联系货主，拨打电话
	  makeCall(){
		  uni.makePhoneCall({
		  	phoneNumber: this.shopInfo.phone
		  })
	  },
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
      let info                 = data.data;
      vm.shopInfo.shopName     = info.name;
      vm.shopInfo.categoryName = info.categoryName;
      // vm.shopInfo.address = `${info.province}${info.city}${info.region}`;
      vm.shopInfo.area         = info.area
      vm.shopInfo.userId       = info.userId
      vm.shopInfo.userName     = info.userName
      vm.shopInfo.phone        = info.phone
	  
    });

    // 加载商品信息
    vm.load();
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.shop {
	padding-bottom: 100upx;
	.operator{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background: #fff;
		z-index: 9999;
		.li{
			border-right:1upx solid #f5f5f5;
		}
	}
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
