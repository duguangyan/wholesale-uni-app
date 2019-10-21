<template>
	<view>
		<div class="freight-prompt">
		    <div class="address">
		      <span>运送地址:</span>
		      <input type="text" readonly v-model="curAddress" placeholder="请选择地址" @click="isShow = true">
		    </div>
		
		    <div class="prompt">{{prompt}}</div>
		
		    <Provinces :show="isShow" :list="list" @close="isShow = false" @change="selArea"/>
		  </div>
	</view>
</template>

<script>
	import {getArea} from '@/api/areaApi.js'
	import {getFreightPrompt} from '@/api/goodsApi.js'
	import Provinces from '@/components/common/Provinces.vue'
	export default {
		data() {
			return {
				list: [],
			  isShow: false,
			  curAddress: '',
			  prompt: '',
			  id:''
			};
		},
		components:{
			Provinces
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
		    getArea().then(res=>{
		      this.list = res.data
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
		        this.prompt = data.data || '无邮费项'
		      })
		    }
		  },
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

  }
  input{
    border:none;
    outline: none;
    padding-left: 20upx;
  }
  .prompt{
    color: #666;
    font-size: 24upx;
    margin-top: 20upx;
    padding-left: 30upx;
  }
}
</style>

