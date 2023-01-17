import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/utils/vant";
import store from "@/store";
import "@/style/index.css";
import "amfe-flexible/index.js";
import "@/icons";
import api from "@/services/api";

//es6转es5
import "core-js/stable";
import "regenerator-runtime/runtime";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
