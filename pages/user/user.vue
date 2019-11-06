<template>
    <view class="mine">
		<view class="top">
			<view class="img">
				<image src="../../static/img/bg-mine.png" mode=""></image>
			</view>
			<view class="setting" @click="goSettingPage">
				<image src="../../static/img/icon-setting.png" mode=""></image>
			</view>
			<!-- 我的状态 -->
			<view class="status">
				<view class="img">
					<image :src="headimageUrl" @click="goInfo"/>
				</view>
			  <view class="content">
			    <view v-if="isLogin" @click="goInfo">
			      <view class="uid fs28">{{nickName || '游客'}}</view>
			      <!-- <view class="uid fs28" v-if="!nickName">ID:{{uid}}</view> -->
			      <view class="phone fs24  mgt-30">{{dPhone}}</view>
			    </view>
			    <view class="fs30 mgl-20" v-if="!isLogin" @click="goLogin">点击登录</view>
			  </view>
			</view>
		</view>
		
        <!-- 我的订单 -->
        <view class="order">
          <view class="title cf" @click="goOrderList('')" :class="{'Android1': platform == 1}">
            <view class="p1 fll fs28">我的订单</view>
			<view class="img flr">
				<image src="../../static/img/tag-go.png"/>
			</view>
			<view class="p2 text-999 fs24 flr">全部订单</view>
          </view>
          <view class="tags">
            <view class="li" v-for="(item,index) in titles" :key="index" @click="goOrderList(index)">
				<view class="img" :class="{'Android4': platform == 1}">
					<image :src="item.u"/>
				</view>
              
              <view class="fs24" :class="{'Android3': platform == 1}">{{item.t}}</view>
            </view>
          </view>
        </view>
    
        <!-- 我的收藏 -->
        <view class="collection">
          <view class="body cf" @click="goCollection">
            <view class="fs36 fll fs28" :class="{'Android2': platform == 1}">我的收藏</view>
            <view class="img flr">
              <image src="../../static/img/tag-go.png"/>
            </view>
          </view>
        </view>
		 <!-- <TabBar :checkIndex='checkIndex'></TabBar> -->
      </view>
	 
	</view>  
</template>

<script>
	import TabBar from '@/components/common/TabBar.vue'
    export default {
        data() {
            return {
				checkIndex:2,
              titles:[
                {t: '待付款', u: '/static/img/icon-waitpay.png'},
                {t: '待发货', u: '/static/img/icon-waitsend.png'},
                {t: '待收货', u: '/static/img/icon-waitrecive.png'},
                {t: '已完成', u: '/static/img/icon-done.png'},
              ],
              isLogin: false,
              uid: '',
              phone: '',
              headimageUrl: '/static/img/icon-user.png',
			  nickName:'',
			  platform: 0
            }
        },
		components:{TabBar},
		onTabItemTap(e){
			uni.setStorageSync('pagePath','user')
		},
		onLoad() {
			uni.setStorageSync('pagePath','user')
		},
		onShow() {
			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			// 获取phone 和 uid
			this.phone = uni.getStorageSync('phone')
			this.uid = uni.getStorageSync('uid')
			this.nickName = uni.getStorageSync('nickName')
			let imageUrl = uni.getStorageSync('headImgUrl')
			this.headimageUrl = imageUrl && imageUrl !== 'null' ? imageUrl : '/static/img/icon-user.png'
			// 判断是否登录
			this.isLogin = this.uid!='' 
		},
		computed: {
		    dPhone() {
		      return `${this.phone.substr(0, 3)}****${this.phone.substr(7)}`
		    }
		},
        methods: {
			// 去收藏页面
			goCollection(){
				
				if(!uni.getStorageSync('access_token')) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
				} else{
					uni.navigateTo({
						url:'/pages/user/collection/collection'
					})
				}
				
			},
			// 去设置页面
			goSettingPage(){
				uni.navigateTo({
					url:'/pages/user/setting/setting'
				})
			},
            // 去订单页面
			goOrderList(index) {
			  if(uni.getStorageSync('access_token')){
				  let i = index === '' ? '' : index + 1
				  uni.setStorageSync('orderNavIndex', i)
				  uni.navigateTo({
				  	url:'/pages/user/order/list'
				  })
			  } else {
				  uni.navigateTo({
				  	url:'/pages/login/login'
				  })
			  }	
			
			},
			goInfo() {
				if(this.isLogin) {
					uni.navigateTo({
						url:'/pages/user/info/info'
					})
				}else{
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			},
			// 去登录
			goLogin() {
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			}
        }
    }
</script>

<style lang="scss" scoped>
.Android1{
	position: relative;
	top: 24upx !important;
}
.Android2{
	position: relative;
	top: 2upx !important;
}
.Android3{
	position: relative;
	top: 10upx !important;
}
.Android4{
	position: relative;
	top: -6upx !important;
}
.fg1 {
  flex-grow: 1;
}
.mine {
	// padding-bottom: 100upx;
	.bb1{
		position: fixed;
		height: 0.5upx;
		bottom: 0upx;
		background: #f0f0f0;
		width: 100%;
	}
	.collection{
		border-bottom: 0.5upx solid #f0f0f0;
		margin-left: 30upx;
	}
	position: relative;
	height: 100vh;
	background: #fff;
	/* #ifdef APP-PLUS || H5 */  
	.top{
		width: 100%;
		height: 300upx;
		.img{
			width: 100%;
			height: 300upx;
			overflow: hidden;
			position: absolute;
			top: 0;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.setting{
			  width: 48upx;
			  height: 48upx;
			  position: absolute;
			  right: 30upx;
			  top: 100upx;
			  >image{
				  width: 100%;
				  height: 100%;
			  }
		}
		.status {
		  padding: 0upx 20upx 33upx 30upx;
		  display: flex;
		  justify-content: flex-start;
		  align-items: center;
			position: relative;
			top: 140upx;
			.img{
				width: 90upx;
				height: 90upx;
				position: relative;
				z-index: 999999;
				>image{
				  border-radius: 50%;
				  width: 100%;
				  height: 100%;
				}
			}
	} 
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.top{
		width: 100%;
		height: 300upx;
		.img{
			width: 100%;
			height: 300upx;
			overflow: hidden;
			position: absolute;
			top: 0;
			>image{
				width: 100%;
				height: 100%;
			}
		}
		.setting{
			  width: 48upx;
			  height: 48upx;
			  position: absolute;
			  right: 30upx;
			  top: 130upx;
			  >image{
				  width: 100%;
				  height: 100%;
			  }
		}
		.status {
		  padding: 0upx 20upx 33upx 40upx;
		  display: flex;
		  justify-content: flex-start;
		  align-items: center;
			position: relative;
			top: 160upx;
			.img{
				width: 90upx;
				height: 90upx;
				position: relative;
				z-index: 999999;
				>image{
				  border-radius: 50%;
				  width: 100%;
				  height: 100%;
				}
			}
	} 
	/* #endif */
  
  
    
    .content {
      margin-left: 20upx;
      color: #fff;
    }
    .uid{

    }
    .phone{
      margin-top: 2upx;
    }
  }
  .order {
    padding: 14upx 20upx 20upx 20upx;
	border-bottom: 20upx solid #f0f0f0;
    .title {
		border-bottom: 1upx solid #f0f0f0;
		padding-bottom: 20upx;
		height: 60upx;
		position: relative;
		top: 14upx;
	  .img{
		  width: 20upx;
		  height: 20upx;
		  >image{
			  width: 100%;
			  height: 100%;
		  }
	  }
      & > .p2 {
        color: #999;
        margin-right: 4upx;
		position: relative;
		top: 14upx;
      }
      & > .p1{
        color: #333;
        font-weight: blod;
		position: relative;
		top: 10upx;
		left: 10upx;
      }
      &>image{
        margin-left: 4upx;
      }
    }
    .tags {
      display: flex;
      padding: 20upx 50upx;
      justify-content: space-between;
      align-items: center;
      text-align: center;
	  padding-top: 45upx;
      .li {
        list-style: none;
        font-size: 12upx;
        color: #010101;
		.img{
			width: 48upx;
			height: 48upx;
			margin: 0 auto;
			>image{
				width: 100%;
				height: 100%;
			}
		}
      }
    }
  }
  .collection {
    
    .body {
      padding: 0 30upx 0upx 0upx;
      color: #333;
      line-height: 100upx;
	  .img{
		  width: 20upx;
		  height: 20upx;
		  >image{
			  width: 100%;
			  height: 100%;
		  }
	  }
    }
  }
}
</style>
