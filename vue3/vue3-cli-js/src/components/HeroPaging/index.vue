<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-model:currentPage="currentPage"
    :hide-on-single-page="value"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="sizes, prev, pager, next"
    :total="1000"
  >
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      value: false,
    };
  },
  setup(props, { emit }) {
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
      emit("size-change", val);
    };
    const handleCurrentChange = (val) => {
      console.log(`每页 ${val} 条`);
      emit("current-change", val);
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
