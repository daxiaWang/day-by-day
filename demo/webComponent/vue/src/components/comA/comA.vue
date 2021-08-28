<template>
  <div>
    <span>{{ msg }}</span>
    <button @click="change">点击换字</button>
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: 'comA',
  data() {
    return {
      msg: '这是组件A',
      flag: false,
    }
  },
  methods: {
    change() {
      this.flag = !this.flag
      this.msg = this.flag ? 'this is component A' : '这是组件A'
    },
  },
}
</script>
