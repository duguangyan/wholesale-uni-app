<template>
	<view class="company">
		<view v-for="(item,index) in list" :key="index" @click="navToList(item.shopId)">
      <view class="avatar">
        <img :src="item.url || '/static/imgs/shop-avatar.png'" alt="">
      </view>
      <view class="">
        <view class="text-000 fs30">{{item.realName}}</view>
        <view class="fs24 text-999 mt10">{{item.categoryName}}</view>
      </view>
    </view>
	</view>
</template>

<script>
  import { getCompany } from '@/api/goodsApi.js'
	export default {
		data() {
			return {
				list: []
			};
		},
    methods: {
      navToList(id){
        uni.navigateTo({
        	url: '/pages/order/goodsList/goodsList?shopId=' + id
        })
      }
    },
    onLoad(options){
      getCompany({
        categoryId: options.categoryId
      }).then(data=>{
        console.log(data)
        this.list = data.data.records
      })
    }
	}
</script>

<style lang="scss">
  .company{
    &>view{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 140upx;
      width: 100%;
      background: #fff;
      padding: 0 30upx;
    }
    .avatar{
      width: 90upx;
      height: 90upx;
      background-color: #F5F5F5;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 20upx;
    }
    img{
      width: 90upx;
      height: 90upx;
    }
    .mt10{
      margin-top: 10upx;
    }
  }
</style>
