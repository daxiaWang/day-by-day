<template>
  <div>
    <input type="checkbox" :checked="checked" @change="test">
  </div>
</template>
<script>
export default {
  model: {
    props: 'checked',
    event: 'change'
  },
  props: ['checked'],
  methods: {
    test(e) {
      this.$emit('change', e.target.checked)
    }
  }
}
</script>
