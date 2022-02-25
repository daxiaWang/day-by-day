/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const otherRouter = {
  path: '/other',
  component: Layout,
  redirect: '/other/index',
  name: 'Other',
  meta: {
    title: 'Other',
    icon: 'el-icon-goods'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/other/index'),
      name: 'OtherIndex',
      meta: { title: 'OtherIndex' }
    },
    {
      path: 'directives',
      component: () => import('@/views/other/directives/index'),
      name: 'Directives',
      meta: { title: 'Directives' }
    }
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inline-edit-table'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'Inline Edit' }
    // },
    // {
    //   path: 'complex-table',
    //   component: () => import('@/views/table/complex-table'),
    //   name: 'ComplexTable',
    //   meta: { title: 'Complex Table' }
    // }
  ]
}
export default otherRouter
