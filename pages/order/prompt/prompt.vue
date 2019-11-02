<template>
	<view>
		<div class="freight-prompt">
		    <div class="address cf" @click="isShow = true">
		      <span class="fll">运送地址:</span>
		      <input class="fll" type="text" disabled readonly v-model="curAddress" placeholder="请选择地址">
		    </div>
		
		    <div class="prompt">{{prompt}}</div>
		    <div class="prompt">{{promptFree}}</div>
		
		    <Provinces :show="isShow" :list="list" @close="isShow = false" @change="selArea"/>
		  </div>
	</view>
</template>

<script>
	import {getArea} from '@/api/areaApi.js'
	import {getFreightPrompt} from '@/api/goodsApi.js'
	import {getChildrenByPId} from '@/api/userApi.js'
	import Provinces from '@/components/common/Provinces.vue'
	export default {
		data() {
			return {
				list: [],
			  isShow: false,
			  curAddress: '',
			  prompt: '',
			  id:'',
			  promptFree:''
			};
		},
		components:{
			Provinces
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
		    // getArea().then(res=>{
		    //   this.list = res.data
		    // })
			let data = {
			  parentId: 0
			}
			getChildrenByPId(data).then(res => {
			  if (res.code === '1000') {		
				if(res.data.length>0){
					res.data.forEach(item=>{
						this.list.push(item.name)
					})
				}				
			  }
			})
		  },
		methods: {
		    selArea(data){
		      this.curAddress = data
		      this.isShow = false
			  
		      getFreightPrompt({
		        id: this.id,
		        province: data
		      }).then(data=>{
				this.prompt = data.data?data.data.PostSolutionItem:'无城市邮费项'
				this.promptFree = data.data?data.data.PostSolutionFreeItem:'无条件邮费项'
		      })
		    }
		  }
	}
</script>


<style lang="scss" scoped>
.freight-prompt {
  min-height: 100vh;
  background-color: #f5f5f5;
  .address{
    margin-top: 20upx;
    background-color: #fff;
    line-height: 100upx;
    font-size: 30upx;
    padding-left: 30upx;
	span{
		width: 140upx;
	}
  }
  input{
    border:none;
    outline: none;
    padding-left: 20upx;
	position: relative;
	top: 26upx;
	width: 200upx;
  }
  .prompt{
    color: #666;
    font-size: 24upx;
    margin-top: 20upx;
    padding-left: 30upx;
  }
}
</style>

