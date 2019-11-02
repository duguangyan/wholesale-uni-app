<template>
	<view class="relesase">
		<view class="top">
			<view class="camera" @click="actionSheetTap">
				<uni-icons type="camera" size="50"></uni-icons>
				<view class="fs28">上传图片/视频的货品更有吸引力</view>
				<view class="fs24">主图和详情图，总共最多上传10张，最少需上传1张</view>
			</view>
		</view>
		<view class="content">
			<view class="title">
				<view class="name fs28">货品标题</view>
				<view class="input fs28">
					<input type="text" maxlength="100" v-model="goodsTitile" placeholder="输入货品标题,买家可通过标题找到你的货品100字以内">
				</view>
				<uni-list>
					<uni-list-item @click="goVarieties" :show-extra-icon="true" show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="货品品种"
					 :badge-text="varieties"></uni-list-item>
					<uni-list-item @click="goAttribute" :show-extra-icon="true" show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="货品属性"
					 :badge-text="attribute"></uni-list-item>
					<uni-list-item @click="goPrice" :show-extra-icon="true" show-badge='true' :extra-icon="{color: '#FC2D2D',size: '12',type: 'star-filled'}" title="货品价格"
					 :badge-text="price"></uni-list-item>
				</uni-list>
			</view>
		</view>

		<view class="footer fs28">
			<view class="title">货品描述</view>
			<view class="textarea">
				<textarea maxlength="1000" v-model="textareaValue" @input="textareaInput" placeholder="请对货品进行详细描述，可参考以下内容,货品介绍：如货品的优势、质量等级,经营能力：如基地/产地/企业规模、相关设施、供货能力" />
				<view class="num">
					<view @click="clearTextarea"><text>{{num}}/1000</text><uni-icons type="trash" size="20"></uni-icons></view>					
				 </view>
			</view>
		</view>
		
		<view class="tips fs20">请如实填写货品信息（图片、价格、描述等），否则会影响审核发布！</view>
		
		<button class="btn" type="primary" @click="doRelease">发布货品</button>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				goodsTitile:'',
				num: 0,
				textareaValue:'',
				varieties:'',
				attribute:'',
				price:''
			};
		},
		components: {uniIcons,uniList,uniListItem},
		onLoad() {
			
		},
		onShow() {
			this.varieties = uni.getStorageSync('varieties')
			this.attribute = uni.getStorageSync('attribute')
			this.price     = uni.getStorageSync('price')
		},
		methods:{
			// 发布货品
			doRelease(){
				
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
				uni.showActionSheet({
				title: '选择类型',
				itemList: ['拍摄照片或视频', '从手机相册选择'],
				success: e => {
					console.log(e.tapIndex);
						if (e.tapIndex == 0) {
							this.chooseVideo();
						} else {
							this.chooseImage();
						}
					}
				});
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
		.btn{
			margin: 30upx 40upx;
		}
		.tips{
			text-align: center;
			height: 100upx;
			line-height: 100upx;
			background: #eee;
			padding: 0 30upx;
			margin-bottom: 40upx;
		}
		.footer{
			margin: 30upx;
			.textarea{
				background: #eee;
				padding: 20upx;
				margin-top: 20upx;
				position: relative;
				textarea{
					width: 100%;
				}
				
				.num{
					position: absolute;
					right: 30upx;
					bottom: 30upx;
					z-index: 99999;
				}
			}
		}
		.content{
			margin: 40upx 0;
			padding: 0 30upx;
			.title{
				.name{
					margin-bottom: 20upx;
				}
				.input{
					background: #E5E5E5;
					color: #333;
					padding-left: 10upx;
				}
			}
			
		}
		.top{
			background: #eee;
			padding: 50upx 0;
			.camera{
				uni-icons{
					margin: 0 auto;
					text-align: center;
				}
				text-align: center;
				.fs28{
					margin-bottom: 20upx;
				}
			}	
		}
	}
</style>
