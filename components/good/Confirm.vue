<template>
  <div v-show="show" class="good-confirm">
    <transition name="mask">
      <div v-show="show" class="mask" @click="close"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <div class="good">
          <div class="photo">
            <img class="icon-90" :src="good.goods.imgUri" width="90" height="90" alt />
          </div>
          <div class="unit fg1">
            {{totalPrice}}
            <span>/{{good.goods.unitName}}</span>
          </div>
          <img class="icon-15 flr" src="@/static/img/tag-close2.png" width="15" height="15" @click="close" />
        </div>

        <!-- 多规格 -->
        <div v-if="good.goods.showStyle!==2" class="standard">
          <div v-for="(spec,index) in good.goodsDetailSpecList" :key="spec.id">
            <div class="sta-name">{{spec.name}}</div>
            <div class="sta-item">
              <template v-for="(opt) in spec.goodsDetailSpecValueList">
                <template v-if="index === deep - 1">
                  <span
                    :class="[!getStatus(opt.value)&&curs[index]['key']===opt.value?'actived':'',getStatus(opt.value)?'disabled':'']"
                    :key="opt.id"
                    @click="getStatus(opt.value)?'':selOption(opt.value,index)"
                  >{{opt.value}}{{good.sufName}}/{{good.goods.unitName}}</span>
                </template>
                <template v-else>
                  <span
                    :class="{actived: curs[index]['key']===opt.value}"
                    :key="opt.id"
                    @click="selOption(opt.value,index)"
                  >{{opt.value}}</span>
                </template>
              </template>
            </div>
          </div>
        </div>

        <div class="count">
          <span class="fg1">数量</span>
		  <div class="flr">
			 <div v-show="nums>startNum" class="icon-min" @click="--nums"></div>
			 <input v-model="nums" type="number" />
			 <div v-show="nums<stock" class="icon-plus" @click="++nums"></div> 
		  </div>
          
        </div>
        <div class="money">
          <span class="fg1">商品金额</span>
          <span class="price">{{payPrice}}</span>
        </div>
        <div class="btn" @click="navigate">确定</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { addToCart } from "@/api/goodsApi.js";
import util from '@/utils/util.js'
import T from '@/utils/tips.js'
export default {
  name: "good-confirm",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object,
      default() {
        return {};
      }
    },
    nav: {
      type: String,
      default: ""
    },
	goodsId:{
		type: String,
		default: ""
	},
	shopId:{
		type: String,
		default: ""
	},
  },
  data() {
    return {
      curDisable: false,
      nums: /* 数量 */ 1,
      startNum: /* 起批量 */ 1,
      curs: /* 当前选中的规格项 */ [],
      totalPrice: 0,
      stock: 0,
      deep: 1,
      list: []
    };
  },
  computed: {
    payPrice() {
      return util.formatMoney((this.totalPrice * 100 * this.nums) / 100);
    }
  },
  watch: {
    good(val) {
      this.deep = val.goodsDetailSpecList.length;
      val.goodsDetailSpecList.forEach(spec => {
        this.curs.push({
          key: spec.goodsDetailSpecValueList[0].value,
          disabled: undefined
        });
      });

      this.calcPrice();
    },
    nums(val, oldval) {
      if (val > this.stock) {
        this.nums = oldval;
      } else if (val < this.startNum) {
        if (!this.curDisable) {
          this.nums = this.startNum;
        }
      } else {
        this.nums = val;
      }
      this.calcPrice(1);
    }
  },
  methods: {
    getStatus(key) {
      let node = this.good.tree;
      for (let i = 0; i < this.deep; i++) {
        if (i === this.deep - 1) {
          node = node[key];
          return node.disabled;
        } else {
          node = node[this.curs[i]["key"]];
        }
      }
    },
    calcPrice(reset) {
      let node = this.good.tree;
      if (this.good.goods.showStyle !== 2) {
        this.curs.forEach((cur, index) => {
          node = node[cur["key"]];
          if (index ===  this.curs.length - 1) {
			this.totalPrice = node.price || 0;
			this.stock = node.stock;
			!reset && (this.nums = node.disabled ? 0 : node.startNum);
			this.startNum = node.startNum || 0;
			cur.disabled = node.disabled;
			this.curDisable = node.disabled;
          }
        });
      } else {
        this.curs.forEach((cur, index) => {
          node = node[cur["key"]];
          if (index === this.curs.length - 1) {
            this.stock = node.stock;
            !reset && (this.nums = node.disabled ? 0 : node.startNum);
            cur.disabled = node.disabled;
          }
        });

        let list = [...this.good.goodsList];
        let first = list[0];
        let last = list[list.length - 1];
        list.push({
          startNum: Math.pow(2, 25),
          price: last.price
        });
        list.unshift({
          startNum: first.startNum,
          price: first.price
        });

        this.startNum = first.startNum;
        for (let i = 1, l = list.length - 1; i < l; i++) {
          if (this.nums >= list[i].startNum && this.nums < list[i + 1].startNum) {
            this.totalPrice = list[i].price;
          }
        }
      }
    },
    selOption(data, index) {
      let list = [...this.curs];
      list[index]["key"] = data;
      this.curs = list;
      this.calcPrice();
    },
    close() {
      this.$emit("close", false);
    },
    minNums() {},
    plusNums() {},
    navigate() {
      // 验证选项是否完整
      let isInvalid = false;
      let node = this.good.tree;
      for (let i = 0; i < this.deep; i++) {
        node = node[this.curs[i]["key"]];
        if (i === this.deep - 1) {
          isInvalid = node.disabled;
        }
      }
      if (isInvalid) {
        return T.tips("请选择所有的项");
      }
      if (this.nav.match(/cart/)) {
        addToCart({
          skuId: node.id,
          num: this.nums
        }).then(data => {
      
          this.$emit("update");
        });
      } else {
        if (!!this.nav.match(/submit/i)) {
			let submitData = JSON.stringify({
                addressId: "",
                goodsCount: this.nums,
                goodsId: this.goodsId,
                shopId: this.shopId,
                skuId: node.id
                // userId: localStorage.getItem("uid")
              })
			uni.navigateTo({
				url:'/pages/order/submit/submit?submitData='+submitData+'&isBuyNow='+1
				
			})
    
        } else {
			uni.switchTab({
				url:'/pages/order/order'
			})
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.good-confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .standard {
    border-bottom: 1px solid #f0f0f0;
	max-height: 200px;
	overflow-y: auto;
	height: 200px;
	padding-left: 2px;
  }
  .sta-name {
    color: #333;
    font-size: 30upx;
    margin-top: 30upx;
  }
  .sta-item {
    span {
      display: inline-block;
      margin-right: 60upx;
      margin-top: 30upx;
      width: 150upx;
      line-height: 50upx;
      border-radius: 24upx;
      text-align: center;
      color: #666;
      font-size: 24upx;
      box-shadow: 0 0 0 1upx #666;
      transition: all 0.5s;
      &.actived {
        box-shadow: 0 0 0 1upx #fc2d2d;
        color: #fc2d2d;
      }
      &.disabled {
        box-shadow: 0 0 0 1upx #bebebe;
        color: #bebebe;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .body {
    background-color: #fff;
    padding: 20upx;
    position: fixed;
    width: 100%;
    max-height: 1000upx;
    bottom: 0;
    z-index: 5;
	.icon-15{
		width: 30upx;
		height: 30upx;
		position: absolute;
		right: 40upx;
		top: 0upx;
	}
	.icon-90{
		width: 180upx;
		height: 180upx;
	}
    .good {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
	  position: relative;
      .photo {
        width: 180upx;
        height: 180upx;
      }
      .unit {
        margin-top: 28upx;
        font-size: 40upx;
        color: #f5222d;
        line-height: 1;
        margin-left: 20upx;
        span {
          color: #000;
          font-size: 24upx;
        }
        &::before {
          content: "￥";
          display: inline-block;
          color: #f5222d;
          font-size: 20upx;
        }
      }
    }
    .count {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-bottom: 46upx;
      border-bottom: #f0f0f0 solid 1upx;
      font-size: 30upx;
      padding-top: 24upx;
      // margin-top: 74upx;
	  position: relative;
	  .flr{
		  position: absolute;
		  right: 90upx;
	  }
      input {
        margin-left: 20upx;
        margin-right: 20upx;
        width: 84upx;
        height: 44upx;
        background-color: #f5f5f5;
        border-radius: 6upx;
        text-align: center;
        font-size: 28upx;
        color: #333;
        border: none;
        outline: none;
      }
    }
    .money {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 48upx;
      font-size: 30upx;
      .price {
        color: #f5222d;
		position: relative;
		left: -30upx;
        &::before {
          content: "￥";
          display: inline-block;
          font-size: 24upx;
        }
      }
    }
    .btn {
      margin-top: 96upx;
      width: 640upx;
      line-height: 80upx;
      background-color: #fc2d2d;
      color: #fff;
      border-radius: 40upx;
      font-size: 32upx;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
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
