<template>
	<view class="verifiy">
		<view class="tip">本次操作需验证手机号码，我们会向你{{phone}}发送验证码</view>
		<view class="content">
			<view class="cf">
				<view class="fll fs30 text-333">验证码</view>
				<view class="fll">
					<input class="fs30" type="number" v-model="code" placeholder="请输入验证码" />
				</view>
				<view class="flr fs30 text-theme" @click="getCode">
					<text class="getcode"  :class="{'text-999':codeNum!==''}">{{codeNum}} {{codeText}}</text>
				</view>
			</view>
		</view>
		<view class="big-btn-active" :class="{ 'noValue' :code == ''}" @click="goresPassword">
			下一步
		</view>
	</view>
</template>

<script>
	import { postUserSms } from '@/api/userApi.js'
	import { postAccountSubSendSms } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				code:'',
				codeText: '获取验证码',
				codeNum: '', // 定时器时间
				setCodeInterval:'', // 定时器
				from:'',
				phone:''
			};
		},
		onHide() {
			console.log('onHide')
			if (this.setCodeInterval != '') {
				clearInterval(this.setCodeInterval)
			}
		},
		onLoad(options) {
			if(options.from) this.from = options.from
		},
		onShow() {
			this.phone = uni.getStorageSync('phone').substr(0,2) + '****' + uni.getStorageSync('phone').substr(9,2)
		},
		methods:{
			// 去设置密码
			goresPassword(){
				if(this.code == ''){
					return false
				}
				let url = '/pages/middle/release/account/payps/resPassword?code='+this.code
				if(this.from == 'cash'){
					url += '&from=cash'
				}
				uni.redirectTo({
					url
				})
			},
			// 获取验证码
			getCode() {
				// 已发送未超过60秒直接返回
				if (this.codeNum !== '') {
					return false
				}
			
				// 获取uuid
				this.deviceId = this.getUUID()
				// 获取手机验证码
				let data = {
					type: 1
				}
				postAccountSubSendSms(data).then((res) => {
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
		}
	}
</script>

<style lang="scss" scoped>
	.verifiy{
		background: #fff;
		min-height: 100vh;
		.noValue{
			background: #d9d9d9;
		}
		.content{
			height: 100upx;
			line-height: 100upx;
			margin: 0 30upx;
			border-bottom: 1upx solid #F5F5F5;
			.cf{
				.fll{
					input{
						position: relative;
						top: 30upx;
						left: 20upx;
					}
				}
			}
			
		}
		.tip{
			height: 80upx;
			line-height: 80upx;
			padding: 0 30upx;
			font-size: 24upx;
			color: #999;
			background: #F5F5F5;
		}
		.big-btn-active{
			margin-top: 50upx;
		}
	}
</style>
