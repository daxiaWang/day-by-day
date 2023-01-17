<template>
  <div class="counter">
    <Counter :value="value" :on-minus="minusVal" :on-plus="plusVal" />
    <Counter1 v-model="counerVal" />
  </div>
</template>

<script>
import Counter from './counter.vue'
import Counter1 from './counter1.vue'
export default {
  name: 'CounterIndex',
  components: {
    Counter,
    Counter1
  },
  data() {
    return {
      value: 0,
      counerVal: 0
    }
  },
  methods: {
    minusVal() {
      this.value--
    },
    plusVal() {
      this.value++
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
