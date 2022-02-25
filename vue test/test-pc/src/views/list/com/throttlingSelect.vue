<template>
  <el-select
    v-model="selectValue"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    style="width: calc(98% - 20px)"
    @visible-change="popChange"
  >
    <el-option
      v-for="item in options"
      :key="item[selkey]"
      :label="item[sellabel]"
      :value="item[selkey]"
    />
  </el-select>
</template>

<script>
export default {
  filters: {},
  components: {},
  mixins: [],
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'update' // 自定义名
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    list: { // 选项值
      type: Array,
      default: () => []
    },
    placeholder: {
      type: [String, Number],
      default: '选项多，加载慢，建议搜索'
    },
    selkey: {
      type: [String, Number],
      default: 'key'
    },
    sellabel: {
      type: [String, Number],
      default: 'label'
    }
  },
  data() {
    return {
      options: [],
      selectValue: '',
      loading: false
    }
  },
  computed: {},
  watch: {
    selectValue(val) {
      console.log(val)
      this.$emit('update', val)
    }
  },
  created() {
    this.selectValue = this.value
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    popChange(e) {
      console.log(e)
      if (e) {
        this.loading = true
        this.options = this.list.length > 200000 ? [] : [...this.list]
        this.loading = false
      }
    },
    remoteMethod(query) {
      console.log(query)
      if (query !== '') {
        this.loading = true
        this.options = []
        const reg = new RegExp(query)
        setTimeout(() => {
          this.options = this.list.filter(item => {
            return reg.test(item[this.selkey])
          })
          this.loading = false
        }, 50)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
