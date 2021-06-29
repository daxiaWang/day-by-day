import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页', icon: 'index' },
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home.vue'),
        meta: { title: '我的', icon: 'home' },
      },
      {
        path: '/vuex',
        name: 'Vuex',
        component: () => import('@/views/vuex.vue'),
        meta: { title: 'Vuex', icon: 'home' },
      },
      {
        path: '/axios',
        name: 'Axios',
        component: () => import('@/views/axios.vue'), // 懒加载组件
        meta: { title: 'Axios', icon: 'home' },
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test.vue'), // 懒加载组件
        meta: { title: 'Test', icon: 'home' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
