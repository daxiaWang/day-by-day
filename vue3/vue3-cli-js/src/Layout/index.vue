<template>
  <div
    class="layout_wrap"
    :class="['wrapper', isCollapse ? 'hideSidebar' : '']"
  >
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <h3 class="title">vue3+EPlus+js</h3>
        <sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <topbar @reload="handleReload" />
        </el-header>
        <breadcrumb class="breadcrumb" />
        <el-main>
          <div>
            <appMain />
          </div>
        </el-main>
        <el-footer>2021@wanger</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from "./Sidebar/index.vue";
import topbar from "./topbar/index.vue";
import breadcrumb from "./breadcrumb/index.vue";
import appMain from "./appMain/index.vue";
import { defineComponent, ref, toRefs, reactive } from "vue";

export default defineComponent({
  components: {
    sidebar,
    topbar,
    breadcrumb,
    appMain,
  },
  setup() {
    const isCollapse = ref(false);

    return {
      isCollapse,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout_wrap {
  width: 100%;
  height: 100%;
  // border: 4px solid #000;
  .title {
    padding: 0px 10px;
    height: 59px;
    line-height: 59px;
    text-align: center;
    border-bottom: 1px solid;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    border-right: 1px solid rgba(#000, 0.2);
    height: 100%;
  }
  .breadcrumb{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(#000, 0.2);
    padding: 0 20px;

  }
  .el-main {
    height: calc(100% - 160px);
    overflow: hidden;
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(#000, 0.2);
  }
}

header {
  height: 59px;
  border-bottom: 1px solid rgba(#f00, 0.1);
  
}
</style>
