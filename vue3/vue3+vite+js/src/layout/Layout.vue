<template>
  <el-container class="" style="height: 100%;">
    <el-aside
      width="150px"
      style="background-color: rgb(238, 241, 246)"
      class="sider"
      >sider</el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">header</el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { reactive, toRefs } from "vue";

// export default {
//   setup() {
//     // const state = reactive({
//     //   count: 0,
//     // });

//     // return {
//     //   ...toRefs(state),
//     // };
//   },
// };
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
</style>