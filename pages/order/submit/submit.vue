<template>
  <view>
    <div v-if="isTips" class="tips text-red fs20">
      注：订单金额不包含物流费，物流费由买家承担，请找代办商议
      <img src="@/static/imgs/icon-close3.png" alt="" @click="isTips = false" />
    </div>
    <div class="submit">
      <div class="freight-style fs32">
        <div class="bottom-line"></div>
        <div>物流方式:</div>
        <radio-group @change="changeSendType">
          <label class="radio">
            <radio value="1" checked="true" color="#FE3B0B" style="transform:scale(0.6)" />
            平台找车
          </label>
          <label class="radio">
            <radio value="2" color="#FE3B0B" style="transform:scale(0.6)" />
            自驾车辆
          </label>
        </radio-group>
      </div>
      
      

      <!-- 地址模块 -->
      <div v-show="sendType == 1" class="address" @click="navToAd">
        <image class="bg-line" src="../../../static/imgs/bg-line.png" mode=""></image>
        <div v-if="address == null" class="addAd" to="/adedit">请添加收货地址</div>
        <template v-else>
          <div class="ad-title">收货人: {{ address.name }}&emsp;{{address.phone}}</div>
          <div class="ad-det">收货地址:{{ address.province + address.city + address.region + address.address }}</div>
          <!-- <img class="tag-go" src="/static/imgs/tag-go.png" width="10" height="10" alt /> -->
        </template>
      </div>

      <div class="list" v-if="list.length > 0">
        <div v-for="(item, index) in list" :key="index">
          <div class="gray-line"></div>
          <div v-if="item.needAgentcy == 1" class="agent fs32">
            <div>找&ensp;代&ensp;办:</div>
            <!-- <input class="uni-input" placeholder="请选择代办人" readonly="readonly" /> -->
            <div :class="['uni-input', 'fs32', item.curAgent.name ? 'text-333' : 'text-999']" @click="showAgentDialog(item)">{{ item.curAgent.name || '请选择代办人' }}</div>
          </div>

          <div class="cf parent-title pdl-30">
            <!-- <div class="fll plat"><img :src="Plat" alt="图标" /></div>
            <span class="fll text">{{ item.shopName }}</span> -->
            货主: {{ item.enterpriseStatus==1?item.shopName:item.sellerName }}
          </div>
          <ul>
            <li class="cf" v-for="(it, idx) in item.goodsParamList" :key="idx">
              <div class="fll img"><img :src="it.imgUri || defaultUrl" alt="图片" /></div>
              <div class="fll mgl-20 info fs28">
                <p class="fs-16 p1 cf">
                  <span class="s1 ellipsis ellipsis-line2 fll">{{ it.goodsName }}</span>
                </p>
                <p class="text-666 fs24 cf mt-10">
                  <span class="fll p4">{{ it.skuDesc || '' }}</span>
                  <!-- <span class="flr text-999 p5">x {{ it.goodsCount }}</span> -->
                </p>
                <p v-if="item.needAgentcy == 1" class="text-333 fs32 mgt-10 agent-fee">代办费&nbsp;￥{{ it.agencyPrice }}<span class="fs24">{{ it.goodsUnit ? `/${it.goodsUnit}` : '' }}</span></p>
                <p class=" fs32 p2">
                  价格￥
                  {{ it.price }}<span class="fs24">{{ it.goodsUnit ? `/${it.goodsUnit}` : '' }}</span>
                </p>
                <p class="fs28 fixed">x{{ item.totalCount }}</p>
              </div>
            </li>
          </ul>
          <div class="others">
            <!-- <div class="freight">
              <span>运费</span>
              <span>￥{{ deliverMoney || 0 }}</span>
            </div> -->
            <div class="mark pdl-30">
              <span>留言</span>
              <input v-model="item.postscript" type="text" maxlength="100" placeholder="请输入留言信息" />
            </div>
          </div>
          <div class="calc text-red fs34 pdr-30">小计:￥{{ item.totalMoney }}</div>
        </div>
      </div>

      <div class="operator">
        <div class="nums">共&ensp;{{ totalCount }}&ensp;件</div>
        <div class="total-price fg1">
          合计:&ensp;
          <span>{{ totalMoney }}</span>
        </div>
        <div class="btn" v-bind:class="{ active: true, platform1: platform == 2 }" @click="showPay">提交订单</div>
      </div>
      <!--    // orderId：支付订单-->
      <!--    // show：支付上拉框是否弹起-->
      <!--    // isWX：是否只有微信支付-->
      <!--    // price： 支付价格-->
      <!--    // function payClose：关闭支付弹窗-->
      <!--    // function doPay: 点击支付按钮事件-->
      <Pay :orderId="payOrderId" :platform="platform" ref="pay" :show="isPay" @close="doClose" :price="totalMoney" v-on:doPay="doPay" />
      <!-- <Agent v-if="isAgent" @close="isAgent = false" :list="curItem.agentList" @change="changeAgent" /> -->
      <view v-show="isAgent" class="agent-dialog">
        <view name="mask"><view class="mask" @click="isAgent = false"></view></view>
        <view name="body" class="body">
          <view class="li" v-for="item in curItem.agentList" :key="item.id" @click="changeAgent(item)">{{ item.realName }}</view>
        </view>
        <!-- <view class="xx" @click="isAgent = false">x</view> -->
      </view>
    </div>
  </view>
</template>

<script>
import Pay from '@/components/common/Pay.vue';
// import Agent from '@/components/common/Agent.vue';
import Checked from '@/static/img/icon-checked.png';
import Uncheck from '@/static/img/icon-uncheck.png';
import Plat from '@/static/img/icon-plat.png';
import { getCartOrderList, getAddressDefAddress, getOrderCart, postCreateOrder } from '@/api/cartApi.js';
import { buyGood, getAgencyByArea } from '@/api/goodsApi.js';
import T from '@/utils/tips.js';
var vm = {
  data() {
    vm = this;
    return {
      address: '',
      curItem: {
        agentList: [],
        curAgent: {
          id: '',
          name: '',
          phone: ''
        }
      },
      isAgent: false,
      sendType: /*1 平台找车,2: 自驾车辆*/ 1,
      isTips: true,
      isBuyNow: '',
      submitData: '',
      list: [], //数据列表
      defaultUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2180358788,168891397&fm=26&gp=0.jpg',
      isPay: false,
      Checked,
      Uncheck,
      Plat,
      totalNum: 0, // 总数量
      totalMoney: 0, // 总金额
      // address: '', // 地址
      message: '', //留言
      deliverMoney: 0, // 运费
      payOrderId: '', //订单ID
      cartIdList: '', // cartlist
      totalCount: '', // 总数量
      hasSuccessShow: false,
      platform: 0,
      order: {
        shopId: '',
        orderId: ''
      }
    };
  },
  components: {
    // Agent,
    Pay
  },
  onLoad(options) {
    this.submitData = options.submitData;
    this.isBuyNow = options.isBuyNow;
    uni.removeStorage({
      key: 'dataList'
    });
  },
  onShow() {
    // 设备样式兼容
    this.platform = uni.getStorageSync('platform') * 1;
    // 上一级传递参数：结算返回的数据
    if (this.isBuyNow) {
      let submitData = JSON.parse(this.submitData);

      buyGood(submitData).then(data => {
        // this.address = data.data.address || '';
        this.order.shopId = data.data.shopList[0].shopId;

        // 如果有前任数据，替换list
        if (uni.getStorageSync('dataList')) {
          vm.list = uni.getStorageSync('dataList');
        } else {
          this.list = data.data.shopList.map(item => {
            item.agentList = [];
            item.curAgent = {
              id: '',
              name: ''
            };

            item.postscript = '';
            return item;
          });
        }

        this.totalMoney = data.data.totalMoney;
        this.deliverMoney = data.data.deliverMoney;
        this.cartIdList = data.data.cartIdList;
        this.totalCount = data.data.totalCount;

        if (uni.getStorageSync('address')) {
          this.address = JSON.parse(uni.getStorageSync('address'));
          submitData.addressId = address.id;
          setTimeout(() => {
            uni.setStorageSync('address', '');
          }, 300);
        } else {
          getAddressDefAddress().then(res => {
            if (res.code === '1000') {
              vm.address = res.data;
            }
          });
        }
      });
    } else {
      if (this.submitData) {
        let submitData = JSON.parse(this.submitData);
        this.order.shopId = submitData.shopList[0].shopId;
        if (uni.getStorageSync('dataList')) {
          vm.list = uni.getStorageSync('dataList');
        } else {
          this.list = submitData.shopList.map(item => {
            item.agentList = [];
            item.curAgent = {
              id: '',
              name: ''
            };
            item.postscript = '';
            return item;
          });
        }
        this.totalMoney = submitData.totalMoney;
        this.deliverMoney = submitData.deliverMoney;
        this.cartIdList = submitData.cartIdList;
        this.totalCount = submitData.totalCount;
      }
      // 判断是否有地址
      if (uni.getStorageSync('address')) {
        // 获取缓存地址
        this.address = JSON.parse(uni.getStorageSync('address'));
        // 根据地址获取运费
        // this.getOrderCartByAddress(this.address.id);
        setTimeout(() => {
          uni.setStorageSync('address', '');
        }, 300);
      } else {
        // 获取默认地址
        getAddressDefAddress().then(res => {
          if (res.code === '1000') {
            vm.address = res.data;
          }
        });
      }
    }
  },

  methods: {
    navToAd() {
      uni.setStorageSync('dataList', vm.list);
      uni.navigateTo({
        url: '/pages/user/addlist/addlist?from=submit'
      });
    },
    changeSendType(e) {
      vm.sendType = e.detail.value;
    },
    changeAgent(data) {
      vm.isAgent = false;
      vm.curItem.curAgent.id = data.userId;
      vm.curItem.curAgent.name = data.realName;
      vm.curItem.curAgent.phone = data.phone;
    },
    showAgentDialog(item) {
      vm.isAgent = true;
      vm.curItem = item;
      if (item.agentList.length < 1) {
        // 获取代办人
        getAgencyByArea({
          shopId: item.shopId
        }).then(data => {
          vm.curItem.agentList = data.data;
        });
      }
    },
    // 确认支付
    doPay(e) {
      this.isPay = false;
      this.hasSuccessShow = true;
    },
    // 关闭支付显示
    doClose() {
      this.isPay = false;
      uni.redirectTo({
        url: '/pages/user/order/detail?orderId=' + this.order.orderId + '&shopId=' + this.order.shopId
      });
    },
    // 显示支付
    showPay() {
      if (this.sendType == 1 && !this.address) {
        T.tips('请选择收货地址');
        return false;
      }

      let resList = [...vm.list];
      let status = true;
      resList.map(item => {
        if (item.needAgentcy == 1) {
          status = !!item.curAgent.id;
          item.agentcyUserId = item.curAgent.id;
        }

        item.phone = item.curAgent.phone;
        item.sendType = vm.sendType;

        if (vm.sendType == 1) {
          item.addressId = vm.address.id;
        }
        item.addre;
        return item;
      });
      if (!status) {
        return T.tips('请选择代办人');
      }

      let list = {
        shopParamList: resList,
        // postscript: this.message,
        // addressId: this.address.id,
        cartIdList: vm.cartIdList
      };

      // if(this.sendType == 1){
      //   list.addressId = this.address.id
      // }

      postCreateOrder(list)
        .then(res => {
          if (res.code === '1000') {
            vm.isPay = vm.curItem.curAgent.id !== '';
            vm.order.orderId = res.data[vm.order.shopId].id;
            uni.redirectTo({
              url: '/pages/order/orderSuccess/orderSuccess?shopId=' + vm.order.shopId + '&orderId=' + vm.order.orderId + '&phone=' + vm.curItem.curAgent.phone
            });
          } else {
            T.tips(res.message || '提交订单失败');
          }

          if (uni.getStorageSync('dataList')) {
            uni.removeStorage({
              key: 'dataList'
            });
          }
        })
        .catch(err => {
          T.tips(err.message || '提交订单失败');
        });
    },
    // 去详情
    goDetail(shopId, orderId) {
      uni.navigateTo({
        url: '/pages/user/order/detail?shopId=' + shopId + '&goodsId=' + orderId
      });
    },
    // 获取数据
    getCartList() {
      getCartOrderList()
        .then(res => {
          if (res.code === '1000') {
            if (res.data.cartLines && res.data.cartLines.length > 0) {
              this.list = res.data.cartLines;
              let num = 0;
              let totalMoney = 0;
              this.list.forEach((item, index) => {
                let m = false;
                item.items.forEach((it, idx) => {
                  if (it.checked === 1) {
                    m = true;
                    num += it.num;
                    totalMoney += it.totalPrice;
                  }
                });
                if (m) {
                  this.list[index].checked = 1;
                }
              });
              this.totalNum = num;
              this.totalMoney = totalMoney;
            }
          } else {
            T.tips(res.message || '获取进货单列表错误');
          }
        })
        .catch(err => {
          T.tips(err.message || '获取进货单列表错误');
        });
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
  .bottom-line{
    display: block;
    height: 1px;
    margin: 0 30upx;
    background: #f5f5f5;
    position: absolute;
    bottom: 0;
    left: 30upx;
    right: 30upx;
  }
.tips {
  line-height: 60upx;
  background: #ffefeb;
  padding-left: 30upx;
  position: relative;
  margin-bottom: 20upx;
  img {
    width: 40upx;
    height: 40upx;
    vertical-align: top;
    position: absolute;
    right: 20upx;
    top: 50%;
    transform: translateY(-50%);
  }
}
.submit {
  min-height: 100vh;
  .bg-line {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 8upx;
    bottom: 0;
  }
  .address {
    position: relative;
    height: 75px;
    background-color: #fff;
    // background-image: url();
    // background-repeat: no-repeat;
    // background-position: 0 100%;
    // background-size: 100% auto;
    // border-top: solid 1px #f0f0f0;
    padding: 0 15px;
    position: relative;
    line-height: 1;
    .tag-go {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    .addAd {
      margin-left: auto;
      margin-right: auto;
      width: 150px;
      line-height: 32px;
      text-align: center;
      border-radius: 16px;
      box-shadow: 0 0 0 1px #d9d9d9 inset;
      font-size: 14px;
      color: #000;
      transform: translateY(18px);
    }
    .ad-title {
      padding-top: 13px;
      color: #000;
      font-size: 15px;
    }
    .ad-det {
      margin-top: 6px;
      font-size: 12px;
      color: #666;
      line-height: 1.5;
      max-width: 330px;
      &::after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
      }
    }
  }
  .fixed {
    position: absolute;
    right: 30upx;
    bottom: 0;
  }
  background-color: #f0f0f0;
  
  .freight-style {
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    height: 130upx;
    padding-left: 30upx;
    // margin: 0 30upx;
    line-height: 1;
    // border-bottom: 1px solid #f0f0f0;
    
    .radio {
      margin-left: 30upx;
    }
    &>div:first-child{
      padding-bottom: 4upx;
    }
  }
  .agent {
    display: flex;
    align-items: center;
    background: #fff;
    height: 100upx;
    border-bottom: 1px solid #f5f5f5;
    // padding-left: 30upx;
    margin: 0 30upx;
    .uni-input {
      margin-left: 30upx;
      // font-size: 28upx;
    }
    // margin-bottom: 20upx;
  }
  .calc {
    line-height: 90upx;
    text-align: right;
    // padding-right: 30upx;
  }
  .list {
    /*margin-top: 50upx;*/
    margin-bottom: 120upx;
    overflow: auto;
    .count {
      position: absolute;
      bottom: 20upx;
      right: 20upx;
      display: flex;
      align-items: center;
      input {
        width: 84upx;
        height: 44upx;
        line-height: 44upx;
        background-color: #f5f5f5;
        margin-left: 8upx;
        margin-right: 8upx;
        font-size: 22upx;
        color: #333;
        text-align: center;
        border: none;
        outline: none;
      }
    }
    .parent-title {
      // margin-top: 30upx;
      padding-bottom: 30upx;
      padding-top: 30upx;
      font-size: 32upx;

      .text {
        margin-left: 20upx;
        font-size: 28upx;
        position: relative;
        top: -4upx;
      }
      .plat {
        width: 40upx;
        height: 40upx;
        position: relative;
        top: -7upx;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .parent-icon {
        width: 34upx;
        height: 34upx;
        margin: 4upx 0upx 0 30upx;
        img {
          width: 100%;
        }
      }
    }

    ul {
      li {
        background: #fff;
        padding-top: 20upx;
        position: relative;
        padding: 0 30upx;
        .icon {
          width: 34upx;
          height: 34upx;
          margin-right: 30upx;
          margin-top: 80upx;
          img {
            width: 100%;
          }
        }
        .img {
          width: 200upx;
          height: 200upx;
          border-radius: 20upx;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          width: 460upx;
          position: relative;
          height: 200upx;
          .s1 {
            width: 320upx;
          }
          .agent-fee{
            bottom: 40upx;
            position: absolute;
          }
          .p1 {
            // height: 80upx;
            .flr {
              position: relative;
              right: -20upx;
            }
          }
          .p2 {
            position: absolute;
            bottom: 0;
            color: #FE3B0B;
          }
          .p3 {
            display: inline-block;
            width: 120upx;
            height: 32upx;
            line-height: 32upx;
            text-align: center;
            border-radius: 28upx;
            background: #f5f5f5;
            color: #666;
            font-size: 24upx;
            position: absolute;
            bottom: 20upx;
          }
          .p4 {
            // background: #f5f5f5;
            // border-radius: 20rpx;
            display: inline-block;
            // padding: 4upx  4upx 14upx;
            padding: 4upx 0;
            margin-top: 2upx;
            color: #999;
          }
          .p5 {
            position: relative;
            top: -38upx;
            right: -20upx;
          }
        }
        .info-edit {
          width: 460upx;
        }
      }
    }
  }
  .list {
    // padding: 0 30upx 0 30upx;
    background-color: #fff;
    // margin-top: 20upx;
    .title {
      padding: 0 0 10upx 0;
      display: flex;
      justify-content: flex-start;
      font-size: 24upx;
      .platform {
        color: #000;
        margin-left: 10upx;
        font-weight: bold;
        flex-grow: 1;
      }
      .status {
        color: #FE3B0B;
      }
    }
  }

  .others {
    background-color: #fff;
    margin-top: 20upx;
    // padding: 0 30upx;
    color: #000;
    font-size: 24upx;
    // margin-bottom: 200upx;
    div {
      line-height: 90upx;
    }
    div:not(:last-child) {
      border-bottom: 1upx solid #f0f0f0;
    }
    .freight {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .mark {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      font-size: 28upx;
      input {
        margin-left: 20upx;
        font-size: 28upx;
        border: none;
        width: 88%;
        outline: none;
        color: #333;
      }
    }
  }

  .operator {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: #fff;
    padding: 0 30upx;
    height: 100upx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 30upx;
    .nums {
      color: #000;
      margin-right: 30upx;
      /* #ifdef APP-PLUS */
      margin-top: 2upx;
      /* #endif */
    }
    .total-price {
      color: #000;
      span {
        color: #f5222d;
        font-weight: bold;
        font-size: 32upx;
        &::before {
          content: '￥';
          font-weight: normal;
          font-size: 28upx;
          display: inline-block;
        }
      }
    }
    .btn {
      background-color: #d9d9d9;
      color: #fff;
      text-align: center;
      border-radius: 36upx;
      width: 180upx;
      line-height: 72upx;
      position: absolute;
      right: 90upx;
    }
    .active {
      background-color: #FE3B0B;
    }
    .platform1 {
      top: 15upx !important;
    }
  }
}
.agent-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: hidden;
  height: 1000upx;
  // background: red;
  .li {
    line-height: 90upx;
    border-bottom: #f0f0f0 2upx solid;
    text-align: center;
    color: #333;
    font-size: 28upx;
  }
  .xx {
    position: absolute;
    z-index: 999;
    bottom: 100upx;
    left: 50%;
    margin-left: -50upx;
    color: #fff;
    font-size: 60upx;
    width: 100upx;
    height: 100upx;
    background: #000;
    border-radius: 50%;
    text-align: center;
    line-height: 90upx;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100%;
  }
  .body {
    background-color: #fff;
    height: 750upx;
    position: fixed;
    z-index: 2;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #000;
    overflow-y: auto;
    .close {
      position: absolute;
      right: 20upx;
      top: 0;
    }
  }
}
</style>
