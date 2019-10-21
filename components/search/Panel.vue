<template>
  <div v-show="show" class="panel">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <!-- 产地 -->
        <div :class="['location',isMoreLocat?'scale':'']">
          <section ref="area">
            <li
              v-for="area in list"
              :class="{actived:filter.place==area}"
              :key="area"
              @click="getAreas(area)"
            >{{area}}</li>
          </section>
        </div>
        <div v-if="isMoreBtn" class="more" @click="isMoreLocat = !isMoreLocat">
          <img :src="isMoreLocat?icon.Aimdown:icon.Aimup" width="19" height="15" alt />
        </div>

        <!-- 价格区间 -->
        <div class="price-area">
          <input v-model="filter.priceBegin" type="text" placeholder="最低价" @blur="valiPriceBegin" />
          <span>-</span>
          <input v-model="filter.priceEnd" type="text" placeholder="最高价" @blur="valiPriceEnd" />
        </div>
        <div class="weight"></div>
        <div class="operator">
          <div class="reset" @click="reset">重置</div>
          <div class="confirm" @click="submit">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Aimup from "@/static/img/icon-aimup.png";
import Aimdown from "@/static/img/icon-aimdown.png";
import { getArea } from "@/api/areaApi.js";
import T from '@/utils/tips.js'
export default {
  name: "panel",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    getArea().then(data => {
      let d = data.data;
      let res = [];
      d.forEach(item => {
        item !== null && res.push(item);
      });
      this.list = res;
    });
  },
  data() {
    return {
      list: [],
      isMoreLocat: false,
      isMoreBtn: false,
      icon: {
        Aimup,
        Aimdown
      },
      filter: {
        place: "",
        priceBegin: "",
        priceEnd: ""
      },
      isMinOk: true,
      isMaxOk: true
    };
  },
  methods: {
	  getAreas(area){
		  this.filter.place=area
	  },
    close() {
      this.$emit("close", false);
    },
    valiPriceBegin() {
      let val = this.filter.priceBegin;
      if (this.filter.priceBegin !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])(\.(\d{1,2}$))?$/)) {
          this.isMinOk = false;
          return T.tips("请输入0-9999.99的数字");
        }
        this.isMinOk = true;
      }
    },
    valiPriceEnd() {
      let val = this.filter.priceEnd;

      if (this.filter.priceEnd !== "") {
        if (!val.match(/^(^[1-9]\d+|^[0-9])(\.(\d{1,2}$))?$/)) {
          this.isMaxOk = false;
          return T.tips("请输入0-9999.99的数字");
        }
        this.isMaxOk = true;
      }
    },
    reset() {
      this.filter = {
        place: "",
        priceBegin: "",
        priceEnd: ""
      };
    },
    submit() {
      if (this.isMinOk && this.isMaxOk) {
        this.$emit('filter',this.filter)
      } else {
        this.$tips("请确认输入数据无误");
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  .price-area {
    text-align: center;
    position: relative;
    padding-top: 50upx;
    &::before {
      content: "价格区间";
      display: block;
      color: #000;
      font-size: 24upx;
      // margin-left: 31upx;
      font-weight: bold;
      text-align: left;
      margin-bottom: 20upx;
      position: absolute;
      // left: 15upx;
      top: 0;
    }
    input {
      border: none;
      outline: none;
      height: 48upx;
      border-radius: 24upx;
      background-color: #f5f5f5;
      width: 200upx;
      display: inline-block;
      padding: 0 24upx;
      font-size: 24upx;
      text-align: center;
      &::placeholder {
        color: #cccccc;
      }
    }
    span {
      margin-left: 16upx;
      margin-right: 16upx;
	  position: relative;
	  top: -15upx;
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
  .more {
    text-align: center;
    padding: 20upx 0;
  }
  .body {
    background-color: #fff;
    padding: 54upx 24upx 20upx 24upx;
    position: fixed;
    z-index: 2;
    width: 580upx;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: scroll;
    padding-bottom: 120upx;
    -webkit-overflow-scrolling: touch;
    .operator {
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 30upx;
      line-height: 80upx;
      position: fixed;
      bottom: 0;
      width: 520upx;
      background-color: #fff;
      padding-bottom: 30upx;
    }
    .reset {
      width: 200upx;
      box-shadow: 0 0 0 1upx #e6e6e6 inset;
      color: #000;
      border-radius: 40upx;
    }
    .confirm {
      color: #fff;
      background-color: #fc2d2d;
      width: 300upx;
      border-radius: 40upx;
    }
    .location {
      margin: 50upx 0;
      overflow-y: auto;
      transition: height 0.5s;
      & > section {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      &.scale {
        overflow-y: auto;
        height: auto;
      }
      &::before {
        content: "产地";
        display: block;
        color: #000;
        font-size: 24upx;
        margin-left: 62upx;
        font-weight: bold;
      }
      margin-left: -62upx;
      li {
        // width: 42upx;
        padding: 8upx 20upx;
        line-height: 44upx;
        border-radius: 22upx;
        background-color: #f5f5f5;
        margin-top: 20upx;
        margin-left: 62upx;
        color: #666;
        font-size: 24upx;
        text-align: center;
        white-space: nowrap;
        transition: all 0.5s;
        &.actived {
          background-color: #fff5f5;
          color: #fc2d2d;
        }
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
    transform: translateX(100%);
  }
  .body-enter-to,
  .body-leave {
    transform: translateX(0%);
  }
  .mask-enter-to,
  .body-enter-to,
  .mask-leave,
  .body-leave {
    opacity: 1;
  }
}
</style>
