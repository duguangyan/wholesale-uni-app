<template>
  <view class="refund-detail">
    <view class="banner">
      <view>
        <!-- -1 关闭 0 取消 1 新建 2货主审核中 3货主审核通过 4 货主审核不通过 5 平台审核 6 平台审核通过 7 平台审核不通过 -->
        <!-- <view class="fs34">{{ result['' + detail.status] }}</view> -->
        <view class="fs34">{{ detail.statusStr }}</view>
        <view v-if="detail.status == 2 || detail.status >> 1 == 2" class="fs24">{{ calcTime(detail.expiresTime) }}</view>
        <view v-else class="fs24">{{ detail.platformAuditTime || detail.merchantAuditTime }}</view>
      </view>
      <image src="/static/imgs/icon-refund-detail.png" mode=""></image>
    </view>

    <view class="result">
      <view class="text1">{{ detail.texts[0] }}</view>
      <view class="text2" v-if="detail.texts[1]">{{ detail.texts[1] }}</view>
      <template v-if="businessType == 2">
        <view v-if="detail.status == 2" class="btn-con"><view class="btn-red" @click="showDialog(1)">撤回申请</view></view>
        <view v-if="detail.status == 4 || detail.status == 5" class="btn-con">
          <view v-if="detail.status == 4" class="btn-black" @click="showDialog(3)">平台介入</view>
          <view class="btn-red mgl-30" @click="showDialog(2)">关闭退款</view>
        </view>
      </template>
      <template v-else>
        <view v-if="detail.status == 2" class="btn-con">
          <view class="mgr-30 btn-black" @click="showDialog(4)">拒绝退款</view>
          <view class="btn-red" @click="showDialog(5)">同意退款</view>
        </view>
        <!-- <view v-if="detail.status == 4" class="btn-con">
          <view class="mgr-30 btn-black" @click="showDialog(3)">平台介入</view>
          <view class="btn-red" @click="showDialog(2)">关闭退款</view>
        </view> -->
      </template>
    </view>

    <view class="history" @click="navToHistory">
      <text>协商历史</text>
      <image src="/static/img/tag-go.png" mode=""></image>
    </view>

    <view class="good">
      <view class="photo" @click="navToGood()"><image :src="detail.afterSaleDetail.imgUrl" mode=""></image></view>
      <view class="content">
        <view class="good-title">{{ detail.afterSaleDetail.goodsName }}</view>
        <view class="good-attr">{{ detail.afterSaleDetail.skuDesc }}</view>
        <view class="price">
          价格￥
          <text class="fs32">{{ detail.afterSaleDetail.price }}</text>
          /{{ detail.afterSaleDetail.goodsUnit }}
        </view>
        <view class="count">x{{ detail.afterSaleDetail.num }}</view>
      </view>
    </view>

    <view class="info">
      <view>退款原因：{{ detail.afterSaleDetail.reason }}</view>

      <view v-if="businessType != 2">退款金额：￥{{ (detail.afterSaleDetail.refundMoney * 100 - detail.afterSaleDetail.agentcyMoney * 100) / 100 }}</view>
      <view v-else>退款金额：￥{{ detail.afterSaleDetail.refundMoney }}(包含商品金额:￥{{ detail.afterSaleDetail.goodsMoney }},代办费:{{ detail.afterSaleDetail.agentcyMoney }})</view>

      <view>申请时间：{{ detail.afterSaleDetail.applyRefundTime }}</view>
      <view>退款说明：{{ detail.afterSaleDetail.descs }}</view>
      <view>退款单号：{{ detail.afterSaleDetail.afterSaleId }}</view>

      <template v-if="detail.afterSaleDetail.afterSaleImgs && detail.afterSaleDetail.afterSaleImgs.length>0">
        <view class="upload-iden">凭证</view>
        <view class="iden">
          <view class="item" v-for="(item, index) in detail.afterSaleDetail.afterSaleImgs" :key="index" @click="showBigImg(item.url)">
            <image class="upload-img" :src="item.url" mode=""></image>
          </view>
        </view>
      </template>
    </view>

    <view v-if="isDialog" class="dialog">
      <view class="mask" @click="isDialog = false"></view>

      <view class="body">
        <view class="title">{{ dialog[curType][0] }}</view>
        <view class="title">{{ dialog[curType][1] }}</view>
        <view class="footer">
          <view class="cancel btn" @click="isDialog = false">取消</view>
          <view class="confirm btn" @click="doConfirm">确认</view>
        </view>
      </view>
    </view>

    <cover-image v-if="isImage" class="big-img" :src="curSrc" @click="hideImage"></cover-image>
  </view>
</template>

<script>
import { getRefundDetail, cancelRefund, closeRefund, applyPlatform, checkRefund } from '@/api/refund.js';
import { accountSub } from '@/api/payApi.js';
var vm = {
  data() {
    vm = this;
    return {
      isImage: false,
      curSrc: '',
      detail: {
        afterSaleDetail: {},
        texts: []
      },
      businessType: '',
      detailId: '',
      result: {
        '-1': '关闭',
        '0': '取消',
        '1': '新建',
        '2': '货主审核中',
        '3': '货主审核通过',
        '4': '货主审核不通过',
        '5': '平台审核',
        '6': '平台审核通过',
        '7': '平台审核不通过'
      },
      isDialog: false,
      dialog: {
        '1': ['确定取消本次申请吗?'],
        '2': ['确定关闭退款申请吗?', '关闭后将不能再次申请'],
        '3': ['是否申请平台介入?', '介入后将由平台审核'],
        '4': ['是否拒绝退款?'],
        '5': ['是否同意退款?']
      },
      curType: '' // 弹窗类型 1:撤销申请；2:关闭申请；3:平台介入；4.拒绝退款；5.同意退款
    };
  },
  methods: {
    hideImage() {
      vm.isImage = false;
    },
    showBigImg(imgUrl) {
      vm.isImage = true;
      vm.curSrc = imgUrl;
    },
    navToGood() {
      uni.navigateTo({
        url: `/pages/order/goodsDetail/goodsDetail?shopId=${vm.detail.afterSaleDetail.shopId}&goodsId=${vm.detail.afterSaleDetail.goodsId}`
      });
    },
    calcTime(time) {
      let day, hour, minute, second, redundent;
      let curTime = new Date().getTime();
      time = (time - curTime) / 1000;
      if (time <= 0) {
        return '已超时';
      }
      day = Math.floor(time / (60 * 60 * 24));
      redundent = time % (60 * 60 * 24);
      hour = Math.floor(redundent / (60 * 60));
      redundent = redundent % (60 * 60);
      minute = Math.floor(redundent / 60);
      return `${day}天${hour}时${minute}分`;
    },
    navToHistory() {
      uni.navigateTo({
        url: '/pages/refund/history?id=' + vm.detail.afterSaleDetail.afterSaleId
      });
    },
    showDialog(type) {
      vm.curType = '' + type;
      vm.isDialog = true;
    },
    load() {
      getRefundDetail({
        id: vm.detailId,
        businessType: vm.businessType
      }).then(data => {
        vm.detail = data.data;
      });
    },
    doConfirm() {
      if (vm.curType == 1) {
        cancelRefund({
          id: vm.detailId
        })
          .then(data => {
            vm.isDialog = false;
            vm.load();
          })
          .catch(data => {
            vm.isDialog = false;
          });
      } else if (vm.curType == 2) {
        closeRefund({
          id: vm.detailId
        })
          .then(data => {
            vm.isDialog = false;
            vm.load();
          })
          .catch(data => {
            vm.isDialog = false;
          });
      } else if (vm.curType == 3) {
        applyPlatform({
          id: vm.detailId
        })
          .then(data => {
            vm.isDialog = false;
            vm.load();
          })
          .catch(data => {
            vm.isDialog = false;
          });
      } else if (vm.curType == 4) {
        vm.isDialog = false
        uni.navigateTo({
          url: `/pages/refund/refuse?id=${vm.detail.afterSaleDetail.afterSaleId}&price=${vm.detail.afterSaleDetail.goodsMoney}&businessType=${vm.businessType}`
        });
      } else if (vm.curType == 5) {
        accountSub().then(res => {
          vm.refund = res.data;
          if (!res.data.setPayPwd) {
            // 没有设置密码
            vm.isDialog = false;
            uni.navigateTo({
              url: '/pages/middle/release/account/payps/verifiyPhone'
            });
          } else {
            // 已设置密码
            if (vm.detailId) {
              vm.isDialog = false;
              uni.navigateTo({
                url: '/pages/middle/release/account/payps/resPassword?from=refund&refundId=' + vm.detailId
              });
            }
          }
        });
      }
    }
  },
  onLoad(options) {
    vm.detailId = options.id;
    vm.businessType = options.businessType;
    vm.status = options.status
  },
  onShow() {
    vm.dialog['1'][1] = (vm.status==1 || vm.status == 2)?'取消后，订单将正常发货.':''
    vm.load();
  }
};
export default vm;
</script>
<style lang="scss" scoped>
.refund-detail {
  .big-img {
    height: 100%;
    width: 100%;
    /* #ifdef MP-WEIXIN || APP-PLUS */
    position: absolute;
    /* #endif */
    /* #ifdef H5 */
    position: fixed;
    /* #endif */
    top: 0;
    left: 0;
  }
  .upload-iden {
    margin-top: 48upx;
    margin-bottom: 20upx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    font-size: 34upx;
    color: #000;
  }
  .iden {
    // padding: 40upx 0 30upx 0;
    display: flex;
    flex-wrap: wrap;
    .icon-delete {
      width: 40upx;
      height: 40upx;
      position: absolute;
      z-index: 2;
      right: -20upx;
      top: -20upx;
    }
    .item,
    .demo {
      width: 140upx;
      height: 140upx;
      // overflow: hidden;
      margin: 30upx;
    }
    .upload-img {
      height: 140upx;
      width: 140upx;
    }
    .item {
      position: relative;
    }

    .demo {
      image {
        width: 140upx;
        height: 140upx;
      }
    }
  }
  .banner {
    margin-bottom: 20upx;
    height: 200upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100upx 0 30upx;
    background: #fe3b0b;
    color: #fff;
    image {
      height: 150upx;
      width: 150upx;
    }
  }

  .result {
    margin-bottom: 20upx;
    background: #fff;
    font-size: 30upx;
    color: #000;
    padding: 40upx 30upx;
    & > .text2 {
      margin-top: 20upx;
      color: #999;
    }

    .btn-con {
      margin-top: 80upx;
      display: flex;
      justify-content: flex-end;
      text-align: center;
      view {
        width: 170upx;
        line-height: 64upx;
        border-radius: 64upx;

        font-size: 30upx;
      }
      .btn-red {
        border: 1px solid #fe3b0b;
        color: #fe3b0b;
      }
      .btn-black {
        border: 1px solid #d9d9d9;
        color: #000;
      }
    }
  }

  .good {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 30upx;
    background: #fff;
    .photo {
      min-width: 200upx;
      width: 200upx;
      height: 200upx;
      overflow: hidden;
      border-radius: 20upx;
      margin-right: 20upx;
      image {
        width: 200upx;
        height: 200upx;
      }
    }
    .content {
      height: 200upx;
      flex-grow: 1;
      position: relative;
      .price {
        position: absolute;
        bottom: 0;
        color: #fe3b0b;
        font-size: 24upx;
      }
      .good-attr {
        position: absolute;
        top: 80upx;
      }
      .count {
        color: #999;
        position: absolute;
        right: 30upx;
        bottom: 0;
        font-size: 24upx;
      }
    }
  }
  .history {
    margin-bottom: 20upx;
    background: #fff;
    height: 100upx;
    font-size: 30upx;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30upx;
    image {
      width: 30upx;
      height: 30upx;
      vertical-align: top;
    }
  }
  .info {
    color: #999;
    font-size: 24upx;
    padding: 30upx;
    line-height: 2;
    background: #fff;
  }
}
.dialog {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 4;
    background: rgba(0, 0, 0, 0.7);
  }
  .body {
    position: fixed;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20upx;
    width: 500upx;
    padding: 76upx 30upx 30upx;
    text-align: center;
    .title {
      font-size: 30upx;
      color: #000;
      margin-bottom: 50upx;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .btn {
      width: 230upx;
      line-height: 80upx;
      border-radius: 40upx;
      font-size: 32upx;
      &.cancel {
        color: #333;
        // box-shadow: 0 0 0 1upx #d9d9d9 inset;
        border: 1upx solid #d9d9d9;
        color: #333;
      }
      &.confirm {
        background-color: #fe3b0b;
        color: #fff;
      }
    }
  }
}
</style>
