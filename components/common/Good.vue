<template>
	<view class="good" :class="[(edit||cart)?'edit':'normal']" @click="goGoodsDetail">
		<div name="check">
			<div v-show="edit || cart" :class="['check',(cart && !good.isValid && !edit)?'hide':'']" @click="triggerCheck">
				<img :src="(good.isCheck &&!edit || good.isEditCheck && edit)?Checked:Uncheck" width="17" height="17" />
			</div>
		</div>
		<div class="photo">
			<img :src="good.imgUri">
		</div>
		<div class="content">
			<div class="name .ellipsis-line2">{{good.name}}</div>
      
      <!-- 属性 -->
      <div>
        <span class="place">{{good.place}}</span>
        <span class="attr" v-for="attr in good.attrValDesc" :key="attr" :style="'background:' + calcAttr(attr).bg+';color:'+calcAttr(attr).color">{{attr}}</span>
      </div>

			<!-- 规格 -->
			<!-- <div v-if="level===1" class="standard">{{good.standard}}</div>
			<div v-if="level === 2" class="ad">{{good.place}}</div> -->

			<!-- 单价 -->
			<div class="price">
				<div v-if="good.status===undefined || good.status === 3">
					<span class="coin">￥</span>
					{{good.minprice}}
				</div>
				<span v-else class="invalid">下架商品</span>
			</div>
      
      <!-- 店铺信息 -->
      <div v-if="scoped !== 'shop'" class="shop">
        <span>{{good.realName}}</span>
        <span class="ml5" v-for="(area,areaIdx) in good.shopArea" :key="areaIdx">{{area}}</span>
      </div>

			<!-- 数量操作 -->
			<div v-if="level===1" class="count">
				<img src="@/static/img/icon-min.png" alt width="15" height="15" @click="good.num>0?--good.num:''" />
				<input type="text" v-model="good.num" />
				<img src="@/static/img/icon-plus.png" alt width="15" height="15" @click="++good.num" />
			</div>
		</div>
	</view>
</template>

<script>
	import Checked from '@/static/img/icon-checked.png'
	import Uncheck from '@/static/img/icon-uncheck.png'
	export default {
		name: 'good',
		props: {
      scoped: /*源页面 shop:店铺页使用*/{
        type: String,
        default: ''
      },
			item: {
				type: Object,
				default: null
			},
			level: {
				type: [String, Number],
				default: 0
			},
			edit: {
				type: Boolean,
				default: false
			},
			cart: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				good: {
					"categoryId": "",
					"categoryName": "",
					"createTime": "",
					"downTime": "",
					"hits": 0,
					"id": "",
					"imgUri": "",
					"maxprice": 0,
					"minprice": 0,
					"name": "",
					"place": "2",
					"sellTime": "",
					"spuSalesNum": 0,
					"totalStock": 0
				},
        colorPattern: {
        	'红': '255,0,0',
        	'黄': '255,55,0',
        	'蓝': '30,30,255',
        	'紫': '200,50,248',
        },
				Checked,
				Uncheck
			}
		},
		mounted() {
			this.good = { ...this.item
			}
			// this.$set(this.good, 'isCheck', false);
		},
		// filters: {
		//   fixed(val) {
		//     val = +val
		//     return val.toFixed(2);
		//   }
		// },
		methods: {
      // 计算
      calcAttr(attr){
      	let str = attr.substr(0,1)
      	let color = this.colorPattern[str] || '165,165,165'
      	return {
      		color: 'rgba('+color+',1)',
      		bg: 'rgba('+color+',0.1)'
      	}
      	
      },
			goGoodsDetail() {
				if (this.level == 2) {
					uni.navigateTo({
						url: '/pages/order/goodsDetail/goodsDetail?shopId=' + this.good.shopId + '&goodsId=' + this.good.id
					})
				}
			},
			triggerCheck() {
				if (this.edit) {
					this.good.isEditCheck = !this.good.isEditCheck
					this.$emit('checked', this.good.isEditCheck)
				} else {
					this.good.isCheck = !this.good.isCheck
					this.$emit('checked', this.good.isCheck)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.good {
		padding-left: 30upx;
		display: flex;
		align-items: center;
		padding-top: 24upx;
		padding-bottom: 28upx;
		background-color: #fff;

		&.edit {
			padding-right: 10upx;
		}

		&.normal {
			padding-right: 30upx;
		}
    .ml5 {
       margin-left: 5px;
    }

		.check {
			margin-right: 30upx;
		}

		.hide {
			position: relative;
			z-index: -1;
		}
    
    .attr {
        padding: 3px  5px;
        font-size: 10px;
        margin-left: 5px;
        border-radius: 30px;
    }
    .shop {
      color: #999;
      font-size: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      word-spacing: 1upx;
    }
    
    .place{
      color: #999;
      font-size: 10px;
    }

		.photo {
			height: 200upx;
			width: 200upx;
			border-radius: 10upx;
			overflow: hidden;
			margin-right: 20upx;

			>img {
				width: 100%;
				height: 100%;
				text-align: center;
			}
		}

		.content {
			position: relative;
			flex-grow: 1;
			height: 200upx;
			width: 100upx;
			.name {
				font-size: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				line-clamp: 2;
				// display: -webkit-inline-box;
				word-break: break-all;
			}

			.standard {
				margin-top: 34upx;
				padding: 4upx 10upx;
				background-color: #f5f5f5;
				font-size: 20upx;
				color: #666;
				display: inline-block;
			}

			.ad {
				margin-top: 34upx;
				display: inline-block;
				color: #999;
				font-size: 20upx;
			}

			.price {
				font-size: 28upx;
				color: #f5222d;
				position: absolute;
				bottom: 16px;
				left: 0;
				word-spacing: 1upx;

				.coin {
					display: inline-block;
					font-size: 20upx;
					margin-right: 0upx;
				}
			}
     

			.invalid {
				padding: 2upx 14upx;
				background-color: #f5f5f5;
				color: #666;
				border-radius: 14upx;
			}

			.count {
				position: absolute;
				bottom: 0;
				right: 0;
				display: flex;
				align-items: center;

				input {
					width: 84upx;
					height: 44upx;
					line-height: 44upx;
					background-color: #f5f5f5;
					margin-left: 8upx;
					margin-right: 8upx;
					font-size: 22upx;
					color: #333;
					text-align: center;
					border: none;
					outline: none;
				}
			}

			.check-enter-active,
			.check-leave-active {
				transition: all 2s;
			}

			.check-enter,
			.check-leave-to {
				opacity: 0;
				transform: translateX(-100%);
			}

			.check-enter-to,
			.check-leave {
				opacity: 0;
				transform: translateX(0%);
			}
		}
	}
</style>
