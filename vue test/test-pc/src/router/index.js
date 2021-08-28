import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
import formRouter from './modules/form'
import canvasRouter from './modules/canvas'
import asyncLoginRouter from './modules/async'
// canvasRouter

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/board',
    name: 'board',
    meta: {
      title: 'board',
      icon: 'board'
    },
    children: [
      {
        path: '/board',
        component: () =>
          import('@/views/board/index'),
        name: 'board',
        meta: { title: '导航页', icon: 'dashboard' }
      }]
  },
  {
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/vueuse',
    component: Layout,
    redirect: '/vueuse/vueuse-index',
    name: 'vueuse-index',
    meta: {
      title: 'vueuse',
      icon: 'el-icon-c-scale-to-original'
    },
    children: [
      {
        path: 'vueuse-index',
        component: () => import('@/views/vueuse/index.vue'),
        name: 'vueuse-index',
        meta: { title: 'vueuse-index' }
      },
      {
        path: 'vueuse-demo',
        component: () => import('@/views/vueuse/demo.vue'),
        name: 'vueuse-demo',
        meta: { title: 'vueuse-demo' }
      }
    ]
  },
  formRouter,
  canvasRouter,
  asyncLoginRouter

]
// console.log('constantRoutes', constantRoutes)
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
