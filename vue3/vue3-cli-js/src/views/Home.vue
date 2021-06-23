<template>
  <div class="home">
    <WForm ref="formRef" :formJson="formJson" v-model="form" />
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent, reactive, toRefs } from "vue";
import WForm from "@/components/WForm";

export default defineComponent({
  name: "Home",
  components: {
    WForm,
  },
  setup() {
    const obj = reactive({
      form: {},
      formJson: [
        {
          require: true,
          type: "input",
          label: "姓名",
          placeholder: "请输入姓名",
          val: "name",
          other: { style: "width:220px" },
        },
        {
          require: true,
          type: "select",
          label: "年级",
          placeholder: "请选择年级",
          val: "grade",
          selectLabel: "label",
          selectVal: "val",
          options: [
            { val: 1, label: "一年级" },
            { val: 2, label: "二年级" },
          ],
        },
        {
          type: "date",
          label: "日期",
          val: "startData",
        },
      ],
    });
    const onSubmit = () => {
      console.log("obj.form", obj.form);
    };
    return {
      ...toRefs(obj),
      onSubmit,
    };
  },
});
</script>
