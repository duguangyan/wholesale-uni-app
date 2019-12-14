<template>
	<view class="buyer">
		<view class="top flex">
			<view class="item flex-1 cf" v-for="(item,index) in titles" :key="index">
				<view class="img fll">
					<image :src="item.imgUrl" mode=""></image>
				</view>
				<view class="title fll">{{item.title}}</view>
			</view>
		</view>
		
		<view class="content">
			<view class="item cf">
				<view class="fll">姓名</view>
				<view class="flr">
					<input type="text" @input="checkSubmit" v-model="name" placeholder="请输入真实姓名">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">身份证</view>
				<view class="flr">
					<input type="text" @input="checkSubmit" v-model="number" placeholder="请输入身份证号码">
				</view>
			</view>
			<view class="item cf">
				<view class="fll">邀请码</view>
				<view class="flr">
					<input type="text" @input="checkSubmit" v-model="code" placeholder="请输入邀请码">
				</view>
			</view>
		</view>
		<view class="fs24 text-999 mgt-30 tips">邀请码需找销售人员提供</view>
		
		
		<view class="big-btn-active" :class="{noactive:isDoSubmit}"  @click="doSubmit">提交</view>
	</view>

</template>

<script>
	import { getUserRealInfoSettledIn } from '@/api/userApi.js'
	import { getUserRealInfo } from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		name: 'buyer',
		data() {
			return {
				name:'',
				number:'',
				code:'',
				isDoSubmit:true,
				titles:[
					{
						title:'专属代办',
						imgUrl:'../../../../static/imgs/buyer-1.png'
					},
					{
						title:'优先采购',
						imgUrl:'../../../../static/imgs/buyer-2.png'
					},
					{
						title:'实名认证',
						imgUrl:'../../../../static/imgs/buyer-3.png'
					}
				]
			};
		},
		components: {

		},
		mounted() {
			
		},
		methods: {
			checkSubmit(){
				if(this.name !='' && this.number !=''){
					this.isDoSubmit = false
				}else{
					this.isDoSubmit = true
				}
			},
			doSubmit(){
				if(this.isDoSubmit) {
					return false
				}
				// 数据验证
				if(this.name == ''){
					T.tips('请输入用户名')
					return false
				}
				if(this.number == ''){
					T.tips('请输入身份证')
					return false
				}
				// if(this.code == ''){
				// 	T.tips('请输入邀请码')
				// 	return false
				// }
				
				// 实名认证
				let data = {
					realName:this.name,
					type: 3,
					cardNo:this.number,
					code:this.code
				}
				getUserRealInfoSettledIn(data).then(res => {
					if(res.code == '1000'){
						let realData = {
							userId: uni.getStorageSync('uid')
						}
						getUserRealInfo(realData).then(res => {
							if(res.code == '1000'){
								let roleId = res.data.userRole.roleId || '';
								uni.setStorageSync('roleId', roleId)
								uni.setStorageSync('userRealInfo',JSON.stringify(res.data.userRealInfo))
								uni.switchTab({
									url:'/pages/user/user'
								})
							}
						})
						
						
					}else{
						T.tips(res.message)
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.buyer{
		height: 100vh;
		background: #fff;
		.big-btn-active{
			margin-top: 100upx;
		}
		.noactive{
			background: #D9D9D9 !important;
		}
		.tips{
			margin: 30upx 60upx;
		}
		.content{
			margin: 0 60upx;
			.item{
				border-bottom: 1upx solid #F0F0F0;
				height: 100upx;
				line-height: 100upx;
				.fll{
					width: 30%;
					font-size: 30upx;
					color: #333;
				}
				.flr{
					width: 70%;
					input{
						font-size: 30upx;
						position: relative;
						top: 30upx;
					}
				}
			}
		}
		.top{
			padding: 100upx 60upx;

			.item{
				.img{
					width: 38upx;
					height: 38upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					font-size: 30upx;
					color: #999999;
					margin-left: 16upx;
				}
			}
		}
	}
</style>
