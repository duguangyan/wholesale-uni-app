<template>
  <div v-show="show" class="share">
    
      <div v-show="show" class="mask" @click="close"></div>
   
      <div v-show="show" class="body">
        <div class="d-1" @click="share(0)">
          <button class="btn1" >点我复制</button>
          <img class="icon-50" src="@/static/img/icon-wechat.png" width="50" height="50" alt />
          <div>微信</div>
        </div>
        <div class="d-2" @click="share(1)">
          <button class="btn2">点我复制</button>
          <img class="icon-50" src="@/static/img/icon-moment.png" width="50" height="50" alt />
          <div>朋友圈</div>
        </div>
      </div>
   
  </div>
</template>

<script>
export default {
  name: "share",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    nav: {
      type: String,
      default: ""
    },
	shopId: {
      type: String,
      default: ""
    },
	goodsId: {
	  type: String,
	  default: ""
	},
	name: {
	  type: String,
	  default: ""
	},
	img: {
	  type: String,
	  default: ""
	}
  },
  data() {
    return {
      nums: 0,
      localUrl: ''
    };
  },
  methods: {
	share(index){
		let scene = 'WXSenceTimeline'; // 朋友圈
		let title = "正鼎农品" + this.name
		if(index == 0) { // 微信
			scene = 'WXSceneSession'
			title = "正鼎农品"
		}
		let href = 'http://wsm.qinlvny.com/#/pages/order/goodsDetail/goodsDetail/'+ this.shopId + '/' + this.goodsId
		console.log(href)
		
		let summary = this.name
		let imageUrl = this.img
		uni.share({
		    provider: "weixin",
		    scene,
		    type: 0,
		    href,
		    title,
		    summary,
		    imageUrl,
		    success: function (res) {
		        // console.log("success:" + JSON.stringify(res));
		    },
		    fail: function (err) {
		        // console.log("fail:" + JSON.stringify(err));
		    }
		});
		
	},
    close() {
      this.$emit("close", false);
    },
    minNums() {},
    plusNums() {},
    navigate() {
     
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  .icon-50{
	  width: 100upx;
	  height: 100upx;
  }
  button{
    position: absolute;
    opacity: 0;
    height: 100upx;
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
    padding: 74upx 0upx;
    position: fixed;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28upx;
    text-align: center;
    color: #333;
	.d-1{
		left: 138upx;
	}
	.d-2{
		right: 138upx;
	}
    &>div{
      position: relative;
    }
    img {
      margin-bottom: 20upx;
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
