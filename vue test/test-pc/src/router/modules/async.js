/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const asyncLoginRouter = {
  path: '/asyncLogin',
  component: Layout,
  redirect: '/asyncLogin/index',
  name: 'asyncLogin',
  meta: {
    title: 'asyncLogin',
    icon: 'el-icon-c-scale-to-original'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/asyncLogin/index.vue'),
      name: 'asyncLogin',
      meta: { title: 'asyncLogin' }
    }
  ]
}
export default asyncLoginRouter
