<template>
	<view class="apply-refund">
		
	</view>
</template>

<script>
  import {loadRefundInfo} from '@/api/refund.js'
	var vm =  {
		data() {
      vm = this;
			return {
				
			};
		},
    onLoad(options){
      loadRefundInfo({
        orderDetailId: options.orderId
      }).then(data=>{
        
      })
    }
	}
  export default vm
</script>

<style lang="scss" scoped>
.apply-refund{
  
}
</style>
