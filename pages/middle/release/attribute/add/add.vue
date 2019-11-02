<template>
	<view class="add">
		<view class="edit fs28"> 删除属性</view>
		<view class="content">
			<view class="bb1">
				<uniInput :before="'属性名'" :after="'请输入属性名称'" :name="'title'" :value="title" @input="getTitle"></uniInput>
			</view>
			<view class="bb1">
				<uniInput :before="'属性值'" :after="'请输入属性值'" :name="'name'" :value="value" @input="getValue"></uniInput>
			</view>
			
			<view class="tips fs24 text-999">
				注：添加的属性只用于这次货品发布
			</view>
			
			 <button type="primary">添加属性</button>
		</view>
		
	</view>
</template>

<script>
	import uniInput from '@/components/hnfly-input/uni-input.vue';
	export default {
		data() {
			return {
				title:'',
				value:''
			};
		},
		components: {
		    uniInput
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
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
			button{
				margin-top: 300upx;
				background: #007AFF !important;
			}
		}
	}
</style>
