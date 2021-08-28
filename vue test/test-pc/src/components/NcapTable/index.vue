<template>
  <div class="ncap-table">
    <el-table
      size="small"
      :data="tableData"
      style="width: 100%;"
      ref="ncapTableRef"
      border
      fit
      v-loading="loading"
      :height="height"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @row-click="handleRowClick"
      @row-dblclick="rowDblclick"
      @cell-click="cellClick"
      @select="select"
      @select-all="selectAll"
    >
      <template v-for="item in tableHeader">
        <!-- <el-table-column
                  :key="item.prop"
                  label="编号"
                  align="center"
                  fixed
                  :width="item.width || 80"
                  v-if="!item.isHidden && item.prop === 'index'"
                  :prop="item.prop">
                  <template slot-scope="scope">
                    {{(scope.$index + 1) + (pages.current - 1) * pages.size}}
                  </template>
        </el-table-column>-->
        <el-table-column
          :key="item.prop"
          v-if="!item.isHidden && item.prop === 'selection'"
          type="selection"
          width="40"
          fixed
        ></el-table-column>
        <el-table-column
          :key="item.prop"
          v-if="!item.isHidden && item.prop === 'selectionCK'"
          type="selection"
          :selectable="selectionCK"
          width="40"
          fixed
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          v-if="!item.isHidden && item.prop !== 'index' && item.prop !== 'selection' && item.prop !== 'selectionCK' && item.prop !== 'expandChild'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minW"
          :width="item.width"
          :fixed="item.fixed"
          :align="item.align || 'center'"
        >
          <template slot-scope="scope">
            <!-- type为moreProp  多个组合 -->
            <div v-if="item.type === 'moreProp'">
              <slot name="moreProp" :row="scope.row"></slot>
            </div>
            <!-- type为translate  需要转义 -->
            <div v-if="item.type === 'translate'">{{formatWord(scope.row[item.prop])}}</div>
            <!-- type为operate  c操作按钮  编辑，删除 -->
            <div v-if="item.type === 'operate'" class="link-style">
              <slot name="operate" :row="scope.row"></slot>
            </div>
            <!-- type为operate  c操作按钮  编辑，删除 -->
            <div v-if="item.type === 'zdyCont'">
              <slot :name="item.prop" :row="scope.row" :index="scope.$index"></slot>
            </div>
            <!-- 默认 -->
            <div
              v-if="item.type !== 'translate' && 
                                item.type !== 'operate' && 
                                item.type !== 'zdyCont' &&
                                item.type !== 'moreProp'"
              :style="{color: item.color ? item.color : '#484848'}"
            >{{scope.row[item.prop]}}</div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
// import targetCardMixins from "@/mixins/targetCardMIxins.js";
// import InforDetail from "@/views/page/components/InforDetail/index";
// import { transitionEle } from "@/utils/dict";

export default {
  name: "ncap-table",
  // mixins: [targetCardMixins],
  // components: {
  //   InforDetail
  // },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableHeader: {
      type: Array,
      default: () => []
    },
    btnsOperate: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: "100%"
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Object,
      default: () => {}
    },
    fixed: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectListAll: []
    };
  },
  mounted() {
    // console.log('transitionEle',transitionEle('English'))
  },
  methods: {
    selectionCK(row) {
      return row.trainFlag !== "已建模";
    },
    /**
     * 选中数据回调
     * @param {Object} row 选中数据
     */
    selectionChange(row) {
      this.selectListAll = row;
      this.$emit("selection-change", row);
    },
    /**
     * 选中当前行数据回调
     * @param {Object} row 选中数据
     */
    currentChange(row) {
      this.$emit("current-change", row);
    },
    /**
     * 单击事件
     */
    handleRowClick(row) {
      this.$emit("row-click", row);
    },
    /**
     * 布控状态
     */
    handleZdyClick(row, eventName) {
      this.$emit(eventName, row);
    },
    /**
     * 布控状态颜色区分
     */
    formatWord(val) {
      return this.numToBoolean(val);
    },
    numToBoolean(val) {
      return val == 1 ? "是" : "否";
    },
    /**
     * 表格某一行被双击时触发
     * @param {Object} row 行数据
     */
    rowDblclick(row) {
      this.$emit("row-dblclick", row);
    },
    /**
     * 表格某个单元格被点击时触发
     * @param {Object} row 行数据
     * @param {Object} column 列数据
     */
    cellClick(row, column) {
      const col = {
        property: column.property, //列字段名 prop
        value: row[column.property] //该列字段的值
      };
      this.$emit("cell-click", col);
    },
    selectAll(row) {
      this.$emit("select-all", row);
    },
    select(row) {
      this.$emit("select", row);
    }
  }
};
</script>
<style lang="scss" scoped>
.ncap-table {
  height:  calc( 100% - 60px );
  .el-table thead {
    color: #333333;
  }
  .btns {
    display: flex;
    justify-content: center;
    .el-button {
      margin-left: 15px;
    }
  }
  .target-label {
    display: inline-block;
    width: 90px;
    color: #c0c4cc;
  }
}
</style>
<style lang="scss">
.ncap-table {
  .el-table thead {
    color: #333333;
  }
  .btns {
    display: flex;
    justify-content: center;
    .el-button {
      margin-left: 15px;
    }
  }
  .target-label {
    display: inline-block;
    width: 90px;
    color: #c0c4cc;
  }
}
</style>
