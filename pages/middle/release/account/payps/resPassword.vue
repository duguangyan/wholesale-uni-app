<template>
	<!-- =========================钱包=================== -->
	<view class="content">
		<view class="login">
			<view class="l_top" style="margin-bottom:100upx;">
				<view class="l_text" v-if="code!=''">请输入6位新的支付密码，注意不要重复或连续数字</view>
				<view class="l_text" v-if="code==''">{{tip}}</view>
				
			</view>
			<view class="l_top">
				<view class="mima">
					<view class="item">
						<view v-if="len<=0" :class="{line:show}"></view>
						<view v-if="len>=1" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==1" :class="{line:show}"></view>
						<view v-if="len>=2" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==2" :class="{line:show}"></view>
						<view v-if="len>=3" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==3" :class="{line:show}"></view>
						<view v-if="len>=4" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==4" :class="{line:show}"></view>
						<view v-if="len>=5" class="dot"></view>
					</view>
					<view class="item">
						<view v-if="len==5" :class="{line:show}"></view>
						<view v-if="len>=6" class="dot"></view>

					</view>
					<view v-if="len>5" class="dot">{{numlength}}</view>
					<input class="trade_pwd" disabled="disabled" maxlength="6" id="targetInput" @focus="focus1" @blur="blur1" type="number"
					 v-model="trade_pwd" />
				</view>
			</view>
		</view>
		<view class="keypan">
			<view class="titles">
				<span @click="back()">取消</span>
				<span @click='setpwd'>确认</span>
			</view>
			<view class="pan_num_key" :class="[items.checked?'pan_num_checked':'pan_num_key']" v-for="(items,index) in boardlists"
			 :key="index" @click="writepwd(items.id)">{{items.con}}</view>
		</view>
	</view>
</template>
<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	import { deleteBank,validPayPwd,postPayApply } from '@/api/payApi.js'
	import { checkRefund } from '@/api/refund.js';
	import T from '@/utils/tips.js'
	export default {

		computed: {
			...mapGetters(['statusBarHeight'])
		},
		data() {
			return {
				refundId:'',
				old_trade_pwd:'',
				tip:'',
				from:'',
				add: '',
				id:'',
				code:'',
				trade_pwd: '',
				focus: true,
				show: false,
				numarr: [],
				d_time: 10,
				nextsteep: false,
				tel: 0,
				numlength: "",
				gopen: false,
				isactive: true,
				resgetcode: false,
				boardlists: [{
						id: 1,
						con: 1,
						checked: false
					}, {
						id: 2,
						con: 2,
						checked: false
					}, {
						id: 3,
						con: 3,
						checked: false
					}, {
						id: 4,
						con: 4,
						checked: false
					}, {
						id: 5,
						con: 5,
						checked: false
					}, {
						id: 6,
						con: 6,
						checked: false
					}, {
						id: 7,
						con: 7,
						checked: false
					}, {
						id: 8,
						con: 8,
						checked: false
					}, {
						id: 9,
						con: 9,
						checked: false
					}, {
						id: 10,
						con: "",
						checked: false
					}, {
						id: 11,
						con: 0,
						checked: false
					},
					{
						id: 12,
						con: "退格",
						checked: false
					},

				]
			};
		},
		computed: {
			len: function() {
				if (this.trade_pwd.length == 6) {
					// 第一次进来可以点击的

				}
				return this.trade_pwd.length
			}
		},
		onLoad(options) {
			if(options.from){   // 设置密码
				this.from = options.from
				if(this.from == 'cash'){
					this.cash              = options.cash
					this.amount            = options.amount
					this.receiveAccount    = options.receiveAccount
				}
				
				if(this.from == 'refund'){
					this.refundId = options.refundId
				}
				
				if(this.from == 'addBank' || this.from == 'delBank' || this.from == 'cash' || this.from == 'revise' || this.from == 'refund'){
					uni.setNavigationBarTitle({
					    title: '输入支付密码'
					});
				}else{
					uni.setNavigationBarTitle({
					    title: '设置新支付密码'
					});
				}
			}    
			if(options.code) this.code = options.code      // 来自重置密码
			if(options.id) this.id     = options.id         // 来自删除银行卡
		},
		onShow() {
			this.tip = '请输入支付密码'
		},
		methods: {
			writepwd(num) {
				console.log(num)
				console.log(this.numarr)
				if (num == 12) {
					this.close();
					return;
				}
				if (num == 10) {
					return;
				}
				if (num == 11) {
					num = 0;
					this.boardlists[10].checked = true;
				} else {
					this.boardlists[num - 1].checked = true;
				}
				
				if (this.numarr.length >= 6) {
					return false
				}
				this.numarr.push(num);
				var that = this;
				setTimeout(function() {
					for (var i = 0; i < that.boardlists.length; i++) {
						that.boardlists[i].checked = false;
					}
				}, 200)
				this.trade_pwd = this.numarr.join("");


			},
			//密码框
			back() {
				uni.navigateBack();
			},
			//回退方法
			close() {
				this.numarr.pop();
				if (this.trade_pwd.length > 0) {
					this.trade_pwd = this.trade_pwd.substring(0, this.trade_pwd.length - 1);
				}
			},
			blur1() {
				this.show = false
			},
			focus1() {

				this.show = true
			},
			// 重置 修改密码
			setPassword(){
				let url = ''
				if(this.code == ''){
					url = '/pages/middle/release/account/payps/confirmPassword?trade_pwd='+ this.trade_pwd +'&old_trade_pwd=' +this.old_trade_pwd
				}else{
					url = '/pages/middle/release/account/payps/confirmPassword?trade_pwd='+ this.trade_pwd + '&code=' + this.code
				}
				uni.redirectTo({
					url
				})
			},
			// 删除银行卡
			delBankCat(){
				let data = {
					password: this.trade_pwd
				}
				validPayPwd(data).then(res=>{
					if(res.code == '1000' && res.data){
						let dto = {
							id: this.id,
							password: this.trade_pwd
						}
						deleteBank(dto).then(res=>{
							if(res.code == '1000') {
								T.tips('解绑成功')
								setTimeout(function() {
									uni.navigateBack({
										delta:1
									})
								}, 1000);
								
							}else{
								T.tips(res.message || ' 删除失败')
							}
						})
					}else if(res.code == 'pay-0001'){
						uni.showModal({
							title: '提示',
							confirmText:'重置密码',
							content: '支付密码错误，请重新输入，或点击重置密码进行重置',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.redirectTo({
										url:'/pages/middle/release/account/payps/verifiyPhone'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}else{
						T.tips(res.message || '输入密码错误')
					}
				})
			},
			// 添加银行卡
			addBankCat(){
				let data = {
					password: this.trade_pwd
				}
				validPayPwd(data).then(res=>{
					if(res.code == '1000' && res.data){
						uni.redirectTo({
							url:'/pages/middle/release/account/bankcard/add'
						})
					}else if(res.code == 'pay-0001'){
						uni.showModal({
							title: '提示',
							confirmText:'重置密码',
							content: '支付密码错误，请重新输入，或点击重置密码进行重置',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.redirectTo({
										url:'/pages/middle/release/account/payps/verifiyPhone'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}else{
						T.tips('输入密码错误')
					}
				})
			},
			// 提现
			doCash(){
				let data = {
					amount: this.amount,
					receiveAccount: this.receiveAccount,
					password: this.trade_pwd,
					payType: 3
				}
				postPayApply(data).then(res=>{
					if(res.code == '1000'){
						uni.redirectTo({
							url:'/pages/middle/release/account/cash/cashSuccess'
						})
					}else{
						T.tips(res.message || '提现失败')
					}
				})
			},
			// 重置密码
			doRevise(){
				
				let data = {
					password: this.trade_pwd
				}
				validPayPwd(data).then(res=>{
					if(res.code == '1000' && res.data){
						uni.setNavigationBarTitle({
						    title: '设置新支付密码'
						});
						this.old_trade_pwd = this.trade_pwd
						this.numarr = []
						this.trade_pwd = ''
						this.from = ''
						this.tip = '请输入新的支付密码'
					}else if(res.code == 'pay-0001'){
						
						uni.showModal({
							title: '提示',
							confirmText:'重置密码',
							content: '支付密码错误，请重新输入，或点击重置密码进行重置',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.redirectTo({
										url:'/pages/middle/release/account/payps/verifiyPhone'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						
					}else{
						T.tips(res.message || '输入密码错误')
					}
				})
				
			},
			// 退款
			doRefund(){
				let data = {
					password: this.trade_pwd
				}
				validPayPwd(data).then(res=>{
					if(res.code == '1000'){
						checkRefund({
						  auditorType: 2,
						  id: this.refundId,
						  refundMoney: '',
						  refuseReason: '',
						  status: 1
						}).then(res=>{
							if(res.code == '1000'){
								uni.navigateBack({
									delta:1
								})
							}else{
								T.tips(res.message || '退款失败')
							}
						})
					}else{
						T.tips(res.message || '输入错误')
					}
					
				})
				
				
				
			},
			// 确认执行的方法
			setpwd() {
				if (this.trade_pwd.length < 6) {
					T.tips('密码长度不能少于6位')
					return;
				}
				
				let reg = /^(\d)\1{5}$/; // 不重复6位 类似111111,222222
				let str = '0123456789_9876543210'; // str.indexOf(value) > -1 不连续判断 类似123456
				 
				if (this.trade_pwd.length!==6 || reg.test(this.trade_pwd) || str.indexOf(this.trade_pwd) > -1) {
				    T.tips('请输入正确的密码')
					return 
				} 
				
				
				// 密码长度为6位以后执行方法
				console.log(this.trade_pwd);
				
				if(this.code != ''){
					uni.redirectTo({
						url:'/pages/middle/release/account/payps/confirmPassword?code='+this.code + '&trade_pwd=' + this.trade_pwd
					})
				}
				
				switch (this.from){
					case 'cash':
						// 提现
						this.doCash()
						break;
					case 'addBank':
						// 添加银行卡
						this.addBankCat()
						break;
					case 'delBank':
						// 删除银行卡
						this.delBankCat()
						break;
					case 'revise':
						// 删除银行卡
						this.doRevise()
						break;	
					case 'refund':
						// 删除银行卡
						this.doRefund()
						break;	
					default:
						// 重置设置密码
						this.setPassword()
						break;
				}

			},

		}

	};
</script>
<style lang="scss" scoped>
	.content {
		width: 100%;
		font-size: 28upx;
		background: #fff;
		color: #555;
		height: 100vh;
		font-weight: 400;

		.keypan {
			width: 100%;
			height: 500upx;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #E6E6E6;

			.titles {
				width: 90%;
				height: 80upx;
				background: #E6E6E6;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				padding: 0 5%;
				font-size: 32upx;
				color: #292824;

				span {
					width: 100upx;
					height: 70upx;
					display: inline-block;
					padding-left: 30upx;
				}

			}

			.pan_num_key {
				width: 30%;
				height: 80upx;
				line-height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				background: #fff;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);

			}

			.pan_num_checked {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);
				animation: checked_bg 0.08s ease;
			}
		}

		.navigation_bar {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60upx;

			.back-icon {
				width: 18upx;
				height: 34upx;
			}
		}

		.login {
			width: 100%;
			height: 300upx;

			.l_top {
				width: 700upx;
				height: 200upx;
				margin: 0 auto;
				position: relative;

				.l_text {
					width: 445upx;
					height: 69upx;
					font-size: 28upx;
					text-align: center;
					margin: auto;
					top: 100upx;
					position: relative;

				}

				.lt {
					margin-top: -20upx;
					font-size: 25upx;
					color: #555
				}
			}
		}

		.title {
			color: #616161;
			text-align: center;
			font-size: 30upx;
			margin-bottom: 34upx;
		}

		.mima {

			flex-direction: row;
			width: 680upx;
			height: 78upx;
			margin: 0 auto;
			position: relative;

			.item {
				width: 92upx;
				height: 100%;
				box-sizing: border-box;
				display: flex;
				float: left;
				align-items: center;
				justify-content: center;
				border-bottom: 1upx solid #E5E5E5;
				margin-left: 20upx;

				.line {
					width: 2upx;
					height: 40upx;
					background: #979797;
					animation: shan 1s ease infinite;
				}

				.dot {
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					background: black;
				}
			}

			.trade_pwd {
				position: absolute;
				height: 78upx !important;
				width: 480upx;
				opacity: 0;
			}
		}
	}

	@keyframes shan {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes checked_bg {
		0% {
			background: #fff
		}

		50% {
			background: #D3D1E2
		}

		100% {
			background: #fff
		}
	}
</style>
