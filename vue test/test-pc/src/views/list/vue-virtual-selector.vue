//vue-virtual-selector.vue
//可以拿去用了
<template>
  <virtual-selector
    v-model="selectedvalue"
    :loading="loading"
    label=""
    :placeholder="placeholder"
    :list="list"
    :option="listOption"
    @input="handleInput"
    @focus="handleFocus"
    @search="handleSearch"
    @select="handleSelect"
  >
    <div slot="loading">loading...</div>
    <div slot="nodata">未找到匹配项</div>
    <div slot="item" slot-scope="{ item }">
      <span>{{ item[listOption.itemNameKey] }}</span>
    </div>
  </virtual-selector>
</template>

<script>
export default {
  name: 'VirSelector',
  filters: {},
  components: {},
  mixins: [],
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'update' // 自定义名
  },
  props: {
    value: {
      required: true,
      type: [String, Number],
      default: ''
    },
    list: {
      required: true,
      type: Array,
      default: () => []
    },
    listOption: {
      required: false,
      type: Object,
      default: () => {
        return {
          itemNameKey: 'label',
          itemValueKey: 'key',
          itemPageSize: 8,
          itemGap: 5
        }
      }
    },
    placeholder: {
      required: false,
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      selectedvalue: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log('11111111111', this.value && this.list.length)
    // 如果value没值，有带选项，提示不存在
    if (!this.value && this.list.length && !this.placeholder) {
      // 给value一个默认值
      this.selectedvalue = this.list[0]
      this.$emit('update', this.selectedvalue[this.listOption.itemValueKey])
    } else {
      this.selectedvalue = this.list.find(item => {
        return item[this.listOption.itemNameKey] === this.value || item[this.listOption.itemValueKey] === this.value
      })
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    handleInput(input) {
      console.log('Input : ', input)
    },
    // 点击
    handleFocus({ id, focus }) {
      console.log('focus : ', { id, focus })
    },
    // 搜索
    handleSearch({ id, search }) {
      console.log('search : ', { id, search })
      this.$emit('update', search[this.listOption.itemValueKey])
      this.selectedvalue = search
    },
    // 选择
    handleSelect({ id, select }) {
      console.log('select : ', { id, select })
      this.$emit('update', select[this.listOption.itemValueKey])
      this.selectedvalue = select
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
