/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const listDemoRouter = {
  path: '/list',
  component: Layout,
  redirect: '/list/demo',
  name: 'listDemo',
  meta: {
    title: 'listDemo',
    icon: 'el-icon-c-scale-to-original'
  },
  children: [
    {
      path: 'demo',
      component: () => import('@/views/list/demo.vue'),
      name: 'listDemo',
      meta: { title: 'listDemo' }
    },
    {
      path: 'demo1',
      component: () => import('@/views/list/demo1.vue'),
      name: 'listDemo1',
      meta: { title: 'listDemo1' }
    },
    {
      path: 'list',
      component: () => import('@/views/list/list.vue'),
      name: 'listList',
      meta: { title: 'listList' }
    }
  ]
}
export default listDemoRouter
