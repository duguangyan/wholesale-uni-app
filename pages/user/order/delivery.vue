<template>
	<view class="delivery">
		<view class="items">
			<view class="item cf">
				<view class="fll">
					姓名
				</view>
				<view class="flr">
					<input type="text" v-model="driver" @input="assessData" placeholder="请输入司机姓名">
				</view>
			</view>
			
			<view class="item cf">
				<view class="fll">
					手机
				</view>
				<view class="flr">
					<input type="text" v-model="driverPhone" @input="assessData" placeholder="请输入司机手机号码">
				</view>
			</view>
			
			<view class="item cf" @click="chooseCarLicense">
				<view class="fll">
					车牌号
				</view>
				<view class="fll car">
					<text class="text-theme mgr-20">{{carLicense[0]}}</text>
					<text>{{carLicense.substr(1)}}</text>
				</view>
			</view>
		</view>
		<view class="fs24 text-999 tip">提示: 发货前请各位代办认真核对司机信息,买家才能通过电话号码联系司机</view>
		<view class="big-btn-active" :class="{'nodata': hasData}" @click="save">确定</view>
		<plate-number ref="plate" v-model="carLicense" @showOrHide="showOrHide"></plate-number>
	</view>
</template>

<script>
	import plateNumber from '@/components/common/plate-number/plateNumber.vue';
	import { orderDelivery } from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		name: 'delivery',
		data() {
			return {
				driver:'',
				driverPhone:'',
				carLicense:'京A',
				orderId:'',
				shopId:'',
				plateNum:'',
				hasData: true
			}
		},
		components: {plateNumber},
		onLoad(options) {
			this.shopId = options.shopId
			this.orderId = options.orderId
		},
		onShow() {

		},
		methods:{
			assessData(){
				this.hasData = this.driver == '' || this.driverPhone == '' || this.carLicense == ''
			},
			showOrHide(falg) {
				this.isCursor = falg;
				this.assessData()
			},
			chooseCarLicense(){
				 this.$refs.plate.show();
			},
			// 保存信息
			save(){
				let data = {
					carLicense: this.carLicense,
					driver: this.driver,
					driverPhone: this.driverPhone,
					orderId: this.orderId,
					shopId: this.shopId
				}
				orderDelivery(data).then(res=>{
					if(res.code == '1000'){
						T.tips('发货成功')
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}else{
						T.tips(res.message || '发货失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.delivery{
		background: #fff;
		min-height: 100vh;
		.big-btn-active{
			margin-top: 60upx;
		}
		.nodata{
			background: #d9d9d9;
		}
		.tip{
			margin: 0 auto;
			padding: 10upx 30upx;
			line-height: 40upx;
		}
		.items{
			margin: 0 atuo;
			.item{
				margin: 0 30upx;
				height: 80upx;
				line-height: 80upx;
				padding-top: 20upx;
				border-bottom: 1upx solid #d9d9d9;
				font-size: 30upx;
				color: #333;
				input{
					width: 580upx;
					position: relative;
					top: 24upx;
				}
				.car{
					margin-left: 26upx;
				}
			}
		}
	}
</style>
