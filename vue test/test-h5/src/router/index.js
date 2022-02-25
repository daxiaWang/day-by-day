import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

/**
 *
meta: {
  title: '首页',  // 页面名称
  isShow: true, // 是否显示nav
  bgColor: 'transparent', // nav背景颜色
  isThemeColor: true, //  title字体颜色
  hideReture: true   // 是否隐藏返回箭头 默认  false
}
*/

export const constantRoutes = [
  {
    path: '/',
    redirect: 'mainPage'
  },
  //  员工首页   mainPage
  {
    path: '/mainPage',
    name: 'mainPage',
    component: () =>
      import('@/views/mainPage/index.vue'),
    // redirect: 'vehicleDispatch', //子路由默认加载第一个界面
    meta: {
      title: '首页',
      hideReture: true
    }
  },
  {
    path: '/tuisu',
    name: 'tuisu',
    component: () =>
      import('@/views/tuisu/index.vue'),
    meta: {
      title: '退宿申请'
    }
  },
  {
    path: '/jindu',
    name: 'jindu',
    component: () =>
      import('@/views/jindu/index.vue'),
    meta: {
      title: '进度查询'
    }
  },
  {
    path: '/jdDetail',
    name: 'jdDetail',
    component: () =>
      import('@/views/jindu/detail.vue'),
    meta: {
      title: '进度查询'
    }
  },
  {
    path: '/zhangdan',
    name: 'zhangdan',
    component: () =>
      import('@/views/zhangdan/index.vue'),
    meta: {
      title: '账单'
    }
  },
  {
    path: '/zdDetail',
    name: 'zdDetail',
    component: () =>
      import('@/views/zhangdan/detail.vue'),
    meta: {
      title: '账单详情'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/test'),
    meta: {
      title: 'test',
      keepAlive: false
    }
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('@/views/test'),
    meta: {
      title: 'test1',
      keepAlive: false
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list/index'),
    meta: {
      title: 'list',
      keepAlive: false
    }
  },
  {
    path: '/throttle',
    name: 'throttle',
    component: () => import('@/views/form/throttle'),
    meta: {
      title: 'throttle',
      keepAlive: false
    }
  }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
const router = createRouter()

// 全局导航守卫
router.beforeEach((to, from, next) => {
  to.matched.map(item => {
    if (item.meta.keepAlive) {
      store.commit('setKeepAlive/setKeepAlive', item.name)
    }
  })
  // 对组件B进行动态缓存
  next()
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
