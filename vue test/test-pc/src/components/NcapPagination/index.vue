<template>
  <div class="ncap-pagination">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageConfigure.current"
      :page-sizes="pageConfigure.pageSizes"
      :page-size="pageConfigure.size"
      prev-text="上一页"
      next-text="下一页"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageConfigure.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "ncap-pagination",
  props: {
    pageConfigure: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    /**
     * 切换页面条数
     * @param {String} val 条数
     */
    handleSizeChange(val) {
      this.$emit("handle-size-change", val);
    },
    /**
     * 切换当前页
     * @param {String} val 页数
     */
    handleCurrentChange(val) {
      this.$emit("handle-current-change", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.ncap-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px
}
</style>
