import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/Layout'
// import Layout from '@/App'

export const routes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/pages/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/pages/login/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'table' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/demo',
    children: [
      {
        path: 'demo',
        name: 'Demo',
        component: () => import('@/pages/test/index'),
        meta: { title: 'demo', icon: 'test' }
      },
      {
        path: 'demo1',
        name: 'Demo1',
        component: () => import('@/pages/test/demo1'),
        meta: { title: 'demo1', icon: 'test' }
      },
      {
        path: 'demo2',
        name: 'Demo2',
        component: () => import('@/pages/test/demo2'),
        meta: { title: 'demo2', icon: 'test' }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: routes
})

export default router