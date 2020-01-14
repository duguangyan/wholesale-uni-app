<template>
  <view class="apply-refund">
    <view class="good">
      <view class="photo"><image :src="good.orderDetail.imgUrl" mode=""></image></view>
      <view class="content">
        <view class="good-title">{{ good.orderDetail.goodsName }}</view>
        <view class="attr"></view>
        <view class="price">
          价格￥
          <text class="fs32">{{ good.orderDetail.price }}</text>
          /{{ good.orderDetail.goodsUnit }}
        </view>
        <view class="count">x{{ good.orderDetail.num }}</view>
      </view>
    </view>
    <view class="info">
      <view v-if="isRecive" class="state">
        <text>货物状态</text>
        <text class="mark">(必填)</text>
        <view class="sub" @click="showDialog2">{{state || '请选择'}}</view>
        <image src="/static/imgs/right.png" mode=""></image>
      </view>
      <view class="reason">
        <text>退款原因</text>
        <text class="mark">(必填)</text>
        <view class="sub" @click="showDialog">{{reason || '请选择'}}</view>
        <image src="/static/imgs/right.png" mode=""></image>
      </view>
      <view class="refund-money text-999 fs28">
        退款金额:&emsp;
        <text class="text-red">￥{{good.refundMoney}}</text>
      </view>
      <view class="refund-com text-999 fs28">
        含商品金额:&emsp;
        <text class="text-red">￥{{good.goodsMoney}}</text>
        &emsp;代办费:&emsp;
        <text class="text-red">￥{{good.agentcyFee}}</text>
      </view>
      <view class="text-000 fs30">退款说明:</view>
      <view class="spec"><input v-model="descs" type="text" value="" /></view>
      <view class="upload-iden">
        <text>上传凭证</text>
        <text>(最多6张)</text>
      </view>

      <view class="iden">
        <view class="item" v-if="photos.length > 0" v-for="(item, index) in photos" :key="index">
          <image class="icon-delete" src="/static/img/icon-clean.png" mode="" @click="deletePhoto(index)"></image>
          <image class="upload-img" :src="item.url" mode="" @click="chooseImage(index)"></image>
        </view>
        <view class="demo" v-if="photos.length < limit" @click="chooseImage(-1)"><image src="/static/imgs/cat-3.png" mode=""></image></view>
      </view>
    </view>
    <view class="btn" @click="submit">提交</view>
    
    
    <view class="dialog" v-if="isReason">
      <view class="mask" @click="closeDialog"></view>
      <view class="body">
        <view class="title">退款原因</view>
        <view class="li" v-for="item in reasons" :key="item" @click="chooseReason(item)">
          <text>
            {{item}}
          </text>
          <image v-if="item == reason" src="/static/img/icon-checked.png" mode=""></image>
          <image v-else src="/static/img/icon-uncheck.png" mode=""></image>
        </view>
        <view class="btn-close" @click="closeDialog">关闭</view>
      </view>
    </view>
    
    <view class="dialog" v-if="isState">
      <view class="mask" @click="closeDialog2"></view>
      <view class="body">
        <view class="title">货物状态</view>
        <view class="li" v-for="item in states" :key="item" @click="chooseState(item)">
          <text>
            {{item}}
          </text>
          <image v-if="item == state" src="/static/img/icon-checked.png" mode=""></image>
          <image v-else src="/static/img/icon-uncheck.png" mode=""></image>
        </view>
        <view class="btn-close" @click="closeDialog2">关闭</view>
      </view>
    </view>
  </view>
</template>

<script>
import { loadRefundInfo,sendRefund } from '@/api/refund.js';
import Toast from '@/utils/tips.js'
var vm = {
  data() {
    vm = this;
    return {
      good: {
        orderDetail: {
          
        }
      },
      photos: [],
      limit: 6,
      reason: '',
      uploadTaskProgress: 0,
      isClock: false,
      descs: '',
      reasons: [],
      isReason: false,
      states: ['未收到货','已收到货'],
      state: '',
      isState: false,
      isRecive: false
    };
  },
  methods: {
    chooseImage(idx) {
      if (vm.isClock) {
        return;
      }
      uni.chooseImage({
        count: vm.limit - vm.photos.length, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择
        success: function(res) {
          let tempFilePaths = res.tempFilePaths;
          let arr = [];
          tempFilePaths.forEach((item, index) => {
            vm.upload(item, idx);
          });
          vm.isClock = true;
        },
        fail() {
          vm.isClock = false;
        }
      });
    },
    deletePhoto(index) {
      vm.photos.splice(index, 1);
    },
    upload(tempFilePath, index) {
      let _this = this;
      let url = '';
      url = uni.getStorageSync('s') == '开发' ? 'http://192.168.0.202:8000/ws/goods/goodImg/fileUpload' : 'http://wsm.qinlvny.com/ws/goods/goodImg/fileUpload';
      // 保存文件
      const uploadTask = uni.uploadFile({
        url: url, //仅为示例，非真实的接口地址
        filePath: tempFilePath,
        name: 'file',
        success: uploadFileRes => {
          let res = JSON.parse(uploadFileRes.data);
          if (res.code == '1000') {
            if (index == -1) {
              vm.photos.unshift({
                url: res.data.url
              });
            } else {
              vm.photos.splice(index, 1, {
                url: res.data.url
              });
            }

            vm.isClock = false;
          } else {
            Toast.tips(res.message || '上传图片失败');
            vm.isClock = false;
          }
        },
        fail: err => {
          Toast.tips('上传图片失败');
          vm.isClock = false;
        },
        complete: () => {
          vm.isClock = false;
        }
      });

      uploadTask.onProgressUpdate(res => {
        vm.uploadTaskProgress = res.progress;
        if (vm.uploadTaskProgress >= 100) {
          vm.uploadTaskProgress = 0;
        }
      });
    },
    submit(){
      if(!vm.isRecive){
        if(!vm.reason){
          return Toast.tips('请选择退货原因')
        }
      }else{
        if(!vm.state){
          return Toast.tips('请选择货物状态')
        }
        if(!vm.reason){
          return Toast.tips('请选择退货原因')
        }
      }
      sendRefund({
        descs: vm.descs,
        orderDetailId: vm.good.orderDetailId,
        reason: vm.reason,
        refundNum: vm.good.orderDetail.num,
        imgList: vm.photos
      }).then(data=>{
        if(data.code == 1000){
          return uni.redirectTo({
            url: `/pages/refund/detail?id=${data.data.id}&businessType=2`
          })
        }
        Toast.tips('提交失败,请稍后再试或联系客服MM')
      })
    },
    chooseReason(reason){
      vm.reason = reason
      vm.isReason = false
    },
    chooseState(state){
      vm.state = state
      vm.isState = false
    },
    closeDialog(){
      vm.isReason = false
    },
    showDialog(){
      vm.isReason = true
    },
    showDialog2(){
      vm.isState = true
    },
    closeDialog2(){
      vm.isState = false
    },
  },
  onLoad(options) {
    vm.isRecive = options.status != 2
    if(vm.isRecive){
      vm.reasons = ['卖家发错货','货品不新鲜/有损坏','商品与描述严重不符','其他']
    }else{
      vm.reasons = ['多拍/错拍','地址填写错误','迟迟未发货','其他']
    }
    loadRefundInfo({
      orderDetailId: options.id
    }).then(data => {
      vm.good = data.data;
    });
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.apply-refund {
  background: #f5f5f5;
  .good {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 30upx;
    background: #fff;
    .photo {
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
      .attr {
        position: absolute;
        font-size: 24upx;
        color: #999;
        bottom: 60upx;
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
  
  .info {
    background: #fff;
    margin-top: 40upx;
    padding: 0 30upx;
  }
  .state,
  .reason {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 34upx;
    color: #000;
    padding: 30upx 0;
    image {
      width: 40upx;
      height: 40upx;
    }
    .mark {
      color: #b3b3b3;
      font-size: 24upx;
      align-self: flex-end;
    }
    .sub {
      color: #999;
      font-size: 28upx;
      // margin-right: 10upx;
      text-align: right;
      flex-grow: 1;
    }
  }
  .refund-money,
  .refund-com {
    padding: 20upx 0;
  }
  .spec {
    margin-top: 20upx;
    height: 90upx;
    color: #666;
    border-radius: 20upx;
    background: #f5f5f5;
    padding: 0 20upx;
    input {
      height: 90upx;
      line-height: 90upx;
      width: 100%;
    }
    overflow: hidden;
  }
  .upload-iden {
    margin-top: 48upx;
    margin-bottom: 20upx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    font-size: 34upx;
    color: #000;
    text:last-child {
      color: #b3b3b3;
      font-size: 24upx;
    }
  }
  .iden {
    // padding: 40upx 0 30upx 0;
    display: flex;
    flex-wrap: wrap;
    .icon-delete{
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
  .btn {
    margin: 60upx auto;
    width: 640upx;
    line-height: 64upx;
    border-radius: 64upx;
    color: #fff;
    text-align: center;
    font-size: 32upx;
    background: #FE3B0B;
  }
  .dialog{
    position: fixed;
    z-index: 4;
    .title{
      padding: 30upx;
      text-align: center;
      color: #666;
      font-size: 36upx;
      line-height: 1;
    }
    image{
      width: 40upx;
      height: 40upx;
    }
    .mask{
      background: rgba(0,0,0,0.7);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      z-index: 1;
    }
    .body{
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      z-index: 2;
      background: #fff;
      .li{
        padding: 0 30upx;
        line-height: 90upx;
        color: #000;
        font-size: 28upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
      }
    }
    .btn-close{
      margin: 60upx auto;
      width: 640upx;
      line-height: 64upx;
      border-radius: 64upx;
      color: #fff;
      text-align: center;
      font-size: 32upx;
      background: #FE3B0B;
    }
  }
}
</style>
