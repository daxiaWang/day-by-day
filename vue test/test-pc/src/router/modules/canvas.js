/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const canvasRouter = {
  path: '/canvas',
  component: Layout,
  redirect: '/canvas/demo1',
  name: 'canvas',
  meta: {
    title: 'Canvas',
    icon: 'el-icon-picture'
  },
  children: [
    {
      path: 'canvas-demo1',
      component: () => import('@/views/canvas/demo1.vue'),
      name: 'canvasDemo1',
      meta: { title: 'canvas-demo1' }
    },
    {
      path: 'canvas-demo2',
      component: () => import('@/views/canvas/demo2.vue'),
      name: 'canvasDemo2',
      meta: { title: 'canvas-demo2' }
    },
    {
      path: 'canvas-fengmap',
      component: () => import('@/views/canvas/fengmap.vue'),
      name: 'canvasFengmap',
      meta: { title: 'canvas-fengmap' }
    }
  ]
}
export default canvasRouter
