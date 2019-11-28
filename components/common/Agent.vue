<template>
  <view v-show="show" class="agent">
    <view name="mask"><view v-show="show" class="mask" @click="close"></view></view>
    <view name="body" class="body">
      <view class="li" v-for="item in list" :key="item.id" @click="selectAgent(item)">{{item.realName}}</view>
    </view>
    <view class="xx" @click="close">x</view>
  </view>
</template>
<script>
var vm = {
  name: 'agent',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    close() {
      setTimeout(() => {
        this.$emit('close', false);
      }, 300);
    },
    selectAgent(item){
      this.$emit('change',item)
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.agent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: hidden;
  height: 1000upx;
  // background: red;
  .li{
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
