<template>
  <div>
    qqq
    <vue-virtual-selector
      :list="options"
      :value="value"
    />
  </div>
</template>

<script>
import vueVirtualSelector from './vue-virtual-selector'
export default {
  components: {
    vueVirtualSelector
  },
  data() {
    return {
      value: '1',
      placeholder: '请选择',
      options: Array.from({ length: 11000 }, (k, v) => ({ label: v + 1, key: v + 1 }))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
