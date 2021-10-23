/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: '/form/form-demo',
  name: 'Form',
  meta: {
    title: 'Form',
    icon: 'form'
  },
  children: [
    {
      path: 'form-demo',
      component: () => import('@/views/form/demo.vue'),
      name: 'FormDemo',
      meta: { title: 'form-demo' }
    },
    {
      path: 'form-demo1',
      component: () => import('@/views/form/demo1.vue'),
      name: 'FormDemo',
      meta: { title: 'form-demo1' }
    }
  ]
}
export default formRouter
