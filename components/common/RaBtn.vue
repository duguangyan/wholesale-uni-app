<template>
  <div :class="['radius-btn',isCheck === 1?'checked':'']" @click="trigger">
    <div class="point"></div>
  </div>
</template>

<script>
export default {
  name: 'radiusbtn',
  props: {
    val: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isCheck: this.val
    }
  },
  watch: {
    val: {
      handler(newValue, oldValue) {
        this.isCheck = newValue
      },
      deep: true
    }
  },
  methods: {
    trigger() {
      this.isCheck = this.isCheck === 1 ? 0 : 1
      this.$emit('radio', this.isCheck)
    }
  }
}
</script>

<style lang="scss" scoped>
.radius-btn{
  width: 45px;
  height: 24px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px #E6E6E6;
  position: relative;
  transition: background-color 0.5s;
  background-color: #F5F5F5;
  .point{
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 12px;
    box-shadow: 0 0 0 1px #e6e6e6;
    background-color: #fff;
    position:absolute;
    top: 1px;
    left: 0;
    transition: all 0.5s;
  }
  &.checked{
    background-color: #FC2D2D;
    box-shadow: 0 0 0 1px #FC2D2D;
    .point{
      left: 50%;
      box-shadow: 0 0 0 1px #D60909;
    }
  }

}
</style>
