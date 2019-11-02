<template>
	<view>
		<div class="setting">
		    <div class="list">
		      <div class="cf li" @click="goProtocal">
		        <div class="fll fs28">服务条款与协议</div>
		        <div class="icon flr">
		          <img src="@/static/img/tag-go.png" />
		        </div>
		      </div>
		      <div class="cf li"  @click="goAbout">
		        <div class="fll fs28">关于我们</div>
		        <div class="icon flr">
		          <img src="@/static/img/tag-go.png" />
		        </div>
		      </div>
		    </div>
		    <div class="exit fs32" @click="showDialog" v-if="isLogin">退出登录</div>
		  </div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false
			};
		},
		onShow() {
			this.isLogin = uni.getStorageSync('access_token')
		},
		methods:{
			showDialog() {
			  uni.showModal({
			      title: '提示',
			      content: '是否退出当前账号?',
				  confirmText: '退出',
			      success: function (res) {
			          if (res.confirm) {
			              let records = uni.getStorageSync('records')
						  let platform = uni.getStorageSync('platform')
			              uni.clearStorageSync() // 清除缓存
						  uni.setStorageSync('records',records)
						  uni.setStorageSync('platform',platform)
			              uni.switchTab({
			              	url:'/pages/user/user'
			              })
			          } else if (res.cancel) {
			              console.log('用户点击取消');
			          }
			      }
			  });
			},
			goProtocal(){
				uni.navigateTo({
					url:'/pages/user/protocal/protocal'
				})
			},
			goAbout(){
				uni.navigateTo({
					url:'/pages/user/about/about'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.icon-img2,.icon-img{
	width: 22upx;
	height: 22upx;
	>img{
		width: 100%;
		height: 100%;
	}
}
.setting {
  &::before {
    content: '';
    display: block;
    z-index: -1;
    position: absolute;
    background-color: #f5f5f5;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
  }
  position: relative;
  .list {
    margin-top: 20upx;
	
    .li {
		height: 100upx;
		line-height: 100upx;
		background: #fff;
		padding: 0 30upx;
		border-bottom: 1upx solid #F5F5F5;
		.icon{
			width: 22upx;
			height: 22upx;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
  }
  .exit{
    width: 640upx;
    line-height: 80upx;
    border-radius: 40upx;
    background-color: #FC2D2D;
    text-align: center;
    margin: 40upx auto auto auto;
    color: #fff;
  }
}
</style>