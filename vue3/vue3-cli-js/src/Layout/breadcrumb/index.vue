<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb> -->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import pathToRegexp from "path-to-regexp";

export default {
  setup() {
    const levelList = ref(null);
    const router = useRouter(); //是VueRouter的一个对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。
    const route = useRoute();  //路由跳转对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等
    console.log("route", route);
    console.log("router", router);
  
    const getBreadcrumb = () => {
      let matched = route.matched.filter(
        (item) => item.meta && item.meta.title
      );

      const first = matched[0];
      if (first.path !== "/") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }

      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
      console.log("levelList", levelList.value);
    };

    const handleLink = (item) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(path);
    };

    getBreadcrumb();
    watch(route, getBreadcrumb);
    return {
      levelList,
      handleLink,
    };
  },
};
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