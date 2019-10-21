<template>
  <!--  广告位  -->
  <div class="advertising">
    <div class="div cf">
        <div class="img fll" v-for="(item,index) in adSets" :key="index">
          <img @click="goPath(item)" :src="item.path" alt="广告">
        </div>
    </div>
  </div>
</template>

<script>
import { getAdPositioneById } from '@/api/userApi.js'
export default {
  name: 'AdvertisingPosition',
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      adSets: []
    }
  },
  mounted() {
    this.getAdPositione()
  },
  methods: {
    // 广告位url跳转
    goPath(item) {
      if (item.type === 1) {
              location.href = item.url
            }else if(item.type === 5){
              this.$router.push({ path: 'gooddetail/' + item.id +'/'+item.url})
            }
    },
    // 获取广告位数据
    getAdPositione() {
      let data = {
        id: 1
      }
      getAdPositioneById(data).then(res => {
        if (res.code === '1000') {
          this.adSets = res.data.adSet
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .advertising{
    height: 140upx;
    padding: 0 30upx;
    overflow: hidden;
    width: 100%;
    margin-top: 40upx;
	
    .div{
		.img:last-child{
		  margin-left: 50upx;
		}
		.img{
		  width: 320upx;
		  height: 140upx;
		  border-radius: 10upx;
		  overflow: hidden;
		  >img{
		    width: 100%;
			height: 100%;
		  }
      
      }
    }

  }
</style>
