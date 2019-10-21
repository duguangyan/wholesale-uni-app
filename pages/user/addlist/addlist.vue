<template>
	<view>
		<div class="list">
			<div slot="icon" v-if="list.length > 0" class="icon" @click="goAddedit(0)">添加地址</div>

			<div class="no-data" v-if="list.length<=0">
				<img src="@/static/img/icon-address-no.png" alt="图片">
				<p class="text-999 fs-12">还没有收货地址哦 去添加一个吧</p>
				<div class="bg-red" @click="goAddedit(0)">添加新地址</div>
			</div>
			<div class="list" v-if="list.length>0">
				<li v-for="item in list" :key="item.id">
					<div @click="goBlack(item)">
						<div class="upon">
							<span class="name">{{item.name}}</span>
							<span class="phone">{{item.phone}}</span>
						</div>
						<div class="low">
							<span v-show="item.isDefault" class="tag">默认</span>
							<span class="address">{{item.address}}</span>
						</div>
					</div>
					<div class="edit" @click="goAddedit(item.id)">编辑</div>
				</li>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		getUserAddressList
	} from '@/api/userApi.js'
	export default {
		data() {
			return {
				list: [

				],
				from: ''
			};
		},
		onLoad(options) {
			this.from = options.from || ''
			// 获取用户地址列表
			this.getUserAddresList()
		},
		onShow() {
			// 获取用户地址列表
			this.getUserAddresList()
		},
		methods: {
			// 返回订单页面
			goBlack(item) {
				if (this.from === 'submit') {
					uni.setStorageSync('address', JSON.stringify(item))
					uni.navigateBack({
						delta: 1
					})
				}
			},
			// 获取用户地址列表
			getUserAddresList() {
				getUserAddressList().then(res => {
					if (res.code === '1000') {
						this.list = res.data
					}
				}).catch(err => {
					uni.showToast(err.message || '地址列表获取错误')
				})
			},
			goAddedit(id) {
				let url = id != 0 ? '/pages/user/addedit/addedit?id=' + id : '/pages/user/addedit/addedit'
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.icon{
		text-align: right;
		position: relative;
		left: -30upx;
		font-size: 30upx;
		padding: 20upx 0;
	}
	.list {
		border-top: 1upx solid #f0f0f0;

		.no-data {
			height: 100%;
			text-align: center;

			img {
				width: 240upx;
				height: 240upx;
				margin-top: 200upx;
			}

			>div {
				width: 210upx;
				height: 60upx;
				margin: 0 auto;
				line-height: 60upx;
				border-radius: 30upx;
				color: #fff;
				font-size: 30upx;
			}

			p {
				width: 200upx;
				margin: 32upx auto;
			}
		}

		li {
			&:not(:last-child)::after {
				content: '';
				display: block;
				height: 1upx;
				background-color: #f0f0f0;
				position: absolute;
				bottom: 1upx;
				left: 30upx;
				z-index: 2;
				width: 100%;
			}

			overflow: hidden;
			position: relative;
			// height: 60upx;
			list-style: none;
			padding: 28upx 30upx 30upx 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.low {
				max-width: 750upx;
				text-overflow: ellipsis;
				line-clamp: 1;
				white-space: nowrap;
				overflow: hidden;
				// margin-top: 3upx;
			}

			.name {
				font-size: 30upx;
				line-height: 30upx;
				color: #000;
				max-width: 300upx;
				text-overflow: ellipsis;
				line-clamp: 1;
				white-space: nowrap;
				overflow: hidden;
				display: inline-block;
			}

			.phone {
				font-size: 24upx;
				line-height: 30upx;
				color: #999;
				margin-left: 28upx;
				display: inline-block;
				transform: translateY(-2upx);
			}

			.tag {
				background-color: #fc2d2d;
				border-radius: 6upx;
				font-size: 20upx;
				color: #fff;
				padding: 2upx 6upx;
				margin-right: 10upx;
			}

			.address {
				font-size: 20upx;
				color: #999;
				line-height: 30upx;
			}

			.edit {
				line-height: 64upx;
				height: 64upx;
				padding: 0 24upx;
				position: relative;
				color: #999;

				&::before {
					content: '';
					display: block;
					width: 1upx;
					height: inherit;
					position: absolute;
					background-color: transparent;
					left: 1upx;
					box-shadow: -1upx 0 0 0 rgb(234, 234, 234);
					z-index: 2;
					transform: scale(0.5, 1);
				}
			}
		}
	}
</style>
