<template>
	<view>
		<div class="submit">
		    <div class="address" @click="goAddress">
		      <div v-if="address == null" class="addAd" to="/adedit">请添加收货地址</div>
		      <div v-if="address != null" class="div">
		        <div class="ad-title">收货人: {{address.name}}</div>
		        <div
		          class="ad-det"
		        >收货地址:{{address.province + address.city + address.region + address.address}}</div>
				<div class="icon-right">
					 <img class="tag-go" src="@/static/img/tag-go.png" width="10" height="10" alt />
				</div>
		       
		      </div>
			  <div class="icon-bg">
				  <img src="@/static/img/bg-line.png" alt="">
			  </div>
		    </div>
	
		    <div class="list" v-if="list.length>0">
		      <div v-for="(item,index) in list" :key="index">
		        <div class="cf parent-title">
		          <div class="fll plat">
		            <img :src="Plat" alt="图标" />
		          </div>
		          <span class="fll text">{{item.shopName}}</span>
		        </div>
		        <ul>
		          <li class="cf" v-for="(it,idx) in item.goodsParamList" :key="idx">
		            <div class="fll img">
		              <img :src="it.imgUrl || defaultUrl" alt="图片" />
		            </div>
		            <div class="fll mgl-20 info fs28">
		              <p class="fs-16 p1 cf">
						  <span class="s1 ellipsis ellipsis-line2 fll">{{it.goodsName}}</span> <span class="flr fs24">￥<span class="fs28">{{it.price}}</span></span>
						</p>
		              <p class="text-666 fs24 cf mt-10">
		                <span class="fll p4">{{it.skuDesc || ''}}</span>
		                <span class="flr text-999">x {{it.goodsCount}}</span>
		              </p>
		              <p class=" fs24 p2">￥ <span class="fs28">{{it.goodsMoney}}</span></p>
		            </div>
		          </li>
		        </ul>
		      </div>
		    </div>
		    <div class="others">
		      <div class="freight">
		        <span>运费</span>
		        <span>￥{{deliverMoney || 0}}</span>
		      </div>
		      <div class="mark">
		        <span>留言</span>
		        <input v-model="message" type="text" maxlength="100" placeholder="请输入留言信息" />
		      </div>
		    </div>
		
		    <div class="operator">
		      <div class="nums">共&ensp;{{totalCount}}&ensp;件</div>
		      <div class="total-price fg1">
		        合计:&ensp;
		        <span>{{totalMoney}}</span>
		      </div>
		      <div class="btn" v-bind:class="{ active: address !== '' }" @click="showPay">提交订单</div>
		    </div>
		    <!--    // orderId：支付订单-->
		    <!--    // show：支付上拉框是否弹起-->
		    <!--    // isWX：是否只有微信支付-->
		    <!--    // price： 支付价格-->
		    <!--    // function payClose：关闭支付弹窗-->
		    <!--    // function doPay: 点击支付按钮事件-->
		    <Pay
		      :orderId="payOrderId"
		      ref="pay"
		      :show="isPay"
		      @close="doClose"
		      :price="totalMoney"
		      v-on:doPay="doPay"
		    />
		  </div>
	</view>
</template>

<script>
	import Pay from "@/components/common/Pay.vue";
	import Checked from "@/static/img/icon-checked.png";
	import Uncheck from "@/static/img/icon-uncheck.png";
	import Plat from "@/static/img/icon-plat.png";
	import {
	  getCartOrderList,
	  getAddressDefAddress,
	  getOrderCart,
	  postCreateOrder
	} from "@/api/cartApi.js";
	import { buyGood } from "@/api/goodsApi.js";
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				isBuyNow:'',
				submitData:'',
				list: [], //数据列表
				      defaultUrl:
				        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2180358788,168891397&fm=26&gp=0.jpg",
				      isPay: false,
				      Checked,
				      Uncheck,
				      Plat,
				      totalNum: 0, // 总数量
				      totalMoney: 0, // 总金额
				      address: "", // 地址
				      message: "", //留言
				      deliverMoney: 0, // 运费
				      payOrderId: "", //订单ID
				      cartIdList: "", // cartlist
				      totalCount: "" // 总数量
			};
		},
		components:{
			Pay
		},
		onLoad(options) {
			this.submitData = options.submitData;
			this.isBuyNow = options.isBuyNow;
		},
		onShow() {
			
			// 上一级传递参数：结算返回的数据
				if (this.isBuyNow) {
				  let submitData = JSON.parse(this.submitData);
				  if (uni.getStorageSync("address")) {
					this.address = JSON.parse(uni.getStorageSync("address"));
					submitData.addressId = JSON.parse(uni.getStorageSync("address")).id;
				  }
				  buyGood(submitData).then(data => {
					this.list = data.data.shopList;
					this.totalMoney = data.data.totalMoney;
					this.deliverMoney = data.data.deliverMoney;
					this.cartIdList = data.data.cartIdList;
					this.totalCount = data.data.totalCount;
				  });
				} else {
				  if (this.submitData) {
					let submitData = JSON.parse(this.submitData);
					this.list = submitData.shopList;
					this.totalMoney = submitData.totalMoney;
					this.deliverMoney = submitData.deliverMoney;
					this.cartIdList = submitData.cartIdList;
					this.totalCount = submitData.totalCount;
				  }
				  // 判断是否有地址
				  if (uni.getStorageSync("address")) {
					// 获取缓存地址
					this.address = JSON.parse(uni.getStorageSync("address"));
					// 根据地址获取运费
					this.getOrderCartByAddress(this.address.id);
				  } else {
					// 获取默认地址
					this.getAddressDefAddress();
				  }
				}
		},
		methods: {
		    // 确认支付
		    doPay() {},
		    // 关闭支付显示
		    doClose() {
		      this.isPay = false;
		      // this.$router.go(-1)
		    },
			// 去选择地址
			goAddress(){
				uni.navigateTo({
					url:'/pages/user/addlist/addlist?from=submit'
				})
			},
		    // 显示支付
		    showPay() {
		      let list = {
		        shopParamList: this.list,
		        postscript: this.message,
		        addressId: this.address.id,
		        cartIdList: this.cartIdList
		      }
		      postCreateOrder(list).then(res => {
		        if (res.code === '1000') {
		          this.isPay = this.address !== ''
		          this.payOrderId = res.data.id
		        } else {
		          T.tips(res.message || '提交订单失败')
		        }
		      }).catch(err => {
		        T.tips(err.message || '提交订单失败')
		      })
		
		    },
		    // 根据地址获取新数据
		    getOrderCartByAddress(addressId) {
		      let userId = uni.getStorageSync("uid");
		      let data = {
		        userId,
		        cartIdList: this.cartIdList,
		        addressId: this.address.id,
		        postscript: this.message
		      };
		
		      if(this.isBuyNow){
		        let submitData = JSON.parse(this.submitData)
		        this.totalMoney = submitData.totalMoney;
		        this.deliverMoney = submitData.deliverMoney;
		      }else{
		        getOrderCart(data)
		        .then(res => {
		          if (res.code === "1000") {
		            this.totalMoney = res.data.totalMoney;
		            this.deliverMoney = res.data.deliverMoney;
		          }
		        })
		        .catch(err => {
		          T.tips(err.message || "结算失败");
		        });
		      }
		    },
		    // 提交订单
		    submit() {
		      if (this.address === "") {
		        T.tips("请选择收货地址");
		        return false;
		      }
		    },
		    // 去详情
		    goDetail(shopId, orderId) {
		      this.$router.push({ path: "/gooddetail/" + shopId + "/" + orderId });
		    },
		    // 获取默认地址
		    getAddressDefAddress() {
		      getAddressDefAddress().then(res => {
		        if (res.code === "1000") {
		          this.address = res.data;
		          this.getOrderCartByAddress(this.address.id);
		        }
		      });
		    },
		    // 获取数据
		    getCartList() {
		      getCartOrderList()
		        .then(res => {
		          if (res.code === "1000") {
		            if (res.data.cartLines && res.data.cartLines.length > 0) {
		              this.list = res.data.cartLines;
		              let num = 0;
		              let totalMoney = 0;
		              this.list.forEach((item, index) => {
		                let m = false;
		                item.items.forEach((it, idx) => {
		                  if (it.checked === 1) {
		                    m = true;
		                    num += it.num;
		                    totalMoney += it.totalPrice;
		                  }
		                });
		                console.log(m + "===" + item.items.length);
		                if (m) {
		                  this.list[index].checked = 1;
		                }
		              });
		              this.totalNum = num;
		              this.totalMoney = totalMoney;
		            }
		          } else {
		            T.tips(res.message || "获取进货单列表错误");
		          }
		        })
		        .catch(err => {
		          T.tips(err.message || "获取进货单列表错误");
		        });
		    }
		  }
	}
</script>

<style lang="scss" scoped>
.submit {
  min-height: 100vh;
  background-color: #f0f0f0;
  .list {
    /*margin-top: 50upx;*/
    margin-bottom: 30upx;
    overflow: auto;
    .count {
      position: absolute;
      bottom: 20upx;
      right: 20upx;
      display: flex;
      align-items: center;
      input {
        width: 84upx;
        height: 44upx;
        line-height: 44upx;
        background-color: #f5f5f5;
        margin-left: 8upx;
        margin-right: 8upx;
        font-size: 22upx;
        color: #333;
        text-align: center;
        border: none;
        outline: none;
      }
    }
    .parent-title {
      margin-top: 40upx;
      .text {
        margin-left: 20upx;
        font-size: 28upx;
      }
      .plat {
        width: 34upx;
        height: 34upx;
        > img {
          width: 100%;
		  height: 100%;
        }
      }
      .parent-icon {
        width: 34upx;
        height: 34upx;
        margin: 4upx 0upx 0 30upx;
        img {
          width: 100%;
        }
      }
    }

    ul {
      li {
        background: #fff;
        padding-top: 20upx;
        position: relative;
        .icon {
          width: 34upx;
          height: 34upx;
          margin-right: 30upx;
          margin-top: 80upx;
          img {
            width: 100%;
          }
        }
        .img {
          width: 200upx;
          height: 200upx;
          border-radius: 20upx;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          width: 460upx;
		  .p1{
			  height: 80upx;
		  }
          .p2 {
            position: absolute;
            bottom: 20upx;
          }
          .p3 {
            display: inline-block;
            width: 120upx;
            height: 32upx;
            line-height: 32upx;
            text-align: center;
            border-radius: 28upx;
            background: #f5f5f5;
            color: #666;
            font-size: 24upx;
            position: absolute;
            bottom: 20upx;
          }
          .p4 {
            background: #f5f5f5;
            border-radius: 10upx;
            display: inline-block;
            padding: 0upx 8upx 4upx 8upx;
          }
        }
        .info-edit {
          width: 460upx;
        }
      }
    }
  }
  .address {
    height: 150upx;
    background-color: #fff;
    border-top: solid 1upx #f0f0f0;
    position: relative;
    line-height: 1;
	.div{
		padding: 0 60upx 0 30upx;
		position: relative;
		.icon-right{
			width: 20upx;
			height: 20upx;
			position: absolute;
			right: 30upx;
			top: 30upx;
			>img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.icon-bg{
		height: 6upx;
		width: 100%;
		position: absolute;
		bottom: 30upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
    .tag-go {
      // position: absolute;
      // right: 30upx;
      // top: 50%;
    }
    .addAd {
      margin-left: auto;
      margin-right: auto;
      width: 300upx;
      line-height: 64upx;
      text-align: center;
      border-radius: 32upx;
      box-shadow: 0 0 0 1upx #d9d9d9 inset;
      font-size: 28upx;
      color: #000;
      position: relative;
	  top: 40upx;
    }
    .ad-title {
      margin-top: 26upx;
      color: #000;
      font-size: 30upx;
    }
    .ad-det {
      margin-top: 22upx;
      font-size: 24upx;
      color: #666;
      &::after {
        content: "";
        display: block;
        width: 20upx;
        height: 20upx;
      }
    }
  }

  .list {
    padding: 0 30upx 30upx 30upx;
    background-color: #fff;
    margin-top: 20upx;
    .title {
      padding: 0 0 10upx 0;
      display: flex;
      justify-content: flex-start;
      font-size: 24upx;
      .platform {
        color: #000;
        margin-left: 10upx;
        font-weight: bold;
        flex-grow: 1;
      }
      .status {
        color: #fc2d2d;
      }
    }
  }

  .others {
    background-color: #fff;
    margin-top: 20upx;
    padding: 0 30upx;
    color: #000;
    font-size: 24upx;
    margin-bottom: 200upx;
    div {
      line-height: 90upx;
    }
    div:not(:last-child) {
      border-bottom: 1upx solid #f0f0f0;
    }
    .freight {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .mark {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      input {
        margin-left: 20upx;
        font-size: 24upx;
        border: none;
        outline: none;
      }
    }
  }

  .operator {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: #fff;
    padding: 0 30upx;
    height: 100upx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 30upx;
    .nums {
      color: #666;
      margin-right: 30upx;
    }
    .total-price {
      color: #000;
      span {
        color: #f5222d;
        font-weight: bold;
        &::before {
          content: "￥";
          font-weight: normal;
          font-size: 24upx;
          display: inline-block;
        }
      }
    }
    .btn {
      background-color: #999;
      color: #fff;
      text-align: center;
      border-radius: 36upx;
      width: 180upx;
      line-height: 72upx;
	  position: absolute;
	  right: 90upx;
    }
    .active {
      background-color: #fc2d2d;
    }
  }
}
</style>
