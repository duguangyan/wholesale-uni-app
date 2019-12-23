<template>
  <view v-if="show" class="pay">
    <div name="mask"><div v-if="show" class="mask" @click="close"></div></div>
    <view name="body">
      <div v-if="show" class="body">
        <div class="h1">
          确认支付
          <div class="close-icon flr"><img @click="close" src="@/static/img/tag-close.png" /></div>
        </div>

        <div class="price">￥{{ price }}</div>

        <div class="way">
          <li @click="checkPayNav(0)">
            <div class="wx-icon"><img class="icon" src="@/static/img/icon-wechat.png" width="30" height="30" alt="" /></div>

            <span class="fg1">微信支付</span>
            <div class="img-icon flr" :class="{ platform: platform == 2 }">
              <img :src="checkIndex === 0 ? icon.Checked : icon.Uncheck" width="20" height="20" alt="" />
            </div>
          </li>

          <!-- #ifdef H5 || APP-PLUS  -->
          <li @click="checkPayNav(1)" v-if="!isWx && !isWxWeb">
            <div class="wx-icon"><img class="icon" src="@/static/img/icon-alli.png" width="30" height="30" alt="" /></div>
            <span class="fg1">支付宝支付</span>
            <div class="img-icon flr" :class="{ platform: platform == 2 }"><img :src="checkIndex === 1 ? icon.Checked : icon.Uncheck" width="20" height="20" alt="" /></div>
          </li>
          <!-- #endif -->
          <div class="btn" @click="doPay">
            <div v-html="resPayFrom" class="form"></div>
            确认支付
          </div>
        </div>
      </div>
    </view>
  </view>
</template>

<script>
import Uncheck from '@/static/img/icon-uncheck.png';
import Checked from '@/static/img/icon-checked.png';
import T from '@/utils/tips.js';
import { payAlipayByWap, payWXpayByWap } from '@/api/payApi.js';
var vm = {
  name: 'pay',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isWx: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      default: 0
    },
    orderId: {
      type: String,
      default: ''
    },
    shopId: {
      type: String,
      default: ''
    },
    platform: {
      type: Number | String,
      default: 0
    }
  },
  data() {
    vm = this;
    return {
      icon: {
        Uncheck,
        Checked
      },
      way: 0,
      resPayFrom: '',
      wxHref: '',
      checkIndex: 0,
      clock: true,
      animation: '',
      animationData: {},
      isWxWeb: uni.getStorageSync('isWxWeb')
    };
  },
  onload() {},
  onshow() {},
  methods: {
    wXpay() {},
    checkPayNav(index) {
      this.checkIndex = index;
      this.clock = true;
    },
    close() {
      vm.$emit('close', false);
    },
    h5WXpay() {
      if (this.orderId !== '') {
        let data = {
          payChannelEnum: 'WEIXIN_PAY',
          payWay: 'WAP_PAY',
          orderId: this.orderId
        };
        if (this.isWxWeb) {
          // 如果是微信网页端
          payWXpayByWap({
            openId: uni.getStorageSync('openId'),
            orderId: this.orderId,
            payChannelEnum: 'WEIXIN_PAY',
            payWay: 'JSAPI'
          }).then(config => {
            if (+config.code === 1000) {
              let configData = config.data.wxPayResp;

              function onBridgeReady() {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest',
                  {
                    appId: configData.appId, //公众号名称，由商户传入
                    timeStamp: configData.timestamp, //时间戳，自1970年以来的秒数
                    nonceStr: configData.noncestr, //随机串
                    package: configData.packageName,
                    signType: configData.signType, //微信签名方式：
                    paySign: configData.sign //微信签名
                  },
                  function(data) {
                    if (data.err_msg == 'get_brand_wcpay_request:ok') {
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                    vm.$loading.close();
                    let { orderId, shopId } = this.$route.query;
                    this.getOrderDetailById(orderId, shopId);
                  }
                );
              }
              if (typeof WeixinJSBridge == 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              } else {
                onBridgeReady();
              }
            }
          });
        } else {
          payAlipayByWap(data)
            .then(res => {
              if (res.code === '1000') {
                location.href = res.data.wxPayResp.payUrl;
                this.resPayFrom = '';
                this.clock = true;
              } else {
                T.tips(res.message || '调用支付失败');
                this.clock = true;
              }
            })
            .catch(err => {
              T.tips(err.message || '调用支付失败');
              this.clock = true;
            });
        }
      } else {
        T.tips('订单ID不存在');
        this.clock = true;
      }
    },
    h5Alipay() {
      if (this.orderId !== '') {
        let data = {
          payChannelEnum: 'ALI_PAY',
          payWay: 'WAP_PAY',
          orderId: this.orderId
        };
        payAlipayByWap(data)
          .then(res => {
            if (res.code === '1000') {
              this.wxHref = '';
              this.resPayFrom = res.data.returnHtml;
              this.clock = true;
              setTimeout(() => {
                document.forms['punchout_form'].submit();
              }, 300);
            } else {
              T.tips(res.message || '调用支付失败');
              this.resPayFrom = '';
              this.clock = true;
            }
          })
          .catch(err => {
            T.tips(err.message || '调用支付失败');
            this.resPayFrom = '';
            this.clock = true;
          });
      } else {
        T.tips('订单ID不存在');
        this.clock = true;
      }
    },
    // 小程序支付
    WXAppPay() {
      let _this = this;
      if (this.orderId !== '') {
        let data = {
          payChannelEnum: 'WEIXIN_PAY',
          payWay: 'APPLET',
          orderId: this.orderId,
          openId: uni.getStorageSync('openid')
        };
        payAlipayByWap(data)
          .then(res => {
            if (res.code === '1000') {
              console.log(JSON.stringify(res));
              let wxPayResp = res.data.wxPayResp;
              let obj = {
                appid: wxPayResp.appId,
                noncestr: wxPayResp.noncestr,
                package: 'Sign=WXPay', // 固定值，以微信支付文档为主
                partnerid: wxPayResp.partnerId,
                prepayid: wxPayResp.prepayId,
                timestamp: wxPayResp.timestamp,
                sign: wxPayResp.sign // 根据签名算法生成签名
              };
              orderInfo = JSON.stringify(obj);

              console.log('orderInfo', orderInfo);
              uni.requestPayment({
                provider: 'wxpay',
                orderInfo, //微信、支付宝订单数据
                success: function(res) {
                  _this.clock = true;
                  console.log('success:' + JSON.stringify(res));
                  uni.reLaunch({
                    url: '/pages/user/pay/success?payPrice=' + _this.price + '&orderId=' + _this.orderId + '&shopId=' + _this.shopId
                  });
                },
                fail: function(err) {
                  _this.clock = true;
                  console.log('fail:' + JSON.stringify(err));
                  T.tips('支付失败');
                  uni.redirectTo({
                    url: '/pages/user/order/detail?orderId=' + _this.orderId + +'&shopId=' + _this.shopId
                  });
                }
              });
            } else {
              T.tips(res.message || '调用支付失败');
              this.clock = true;
              uni.redirectTo({
                url: '/pages/user/order/detail?orderId=' + _this.orderId + +'&shopId=' + _this.shopId
              });
            }
          })
          .catch(err => {
            T.tips(err.message || '调用支付失败');
            this.clock = true;
          });
      } else {
        T.tips('订单ID不存在');
        this.clock = true;
      }
    },
    // App支付
    AppPay(payChannelEnum) {
      let _this = this;
      if (this.orderId !== '') {
        let data = {
          payChannelEnum,
          payWay: 'APP_PAY',
          orderId: this.orderId
        };
        payAlipayByWap(data)
          .then(res => {
            if (res.code === '1000') {
              console.log(JSON.stringify(res));
              let wxPayResp = res.data.wxPayResp;
              let orderInfo = '';
              if (payChannelEnum == 'WEIXIN_PAY') {
                let obj = {
                  appid: wxPayResp.appId,
                  noncestr: wxPayResp.noncestr,
                  package: 'Sign=WXPay', // 固定值，以微信支付文档为主
                  partnerid: wxPayResp.partnerId,
                  prepayid: wxPayResp.prepayId,
                  timestamp: wxPayResp.timestamp,
                  sign: wxPayResp.sign // 根据签名算法生成签名
                };
                orderInfo = JSON.stringify(obj);
              } else {
                orderInfo = res.data.returnHtml;
              }

              console.log('orderInfo', orderInfo);
              uni.requestPayment({
                provider: payChannelEnum == 'WEIXIN_PAY' ? 'wxpay' : 'alipay',
                orderInfo, //微信、支付宝订单数据
                success: function(res) {
                  _this.clock = true;
                  console.log('success:' + JSON.stringify(res));
                  uni.reLaunch({
                    url: '/pages/user/pay/success?payPrice=' + _this.price + '&orderId=' + _this.orderId + '&shopId=' + _this.shopId
                  });
                  // uni.showModal({
                  // 	content:JSON.stringify(res),
                  // 	success() {
                  // 		uni.navigateTo({
                  // 			url:'/pages/user/pay/success?payPrice='+_this.price+'&orderId='+_this.orderId
                  // 		})
                  // 	}
                  // })
                },
                fail: function(err) {
                  _this.clock = true;
                  console.log('fail:' + JSON.stringify(err));
                  // T.tips('支付失败')
                  uni.redirectTo({
                    url: '/pages/user/order/detail?orderId=' + _this.orderId + '&shopId=' + _this.shopId
                  });
                  // uni.showModal({
                  // 	content:JSON.stringify(err),
                  // 	success() {

                  // 	}
                  // })
                  // uni.navigateTo({
                  // 	url:'/pages/user/order/detail?orderId='+_this.orderId
                  // })
                }
              });
            } else {
              T.tips(res.message || '调用支付失败');
              this.clock = true;
            }
          })
          .catch(err => {
            T.tips(err.message || '调用支付失败');
            this.clock = true;
          });
      } else {
        T.tips('订单ID不存在');
        this.clock = true;
      }
    },
    doPay() {
      if (!this.clock) return;
      this.clock = false;
      if (this.checkIndex === 0) {
        // 微信网页支付
        // #ifdef H5
        this.h5WXpay();
        // #endif
        // #ifdef APP-PLUS
        this.AppPay('WEIXIN_PAY');
        // #endif

        // #ifdef MP-WEIXIN
        this.WXAppPay();
        // #endif
      } else {
        // 支付宝网页支付

        // #ifdef H5
        this.h5Alipay();
        // #endif
        // #ifdef APP-PLUS
        this.AppPay('ALI_PAY');
        // #endif
      }
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.wx-icon {
  width: 60upx;
  height: 60upx;
  > img {
    width: 100%;
    height: 100%;
  }
}
.img-icon {
  width: 40upx;
  height: 40upx;
  > img {
    width: 100%;
    height: 100%;
  }
}

.platform {
  margin-top: 25upx;
}

.close-icon {
  width: 30upx;
  height: 30upx;
  position: relative;
  right: 60upx;
  > img {
    width: 100%;
    height: 100%;
  }
}
.pay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .body {
    background-color: #fff;
    padding: 54upx 138upx;
    position: fixed;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 28upx 20upx 20upx 20upx;
    color: #000;

    .h1 {
      font-size: 28upx;
      position: relative;
      text-align: center;

      > img {
        position: absolute;
        right: 0;
      }
    }

    .close {
      position: absolute;
      right: 20upx;
      top: 0;
    }

    .price {
      margin-top: 60upx;
      font-weight: bold;
      font-size: 46upx;
      text-align: center;
    }

    .way {
      margin-top: 46upx;
      position: relative;
      .img-icon {
        position: absolute;
        right: 60upx;
      }
      .fg1 {
        margin-left: 20upx;
      }
      &::before {
        content: '选择支付方式';
        display: block;
        margin-bottom: 20upx;
        font-size: 24upx;
        font-weight: bold;
      }

      li {
        font-size: 30upx;
        padding: 0 10upx;
        height: 90upx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1upx solid #f0f0f0;
        columns: #333;

        img.icon {
          margin-right: 20upx;
        }
      }

      .btn {
        width: 640upx;
        line-height: 80upx;
        border-radius: 40upx;
        background-color: #fe3b0b !important;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        margin-top: 72upx;
      }
    }
  }

  .mask-enter-active,
  .mask-leave-active,
  .body-enter-active,
  .body-leave-active {
    transition: all 0.5s;
  }

  .mask-enter,
  .body-enter,
  .mask-leave-to,
  .body-leave-to {
    opacity: 0;
  }

  .body-enter,
  .body-leave-to {
    transform: translateY(100%);
  }

  .body-enter-to,
  .body-leave {
    transform: translateY(0%);
  }

  .mask-enter-to,
  .body-enter-to,
  .mask-leave,
  .body-leave {
    opacity: 1;
  }
}
</style>
