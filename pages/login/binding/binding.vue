<template>
  <view class="login">
    <!-- <view class="close">
			<image src="../../static/img/tag-close.png" mode=""></image>
		</view> -->
    <view class="body">
      <view class="welcome">请输入手机号</view>
      <view class="subwel">为了您的账户安全，请验证手机号码</view>
      <view class="name"><input class="fs30" v-model="phone" @input="doIsLogin" type="text" placeholder="请输入手机号码" /></view>
      <view class="code">
        <input class="fs30" v-model="code" @input="doIsLogin" type="text" placeholder="请输入验证码" />
        <text class="getcode" @click="getCode" :class="{ 'text-999': codeNum !== '' }">{{ codeNum }} {{ codeText }}</text>
      </view>
      <!-- <view class="protocal">
				登录表示同意
				<text>用户服务协议</text>
			</view> -->
    </view>
    <view :class="{ 'bg-theme': isRight }" @click="dologin" class="btn">立即登录</view>
  </view>
</template>

<script>
import validator from '@/utils/validator.js';
import T from '@/utils/tips.js';
import { postUserLogin, getUserInfoData, postUserSms, weixinLogin, getOpenId } from '@/api/userApi.js';
export default {
  data() {
    return {
      phone: '',
      code: '',
      codeText: '获取验证码',
      codeNum: '', // 定时器时间
      isRight: false, // 是否完成输入
      setCodeInterval: '', // 定时器
      deviceId: '', // 数据传值deviceId
      appID: 'wx638cfb37341c1874',
      fromWxLoginData: '',
      wxCode: ''
    };
  },
  components: {},
  onLoad(options) {
    this.fromWxLoginData = JSON.parse(options.data || {});
    // console.log('fromWxLoginData->', this.fromWxLoginData);
    // this.wxCode = options.code;
    
  },
  onShow() {
    uni.setStorageSync('isLogin', 0);
    if(window){
      let location = window.location;
      let search = location.search.replace(/\?/,'');
      let reg = new RegExp('(^|&)code=(.*?)(&|$)');
      let res = search.match(reg);
      this.wxCode = res?res[2]:null;
    }
  },
  methods: {
    doIsLogin() {
      this.isRight = !validator.isPhone(this.phone) && this.code !== '';
    },
    // 获取验证码
    getCode() {
      console.log(validator.isPhone(this.phone));
      // 已发送未超过60秒直接返回
      if (this.codeNum !== '') {
        return false;
      }
      // 手机验证
      if (validator.isPhone(this.phone)) {
        if (this.phone === '') {
          T.tips('手机号不能为空');
          return false;
        }
        T.tips('手机号码不正确');
        return false;
      }

      // 获取uuid
      this.deviceId = this.getUUID();
      // 获取手机验证码
      let data = {
        mobile: this.phone,
        deviceId: this.deviceId
      };
      postUserSms(data)
        .then(res => {
          T.tips(res.message);
          if (res.code === '1000') {
            this.codeText = '重新发送';
            this.codeNum = 59;
            this.setCodeInterval = setInterval(() => {
              if (this.codeNum === 0) {
                this.codeNum = '';
                clearInterval(this.setCodeInterval);
              } else {
                this.codeNum--;
              }
            }, 1000);
          }
        })
        .catch(err => {
          T.tips(err.message || '错误');
        });
    },
    // 登录
    dologin: function() {
      let self = this
      if (this.isRight) {
        //#ifdef APP-PLUS
        var uuid = plus.device.uuid;
        //#endif
        //#ifdef MP-WEIXIN
        this.deviceId = this.getUUID();
        //#endif

        let data = {};
        if (this.fromWxLoginData.grant_type == 'mini_program') {
          //  小程序
          data = {
            grant_type: 'mini_program',
            scope: '2',
            client_id: 'cwap',
            client_secret: 'xx',
            deviceId: this.fromWxLoginData.deviceId,
            systemId: '2',
            miniCode: this.fromWxLoginData.miniCode,
            smsCode: this.code,
            mobile: this.phone,
            nickName: this.fromWxLoginData.userInfo.nickName,
            headImg: this.fromWxLoginData.userInfo.avatarUrl
          };
        } else if (uni.getStorageSync('isWxWeb')) {
          data = {
            grant_type: 'wx_mp',
            scope: '2',
            client_id: 'cwap',
            client_secret: 'xx',
            systemId: '4',
            deviceId: this.getUUID(),
            mobile: this.phone,
            smsCode: this.code,
            wxCode: this.wxCode,
            wxScope: 'snsapi_base'
          };
          postUserLogin(data)
            .then(res => {
              uni.setStorageSync('access_token', res.access_token);
              //uni.setStorageSync('access_token', res.refresh_token)
              uni.setStorageSync('uid', res.id);
              uni.setStorageSync('phone', self.phone);
              if (self.setCodeInterval != '') {
                clearInterval(self.setCodeInterval);
              }
              // 获取用户信息
              getOpenId({
                providerId: 'weixinMP'
              }).then(open => {
                uni.setStorageSync('openId', open.data.providerUserId)
                getUserInfoData()
                  .then(res => {
                    if (res.code == '1000') {
                      uni.setStorageSync('nickName', res.data.nickName);
                      uni.setStorageSync('headImgUrl', res.data.headImgUrl);
                      // 返回上一页
                      uni.switchTab({
                        url: '/'
                      })
                    }
                  })
                  .catch(err => {
                    T.tips(err.message || '获取用户信息错误');
                  });
              });
              
            })
            .catch(err => {
              console.log(JSON.stringify(err));
              T.tips(err.message || '登录错误');
            });
          
          
          return 
        } else {
          // APP
          data = {
            grant_type: 'wx_app',
            scope: '2',
            client_id: 'cwap',
            client_secret: 'xx',
            deviceId: this.fromWxLoginData.deviceId,
            systemId: '2',
            accessToken: this.fromWxLoginData.accessToken,
            openId: this.fromWxLoginData.openId,
            smsCode: this.code,
            mobile: this.phone
          };
        }

        // let dates = this.$qs.stringify(data)
        postUserLogin(data)
          .then(res => {
            console.log(JSON.stringify(res));
            uni.setStorageSync('access_token', res.access_token);
            //uni.setStorageSync('access_token', res.refresh_token)
            uni.setStorageSync('uid', res.id);
            uni.setStorageSync('phone', this.phone);
            if (this.setCodeInterval != '') {
              clearInterval(this.setCodeInterval);
            }
            // 获取用户信息
            this.getUserInfo();
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            T.tips(err.message || '登录错误');
          });
      }
    },
    getUserInfo() {
      getUserInfoData()
        .then(res => {
          if (res.code == '1000') {
            console.log(JSON.stringify(res));
            uni.setStorageSync('nickName', res.data.nickName);
            uni.setStorageSync('headImgUrl', res.data.headImgUrl);
            // 返回上一页
            uni.navigateBack({
              delta: 3
            });
          }
        })
        .catch(err => {
          T.tips(err.message || '获取用户信息错误');
        });
    },
    getUUID() {
      var s = [];
      var hexDigits = '0123456789abcdef';
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-';

      var uuid = s.join('');
      return uuid;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  .close {
    width: 60upx;
    height: 60upx;
    margin: 50upx 22upx;
    > image {
      width: 100%;
      height: 100%;
    }
  }
  .body {
    margin-left: 56upx;
    margin-right: 56upx;
  }
  .welcome {
    margin-top: 74upx;
    font-size: 40upx;
    color: #000;
  }
  .subwel {
    color: #999;
    font-size: 24upx;
    margin-top: 20upx;
  }
  .name,
  .code {
    line-height: 70upx;
    color: #000;
    border-bottom: #f0f0f0 solid 1upx;

    input {
      height: 30upx;
      border: none;
      outline: none;
    }
  }
  ::placeholder {
    color: #ccc;
    font-size: 30upx;
  }
  .name {
    padding: 20upx 0;
    margin-top: 50upx;
  }
  .code {
    padding: 20upx 0;
    position: relative;

    .getcode {
      font-size: 30upx;
      color: #000;
      position: absolute;
      right: 0upx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 99999;
    }
  }
  .protocal {
    margin-top: 20upx;
    font-size: 20upx;
    color: #999999;
    text {
      color: #52cc66;
    }
  }
  .btn {
    width: 640upx;
    line-height: 80upx;
    text-align: center;
    color: #fff;
    background-color: #d9d9d9;
    border-radius: 40upx;
    margin: 40upx auto auto;

    &.actived {
      background-color: #fe3b0b;
    }
  }
  .footer {
    position: absolute;
    bottom: 136upx;
    text-align: center;
    width: 100%;
    button::after {
      border: none;
    }
    button {
      background: none;
    }
    input {
      outline: none;
      border: none;
      list-style: none;
    }
    .img {
      margin: 30upx auto;
      width: 70upx;
      height: 70upx;
      > image {
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
    }
  }
}
</style>
