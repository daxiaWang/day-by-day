<template>
  <div>
    <input type="text" :value="value" @input="test">
  </div>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    test(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
