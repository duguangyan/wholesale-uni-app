<template>
  <view class="sys">
    <view class="single-item fir-item" @click="navToPro">
      <text>服务条款与协议</text>
      <image src="/static/img/tag-go.png"/>
    </view>
    <view class="single-item fir-item" @click="navToAbout">
      <text>关于我们</text>
      <image src="/static/img/tag-go.png"/>
    </view>
    <view class="single-item">
      <text>版本号: {{v}} </text>
    </view>
  </view>
</template>

<script>
  export default{
    name: 'sys',
    data(){
      return {
        v:''
      }
    },
    methods:{
      navToPro(){
        uni.navigateTo({
          url: '/pages/user/protocal/protocal'
        })
      },
      navToAbout(){
        uni.navigateTo({
          url: '/pages/user/about/about'
        })
      }
    },
    onShow(){
      // 版本号
      this.v = uni.getStorageSync('v')
    }
  }
</script>

<style lang="scss" scoped>
  .fir-item{
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
  .single-item{
    background: #fff;
    line-height: 100upx;
    color: #333;
    font-size: 30upx;
    display: flex;
    justify-content: flex-start;
    padding: 0 30upx;
    align-items: center;
    image{
      width: 40upx;
      height: 40upx;
    }
    &>text{
      flex-grow: 1;
    }
  }
</style>
