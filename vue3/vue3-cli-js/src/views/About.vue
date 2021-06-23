<template>
  <WTable
    :allowSelect="true"
    :data="tableData"
    :columns="columns"
    @select="handleSelect"
    @pagingChange="handlePagingChange"
  >
    <template v-slot:dateHeader>
      <el-tag type="success">日期</el-tag>
    </template>
    <template v-slot:date="scope"> {{ scope.data.date }}自定义slot </template>
    <template v-slot:action="scope">
      <span class="btn" @click="handleCLick('edit', scope.data)">编辑</span>
      <el-divider direction="vertical"></el-divider>
      <span class="btn red" @click="handleCLick('del', scope.data)">删除</span>
    </template>
  </WTable>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import WTable from "components/WTable";
export default defineComponent({
  components: { WTable },
  data() {
    const item = {
      date: "2021-02-01",
      name: "wanger",
      address: "高新区长椿路",
      class: "5",
      school: "郑州大学",
    };
    return {
      tableData: Array.from({ length: 10 }, () => item),
    };
  },
  setup() {
    const obj = reactive({
      columns: [
        {
          prop: "date",
          label: "日期",
          fixed: true,
          width: 200,
          slot: { body: "date", header: "dateHeader" },
        },
        { prop: "name", label: "姓名", width: 100 },
        { prop: "address", label: "地址" },
        { prop: "class", label: "班级"},
        { prop: "school", label: "学校"},
        {
          prop: "",
          label: "操作",
          width: 110,
          slot: { body: "action" },
          fixed: "right",
        },
      ],
    });

    const handleCLick = (type, data) => {
      console.log("type, data", type, data)
    }

    return {
      ...toRefs(obj),
      handleCLick
    };
  },
});
</script>
