<template>
  <div class="login"></div>
</template>

<script>
import Vconsole from "vconsole";
import { getQueryString } from "@/utils/utils";
import Vue from "vue";
export default {
  name: "Login",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.checkLogin();
  },
  methods: {
    StartConsole(outid) {
      const outidConsole = getQueryString("outidConsole");
      try {
        if (process.env.NODE_ENV === "production" && outidConsole === outid) {
          const vConsole = new Vconsole();
          Vue.use(vConsole);
        }
      } catch (_err) {
        console.log(_err);
      }
    },
    checkLogin() {
      const userInfo = window.sessionStorage.getItem("userInfo");
      if (userInfo) {
        this.StartConsole(JSON.parse(userInfo).userInfo.outid);
        this.$store.commit("user/saveUserInfo", JSON.parse(userInfo));
        this.$router.replace({ path: "/index" });
      } else {
        const code = getQueryString("code");
        if (code) {
          const params = {
            code: code,
            flag: "wzh_test",
          };
          this.$api.login(params).then((res) => {
            if (res) {
              const { data } = res;
              this.StartConsole(data.userInfo.outid);
              this.$store.commit("user/saveUserInfo", data);
              this.$router.replace({ path: "/index" });
            }
          });
        } else {
          this.$toast("缺少code");
        }
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
