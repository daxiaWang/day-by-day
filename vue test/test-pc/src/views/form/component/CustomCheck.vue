<template>
  <div>
    <input id="val1" v-model="checkedCur" name="val1" type="checkbox" @change="test">
    <label for="val1" :class="[checkedCur ? 'active' : '']">选项</label>
    <!-- <div slot="custom-icon" /> -->
    <slot name="custom-icon" />
  </div>
</template>
<script>
export default {
  model: {
    props: 'checked',
    event: 'change'
  },
  props: ['checked'],
  data() {
    return {
      checkedCur: ''
    }
  },
  watch: {
    checked(newValue, oldValue) {
      if (newValue) {
        this.checkedCur = newValue
      }
    }
  },
  methods: {
    test(e) {
      this.$emit('change', e.target.checked)
    }
  }
}
</script>
<style lang="scss" scoped>
input{
  display: none;
}
.active{
  border: 1px solid red;
}
</style>
