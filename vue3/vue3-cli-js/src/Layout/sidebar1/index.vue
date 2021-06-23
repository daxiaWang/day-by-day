<template>
  <el-menu>
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-menu"></i>
        <span>基本配置</span>
      </template>
      <el-menu-item-group>
        <router-link to="/">
          <el-menu-item index="home"> Home </el-menu-item>
        </router-link>
        <router-link to="/about">
          <el-menu-item index="about"> About </el-menu-item>
        </router-link>
        <router-link to="/test">
          <el-menu-item index="test"> Test </el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    console.log("route", route.path);
    console.log("router", router);
    console.log("route.query", router.options.routes)
    return {};
  },
});
</script>

<style lang="scss" scoped>
.el-menu-item{
  width: 100%;
}
</style>
