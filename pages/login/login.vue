<template>
	<view class="login">
		<view class="logo">
			<image src="https://iph.href.lu/90x90?text=LOGO" mode=""></image>
		</view>
		<view class="item-1 fs30 text-333 cf">
			<view class="fll image"><image src="https://iph.href.lu/24x28"></image></view>
			<view class="fll input"><input @blur="blurPhone" type="number" v-model="phone" placeholder="请输入账号" /></view>
		</view>
		<view class="item-2 fs30 text-333 cf">
			<view class="fll image"><image src="https://iph.href.lu/24x28"></image></view>
			<view class="fll input" v-if="showPassword"><input @blur="blurPassword" type="text" confirm-type="done" @confirm="doLogin" password v-model="password" placeholder="请输入账号" /></view>
			<view class="fll input" v-if="!showPassword"><input @blur="blurPassword" type="text" confirm-type="done" @confirm="doLogin" v-model="password" placeholder="请输入账号" /></view>
			<view class="flr see" @click="checkPassword"><image src="https://iph.href.lu/24x28"></image></view>
		</view>
		<view class="protocal fs20">
			<text class="text-666">点击登录表示同意平台</text> <text class="text-theme">用户协议</text>
		</view>
		
		<view class="big-btn" @click="doLogin">登录</view>
	</view>
</template>

<script>
	import validator from '../../utils/validator.js'
	import T from '@/utils/tips.js'
	import { postUserLogin, getUserInfoData, postUserSms, weixinLogin, openIdByCode } from '@/api/userApi.js'
	export default {
		data() {
			return {
				phone:'',
				password: '',
				showPassword: true
			}
		},
		components: {
		
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			//切换password
			checkPassword(){
				this.showPassword = !this.showPassword
			},
			// 登录
			doLogin(){
				if(validator.isPhone(this.phone)){
					T.tips('请输入正确的手机号')
					return false
				}
				if(!validator.isPassword(this.password)){
					T.tips('密码限6-50个字符')
					return false
				}
				
				//#ifdef APP-PLUS
				  var uuid = plus.device.uuid;  
				  //#endif
				  //#ifdef MP-WEIXIN
				  this.deviceId = this.getUUID()
				  //#endif
				let data = {
				  grant_type: 'sms_code',
				  scope: '2',
				  client_id: 'cwap',
				  client_secret: 'xx',
				  systemId: '2',
				  deviceId: this.deviceId,
				  mobile: this.phone,
				  smsCode: this.password
				}
				// let dates = this.$qs.stringify(data)
				postUserLogin(data).then((res) => {
					uni.setStorageSync('access_token', res.access_token)
					uni.setStorageSync('refresh_token', res.refresh_token)
					uni.setStorageSync('uid', res.id)
					
					uni.setStorageSync('phone', this.phone)
					if(this.setCodeInterval!=''){
						clearInterval(this.setCodeInterval)
					}
				  // 获取用户信息
				  this.getUserInfoDates()
				}).catch((err) => {
					T.tips(err.message || '登录错误')
				})
				
			},
			getUserInfoDates() {
				// #ifdef  MP-WEIXIN
				this.getOpenIdByCode();
				// #endif
			  getUserInfoData().then((res) => {
			    if (res.code === '1000') {
				  if(res.data.phone){
					uni.setStorageSync('phone', res.data.phone)
				  }	
			      uni.setStorageSync('nickName', res.data.nickName)
			      uni.setStorageSync('headImgUrl', res.data.headImgUrl)
				  // 返回上一页
				  uni.navigateBack({
				  	delta:1
				  })
				  
			    }
			  }).catch((err) => {
				T.tips(err.message || '获取用户信息错误')
			  })
			},
			getUUID() {
			    var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
				  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
				s[8] = s[13] = s[18] = s[23] = "-";
			   
				var uuid = s.join("");
				return uuid
			},
			// 检查手机号
			blurPhone(){
				if(validator.isPhone(this.phone)){
					T.tips('请输入正确的手机号')
				}
			},
			// 检查密码
			blurPassword(){
				if(!validator.isPassword(this.password)){
					T.tips('密码限6-50个字符')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		.logo{
			width: 90upx;
			height: 90upx;
			>image{
				width: 100%;
				height: 100%;
			}
			margin: 100upx auto;
		}
		.big-btn{
			margin-top: 40upx;
		}
		.protocal{
			margin: 20upx 55upx;
		}
		.item-1,.item-2{
			margin: 0upx 55upx;
			border-bottom: 1upx solid #F0F0F0;
			padding: 40upx 0;
			.image{
				width: 24upx;
				height: 28upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.see{
				width: 24upx;
				height: 28upx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.input{
				width: 540upx;
				padding-left: 30upx;
			}
		}
	}
</style>
