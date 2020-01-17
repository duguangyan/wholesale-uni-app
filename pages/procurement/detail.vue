<template>
  <view class="price-detail">
    <view class="detail">
      <view class="title">
        <text>采购详情</text>
        <text>{{ detail.createTime }}</text>
      </view>
      <view class="li">
        采购品类:
        <text>{{ detail.categoryName }}</text>
      </view>
      <view class="li">
        采购品种:
        <text>{{ detail.variety }}</text>
      </view>
      <view class="li">
        采购数量:
        <text>{{ detail.quantity }}</text>
      </view>
      <view class="li">
        规格属性:
        <text>{{ detail.specAttributes }}</text>
      </view>
      <view class="li">
        发布产地:
        <text>{{ '' + detail.prodProvince + detail.prodCity + detail.prodRegion }}</text>
      </view>
      <view class="li">
        包装要求:
        <text>{{ detail.packRequire }}</text>
      </view>
      <view class="li">
        收&ensp;货&ensp;地:
        <text>{{ '' + detail.receiveProvince + detail.receiveCity + detail.receiveRegion }}</text>
      </view>
      <view class="li">
        发货方式:
        <text>{{ detail.deliveryMethod }}</text>
      </view>
      <view class="li">
        补充说明:
        <text>{{ detail.remark }}</text>
      </view>
      <view class="btns">
        <view class="btn" @click="makeGossip">
          <image src="/static/imgs/icon-message.png" mode=""></image>
          <text>聊一聊</text>
        </view>
        <view class="btn" @click="makeCall">
          <image src="/static/imgs/icon-phone.png" mode=""></image>
          <text>联系电话</text>
        </view>
      </view>
    </view>
    <view class="redundent-time">
      <view class="title">
        <text>报价剩余时间</text>
        <text>{{ detail.auditTime }}</text>
      </view>
      <view class="price">
        <text>我的报价</text>
        <view class="input">
          <input type="number" v-model="price"/>
          <view class="unit">元/斤</view>
        </view>
        <view :class="['btn',priceType == 1?'actived':'']" @click="priceType == 1">地头价</view>
        <view :class="['btn',priceType == 2?'actived':'']" @click="priceType == 2">上车价</view>
      </view>
    </view>
    <view class="spec">
      <view class="title">货品描述</view>
      <view class="images">
        <view v-for="(media, index) in medias" :key="index">
          <video v-if="media.url.match(/\.(mp4|wmv|mpeg4|avi|rmvb|mkv)/)" :src="media.url" controls @click="chooseVideo(index)"></video>
          <image v-else :src="media.url" mode="" @click="chooseImage(index)"></image>
        </view>
        <template v-if="medias.length < 9">
          <image src="/static/imgs/icon-1036.png" mode="" @click="chooseImage(-1)"></image>
          <image src="/static/imgs/icon-1037.png" mode="" @click="chooseVideo(-1)"></image>
        </template>
      </view>
      <view class="publish" @click="publish">发布报价</view>
    </view>
  </view>
</template>

<script>
import { getProcurementDetail, publishPrice } from '@/api/procurement.js';
var vm = {
  data() {
    vm = this;
    return {
      medias: [],
      detail: {},
      createTime: '',
      price: '',
      priceType: 1,
      purchaseId: ''
    };
  },
  onLoad(options) {
    vm.id = options.id;
  },
  onShow() {
    getProcurementDetail({
      id: vm.id,
      type: 1
    }).then(data => {
      vm.detail = data.data.purchaseResp;
    });
  },
  methods: {
    publish() {
      publishPrice({
        createTime: 'string',
        id: 'string',
        offerId: 'string',
        price: 0,
        priceType: 0,
        purchaseId: 'string',
        urlList: vm.medias
      }).then(data => {});
    },
    deletePhoto(index) {
      vm.medias.splice(index, 1);
    },
    chooseImage(idx) {
      if (vm.isClock) {
        return;
      }
      uni.chooseImage({
        count: 1, //默认9
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
    chooseVideo(idx) {
      if (vm.isClock) {
        return;
      }
      uni.chooseVideo({
        count: 1, //默认9
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
              vm.medias.unshift({
                url: res.data.url
              });
            } else {
              vm.medias.splice(index, 1, {
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
        }
      });

      uploadTask.onProgressUpdate(res => {
        vm.uploadTaskProgress = res.progress;
        if (vm.uploadTaskProgress >= 100) {
          vm.uploadTaskProgress = 0;
        }
      });
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.price-detail {
  .base-title {
    color: #333;
    font-size: 28upx;
  }
  .detail {
    padding: 30upx;
    margin-top: 20upx;
    background: #fff;
    .title {
      display: flex;
      margin-bottom: 50upx;
      align-items: center;
      justify-content: space-between;
      font-size: 20upx;
      color: #999;
      text:first-child {
        color: #333;
        font-size: 28upx;
      }
    }
    .li {
      margin-bottom: 34upx;
      color: #999;
      font-size: 24upx;
      text {
        color: #333;
        margin-left: 20upx;
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      padding: 0 40upx;
      .btn {
        width: 224upx;
        height: 64upx;
        color: #333;
        font-size: 28upx;
        // padding: 0 44upx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #e6e6e6;
        border-radius: 64upx;
        image {
          width: 36upx;
          height: 36upx;
          margin-left: 20upx;
        }
        text {
          margin-right: 20upx;
        }
      }
    }
  }
  .redundent-time {
    margin-top: 20upx;
    background: #fff;
    padding: 30upx;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @extend .base-title;
      margin-bottom: 64upx;
      text:last-child {
        color: #999;
        font-size: 20upx;
      }
    }
    .price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #999;
      font-size: 24upx;
      // text{
      //   font-size: 24upx;
      //   color: #333;
      //   margin-right: 20upx;
      // }
      .input {
        position: relative;
        height: 64upx;
        background: #f5f5f5;
        border-radius: 64upx;
        width: 240upx;
        input {
          vertical-align: top;
          width: 140upx;

          height: 64upx;

          text-align: right;
          // text-indent: 30upx
          // padding-right: 100upx;
        }
        .unit {
          font-size: 24upx;
          color: #333;
          position: absolute;
          right: 20upx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .btn {
        border-radius: 56upx;
        width: 120upx;
        line-height: 56upx;
        font-size: 24upx;
        text-align: center;
        border: 1px solid #e6e6e6;
        color: #999;
        &.actived {
          color: #fe3b0b;
          border: 1px solid #fe3b0b;
        }
      }
    }
  }
  .spec {
    background: #fff;
    margin-top: 20upx;
    padding: 30upx;
    .title {
      @extend .base-title;
      margin-bottom: 30upx;
    }
    .images {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      & > view,
      & > image {
        margin-right: 20upx;
      }
      image {
        width: 140upx;
        height: 140upx;
      }
      video {
        width: 140upx;
        height: 140upx;
      }
    }
  }
  .publish {
    margin: 200upx auto auto auto;
    width: 640upx;
    line-height: 80upx;
    text-align: center;
    color: #fff;
    border-radius: 80upx;
    background: #fe3b0b;
    font-size: 32upx;
  }
}
</style>
