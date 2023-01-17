import Vue from "vue";
import { Toast, NavBar } from "vant";
[Toast, NavBar].forEach((item) => {
  Vue.use(item);
});
