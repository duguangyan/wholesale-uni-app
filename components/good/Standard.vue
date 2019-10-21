<template>
  <div v-show="show" class="standard">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <img src="@/static/img/tag-close2.png" width="15" height="15" @click="close" />
        <li v-for="(item,index) in list" :key="index">
          <span v-for="sta in item" :key="sta">{{sta}}</span>
        </li>
      </div>
    </transition>
  </div>
</template>

<script>
var vm = {
  name: "standard",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted(){
  },
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.standard {
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
    padding: 74upx 30upx;
    position: fixed;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    font-size: 28upx;
    text-align: center;
    color: #333;
    &::before{
      display: block;
      content: '规格';
      text-align: left;
      color: #000;
      font-weight: bold;
    }
    img{
      position: absolute;
      right: 30upx;
      top: 30upx;
    }
    li {
      line-height: 80upx;
      font-size: 24upx;
      color: #999;
      display: flex;
      justify-content: space-between;
      position: relative;
      &::after {
        content: "";
        height: 1upx;
        display: block;
        position: absolute;
        bottom: 0;
        background-color: #f0f0f0;
        width: 100%;
        transform: scaleY(0.5);
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
