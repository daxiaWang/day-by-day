<template>
  <div class="topbar_wrap">
    <div>
      <i class="el-icon-s-fold"></i>
      <i class="el-icon-s-unfold"></i>
      <i class="el-icon-refresh"></i>
    </div>
    <div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>王小虎</span>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
export default {
  setup() {
    const isRouterAlive = ref(true);
    const handleReload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    return { handleReload };
  },
};
</script>

<style lang="scss" scoped>
.topbar_wrap {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i{
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>