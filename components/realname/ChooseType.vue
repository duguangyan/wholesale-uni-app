<template>
	<view>
		<view class="bg" @touchmove.stop.prevent="moveHandle" @click="close"></view>
		<view class="chooseTyep cf">
			<view class="left fll">
				<view class="items">
					<view @click="checkLeft(index)" class="item" :class="{'active':leftIndex==index}" v-for="(item,index) in left" :key="index">{{item}}</view>
				</view>
			</view>
			<view class="content fll">
				<view class="items">
					<view @click="checkContent(index)"  class="item" :class="{'active':contentIndex==index}" v-for="(item,index) in content" :key="index">{{item}}</view>
				</view>
			</view>
			<view class="right fll">
				<view class="items">
					<view @click="checkRight(index)" class="item" :class="{'active':rightIndex==index}" v-for="(item,index) in right" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
	</view>
	
  
</template>

<script>
export default {
  name: 'ChooseTyep',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
  	return {
  		  left: ['农产品','水产','家禽'],
		  content: ['蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜','蔬菜'],
		  right:['白菜','白菜','白菜'],
		  leftIndex:0,
		  contentIndex:0,
		  rightIndex:0
  	};
  },
  methods:{
	  close(){
		  let obg = {
		  			  left:this.left[this.leftIndex],
		  			  content:this.content[this.contentIndex],
		  			  right:this.right[this.rightIndex]
		  }
		  this.$emit('close', obg)
	  },
	  moveHandle(){
		  return false;
	  },
	  checkLeft(index){
		  this.leftIndex = index
	  },
	  checkContent(index){
		  this.contentIndex = index
	  },
	  checkRight(index){
		  this.rightIndex = index
		  let obg = {
			  left:this.left[this.leftIndex],
			  content:this.content[this.contentIndex],
			  right:this.right[this.rightIndex]
		  }
		  this.$emit('complete', obg)
	  }
  }
 
}
</script>

<style lang="scss" scoped>
	.bg{
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: #000;
		opacity: .7;
		position: fixed;
		z-index: 9;
	}
	.chooseTyep{
		position: fixed;
		z-index: 99999;
		max-height: 740upx;
		width: 750upx;
		
		background: #fff;
		bottom: 0;
		left: 0;
		.items{
			overflow-y: scroll;
			max-height: 740upx;
			.item{
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				font-size: 30upx;
				color: #666;
				position: relative;
			}
		}
		.left{
			width: 200upx;
			height: 100vh;
			background: #F5F5F5;
			.active{
				background: #fff;
				color: #FE3B0B;
			}
			.active:after{
				content: "";
				display: block;
				width: 6upx;
				height: 40upx;
				background: #FE3B0B;
				position: absolute;
				top: 25upx;
				left: 0;
			}
			
		}
		.content{
			width: 250upx;
			.active{
				background: #fff;
				color: #FE3B0B;
			}
		}
		.right{
			width: 300upx;
			.active{
				background: #fff;
				color: #FE3B0B;
			}
		}
	}
</style>
