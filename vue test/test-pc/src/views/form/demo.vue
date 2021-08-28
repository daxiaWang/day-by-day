<template>
  <div>
    <CustomInput v-model="msg" />
    <CustomCheck v-model="check" @change="handleChange" />
  </div>
</template>

<script>
import CustomInput from './component/CustomInput.vue'
import CustomCheck from './component/CustomCheck'
export default {
  components: {
    CustomInput,
    CustomCheck
  },
  data() {
    return {
      check: '',
      msg: ''
    }
  },
  methods: {
    handleChange(value) {
      console.log('handleChange', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
