<template>
	<view class="add">
		<NavigationBar title="添加属性" :isClick="isClick" :clickTitle="clickTitle" @doClick="doClick"></NavigationBar>
		<view class="content">
			<!-- <view class="bb1">
				<uniInput :before="'属性名'" :after="'请输入属性名称'" :name="'title'" :value="title" @input="getTitle"></uniInput>
			</view>
			<view class="bb1">
				<uniInput :before="'属性值'" :after="'请输入属性值'" :name="'name'" :value="value" @input="getValue"></uniInput>
			</view> -->
			<view class="items">
				<view class="item cf bb1">
					<view class="fll">属性名</view>
					<view class="fll">
						<input type="text" @input="checkVal" v-model="name" placeholder="请输入属性名称">
					</view>
				</view>
				<view class="item cf bb1">
					<view class="fll">属性值</view>
					<view class="fll">
						<input type="text" @input="checkVal" v-model="val" placeholder="请输入属性值">
					</view>
				</view>
			</view>
			<view class="tips fs24 text-999">
				注：添加的属性只用于这次货品发布
			</view>
			
			 <view class="big-btn-active" :class="{novalue: !hasVal}" @click="save">{{index == ''?'添加属性':'修改属性'}}</view>
		</view>
		
	</view>
</template>

<script>
	import uniInput from '@/components/hnfly-input/uni-input.vue';
	import NavigationBar from '@/components/common/NavigationBar.vue'
	export default {
		data() {
			return {
				name:'',
				val:'',
				isClick: false,
				clickTitle:'删除属性',
				hasVal: false,
				index:'',
				ix:'',
				categoryAttributes:''
			};
		},
		components: {
		    uniInput,NavigationBar
		},
		onLoad(options) {
			if(options.index){
				this.index = options.index
				this.ix    = options.ix
				this.isClick = true
			}
			
		},
		onShow() {
			if(this.index == ''){
				this.isClick = false
			}else{
				this.categoryAttributes = uni.getStorageSync('addCategoryAttributes')
				this.isClick = true
				this.hasVal = true
				this.name = this.categoryAttributes[this.index].name
				this.val = this.categoryAttributes[this.index].goodsDetailAttrValueList[this.ix].value
			}
		},
		methods:{
			// 添加属性
			save(){
				// 组装数据
				let arr = [
					{
						name:'',
						goodsDetailAttrValueList:[]
					}
				];
				// 如果有历史记录
				let categoryAttributes = uni.getStorageSync('addCategoryAttributes')
				if(categoryAttributes){
					if(this.index !=''){
						categoryAttributes[this.index].name = this.name
						categoryAttributes[this.index].inputType = 5
						categoryAttributes[this.index].goodsDetailAttrValueList[this.ix].value = this.val
						uni.setStorageSync('addCategoryAttributes',categoryAttributes)
					}else{
						let obj = {
							name: this.name,
							inputType: 5,
							goodsDetailAttrValueList:[{"id":"","categoryAttrId":"","value":this.val,"remark":"","sort":1}]
						}
						categoryAttributes.push(obj)
						uni.setStorageSync('addCategoryAttributes',categoryAttributes)
					}
					
					
				}else{
					// 没有历史记录
					arr[0].name = this.name
					arr[0].inputType = 5
					arr[0].goodsDetailAttrValueList.push({"id":"","categoryAttrId":"","value":this.val,"remark":"","sort":1})
					uni.setStorageSync('addCategoryAttributes',arr)
				}
				
				// 返回上一页
				uni.navigateBack({
					delta:1
				})
				
			},
			// 判断是否添加属性
			checkVal(){
				this.hasVal = this.name !='' && this.val != ''
			},
			// 点击删除属性
			doClick(){
				this.categoryAttributes[this.index].goodsDetailAttrValueList.splice(this.ix,1)
				if(this.categoryAttributes[this.index].goodsDetailAttrValueList.length <=0){
					this.categoryAttributes.splice(this.index,1)
				}
				uni.setStorageSync('addCategoryAttributes',this.categoryAttributes)
				// 返回上一页
				uni.navigateBack({
					delta:1
				})
			},
			getTitle(e){
				var value = e.detail.value;
				var name = e.target.id;
			},
			getValue(e){
				var value = e.detail.value;
				var name = e.target.id;
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		background: #fff;
		min-height: 100vh;
		padding-top: var(--status-bar-height);
		.big-btn-active{
			margin-top: 100upx;
		}
		.novalue{
			background: #D9D9D9;
		}
		.edit{
			height: 100upx;
			line-height: 100upx;
			text-align: right;
			position: relative;
			right: 30upx;
			color: #007AFF;
		}
		.content{
			padding: 0 30upx;
			padding-top: 20upx;
			button{
				margin-top: 300upx;
				background: #007AFF !important;
			}
			.tips{
				margin-top: 20upx;
			}
			.items{
				.item{
					height: 100upx;
					line-height: 100upx;
					
					font-size: 30upx;
					color: #333;
					input{
						width: 550upx;
						position: relative;
						top: 30upx;
						left: 40upx;
					}
				}
			}
		}
	}
</style>
