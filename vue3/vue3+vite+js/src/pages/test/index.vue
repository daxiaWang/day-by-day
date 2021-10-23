<template>
  <div>
    test11
state -- {{count}}
<el-button @click="count++">plus</el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { 
      type: String,
      required: true
    }
  },
  data () {
    return {
      repositories: [], // 1
      filters: {  }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () {  }, // 3
    repositoriesMatchingSearchQuery () {  }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // 使用 `this.user` 获取用户仓库
    }, // 1
    updateFilters () {  }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  },

  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>