<template>
	<view class="price">
		<uni-list>
			<uni-list-item @click="getUnit" :is70="is70" :show-extra-icon="true" show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="计量单位"
			 :badge-text="unit"></uni-list-item>
		</uni-list>
		
		<view class="cf item fs32 text-333">
			<view class="fll">
				<uni-icons class="icon" type="star-filled" size="12" color="#FC2D2D"></uni-icons> 库存
			</view>
			<view class="flr cf">
				<input class="input fll" type="number" v-model="num"> <text class="fll">斤</text>
			</view>
		</view>
		
		<view class="title fs24">
			价格（只需填写货品价格，运费由买家线下支付）
		</view>
		<view class="ul fs24">
			<view class="li cf">
				<view class="fll"><uni-icons type="star-filled" size="8" color="#FC2D2D"></uni-icons> 起批量（斤）</view>
				<view class="fll"><uni-icons type="star-filled" size="8" color="#FC2D2D"></uni-icons> 价格（元）</view>
				<view class="fll">操作</view>
			</view>
			<view class="li cf" v-for="(item,index) in list" :key="index">
				<view class="fll"><input type="number" v-model="item.num"></view>
				<view class="fll"><input type="digit" v-model="item.price"></view>
				<view class="fll">
					<text v-if='index != 0' @click="del(index)">删除</text>
					<text class="text-theme mgl-20" @click="add">新增报价</text>
				</view>
			</view>
		</view>
		<view class="footer cf">
			<button class="mini-btn flr" size="mini" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				unit: '选择计量单位',
				is70: true,
				itemList:['斤', '公斤', '袋','吨'],
				list:[
					{
						num: '',
						price:''
					}
				]
			};
		},
		components: {uniIcons,uniList,uniListItem},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			getUnit(){
				let _this = this
				uni.showActionSheet({
				    itemList: this.itemList,
				    success: function (res) {
						_this.unit = _this.itemList[res.tapIndex]
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			// 新增报价
			add(){
				let obj = {
					num: '',
					price:''
				}
				this.list.push(obj);
			},
			// 删除报价
			del(index){
				if(index > 0){
					this.list.splice(index,1)
				}
				
			},
			// 保存
			save(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.price{
		.footer{
			position: fixed;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			bottom: 0;
			padding-right: 60upx;
			z-index: 999999;
			button{
				background: #007AFF !important;
				color: #fff;
				position: relative;
				right: 30upx;
				top: 20upx;
			}
			background: #eee;
		}
		.ul{
			margin: 30upx;
			.li{
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				margin: 0 auto;
				.fll{
					width: 33%;
				}
				input{
					width: 100upx;
					border-bottom: 1upx solid #eee;
					margin: 0 auto;
				}
			}
		}
		.title{
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			background: #eee;
		}
		.item{
			padding: 0 30upx;
			height: 100upx;
			line-height: 100upx;
			.icon{
				margin-right: 20upx;
			}
			.input{
				border-bottom: 1upx solid #eee;
				position: relative;
				top: 20upx;
				width: 100upx;
			}
		}
	}
</style>
