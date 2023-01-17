<template>
  <div class="counter">
    <button class="counter_btn" @click="onMinus">-</button>
    <div class="counter_val">{{ value }}</div>
    <button class="counter_btn" @click="onPlus">+</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    value: {
      type: Number,
      default: 0
    },
    onMinus: Function,
    onPlus: Function
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  div{
    width: 50px;
    text-align: center;
    font-size: 30px;
  }
}
</style>
