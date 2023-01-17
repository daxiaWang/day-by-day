import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const containRouter = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/login"),
    meta: {
      title: "验证",
      keepAlive: false,
    },
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/index"),
    meta: {
      title: "首页",
      keepAlive: false,
    },
  },
];

const router = new Router({
  routes: containRouter,
});

export default router;
