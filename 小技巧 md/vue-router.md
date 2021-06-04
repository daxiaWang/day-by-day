vue嵌套路由，取决于component，如果没有，怎相对于app.vue的router-view，如果在一级页面中嵌套路由，在在一级路由下添加children，子路由

```javascript
{
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index'), //路由懒加载
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/index/user',
        name: 'User',
        meta: {
          title: '个人中心',
          keepAlive: false
        },
        component: () => import('@/views/User')
      }
    ]
  }
```