<template>
  <div class="freight">
    <div class="top">
      <div class="title" v-if="info !== ''">
		  <div class="icon-50">
			<img src="/static/img/icon-bus.png" width="50" height="50" alt />  
		  </div>
        
        <div>
          <div class="type">物流快递：{{info.name}}</div>
          <div class="code">物流单号：{{info.num}}</div>
        </div>
      </div>
    </div>
    <div class="river"></div>
    <div class="body" v-if="info !== ''">
      <li v-for="(item,index) in info.traceList" :key="index">
        <div class="l">
          <div class="point">
			  <img v-if="index === 0" src="/static/img/icon-finish.png" alt="">
		  </div>
        </div>
        <div class="r">
          <div class="time">{{item.time}}</div>
          <div class="status" :class="{ 'text-red': index === 0 }">{{item.context}}</div>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { postOrderLogisticsQuery } from '@/api/userApi.js'
export default {
  name: 'freight',
  components: {

  },
  data() {
    return {
      info: ''
    }
  },
  onLoad(options) {
    let data = {
		orderId: options.orderId,
		shopId:options.shopId
	}
    let _this = this
    if (options.orderId && options.shopId) {
      postOrderLogisticsQuery(data).then(res => {
        if (res.code === '1000') {
          this.info = res.data
        } 
      })
    }
  },
  methods: {
    goBack(_this) {
      uni.showModal({
      	title: '提示',
      	content: '数据错误，返回上一页?',
      	success: res => {
			uni.navigateBack({
				delta:1
			})
		}
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.freight {
	.icon-50{
		width: 100upx;
		height: 100upx;
		margin-right: 20upx;
		>img{
			width: 100%;
			height: 100%;
		}
	}
  .top{
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 99999;
    border-bottom: 20upx solid #f0f0f0;
    & > .title {
      border-top: 1upx solid #e6e6e6;
      height: 140upx;
      padding: 0 16upx;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin-right: 20upx;
      }
      .type {
        color: #000;
        font-size: 28upx;
      }
      .code {
        color: #999;
        font-size: 24upx;
        margin-top: 6upx;
      }
    }
  }

  /*.river {*/
  /*  height: 10upx;*/
  /*  background-color: #f0f0f0;*/
  /*  width: 100%;*/
  /*}*/
  .body {
    margin-top: 160upx;
    padding-bottom: 160upx;
	padding-right: 30upx;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1upx;
      height: calc(100% - 290upx);
      background-color: #d9d9d9;
      top: 56upx;
      left: 44upx;
      z-index: 0;
    }
    li {
      list-style: none;
      display: flex;
      padding-top: 30upx;
      width: 100%;
      position: relative;

      .l {
        padding: 0 46upx;
        position: relative;
        z-index: 2;
      }
      .r {
        border-bottom: 1upx solid #d9d9d9;
        color: #999;
        word-break: break-all;
        flex-grow: 1;
      }
      .time {
        font-size: 20upx;
      }
      .status {
        font-size: 24upx;
        line-height: 2;
        margin-top: 8upx;
        padding-bottom: 20upx;
      }
      .point {
        width: 16upx;
        height: 16upx;
        border-radius: 50%;
        background-color: #999;
        margin-top: 20upx;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
		>img{
			width: 100%;
			height: 100%;
			position: relative;
			top: -10upx;
		}
      }
      &:first-child .point {
      width: 30upx;
      height: 30upx;
      background-size: cover;
	  background-color: #FFFFFF;
    }
    }

  }
}
</style>
