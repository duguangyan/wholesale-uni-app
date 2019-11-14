<template>
	<view class="relesase">
		<view class="top">
			<view class="camera" @click="actionSheetTap" v-if="true">
				<view class="image"><image src="../../../static/imgs/icon-1034.png" mode=""></image></view>
				<view class="fs28 text-333">上传图片/视频的货品更有吸引力</view>
				<view class="fs24 text-999">(最少需上传1张)</view>
			</view>
			<view v-if="false">
				<view class="edit flex">
					<view class="flex-1">
						<view class="image">
							<image src="../../../static/img/1.1.png" mode=""></image>
						</view>
						<view class="video">
							<image src="../../../static/imgs/icon-1038.png" mode=""></image>
						</view>
					</view>
					<view class="flex-1">
						<view class="btn">编辑图片</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">
				<view class="name fs34 text-333">货品标题</view>
				<view class="input fs24"><input type="text" maxlength="50" v-model="goodsTitile" placeholder="输入货品标题方便用户找到你的货品15-50个字以内"></view>
				
				<view class="items">
					<view class="item cf" @click="goVarieties" >
						<view class="fll text-theme">*</view>
						<view class="fll fs30 text-333">{{varieties?varieties:'货品品种'}}</view>
						<view class="flr"><image src="../../../static/imgs/right.png" mode=""></image></view>
					</view>
					<view class="item cf" @click="goAttribute">
						<view class="fll text-theme">*</view>
						<view class="fll fs30 text-333 ellipsis">{{attribute?attribute:'货品属性'}}</view>
						<view class="flr"><image src="../../../static/imgs/right.png" mode=""></image></view>
					</view>
					<view class="item cf" @click="goPrice">
						<view class="fll text-theme">*</view>
						<view class="fll fs30 text-333">{{price?price:'货品价格'}}</view>
						<view class="flr"><image src="../../../static/imgs/right.png" mode=""></image></view>
					</view>
				</view>
				
			</view>
		</view>

		<view class="footer fs28">
			<view class="title fs34 text-333">货品描述</view>
			<view class="tips fs20 text-999">请如实填写货品信息（图片、价格、描述等），否则会影响审核发布！</view>
			<view class="textarea">
				<textarea maxlength="1000" v-model="textareaValue" @input="textareaInput" placeholder="请对货品进行详细描述，可参考以下内容,货品介绍：如货品的优势、质量等级,经营能力：如基地/产地/企业规模、相关设施、供货能力" />
				<view class="num">
					<view @click="clearTextarea">
						<text>{{num}}/1000</text>
						<view class="image"><image src="../../../static/imgs/icon-1035.png" mode=""></image></view>
					</view>					
				 </view>
			</view>
		</view>
		
		
		
		<view class="big-btn-active" @click="doRelease">发布货品</view>
	</view>
</template>

<script>
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				goodsTitile:'',
				num: 0,
				textareaValue:'',
				varieties:'',
				attribute:'',
				price:'',
			};
		},
		components: {},
		onLoad() {
			
		},
		onShow() {
			this.varieties = JSON.parse(uni.getStorageSync('varieties')).name 
			this.attribute = uni.getStorageSync('attribute')
			this.price     = uni.getStorageSync('price')
		},
		methods:{
			// 发布货品
			doRelease(){
				
			},
			goPage(index){
				switch (index){
					case 0:
					this.goVarieties()
						break;
					case 1:
					this.goAttribute()
						break;	
					case 2:
					this.goPrice()
						break;	
					default:
						break;
				}
			},
			// 去价格页面
			goPrice(){
				if(this.attribute == ''){
					T.tips('请先选择属性')
					return false
				}
				uni.navigateTo({
					url:'/pages/middle/release/price/price'
				})
			},
			// 去属性选择页面
			goAttribute(){
				if(this.varieties == ''){
					T.tips('请先选择品种')
					return false
				}
				uni.navigateTo({
					url:'/pages/middle/release/attribute/attribute'
				})
			},
			// 去品种选择页面
			goVarieties(){
				uni.navigateTo({
					url:'/pages/middle/release/varieties/varieties'
				})
			},
			// 货物描述
			textareaInput(e){
				this.num = e.detail.cursor
				this.textareaValue = e.detail.value
			},
			// 清空货物描述
			clearTextarea(){
				this.num = 0
				this.textareaValue = ''
			},
			actionSheetTap(){
				// uni.showActionSheet({
				// title: '选择类型',
				// itemList: ['拍摄照片或视频', '从手机相册选择'],
				// success: e => {
				// 	console.log(e.tapIndex);
				// 		if (e.tapIndex == 0) {
				// 			this.chooseVideo();
				// 		} else {
				// 			this.chooseImage();
				// 		}
				// 	}
				// });
				uni.navigateTo({
					url:'/pages/middle/release/chooseImage/chooseImage'
				})
			},
			// 选中图片
			chooseImage: function() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
				
			},
			
			//选中视频
			chooseVideo: function() {
				var self = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						self.src = res.tempFilePath;
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.relesase{
		.big-btn-active{
			margin: 30upx auto;
		}
		.footer{
			background: #fff;
			padding: 30upx;
			.tips{
				height: 20upx;
				line-height: 20upx;
				margin: 20upx 0;
			}
			.textarea{
				background: #f5f5f5;
				padding: 20upx;
				margin-top: 20upx;
				position: relative;
				textarea{
					width: 100%;
					font-size: 24upx;
					color: #333;
				}
				
				.num{
					position: absolute;
					right: 30upx;
					bottom: 30upx;
					z-index: 99999;
					font-size: 20upx;
					color: #999999;
					.image{
						display: inline-block;
						width: 32upx;
						height: 32upx;
						position: relative;
						top: 6upx;
						left: 10upx;
						>image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		.content{
			padding: 0upx 30upx;
			background: #fff;
			border-bottom: 20upx solid #F7F7F7;
			border-top: 20upx solid #F7F7F7;
			.title{
				.items{
					.item{
						height: 90upx;
						line-height: 90upx;
						border-top:  1upx solid #f7f7f7;
						.ellipsis{
							width: 600upx;
						}
						.fll{
							margin-right: 10upx;
						}
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
				.name{
					margin: 20upx 0;
				}
				.input{
					color: #333;
					padding-bottom: 20upx;
				}
			}
			
		}
		.top{
			background: #fff;
			padding: 50upx 0 30upx 0;
			.edit{
				margin: 0 30upx;
				position: relative;
				.video{
					width: 60upx;
					height: 60upx;
					position: absolute;
					top: 50%;
					margin-top: -30upx;
					margin-left: 90upx;
					z-index: 9999;
					opacity: .7;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.image{
					width: 240upx;
					height: 240upx;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.btn{
					width:160upx;
					height:56upx;
					border:1upx solid rgba(230,230,230,1);
					border-radius:28upx;
					font-size: 28upx;
					color: #333;
					line-height: 56upx;
					text-align: center;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -28upx;
				}
			}
			.camera{
				.image{
					width: 140upx;
					height: 140upx;
					margin: 0 auto;
					text-align: center;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				text-align: center;
				.fs28{
					margin: 20upx 0 10upx 0;
				}
			}	
		}
	}
</style>
