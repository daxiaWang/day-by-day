<template>
  <div>
    <h2>todo list</h2>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import HeroTable from "components/HeroTable";
export default defineComponent({
  components: { HeroTable },
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
