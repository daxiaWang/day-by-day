<template>
  <div>
    <el-form>
      <el-form-item>
        <throttling-select v-model="value" :list="options" :placeholder="placeholder" selkey="key" sellabel="label" />
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import throttlingSelect from './com/throttlingSelect'
export default {
  components: {
    throttlingSelect
  },
  data() {
    return {
      value: '',
      placeholder: '请选择',
      options: Array.from({ length: 11000 }, (k, v) => ({ label: v + 1, key: v + 1 }))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
