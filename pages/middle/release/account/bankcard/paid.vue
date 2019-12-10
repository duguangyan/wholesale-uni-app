<template>
	<view class="add">
		<view class="img">
			<image src="/static/imgs/icon-1019.png" mode=""></image>
		</view>
		<view class="title fs28 text-333">
			沁绿农业已于2019年12月3号向河南沁绿农业科技有限公司（8111 1111 1111 1111 111）提交一笔1元以下的打款申请，请于到账后7日内在此确认打款金额
		</view>
		<view class="tip fs24 text-999">
			<view>
				1、您需要查询银行卡的收支明细，确认打款
			</view>
			<view>
				2、由于银行返回打款成功信息有延迟，如未查询到打款信息，请一天后重新查询
			</view>
		</view>
		
		<view class="items">
			<view class="item">
				开户银行：中信银行郑州航海路支行
			</view>
			<view class="item">
				银行卡号：8111 1111 1111 1111 111
			</view>
			<view class="item">
				开户名称：河南沁绿农业科技有限公司
			</view>
			<view class="item">
				打款金额:  
				<view class="input"> <input @input="changeInput" @blur="changeBlur" v-model="price" type="digit" placeholder="输入0.01~0.99" /></view>   
				元
			</view>
		</view>
		
		<view class="big-btn-active" :class="{'hasData': !hasData}" @click="doSubmit">
			提交认证
		</view>
	</view>
</template>

<script>
	import { getBankInsert } from '@/api/payApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				price: '',
				hasData: false
			};
		},
		onLoad(options) {
		
		},
		onShow() {
			
		},
		methods:{
			doSubmit(){
				if(this.hasData){
					
				}
			},
			changeInput(){
				let reg = /^0\.(?!00)\d{1,2}$/;
				this.hasData = reg.test(this.price) && this.price!='0.0'
				
			},
			changeBlur(){
				let reg = /^0\.(?!00)\d{1,2}$/;
				if(!reg.test(this.price) || this.price == '0.0'){
					this.price = ''
					T.tips('请输入0.01~0.99之间的金额')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		background: #fff;
		min-height: 100vh;
		.hasData{
			background: #D9D9D9;
		}
		.items{
			padding: 0 100upx;
			margin-bottom: 100upx;
			.item{
				line-height: 60upx;
				.input{
					display: inline-block;
					position: relative;
					top: 10upx;
					padding-left: 20upx;
					border-bottom: 1upx solid #f5f5f5;
				}
			}
		}
		.img{
			width: 120upx;
			height: 120upx;
			>image{
				width: 100%;
				height: 100%;
			}
			margin: 0 auto;
			padding-top: 100upx;
		}
		.title{
			margin: 60upx 0 30upx 0;
		}
		.title,.tip{
			text-align: left;
			line-height: 40upx;
			padding: 0 100upx;
		}
		.tip{
			margin-bottom: 100upx;
			
		}
	}
</style>
