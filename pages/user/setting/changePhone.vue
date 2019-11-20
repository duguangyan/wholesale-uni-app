<template>
	<view class="phone">
		<view class="title">
			请勿填写他人手机号，买家货主需通过该号码联系你
		</view>
		<view class="items">
			<view class="item cf">
				<view class="fll name">手机号</view>
				<view class="fll input">
					<input type="number" v-model="phone" @input="changePhone" placeholder="请输入手机号码">
				</view>
			</view>
			
			<view class="item cf">
				<view class="fll name">验证码</view>
				<view class="fll input">
					<input type="number" @input="changeCode" v-model="code" placeholder="请输入验证码">
				</view>
				<view class="flr text-theme fs30"  :class="{'text-999':codeNum!==''}" @click="getCode">{{codeNum}} {{codeText}}</view>
			</view>
		</view>
		<view class="big-btn-active" :class="{nodata:hasData}" @click="save">
			立即修改
		</view>
	</view>
</template>

<script>
	import { postUpdateNickname, postUserSms } from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	import validator from '@/utils/validator.js'
	export default {
		data() {
			return {
				phone:'',
				hasData: true,
				code:'',
				codeText: '获取验证码',
				codeNum: '', // 定时器时间
				setCodeInterval:''
			};
		},
		onHide() {
			console.log('onHide')
			if (this.setCodeInterval != '') {
				clearInterval(this.setCodeInterval)
			}
		},
		onShow() {
			// this.phone = uni.getStorageSync('phone')
		},
		methods:{
			//理解修改
			save(){
				let data = {
					phone: this.phone,
					code:this.code
				}
				postUpdateNickname(data).then(res => {
					if (res.code === '1000') {
						uni.setStorageSync('phone',this.phone)
						uni.navigateBack({
							delta:1
						})
					} else {
						T.tips(res.message || '手机号码修改失败')
					}
				}).catch(err => {
					T.tips(err.message || '手机号码修改失败')
				})
			},
			// 验证码输入框事件
			changeCode(){
				this.assessData()
			},
			// 手机输入框事件
			changePhone(){
				this.assessData()
			},
			// 验证数据
			assessData(){
				this.hasData = this.phone == '' ||  this.code == ''
			},
			// 获取验证码
			getCode(){
				if (this.codeNum !== '') {
					return false
				}
				// 手机验证
				if (validator.isPhone(this.phone)) {
					T.tips('手机号码不正确');
					return false
				}
			
				// 获取uuid
				this.deviceId = this.getUUID()
				// 获取手机验证码
				let data = {
					mobile: this.phone,
					deviceId: this.deviceId
				}
				postUserSms(data).then((res) => {
					T.tips(res.message)
					if (res.code === '1000') {
						this.codeText = '重新发送'
						this.codeNum = 59
						this.setCodeInterval = setInterval(() => {
							if (this.codeNum === 0) {
								this.codeNum = ''
								clearInterval(this.setCodeInterval)
							} else {
								this.codeNum--
							}
						}, 1000)
					}
				}).catch((err) => {
					T.tips(err.message || '错误')
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
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.phone{
		background: #fff;
		min-height: 100vh;
		.big-btn-active{
			margin-top: 50upx;
		}
		.nodata{
			background: #D9D9D9!important;
		}
		.items{
			margin: 0 30upx;
			.item{
				height: 100upx;
				line-height: 100upx;
				font-size: 30upx;
				color: #333;
				border-bottom: 1upx solid #f5f5f5;
				.name{
					
				}
				.input{
					position: relative;
					top: 32upx;
					left: 20upx;
				}
			}
		}
		.title{
			text-align: center;
			line-height: 80upx;
			height:80upx;
			background:rgba(245,245,245,1);
			color: #999;
			font-size: 24upx;
		}
	}
</style>