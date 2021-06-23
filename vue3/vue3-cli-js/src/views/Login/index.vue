<template>
  <div>
    <el-form ref="ruleForm" :model="form">
      <el-form-item
        prop="email"
        :rules="{ required: true, message: '请输入账号', trigger: 'change' }"
      >
        <el-input placeholder="请输入账号" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="pass"
        :rules="{ required: true, message: '请输入密码', trigger: 'change' }"
      >
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.pass"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="width100" type="primary" @click="onSubmit"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";

// interface UserForm {
//  email: string;
//  pass: string | number;
// }

export default defineComponent({
  setup() {
    const router = useRouter();

    const obj = reactive({
      form: {
        email: "admin",
        pass: "admin123",
      },
      ruleForm: ref(null),
    });
    const onSubmit = () => {
      obj.ruleForm.validate().then((valid) => {
        if (valid) {
          if (obj.form.email === "admin") {
            router.push({ path: "/" });
          }
        }
      });
    };
    return {
      ...toRefs(obj),
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>