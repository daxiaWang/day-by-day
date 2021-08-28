import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import store from '../store'
import { Toast } from 'vant'

Vue.use(Toast)

function getBaseUrl() {
  const flag = process.env.NODE_ENV
  if (flag === 'development') {
    return process.env.VUE_APP_BASE_API
  } else {
    return window.snBaseConfig.BASE_API
  }
}

const service = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30 * 1000
})
service.interceptors.request.use(
  config => {
    const { loadingText } = config.headers
    const { noLoading } = config.headers
    if (!noLoading) {
      Toast.loading({
        message: loadingText ? decodeURI(loadingText) : '加载中' + '...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
    }

    if (store.getters.token) {
      config.headers.token = store.getters.token
    }
    if (config.method === 'post') {
      const cType = config.headers['Content-Type']
      config.headers['Content-Type'] = cType || 'application/x-www-form-urlencoded'

      let dataJson = {}
      // let params = {}
      let params = {}
      if (config.url && config.url.indexOf('/h5/login') !== -1) {
        dataJson = config.data
        params = {
          token: store.getters.token
        }
      } else {
        // console.log('config.data', config.data)
        config.data.request_data = {
          ...config.data.request_data,
          username: store.getters.userInfo.outid,
          // username: 'ZX001',
          // username: '000029S1',
          dpcode: store.getters.userInfo.dpcode
        }
        dataJson = {
          data: JSON.stringify(config.data)
        }
        console.log('dataJson', dataJson)
        params = {
          token: store.getters.token,
          service: 'ssglmobile'
        }
      }

      config.data =
                cType === 'application/json'
                  ? Object.assign(dataJson || {}, params)
                  : qs.stringify(Object.assign(dataJson || {}, params))
    }
    config.cancelToken = new axios.CancelToken(function(cancel) {
      store.commit('pushToken', { cancelToken: cancel })
    })
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log('res', res)
    Toast.clear()
    if (res.code !== 0) {
      Toast.fail(res.message)
      if (res.code === 1001) {
        // token过期
        store.commit('user/resetLogin')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      try {
        if (res.data && typeof res.data === 'string') {
          res.data = JSON.parse(res.data)
        }
        if (res.data.body && typeof res.data.body === 'string') {
          res.data.body = JSON.parse(res.data.body)
        }
      } catch (error) {}
      if (response.config.url.indexOf('/h5/login') !== -1) {
        return res
      } else {
        if (res.data.code_ !== 0) {
          Toast.fail(res.data.message_ || '查询失败')
        } else {
          return res.data
        }
      }
    }
  },
  error => {
    if (error.message !== '取消请求') {
      Toast.fail(error)
      return Promise.reject(error)
    }
    console.log(error)
  }
)

export default service
