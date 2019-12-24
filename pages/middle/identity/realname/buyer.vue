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
				<view class="fll bold">姓名</view>
				<view class="flr">
					<input type="text" @input="checkSubmit" v-model="name" placeholder="请输入真实姓名">
				</view>
			</view>
			<!-- <view class="item cf">
				<view class="fll">身份证</view>
				<view class="flr">
					<input type="text" @input="checkSubmit" v-model="number" placeholder="请输入身份证号码">
				</view>
			</view> -->
			
			<view class="item cf">
				<view class="fll bold">经营位置</view>
				<view class="flr">
					<input type="text" @input="checkSubmit" v-model="address" placeholder="如江南水果市场1-123号">
				</view>
			</view>
			
			<view class="item" @click="showType">
				<view class="fll bold">经营品类</view>
				<view class="choose cf flr">
					<view class="fll" :class="{'text-666':productType==''}">{{productType == ''?'如农产品、蔬菜':productType}}</view>
					<view class="flr mt1">
						<image src="/static/imgs/right.png"></image>
					</view>
				</view>
			</view>
			
			
			<view class="item cf">
				<view class="fll bold">邀请码</view>
				<view class="flr">
					<input type="text" v-model="code" placeholder="请输入邀请码">
				</view>
			</view>
		</view>
		<view class="fs24 text-999 mgt-30 tips">邀请码需找销售人员提供(非必填)</view>
		
		
		<view class="big-btn-active" :class="{noactive:isDoSubmit}"  @click="doSubmit">提交</view>
	
		<chooseType v-if="isChooseType" :isRight="isRight" :list="categoryTree" @close="chooseTypeClose" @complete="chooseTypeComplete"></chooseType>
	</view>

</template>

<script>
	import { getUserRealInfoSettledIn } from '@/api/userApi.js'
	import { getUserRealInfo } from '@/api/userApi.js'
	import { getCategoryTreeNode } from '@/api/goodsApi.js'
	import T from '@/utils/tips.js'
	import chooseType from '@/components/realname/ChooseType.vue'
	export default {
		name: 'buyer',
		data() {
			return {
				isRight: false,
				productTypeId:'',
				productType:'',
				categoryTree:'',
				isChooseType:false,
				name:'',
				number:'',
				address:'',
				code:'',
				isDoSubmit:true,
				titles:[
					{
						title:'专属代办',
						imgUrl:'/static/imgs/buyer-1.png'
					},
					{
						title:'优先采购',
						imgUrl:'/static/imgs/buyer-2.png'
					},
					{
						title:'实名认证',
						imgUrl:'/static/imgs/buyer-3.png'
					}
				]
			};
		},
		components: {
			chooseType
		},
		mounted() {
			
		},
		onShow() {
			let data = {
				roleType:'20001'
			}
			getCategoryTreeNode(data).then(res=>{
				if(res.code == '1000'){
					this.categoryTree = res.data
				}
			})
		},
		methods: {
			chooseTypeComplete(e){
				console.log(e)
				this.productType   = e.left + '/' + e.content
				this.productTypeId = e.id
				this.checkSubmit()
				this.isChooseType  = false
			},
			chooseTypeClose(){
				this.isChooseType = false
			},
			showType(){
				this.isChooseType = true
			},
			checkSubmit(){
				if(this.name !='' && this.address !='' && this.productTypeId !=''){
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
				if(this.address == ''){
					T.tips('请输入经营位置')
					return false
				}
				if(this.productTypeId ==''){
					T.tips('请选择经营品类')
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
					address:this.number,
					categoryId:this.productTypeId,
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
  .bold{
    font-size: 30upx;
    color: #000;
  }
  .mt1{
    margin-top: 40upx;
  }
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
        width: 100%;
        position: relative;
				border-bottom: 1upx solid #F0F0F0;
				height: 100upx;
				line-height: 100upx;
				>.fll{
					width: 30%;
					font-size: 30upx;
					color: #333;
				}
				>.flr{
					width: 70%;
					input{
						font-size: 30upx;
						position: relative;
						top: 30upx;
					}
				}
				.title{
					font-size: 30upx;
					color: #333;
				}
				.choose{
          
					font-size: 28upx;
					color: #333;
					border-bottom: 1upx solid #F0F0F0;
					.flr{
						width: 24upx;
						height: 24upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
				
			}
		}
		.top{
			padding: 60upx 60upx;

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
