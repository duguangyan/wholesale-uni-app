<template>
  <view class="proc-home">
    <view class="nav">
      <view class="more" @click="isCategory = true">
        <image src="/static/imgs/icon-more.png" mode=""></image>
      </view>
      <view :class="['item',search.categoryId == nav.id?'actived':'']" v-for="(nav,index) in navs" :key="index" @click="changeCategory(nav.id)">
        {{nav.name}}
      	<view class="tag"></view>
      </view>
    </view>
    
    <view class="list">
      <view class="li" v-for="(item,index) in list">
        <view class="kind">品&emsp;&nbsp;种:<text>{{item.categoryName}}</text></view>
        <view class="nums">采购数量:<text>{{item.quantity}}</text></view>
        <view class="require">采购需求:<text>{{item.packRequire}}</text></view>
        <view class="master">发&ensp;布&ensp;人:<text>{{item.realName}}</text></view>
        <view class="time">{{item.auditTime}}</view>
        <view :class="['state',item.status==3?'done':'']" @click="navToDetail(item.id)">
          {{item.status==3?'已报价':'去报价'}}
        </view>
        <view class="iden">
          <image class="icon" src="/static/imgs/icon-iden.png" mode=""></image>
          <image class="icon-text" src="/static/imgs/icon-iden-text.png" mode=""></image>
          <image class="icon" src="/static/imgs/icon-check.png" mode=""></image>
          <image class="icon-text" src="/static/imgs/icon-check-text.png" mode=""></image>
        </view>
      </view>
    </view>
    
    <view class="icon-publish" @click="navToPublishPro">
      <image src="/static/imgs/icon-publish-proc.png" mode=""></image>
    </view>
    
    <view class="dialog" v-if="isCategory">
      <view class="mask" @click="isCategory = false"></view>
      <view class="body">
        <view v-for="nav in navs" :class="['li',nav.id==search.categoryId?'actived':'']" @click="changeCategory(nav.id)">{{nav.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import {getClassify,getProcurementList,newPublish,republish} from '@/api/procurement.js'
  var vm = {
    data(){
      vm = this
      return {
        isCategory: false,
        navs: [],
        list: [],
        search: {
          pageIndex: 1,
          pageSize: 20,
          categoryId: '', // 采购品类
          phone: '', //采购人手机
          realName: '', // 采购人姓名
          status: '', //状态 1 新建 2 审核中 3 审核通过（上架） 4 审核不通过 5 下架
          timeEnd: '', //提交时间(止)
          timeStart: '', //提交时间(起)
          userName: '' // 采购人账号
        }
      }
    },
    onShow(){
      getClassify().then(data=>{
        data.data.unshift({
          id: '',
          name: '最新'
        })
        vm.navs = data.data
      })
      vm.load()
    },
    methods: {
      navToPublishPro(){
        return uni.navigateTo({
          url: '/pages/procurement/publishment',
        });
      },
      navToDetail(id){
        uni.navigateTo({
          url: `/pages/procurement/detail?id=${id}`
        })
      },
      publish(){
        newPublish({
          
        }).then(data=>{
          
        })
      },
      changeCategory(id){
        vm.search.categoryId = id
        vm.search.pageIndex = 1
        vm.isCategory = false
        vm.load()
      },
      load(){
        getProcurementList(Object.assign({},vm.search)).then(data=>{
          vm.list = data.data.records
        })
      },
    }
  }
  export default vm
</script>

<style lang="scss" scoped>
  .proc-home{
    .nav{
      background: #fff;
      width: 100%;
      background: #fff;
      line-height: 70upx;
      display: inline-flex;
      color: #000;
      font-size: 24upx;
      .more{
        padding-right: 30upx;
        position: absolute;
        right: 0;
        top: 0;
        image{
          width: 44upx;
          height: 44upx;
        }
        
      }
      .item{
        white-space: nowrap;
        padding: 0 60upx;
        position: relative;
      }
      .tag{
        width: 36upx;
        height: 6upx;
        background: #FE3B0B;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        opacity: 0;
      }
      .actived{
        .tag{
          opacity: 1;
        }
        color: #FE3B0B;
        
      }
      
    }
    
    .list{
      padding: 30upx;
      .li{
        background: #fff;
        border-radius: 20upx;
        overflow: hidden;
        padding: 30upx 20upx;
        margin-bottom: 20upx;
        position: relative;
        .kind{
          color: #333;
          font-size: 30upx;
          margin-bottom: 20upx;
          text{
            margin-left: 20upx;
          }
        }
        .nums,
        .require,
        .master
        {
          margin-bottom: 20upx;
          color: #999;
          font-size: 24upx;
          text{
            color: #333;
            margin-left: 20upx;
          }
        }
        .iden{
          display: flex;
          margin-top: 46upx;
          justify-content: flex-start;
          align-items: center;
          .icon{
            // margin-right: 4upx;
            width: 22upx;
            height: 22upx;
          }
          .icon-text{
            width: 82upx;
            height: 22upx;
            margin-right: 20upx;
          }
          text{
            margin-right: 20upx;
            
          }
          color: #333;
          font-size: 24upx;
        }
        .time{
          right: 20upx;
          top: 30upx;
          position: absolute;
          color: #999;
          font-size: 20upx;
          
        }
        .state{
          width: 140upx;
          line-height: 52upx;
          height: 52upx;
          text-align: center;
          color: #fff;
          background: #FE3B0B;
          border: 1px solid #FE3B0B;
          border-radius: 54upx;
          position: absolute;
          bottom: 44upx;
          right: 20upx;
          font-size: 28upx;
          &.done{
            background: #fff;
            border: 1px solid #999;
            color: #333;
            
          }
        }
      }
    }
    
    .icon-publish{
      position: fixed;
      bottom: 80upx;
      right: 50upx;
      width: 120upx;
      height: 120upx;
      overflow: hidden;
      border-radius: 50%;
      image{
        width: 120upx;
        height: 120upx;
      }
    }
    .dialog{
      .body{
        position: fixed;
        z-index: 2;
        bottom: 0;
        right: 0;
        width: 100%;
        background: #fff;
        padding: 0 20upx;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .li{
          padding: 20upx 30upx;
          color: #202020;
          font-size: 28upx;
        }
        .actived{
          color: #FE3B0B;
        }
      }
    }
  }
</style>
