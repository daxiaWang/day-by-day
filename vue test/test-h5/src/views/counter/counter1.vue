<template>
  <div class="counter">
    <button @click="changeValue(-1)">-1</button>
    <span>{{ currentVal }}</span>
    <button @click="changeValue(1)">+1</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number // 定义value属性
    }
  },
  data() {
    return {
      currentVal: this.value
    }
  },
  methods: {
    changeValue(val) {
      this.currentVal += parseInt(val)
      this.$emit('input', this.currentVal) // 定义input事件
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  span, button{
    width: 50px;
    font-size: 30px;
  }
}
</style>
