<template>
  <view class="good-detail" v-if="opt">
    <view class="top">
      <view class="tips cf">
        <!-- <view class="fll" @click="goBack">
					<image src="../../../static/imgs/icon-back.png" mode=""></image>
				</view> -->
        <view class="flr" @click="isShare = true"><image src="../../../static/imgs/icon-share.png" mode=""></image></view>
        <view class="flr" @click="navToCart"><image src="../../../static/imgs/icon-detail.png" mode=""></image></view>
      </view>
      <!-- 轮播图 -->
      <scroll-view class="index-top-warp">
        <view class="uni-padding-wrap">
          <view class="page-section swiper">
            <view class="page-section-spacing">
              <swiper @change="changeBanner" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                <swiper-item v-for="(item, index) in imageList" :key="index">
                  <view class="swiper-item">
                    <!-- <view v-if="item.type == 1"> -->
                      <video v-if="item.type == 2" id="myVideo" :src="item.imgUrl" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
                      <!-- <image class="img1" src="../../../static/img/play.png" mode="aspectFit"></image> -->
                    <!-- </view> -->
                    <image v-else class="imgloading" v-if="imgLoading" src="../../../static/img/timg.gif" mode=""></image>
                    <image @load="imgLoad" :lazy-load="true" :src="item.imgUrl"></image>
                  </view>
                </swiper-item>
              </swiper>
            </view>
          </view>
        </view>
      </scroll-view>
      <SwiperDot class="dot" :current="cur" :list="imageList"></SwiperDot>
    </view>

    <view class="overall">
      <view v-if="good.goods.showStyle == 3 || good.goods.showStyle == 1">
        <text class="price">
          {{ good.goods.minPrice || 0 }}元
          <text class="fs24 text-000" v-if="good.goodsSkuList.length <= 1">{{ '/' + good.goods.unitName }}</text>
        </text>
        <text v-if="good.goodsSkuList.length > 1">
          <text class="text-red">&nbsp;~&nbsp;</text>
          <text class="price">
            <text>{{ good.goods.maxPrice || 0 }}元</text>
          </text>
          <text class="unit" v-if="good.goods.unitName">{{ '/' + good.goods.unitName }}</text>
        </text>
      </view>
      <view v-if="good.goods.showStyle == 2" class="cf goodsPrice">
        <view v-for="(item, index) in good.goodsList" :key="index" class="fll" :class="{ left1: good.goodsList.length == 1, left2: good.goodsList.length == 2 }">
          <view class="multi-price">
            <text>{{ item.price || 0 }}元</text>
            <text v-if="good.goods.unitName">/{{ good.goods.unitName }}</text>
          </view>
          <view class="multi-sta">{{ item.startNum }}{{ good.goods.unitName }}起批</view>
        </view>
      </view>
      <view v-if="good.goods.showStyle != 1 && good.goods.showStyle != 2 && good.goods.showStyle != 3">
        <text class="price" v-if="good.goods.minPrice">
          {{ good.goods.minPrice || 0 }}
          <text v-if="good.goods.maxPrice">~ {{ good.goods.maxPrice || 0 }}元</text>
        </text>
        <text class="unit" v-if="good.goods.unitName">{{ '/' + good.goods.unitName }}</text>
      </view>
    </view>

    <view class="good-name">{{ good.goods.name }}</view>

    <view class="info">
      <text>{{ good.goods.hits || 0 }}人看过</text>
      <text>{{ good.goods.spuSalesNum || 0 }}订单数</text>
      <view v-if="postType !== 0" class="text" @click="goPostSetting(good.goods.postSettingId)">
        运费说明
        <view class="icon-right"><img src="@/static/img/icon-right.png" /></view>
      </view>
      <text v-else class="limit-block">全国包邮</text>
    </view>

    <view v-if="good.goods.showStyle == 3 || (good.goods.showStyle == 1 && good.goodsSkuList.length > 1)" class="standard">
      <view class="tag1">
        <text>—</text>
        <text>规格</text>
        <text>—</text>
      </view>
      <li v-for="(item, index) in good.standardList" :key="index" v-show="index < 3">
        <text v-for="(sta, staIdx) in item" :key="staIdx" :class="{ 'fix-block': staIdx == item.length - 1 }">{{ sta }}</text>
      </li>
      <view v-if="good.standardList.length > 3" class="check-more" @click="isStandard = true">
        查看更多
        <view class="icon"><img src="@/static/img/tag-go.png" /></view>
      </view>
    </view>
    <view class="line"></view>

    <view class="shop">
      <img src="@/static/img/icon-user.png" alt="" />
      <text class="master">货主:{{ good.userRealInfoVo.realName }}</text>
      <view @click="navToShop">查看店铺</view>
    </view>

    <view class="line"></view>

    <view class="props">
      <view class="tag1">
        <text>—</text>
        <text>商品属性</text>
        <text>—</text>
      </view>
      <li v-for="(item, index) in good.goodsDetailAttrList" :key="index">
        <text>{{ item.name }}:</text>
        <text v-if="item.inputType === 0">{{ item.goodsDetailAttrValueList[0].remark }}</text>
        <text v-else v-for="attr in item.goodsDetailAttrValueList" :key="attr.id">{{ attr.value }}&ensp;</text>
      </li>
    </view>
    <view class="line" v-if="good.goodsDetailAttrList.length > 0"></view>
    <view class="det">
      <view class="tag1">
        <text>—</text>
        <text>商品详情</text>
        <text>—</text>
      </view>
      <view class="txt">{{ good.goods.detail }}</view>
      <view class="tag2" v-for="(item, index) in detailImageList" :key="index">
        <!-- <view v-if="item.type==3" :class="{'img-con':item.type==3}" @click="play(item)">
					<image class='img2' src="../../../static/img/play.png" mode=""></image>
				</view> -->
        <img class="img" mode="widthFix" :src="item.imgUrl" width="100%" alt />
      </view>
    </view>

    <view class="goodsTitle" v-if="isGoodsTitle">{{ goodsTitle }}</view>

    <!-- 0 待审核 1待修改 2申请驳回 3上架 4下架 -->
    <view v-if="isMaster" class="">
      <!-- 审核驳回显示驳回信息 -->
      <view v-if="good.goods.status == 2" class="bottom-tips">{{ good.goodsAuditLogVO.auditOpinion }}</view>
      <view v-if="good.goods.status == 1" class="bottom-tips">审核中</view>

      <!-- 审核中 -->
      <view class="bottom-btn">
        <view v-if="good.goods.status == 1" @click="rollback">撤回</view>
        <!-- 审核驳回 -->
        <view :class="{ mr10: good.goods.status == 4 }" v-if="good.goods.status == 2 || good.goods.status == 4" @click="modify">修改</view>
        <!-- 已上架 -->
        <view v-if="good.goods.status == 3" @click="unpublish">下架</view>
        <!-- 一下机 -->
        <view class="ml10" v-if="good.goods.status == 4" @click="publish">上架</view>
      </view>
    </view>
    <view class="operator flex" v-else-if="good.goods.status == 3">
      <view class="fir flex-1">
        <view @click="navToShop">
          <img class="icon-18" src="@/static/imgs/icon-shop.png" />
          <view>店铺</view>
        </view>
        <view tag="div" @click="callMaster(good.userRealInfoVo.phone)">
          <view class="icon-15"><img class="icon-order" src="@/static/imgs/icon-phone.png" /></view>
          <view class="cart-text">
            联系货主
            <!-- <view v-show="counter > 0">{{counter}}</view> -->
          </view>
        </view>
      </view>

      <view class="flex-2" v-if="good.isInvalid || good.goods.status != 3"><view class="add" @click="goHome">再去逛逛</view></view>
      <view class="flex-2" v-else-if="good.goods.status != 4 && !(good.isInvalid || good.goods.status != 3)">
        <view class=" flex" v-if="!good.isInvalid || good.goods.status == 3">
          <!--  #ifdef  H5 || APP-PLUS -->
          <view class="add flex-1" @click="showConfirm('/cart')">加入进货单</view>
          <view class="buy flex-1" @click="showConfirm('/submit')">立即购买</view>
          <!--  #endif -->
          <!--  #ifdef  MP-WEIXIN -->
          <view class="add flex-1">
            <form @submit="showConfirm1($event, '/cart')" report-submit="true"><button form-type="submit">加入进货单</button></form>
          </view>
          <view class="buy flex-1">
            <form @submit="showConfirm1($event, '/submit')" report-submit="true"><button form-type="submit">立即购买</button></form>
          </view>
          <!--  #endif -->
        </view>
      </view>
    </view>

    <!-- <Confirm :goodsId='goodsId' :shopId='shopId' :show="isSure" @close="isSure = false" :nav="nav" :good="good" @update="getUpdate" /> -->

    <view v-show="isSure" class="good-confirm" :animation="animation">
      <transition name="mask"><view v-show="isSure" class="mask" @click="isSure = false"></view></transition>
      <transition name="body">
        <view v-show="isSure" class="body">
          <view class="good">
            <view class="photo"><img class="icon-90" :src="good.goods.imgUri" width="90" height="90" alt /></view>
            <view class="unit fg1">
              {{ totalPrice }}元
              <text>/{{ good.goods.unitName }}</text>
            </view>
            <img class="icon-155" src="@/static/img/tag-close2.png" @click="isSure = false" />
          </view>

          <!-- 多规格 -->
          <view v-if="good.goods.showStyle != 2" class="standard">
            <view v-for="(spec, index) in good.goodsDetailSpecList" :key="spec.id">
              <view class="sta-name">{{ spec.name }}</view>
              <view class="sta-item cf">
                <view class="fll" v-for="(opt, ii) in spec.goodsDetailSpecValueList" :key="ii">
                  <view v-if="index == deep - 1">
                    <!-- <text :class="[!getStatus(opt.value)&&curs[index]['key']==opt.value?'actived':'',getStatus(opt.value)?'disabled':'']"
										 :key="opt.id" @click="selOption(opt.value,index)">{{opt.value}}{{good.sufName}}/{{good.goods.unitName}}</text> -->
                    <text
                      :class="[!getStatus(opt.value) && curs[index]['key'] == opt.value ? 'actived' : '', getStatus(opt.value) ? 'disabled' : '']"
                      :key="opt.id"
                      @click="selOption(opt.value, index)"
                    >
                      {{ opt.value }}{{ good.sufName }}
                    </text>
                  </view>
                  <view v-if="index != deep - 1">
                    <text :class="{ actived: curs[index]['key'] === opt.value }" :key="opt.id" @click="selOption(opt.value, index)">{{ opt.value }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="count">
            <text class="fg1">数量</text>
            <view class="input cf">
              <view class="fll" v-show="nums > startNum" @tap="doDecrease">-</view>
              <input class="fll" v-model="nums" type="number" @blur="checkNum($event)" />
              <view class="flr" v-show="nums < stock" @tap="doIncrease">+</view>
            </view>
          </view>
          <view class="money">
            <text class="fg1">商品金额</text>
            <text class="price">{{ payPrice }}</text>
          </view>
          <view class="btn" @click="navigate">确定</view>
        </view>
      </transition>
    </view>

    <Share :img="imageList[0].imgUrl" :name="good.goods.name" :shopId="shopId" :goodsId="goodsId" :show="isShare" @close="isShare = false" />
    <Standard v-if="good.standardList.length > 3" :show="isStandard" :list="good.standardList" @close="isStandard = false" />

    <!-- 联系代办 -->
    <view v-show="isCall" class="call-dialog">
      <view name="mask"><view class="mask" @click="isCall = false"></view></view>
      <view name="body" class="body">
        <view class="li" v-for="item in callList" :key="item.id" @click="callAgent(item)">{{ item.realName }}:{{ item.phone }}</view>
      </view>
      <!-- <view class="xx" @click="isAgent = false">x</view> -->
    </view>
  </view>
</template>

<script>
import Share from '@/components/good/Share';
import Player from '@/components/common/Player.vue';
import Standard from '@/components/good/Standard';
import ColSta from '@/static/img/icon-collect.png';
import ColAct from '@/static/img/icon-collect2.png';
import { addToCart } from '@/api/goodsApi.js';
import { handlerGoods,getDetail, getGoodNums, getPostItem, getHasCollect, getGoodsDetail } from '@/api/goodsApi.js';
import { getSetFormId } from '@/api/userApi.js';
import T from '@/utils/tips.js';
import util from '@/utils/util.js';
import SwiperDot from '@/components/common/SwiperDot.vue';
var vm =  {
  data() {
    vm = this
    return {
      isMaster: /*是否货主*/ false,
      isCall: /*是否展示拨号*/ false,
      callList: /*代办人号码列表*/ [],
      animation: '',
      imgLoading: true,
      opt: false,
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 500,
      shopId: '',
      goodsId: '',
      curDisable: false,
      nums: /* 数量 */ 1,
      startNum: /* 起批量 */ 1,
      curs: /* 当前选中的规格项 */ [],
      totalPrice: 0,
      stock: 0,
      deep: 1,
      list: [],
      isPlayer: false,
      videoUrl: '',
      imageList: [],
      detailImageList: [],
      videoObj: {},
      postType: 0,
      isStandard: false,
      good: {
        hasColletion: false,
        rules: /* 组合规则 */ [],
        goods: {},
        goodsSkuList: [],
        standardList: []
      },
      cur: 0,
      total: 0,
      icon: {
        ColSta,
        ColAct
      },
      counter: 0,
      isSure: false,
      isShare: false,
      nav: '',
      isGoodsTitle: false,
      goodsTitle: ''
    };
  },
  components: {
    Share,
    Standard,
    Player,
    SwiperDot
  },
  computed: {
    payPrice() {
      return util.formatMoney((this.totalPrice * 100 * this.nums) / 100, 2);
    }
  },
  onLoad(options) {
    this.shopId = options.shopId;
    this.goodsId = options.goodsId;
  },
  onShow() {
    vm.load()
  },
  methods: {
    load(){
      getGoodsDetail({
          shopId: this.shopId,
          goodsId: this.goodsId
        }).then(data => {
          if (data.code == '1000') {
            let d = data.data.goodsDetail;
            d.hasColletion = data.data.hasColletion;
            d.standardList = [];
      
            // 便被身份
 
             vm.isMaster = uni.getStorageSync('roleId') == 20001 && (uni.getStorageSync('uid') == d.userRealInfoVo.userId);

      
            // 获取代办人列表
            vm.callList = d.agencyList;
      
            //处理金额
            d.goods.minPrice = util.formatMoney(d.goods.minPrice, 2);
            d.goods.maxPrice = util.formatMoney(d.goods.maxPrice, 2);
      
            // 处理视频和图片
            let imageList = [];
            d.goodsImgVOList.forEach(item => {
              // if (item.type != 2) {
                if (item.primaryType == 1) {
                  if(item.type!=3){
                    imageList.push(item);
                  }
                  
                } else {
                  if (item.type != 2) {
                    this.detailImageList.push(item);
                  }
                }
              // } else {
                this.videoObj[item.sort] = item.imgUrl;
              // }
            });
            this.imageList = imageList;
            this.total = imageList.length;
      
            if (d.goods.unitName == null) {
              d.goods.unitName = d.goodsDetailSpecList[0].name;
            }
      
            const setNode = (node, key) => {
              node[key] = {};
              return node[key];
            };
      
            // 生成规格树
            let tree = {};
            // let specLen = d.goodsDetailSpecList.length;
            let parentNodes = [tree];
      
            d.goodsDetailSpecList.forEach(spec => {
              // 为每个父节点插入子节点
              let nodes = [];
              parentNodes.forEach(node => {
                spec.goodsDetailSpecValueList.forEach((val, index) => {
                  // 重置当前遍历的父节点
                  nodes.push(setNode(node, val.value));
                });
              });
              parentNodes = nodes;
            });
      
            let sufName;
            let isSection = d.goods.showStyle == 1 && d.goodsSkuList.length > 1 ? true : false;
            // if (isSection) {
            //   sufName = d.goodsDetailSpecList[0].valueSuffix;
            // } else {
            //   sufName = "";
            // }
            sufName = d.goodsDetailSpecList[0].valueSuffix || '';
      
            let grades = JSON.parse(d.goodsSkuList[0].priceExp);
            if (d.goods.showStyle == 2) {
              d.goodsSkuList[0].price = grades[0].price;
              d.goodsSkuList[0].startNum = grades[0].startQuantity;
            }
      
            // 配置节点
            let isInvalid = /* 是否无效效商品 */ true;
            d.goodsSkuList.forEach((sku, exIndex) => {
              let curNode = tree;
              let len = sku.attrValueList.length;
              d.standardList[exIndex] = [];
      
              sku.attrValueList.forEach((val, index) => {
                curNode = curNode[val.value];
                if (len - 1 == index) {
                  // 配置参数
                  curNode.disabled = !!(sku.stock < sku.startNum);
                  curNode.price = sku.price;
                  curNode.stock = sku.stock;
                  curNode.id = sku.id;
                  curNode.startNum = sku.startNum;
                }
                // 顺便处理规格
                if (isSection) {
                  d.standardList[exIndex].push(`${sku.startNum}${d.goods.unitName}起批`);
                  d.standardList[exIndex].push(`${val.value}${+d.goods.showStyle !== 3 ? sufName : ''}`);
                } else {
                  d.standardList[exIndex].push(val.value);
                }
      
                // 累计无效次
                isInvalid = isInvalid && curNode.disabled;
              });
              d.standardList[exIndex].push(`￥${sku.price}元/${d.goods.unitName}`);
            });
            d.tree = tree;
            d.isInvalid = isInvalid;
      
            if (d.isInvalid) {
              this.isGoodsTitle = true;
              this.goodsTitle = '库存不足,请浏览别的商品吧~';
              // T.tips("库存不足,请浏览别的商品吧~");
            }
      
            // 0 待审核 1待修改 2申请驳回 3上架 4下架
            if (d.goods.status == 4) {
              T.tips('商品已下架啦,看下其它的吧');
            }
      
            if (d.goods.showStyle == 2) {
              let sku = d.goodsSkuList[0].attrValueList[0];
              d.goodsList = [];
              let grades = JSON.parse(d.goodsSkuList[0].priceExp);
              grades.forEach((item, index) => {
                d.goodsList.push({
                  startNum: item.startQuantity,
                  price: item.price,
                  unit: sku.name,
                  id: sku.skuId
                });
              });
            }
      
            d.sufName = sufName;
      
            this.good = d || {};
      
            // 商品购买面板
            this.deep = this.good.goodsDetailSpecList.length;
            this.good.goodsDetailSpecList.forEach(spec => {
              this.curs.push({
                key: spec.goodsDetailSpecValueList[0].value,
                disabled: undefined
              });
            });
            this.calcPrice();
            this.opt = true;
            // 获得邮费方案
            // getPostItem({
            // 	id: d.goods.postSettingId
            // }).then(data => {
            // 	this.postType = data.data.type;
            // });
      
            this.good.goods.detail = util.formatRichText(this.good.goods.detail);
            console.log(this.good.goods.detail);
            // 判断商品是否备收藏
            if (uni.getStorageSync('access_token')) {
              this.getHasCollect(this.goodsId);
            }
          }
        });
      
    },
    
    updateGood(ids,type){
      handlerGoods({
        "goodsIds": ids,
        "handlerType": type,
      }).then(data=>{
        uni.showToast({
          title: data.message,
          duration: 2000,
          icon :'none'
        })
        vm.load()
       }).catch(err=>{
        uni.showToast({
          title: '网络出错，请稍后再试',
          duration: 2000,
          icon :'none'
        })
       });
    },
    publish(){
      vm.updateGood([vm.good.goods.id],0)
    },
    unpublish(){
      vm.updateGood([vm.good.goods.id],1)
    },
    // 修改
    modify(){
      uni.navigateTo({
        url: `/pages/middle/release/release?shopId=${vm.good.goods.shopId}&goodsId=${vm.good.goods.id}`
      })
    },
    rollback(){
      vm.updateGood([vm.good.goods.id],2)
    },
    callAgent(item) {
      item.phone &&
        uni.makePhoneCall({
          phoneNumber: item.phone //仅为示例
        });
      this.isCall = false;
    },
    callMaster(phone){
      uni.makePhoneCall({
        phoneNumber: phone //仅为示例
      });
    },
    navToShop() {
      uni.navigateTo({
        url: '/pages/shop/shop/shop?shopId=' + this.shopId
      });
    },
    navToCart() {
      uni.navigateTo({
        url: '/pages/order/order'
      });
    },
    imgLoad(e) {
      setTimeout(() => {
        this.imgLoading = false;
      }, 500);
    },
    // 判断是否备收藏
    getHasCollect(id) {
      let data = {
        targetId: id
      };
      getHasCollect(data).then(res => {
        this.good.hasColletion = res.data;
      });
    },
    closePlayer() {
      this.isPlayer = false;
      this.videoUrl = '';
    },
    submitInfo(e) {
      console.log(e.detail.formId);
    },
    goHome() {
      uni.switchTab({
        url: '/pages/main/main'
      });
    },
    doIncrease() {
      if (this.nums < this.stock) {
        // this.nums = oldval;
        ++this.nums;
      }
      this.calcPrice(1);
    },
    doDecrease() {
      // debugger
      if (+this.nums > this.startNum) {
        --this.nums;
        // if (!this.curDisable) {
        //   this.nums = this.startNum;
        // }
      }
      this.calcPrice(1);
    },
    checkNum(e) {
      let val = +e.target.value;
      if (val > this.stock) {
        T.tips('超出库存' + this.stock + '啦');
        this.nums = this.stock;
      } else if (val < this.startNum) {
        if (!this.curDisable) {
          T.tips('起批量不能低于' + this.startNum);
          this.nums = this.startNum;
        }
      }
      this.calcPrice(1);
    },
    getStatus(key) {
      let node = this.good.tree;
      for (let i = 0; i < this.deep; i++) {
        if (i === this.deep - 1) {
          node = node[key];
          return node ? node.disabled : false;
        } else {
          node = node[this.curs[i]['key']];
        }
      }
    },
    calcPrice(reset) {
      let node = this.good.tree;
      if (this.good.goods.showStyle != 2) {
        this.curs.forEach((cur, index) => {
          node = node[cur['key']];
          if (index === this.curs.length - 1) {
            this.totalPrice = parseFloat(node.price || 0);
            this.stock = node.stock;
            !reset && (this.nums = node.disabled ? 0 : node.startNum);
            this.startNum = node.startNum || 0;
            cur.disabled = node.disabled;
            this.curDisable = node.disabled;
          }
        });
      } else {
        this.curs.forEach((cur, index) => {
          node = node[cur['key']];
          if (index == this.curs.length - 1) {
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
      this.getStatus();

      let list = [...this.curs];
      list[index]['key'] = data;
      this.curs = list;
      this.calcPrice();
    },
    navigate() {
      // 验证选项是否完整
      let isInvalid = false;
      let node = this.good.tree;
      for (let i = 0; i < this.deep; i++) {
        node = node[this.curs[i]['key']];
        if (i === this.deep - 1) {
          isInvalid = node.disabled;
        }
      }
      if (isInvalid) {
        return T.tips('请选择所有的项');
      }
      if (this.nav.match(/cart/)) {
        addToCart({
          skuId: node.id,
          num: this.nums
        }).then(data => {
          this.isSure = false;
          this.getUpdate();
        });
      } else {
        if (!!this.nav.match(/submit/i)) {
          let submitData = JSON.stringify({
            addressId: '',
            goodsCount: this.nums,
            goodsId: this.goodsId,
            shopId: this.shopId,
            skuId: node.id
            // userId: localStorage.getItem("uid")
          });
          uni.navigateTo({
            url: '/pages/order/submit/submit?submitData=' + submitData + '&isBuyNow=1'
          });
        } else {
          uni.navigateTo({
            url: '/pages/order/order'
          });
        }
      }
    },

    goCart() {
      if (!uni.getStorageSync('access_token')) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        uni.switchTab({
          url: '/pages/order/order'
        });
      }
    },
    goPostSetting(id) {
      uni.navigateTo({
        url: '/pages/order/prompt/prompt?id=' + id
      });
    },
    getUpdate() {
      if (uni.getStorageSync('access_token')) {
        getGoodNums({
          status: ''
        }).then(data => {
          if (data.code == '1000') {
            this.counter = data.data.itemNum;
            this.isSure = false;
            T.tips('已成功加入进货单');
          } else {
            this.goodsTitle = res.message;
            this.isGoodsTitle = true;
            setTimeout(() => {
              this.isGoodsTitle = false;
            }, 1500);
          }
        });
      }
    },
    play(item) {
      if (item.type == 3) {
        this.videoUrl = this.videoObj[item.sort];
        uni.navigateTo({
          url: '/pages/order/goodsDetail/video/video?url=' + this.videoUrl
        });
        //this.isPlayer = true;
      }
    },
    triShare() {},
    changeBanner(e) {
      this.cur = e.detail.current;
    },
    // #ifdef  APP-PLUS || H5
    showConfirm(nav) {
      if (!uni.getStorageSync('access_token')) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        this.nav = nav;
        this.isSure = true;
      }
    },
    // #endif
    // #ifdef  MP-WEIXIN
    showConfirm1(e, nav) {
      if (!uni.getStorageSync('access_token')) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        let formId = e.detail.formId;
        let data = {
          userId: uni.getStorageSync('uid'),
          appId: uni.getStorageSync('appid'),
          formId: formId
        };
        // 获取formId
        //getSetFormId(data)
        console.log('formId', formId);
        this.nav = nav;
        this.isSure = true;

        var animation = uni.createAnimation({
          duration: 1000,
          timingFunction: 'ease'
        });

        this.animation = animation;

        animation.translateY(-100).step();

        animation.export();
      }
    },
    // #endif

  }
};
export default vm
</script>

<style lang="scss" scoped>
.ml10 {
  margin-left: 20upx;
}
.mr10 {
  margin-right: 20upx;
}
video {
  width: 750upx;
  height: 750upx;
}
.call-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  overflow: hidden;
  // height: 1000upx;
  // background: red;
  .li {
    line-height: 90upx;
    border-bottom: #f0f0f0 2upx solid;
    text-align: center;
    color: #333;
    font-size: 28upx;
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
    // height: 750upx;
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
.dot {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 40upx;
  bottom: 80upx;
}
.opt {
  opacity: 0;
}
.img1 {
  width: 100upx !important;
  height: 100upx !important;
  position: absolute;
  left: 50%;
  margin-left: -50upx;
  top: 50%;
  margin-top: -50upx;
}
.good-detail {
  padding-bottom: 120upx;
  width: 750upx;
  overflow-x: hidden;
  background: #fff;
  height: 100vh;
  .bottom-btn {
    line-height: 80upx;
    text-align: center;
    width: 650upx;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 20upx;
    color: #fff;
    font-size: 32upx;
    margin: auto;

    & > view {
      background-color: #fe3b0b;
      width: 650upx;
      border-radius: 40upx;
    }
  }
  .bottom-tips {
    position: fixed;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    line-height: 70upx;
    text-align: center;
    bottom: 120upx;
    color: #fff;
    font-size: 28upx;
  }
  .shop {
    display: flex;
    padding: 0 30upx;
    line-height: 120upx;
    align-items: center;
    .master {
      font-size: 30upx;
      color: #333;
      flex-grow: 1;
    }
    view {
      font-size: 24upx;
      width: 120upx;
      height: 60upx;
      color: #fe3b0b;
      border: 1px solid #fe3b0b;
      line-height: 60upx;
      text-align: center;
      border-radius: 40upx;
    }
    img {
      width: 84upx;
      height: 84upx;
      margin-right: 10upx;
    }
  }
  .img-con {
    position: absolute;
    width: 100upx;
    height: 100upx;
    left: 50%;
    margin-left: -50upx;
    top: 50%;
    margin-top: -50upx;
    // .img1{
    // 	width: 100% !important;
    // 	height: 100% !important;
    // }
    // &::before {
    // 	width: 80upx;
    // 	height: 80upx;
    // 	position: absolute;
    // 	content: "";
    // 	display: block;
    // 	background: url(../../../static/img/play.png) 50% 50% no-repeat;
    // 	left: 50%;
    // 	top: 50%;
    // 	z-index: 2;
    // 	background-size: cover;
    // 	transform: translate(-50%, -50%);
    // }
  }

  .limit-block {
    max-width: 200upx;
    display: inline-block;
    // display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-clamp: 1;
  }

  .fix-block {
    display: block;
    // width: 120upx;
    text-align: right;
  }

  .mc15 {
    margin-left: 30upx;
    margin-right: 30upx;
  }

  .mt1 {
    margin-top: 30upx;
  }

  .check-more {
    text-align: center;
    font-size: 24upx;
    color: #999;
    margin-top: 20upx;
    position: relative;
    .icon {
      width: 22upx;
      height: 22upx;
      position: absolute;
      top: 4upx;
      left: 50%;
      margin-left: 50upx;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .block {
    // background-color: #f5f5f5;
    height: 20upx;
    width: 100%;
  }

  .cart-text {
    position: relative;
    top: 8upx;
    & > div {
      display: block;
      position: absolute;
      width: 28upx;
      height: 28upx;
      line-height: 28upx;
      color: #fff;
      background-color: #fc2d2d;
      border-radius: 50%;
      text-align: center;
      right: 4upx;
      top: -60upx;

      &::after {
        content: attr(counter);
        display: block;
        font-size: 20upx;
        transform: scale(0.8);
      }
    }
  }

  // .swipe2 {
  // 	margin-top: -88upx;
  // 	height: 375upx;
  // 	width: 375upx;
  // 	position: relative;
  // 	overflow-x: hidden;

  // 	&::after {
  // 		content: attr(cur) "/"attr(total);
  // 		display: block;
  // 		position: absolute;
  // 		line-height: 17upx;
  // 		width: 40upx;
  // 		text-align: center;
  // 		color: #fff;
  // 		font-size: 12upx;
  // 		bottom: 14upx;
  // 		right: 20upx;
  // 	}
  // }

  .overall {
    .goodsPrice {
      display: flex;
      width: 100%;
      .fll {
        width: 33%;
      }
      .left1 {
        position: relative;
        left: -60upx;
      }
      .left2 {
        position: relative;
        left: -40upx;
      }
    }
    .flex-l {
      justify-content: flex-start;
    }

    .flexb-c {
      justify-content: space-between;
    }

    background-color: #fff;
    @extend .mc15;
    line-height: 1;
    padding-top: 30upx;
    padding-bottom: 16upx;
    color: #fc2d2d;
    display: flex;

    & > div {
      // width: 100upx;
      color: #333 !important;
      width: 100%;
    }

    .title {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 24upx;
    }

    .price {
      font-size: 40upx;
      color: #f5222d;
      &::before {
        font-size: 28upx;
        content: '￥';
        display: inline-block;
      }
    }

    .unit {
      color: #333;
      font-size: 24upx;
      line-height: 40upx;
      transform: translateY(2upx);
    }

    .multi-price {
      font-size: 28upx;
      font-weight: bold;
      color: #f5222d;
      text-align: center;

      text {
        color: #000;
        font-weight: normal;
      }

      &::before {
        content: '￥';
        font-weight: normal;
      }
    }

    .multi-sta {
      color: #000;
      font-size: 24upx;
      text-align: center;
      margin-top: 20upx;
    }
  }

  .good-name {
    @extend .mc15;
    color: #333333;
    line-height: 48upx;
    font-size: 28upx;
    margin-bottom: 16upx;
    line-clamp: 2;
    overflow: hidden;
    display: flexbox;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-weight: bold;
    margin-top: 20upx;
  }

  .info {
    @extend .mc15;
    font-size: 20upx;
    background-color: #fff7f5;
    padding: 0 20upx;
    margin-bottom: 20upx;
    color: #fe3b0b;
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    height: 60upx;
    line-height: 60upx;
    .icon-right {
      width: 12upx;
      height: 12upx;
      img {
        width: 100%;
        height: 100%;
      }
      display: inline-block;
    }
    .text {
      height: 100%;
    }
  }

  .standard {
    padding: 0upx 30upx 30upx 30upx;
    margin-top: 24upx;

    li {
      line-height: 80upx;
      font-size: 24upx;
      color: #999;
      display: flex;
      justify-content: space-between;
      position: relative;

      &::after {
        content: '';
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
  .tag2 {
    position: relative;
    .img2 {
      width: 100upx !important;
      height: 100upx !important;
      position: absolute;
      left: 50%;
      margin-left: -50upx;
      top: 50%;
      margin-top: -50upx;
    }
  }
  .tag1 {
    text-align: center;
    position: relative;
    padding: 10upx 0;
    color: #000;
    font-weight: 600;
    font-size: 24upx;
    // margin-top: 30upx;
    text {
      margin: 0 10upx;
      color: #333;
    }

    .d {
      width: 6upx;
      height: 6upx;
      background: #666;
      display: inline-block;
      border-radius: 50%;
      position: relative;
      top: -6upx;
    }
  }

  .props {
    padding: 34upx 30upx 30upx 30upx;

    // margin-top: 12upx;
    li {
      line-height: 80upx;
      font-size: 24upx;
      color: #999;
      display: flex;
      position: relative;

      text:first-child {
        width: 160upx;
        display: inline-block;
      }
      border-bottom: 1upx solid #f0f0f0;
      // &::after {
      // 	content: "";
      // 	height: 1upx;
      // 	display: block;
      // 	position: absolute;
      // 	bottom: 0;
      // 	background-color: #f0f0f0;
      // 	width: 100%;
      // 	transform: scaleY(0.5);
      // }
    }
    li:last-child {
      border-bottom: none;
    }
  }

  .line {
    height: 20upx;
    width: 100%;
    background-color: #f0f0f0;
  }

  .det {
    text-align: center;
    padding-bottom: 120upx;
    // height: 100vh;
    padding-top: 30upx;
    background-color: #fff !important;
    .img {
      width: 100%;
      background-image: url('~@/static/img/default-xiangqing.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    }

    .txt {
      line-height: 48upx;
      font-size: 24upx;
      color: #000;
      margin-top: 20upx;
      margin-bottom: 30upx;
      padding: 0 30upx;
      background: #fff;
    }
  }
  .goodsTitle {
    position: fixed;
    height: 80upx;
    line-height: 80upx;
    width: 100%;
    bottom: 100upx;
    text-align: center;
    left: 0;
    opacity: 0.3;
    font-size: 28upx;
    background: #000;
    color: #fff;
  }
  .operator {
    position: fixed;
    height: 100upx;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 2;
    text-align: center;
    background-color: #fff;

    .icon-18 {
      width: 44upx;
      height: 44upx;
      margin: 0 auto;
      position: relative;
      top: 2upx;
      > img {
        width: 100%;
        height: 100%;
      }
    }

    .icon-15 {
      width: 44upx;
      height: 44upx;
      margin: 0 auto;
      position: relative;
      top: 4upx;
      > img {
        width: 100%;
        height: 100%;
      }
    }

    .fir {
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      font-size: 20upx;
      color: #000;
      // .icon-order{
      // 	width: 34upx;
      // 	height: 30upx;
      // }
    }

    /*  #ifdef  H5 || APP-PLUS  */
    .add {
      width: 100%;
      color: #fefefe;
      font-size: 30upx;
      background-color: #ffd07f;
      line-height: 100upx;
    }

    .buy {
      width: 256upx;
      color: #fefefe;
      font-size: 30upx;
      background-color: #fc2d2d;
      line-height: 100upx;
    }
    /*  #endif  */

    /*  #ifdef  MP-WEIXIN  */
    .add {
      width: 100%;
      color: #fefefe;
      font-size: 30upx;
      background-color: #ffd07f;
      line-height: 100upx;
    }
    .buy {
      width: 256upx;
      color: #fefefe;
      font-size: 30upx;
      background-color: #fc2d2d;
      line-height: 100upx;
    }
    .buy,
    .add {
      button {
        background: none;
        padding: 0;
        margin: 0;
        color: #ffffff;
        line-height: 100upx;
      }
      button::after {
        border: none;
      }
    }
    /*  #endif  */
  }

  .index-top-warp {
    width: 100%;
    overflow: hidden;
    background: #f5f5f5;
    position: relative;
    swiper {
      height: 750upx;
    }

    swiper-item {
      height: 750upx; //这里可以设置比上面高度小（留出大标语位置）或者设置一样大
    }

    .swiper-item {
      background-image: url('~@/static/img/default-xiangqing.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      image {
        width: 100%;
        height: 750upx;
      }
      .imgloading {
        position: relative;
        z-index: 999;
      }
    }

    .nav {
      padding: 0 40upx;
      text-align: left;

      &:after {
        content: '';
        height: 100upx;
        width: 1upx;
        background: #fff;
        display: inline-block;
        position: absolute;
        top: 50upx;
        left: 355upx;
        z-index: 9999;
      }

      height: 200upx;

      image {
        width: 100upx;
        height: 100upx;
      }

      position: relative;

      .item {
        text-align: center;
      }
    }
  }

  .top {
    position: relative;

    .tips {
      margin: 0 30upx;
      position: absolute;
      top: 30upx;
      z-index: 999999;
      width: 100%;

      .fll,
      .flr {
        > image {
          width: 54upx;
          height: 54upx;
        }
      }

      .flr {
        position: relative;
        left: -60upx;
      }
    }
  }

  .good-confirm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;

    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .icon-155 {
      width: 44upx;
      height: 44upx;
      position: relative;
      left: -50upx;
    }

    .icon-90 {
      width: 180upx;
      height: 180upx;
    }

    .standard {
      border-bottom: 1upx solid #f0f0f0;
      padding-left: 0upx !important;
    }

    .sta-name {
      color: #333;
      font-size: 30upx;
      margin-top: 30upx;
    }

    .sta-item {
      .fll {
        // width: 150upx;
        margin-right: 60upx;
      }
      text {
        display: inline-block;
        // margin-right: 60upx;
        padding: 0 20upx;
        margin-top: 30upx;
        // width: 150upx;
        line-height: 50upx;
        border-radius: 50upx;
        text-align: center;
        color: #666;
        font-size: 24upx;
        // box-shadow: 0 0 0 1upx #666;
        border: 1upx solid #d9d9d9;
        transition: all 0.5s;

        &.actived {
          border: 1upx solid #fc2d2d;
          // box-shadow: 0 0 0 1upx #fc2d2d;
          color: #fc2d2d;
        }

        &.disabled {
          border: 1upx solid #f5f5f5;
          // box-shadow: 0 0 0 1upx #bebebe;
          color: #666;
          background: #f5f5f5;
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
      padding: 20upx 30upx;
      position: fixed;
      width: 100%;
      max-height: 1000upx;
      bottom: 0;
      z-index: 5;
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      .good {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

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

          text {
            color: #000;
            font-size: 24upx;
          }

          &::before {
            content: '￥';
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
        margin-top: 30upx;
        position: relative;

        .input {
          position: absolute;
          right: 60upx;
          > div {
            position: relative;
            top: -20upx;
            font-size: 60upx;
          }
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
          right: 60upx;

          &::before {
            content: '￥';
            display: inline-block;
            font-size: 24upx;
          }
        }
      }

      .btn {
        margin-top: 50upx;
        width: 640upx;
        line-height: 80upx;
        background-color: #fc2d2d;
        color: #fff;
        border-radius: 40upx;
        font-size: 32upx;
        text-align: center;
        margin-left: 30upx;
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

  .icon-min,
  .icon-plus {
    width: 12px;
    height: 12px;
    position: relative;
  }

  .fg1 {
    flex-grow: 1;
  }

  .icon-plus {
    &.invalid::after,
    &.invalid::before {
      background-color: #ccc;
    }

    &::after {
      content: '';
      display: block;
      width: inherit;
      height: 24upx;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: #666;
    }

    &::before {
      content: '';
      display: block;
      width: 4upx;
      height: inherit;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background-color: #666;
    }
  }

  .icon-min {
    &::after {
      content: '';
      display: block;
      width: inherit;
      height: 4upx;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: #666;
    }

    &.invalid::after {
      background-color: #ccc;
    }
  }
}
</style>
