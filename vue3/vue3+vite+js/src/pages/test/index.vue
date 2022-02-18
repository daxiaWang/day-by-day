<template>
  <div>
    test11
state -- {{count}}
<el-button @click="count++">plus</el-button>
  </div>
</template>

<script>
import useUserRepositories from './component/useUserRepositories'
import useRepositoryNameSearch from './component/useRepositoryNameSearch'
import useRepositoryFilters from './component/useRepositoryFilters'
import { reactive, toRefs } from 'vue'
export default {
  // components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { 
      type: String,
      required: true
    }
  },
  setup(props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    return {
      // 因为我们并不关心未经过滤的仓库
      // 我们可以在 `repositories` 名称下暴露过滤后的结果
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}
</script>

<style lang="scss" scoped>

</style>