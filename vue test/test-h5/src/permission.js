import Vue from 'vue'
import router from './router'
import { Toast } from 'vant'
import store from "./store"
import getPageTitle from '@/utils/get-page-title'
Vue.use(Toast)
    // router.beforeEach(async(to, from, next) => {
    //     if (to.name === "login") {
    //         next()
    //     } else {
    //         if (!store.getters.token) {
    //             next({ path: "login" })
    //         } else {
    //             document.title = getPageTitle(to.meta.title)
    //             next()
    //         }
    //     }
    // })