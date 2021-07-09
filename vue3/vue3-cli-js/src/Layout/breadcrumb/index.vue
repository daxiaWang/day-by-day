<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb> -->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { ref, reactive, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import pathToRegexp from 'path-to-regexp'

export default {
  setup () {
    const router = useRouter();
    const route = useRoute();
      console.log("route", route.matched)
      // console.log("router.options.routes", router.options.routes)
    const obj = reactive({
      levelList: null,
      routes: route.matched
    })

// watch(() => obj.levelList, (newValue, oldValue) => {
//   console.log("222222222")
//   getBreadcrumb()
// })
    watch(() => obj.routes, () => { 
      getBreadcrumb()
    })
    const getBreadcrumb = () => {
      console.log(1111111)
      // const router = useRouter()
      // only show routes with meta.title
      const matched = obj.routes.filter(item => item.meta && item.meta.title)
      // const first = matched[0]
    console.log("matched", matched)
      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }

      obj.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    console.log("obj", obj)
    return {
      ...toRefs(obj),
      getBreadcrumb,
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>