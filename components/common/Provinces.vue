<template>
  <div v-show="show" class="province">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
		  <div class="icon-30">
			  <img src="@/static/img/tag-close2.png" width="15" height="15" @click="close" /> 
		  </div>
        <div>
          <li v-for="(item,index) in list" :key="index" @click="selArea(item)">{{item}}</li>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
var vm = {
  name: "province",
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

  methods: {
    close() {
      this.$emit("close", false);
    },
    selArea(item){
      this.$emit('change',item)
    }
  }
};
export default vm;
</script>

<style lang="scss" scoped>
.province {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  .icon-30{
	  width: 36upx !important;
	  height: 36upx !important;
	  position: absolute;
	  right: 30upx;
	  top: 30upx;
	  img {
	    width: 100%;
		height: 100%;
	  }
  }
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
    height: 800upx;
    left: 0;
    bottom: 0;
    font-size: 28upx;
    text-align: left;
    color: #666;

    & > div {
      height: calc(700upx);
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    &::before {
      display: block;
      color: #000;
      line-height: 100upx;
      content: "选择地址";
       text-align: center;
    }
    
    li {
      line-height: 80upx;
      padding-left: 30upx;
      &.actived {
        color: #000;
      }
      &:not(:last-child) {
        border-bottom: 1upx solid #f5f5f5;
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
