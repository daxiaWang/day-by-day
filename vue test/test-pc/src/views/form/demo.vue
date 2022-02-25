<template>
  <div>
    <CustomInput v-model="msg" />
    <CustomCheck v-model="check" @change="handleChange">
      <i slot="custom-icon" class="el-icon-share" />
    </CustomCheck>
  </div>
</template>

<script>
import CustomInput from './component/CustomInput.vue'
import CustomCheck from './component/CustomCheck'
import apiObj from '@/fnJS/index'
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
  mounted() {
    console.log('apiObj ', apiObj.aa())
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
