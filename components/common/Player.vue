<template>
  <div v-show="show" class="player">
    <div name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </div>
    <div name="body">
      <div v-show="show" class="body">
        <video ref="player" :src="src" width="100%" height="400" controls></video>
      </div>
    </div>
  </div>
</template>
<script>
var vm = {
  name: "player",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ""
    }
  },
  watch:{
    src(val){
      vm.$refs.player.src = val
      vm.$refs.player.load()
    }
  },
  data() {
    vm = this;
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    close() {
      vm.$emit("close", false);
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  height: 1000upx;
  // background: red;
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

    position: fixed;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    color: #000;
	>video{
		width: 100% !important;
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
