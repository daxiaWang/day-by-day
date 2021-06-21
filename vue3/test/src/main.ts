import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'

import store from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import axios from './services/axios'

const app = createApp(App)
// createApp(App).use(ElementPlus,  { size: 'small', zIndex: 3000 }).use(store).use(router).mount('#app')
app.config.globalProperties.$axios = axios
app.config.globalProperties.$vueName = 'Vue3全局挂载名称'

app
  .use(ElementPlus, { size: 'small', zIndex: 3000 })
  .use(store)
  .use(router)
  .mount('#app')
