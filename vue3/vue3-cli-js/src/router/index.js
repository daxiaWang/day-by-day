import { createRouter, createWebHashHistory } from "vue-router";
import Layout from '@/Layout/index.vue'

const routes = [
  {
    path: '/404',
    component: () =>
      import('@/views/404'),
    hidden: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', icon: 'index' },
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: { title: '基本配置', icon: 'el-icon-menu' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', icon: 'index' },
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import("@/views/About.vue"),
        meta: { title: 'About', icon: 'index' },
      },
      {
        path: "/test",
        name: "Test",
        component: () =>
          import("@/views/Test/index.vue"),
        meta: { title: 'Test', icon: 'index' },
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table',
    meta: {title: '组件库', icon: 'el-icon-setting'},
    children: [
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/Table/index.vue'),
        meta: { title: 'Table', icon: 'index' },
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/Form/index.vue'),
        meta: { title: 'Form', icon: 'index' },
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
