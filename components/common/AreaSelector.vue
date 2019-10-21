<template>
  <div v-show="show" class="selector">
    <transition name="mask">
      <div v-show="show" class="mask" @click="triggerClose"></div>
    </transition>
    <transition name="body">
      <div v-show="show" class="body">
        <div class="title">
          请选择地区
		  <div class="icon">
			  <img src="@/static/img/tag-close2.png" width="20" height="20" alt  @click="triggerClose" />
		  </div>
          
        </div>
        <mt-picker :slots="myAddressSlots" :visibleItemCount="5" :itemHeight="40" valueKey="name" @change="areaChange"></mt-picker>
      </div>
    </transition>
  </div>
</template>
<script>
// import threeLevelAddress from '@/asset/js/citys'
import { getChildrenByPId } from '@/api/userApi.js'
export default {
  name: 'selector',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      regionInit: false,
      myAddressSlots: [
        // 省
        {
          flex: 1,
          values: [], // 省份数组
          className: 'slot1',
          textAlign: 'center'
        },
        // 分隔符
        {
          divider: true,
          content: '',
          className: 'slot2'
        },
        // 市
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '',
          className: 'slot4'
        },
        // 县
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ]
    }
  },
  mounted() {
    this.getProvinceArr(0)
  },
  methods: {
    // 调取地区列表的函数
    area(id) {
      let that = this
      let promise = new Promise(function(resolve, reject) {
        let data = {
          parentId: id
        }
        getChildrenByPId(data)
          .then(function (res) {
            resolve(res.data)
          }).catch(function (error) {
            console.log(error)
          })
      })
      return promise
    },
    areaChange(picker, values) {
      let that = this
      if (this.regionInit) {
        if (values[0]) {
          that.area(values[0]['id']).then(function(data) {
            picker.setSlotValues(1, data)
          })
        }
        if (values[1]) {
          that.area(values[1]['id']).then(function(data) {
            picker.setSlotValues(2, data)
          })
        }
      } else {
        this.regionInit = true
      }
      this.$emit('area', values)
    },
    triggerClose() {
      this.close()
    },
    // 遍历json，返回省级对象数组
    getProvinceArr(id) {
      let data = {
        parentId: id
      }
      getChildrenByPId(data).then(res => {
        if (res.code === '1000') {
          this.myAddressSlots[0].values = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.selector {
	
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
  }
  .body {
    background-color: #fff;
    /*height: 450upx;*/
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .title {
    color: #010101;
    font-size: 30upx;
    line-height: 100upx;
    position: relative;
    font-weight: bold;
    text-align: center;
	.icon{
		width: 160upx;
		height: 160upx;
		>img{
			width: 100%;
			height: 100%;
			position: absolute;
			right: 30upx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
  }
  .body-enter-active,
  .body-leave-active,
  .mask-enter-active,
  .mask-leave-active{
    transition: 0.5s;
  }
  .body-enter-to,
  .body-leave{
    opacity: 1;
    transform: translateY(0%);
  }
  .body-enter,
  .body-leave-to{
    opacity: 1;
    transform: translateY(100%);
  }
  .mask-enter-to,
  .mask-leave{
    opacity: 1;
  }
  .mask-enter,
  .mask-leave-to{
    opacity: 0;
  }
}
</style>
