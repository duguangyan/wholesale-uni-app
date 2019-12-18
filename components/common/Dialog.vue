<template>
  <div v-if="isShow" class="dialog">
    <transition name="mask">
      <div v-if="isShow" :class="['mask',isMask?'mask-bg':'']"></div>
    </transition>
    <transition name="body">
      <div v-if="isShow" class="body">
        <div class="title">{{title}}</div>
		<div class="slot" v-if="hasSlot">
			<slot></slot>
		</div>		
        <div class="footer">
          <div class="cancel btn" @click="doCancel">{{cancelText}}</div>
          <div class="confirm btn" @click="doConfirm">{{confirmText}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'customdialog',
  props: {
    title: {
      type: String,
      default: '标题'
    },
	hasSlot:{
		type: Boolean,
		default: false
	},
	isShow:{
		type: Boolean,
		default: false
	},
	cancelText:{
		type: String,
		default: '取消'
	},
	confirmText:{
		type: String,
		default: '确认'
	}
  },
  data() {
    return {
      isMask: true,
      callback: null
    }
  },
  methods: {
    doConfirm() {
		this.$emit('doConfirm','')
    },
	doCancel(){
		this.$emit('doCancel','')
	}
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 9999;
  }
  .mask-bg {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .body {
    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20upx;
    width: 500upx;
    padding: 76upx 30upx 30upx;
    text-align: center;
	.slot{
		position: relative;
		text-align: left;
		font-size: 24upx;
		top: -50upx;
	}
    .title {
      font-size: 32upx;
      color: #000;
      margin-bottom: 96upx;
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
        background-color: #FE3B0B;
        color: #fff;
      }
    }
  }

  .mask-enter-active,
  .body-enter-active {
    transition: all 0.5s;
    transform-origin: left;
  }
  .mask-enter,
  .body-enter{
    opacity: 0;
  }
  .body-enter{
    transform: scale(0.5) translate(-50%, -50%);;
  }
  .body-enter-to{
    transform: scale(1) translate(-50%, -50%);;
  }
  .mask-enter-to,
  .body-enter-to{
    opacity: 1;
  }
}
</style>
