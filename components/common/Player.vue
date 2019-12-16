<template>
  <view class="player">
    <view name="mask"><view class="mask" @click="close"></view></view>
    <view name="body">
      <view class="body"><video :src="src" id="myVideo" enable-danmu danmu-btn controls></video></view>
    </view>
    <view class="xx" @click="close">x</view>
  </view>
</template>
<script>
var vm = {
  name: 'player',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    vm = this;
    return {
      autoplay: true,
      videoCtx: ''
    };
  },
  created() {
    // console.log('created')
  },
  mounted() {},
  methods: {
    close() {
      setTimeout(() => {
        vm.$emit('close', false);
      }, 300);
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.player {
  video {
    width: 100%;
    height: 750upx;
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
  // height: 1000upx;
  // background: red;
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
    position: absolute;
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
    position: absolute;
    z-index: 2;
    width: 100%;
    left: 0;
    top: 0;
    color: #000;
    > video {
      width: 750upx;
      height: 100%;
    }
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
