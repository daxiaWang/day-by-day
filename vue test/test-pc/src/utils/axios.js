'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import qs from 'qs'

const config = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 60 * 1000, // Timeout
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // "Synway-Access-Token": ""
  }
  // withCredentials: true, // 是否允许携带cookie
}
// exportType 标识是否是导出，是导出传入export
let exportType = ''
// 获取后端名称导出文件的文件名称
const exportTypeFileName = ''
const message = (msg, code) => {
  const messageText = code ? `${msg}, 错误码${code}` : `${msg}`
  return Message({
    message: messageText,
    showClose: true,
    type: 'error',
    duration: 5 * 1000
  })
}
const errArr = {
  400: '错误请求',
  401: '没有权限',
  403: '服务器拒绝请求',
  404: '页面不存在',
  500: '服务器错误',
  503: '服务不可用',
  504: '请求超时'
}
const configHeaders = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded'
}

let urlType = 'form'
const _axios = axios.create(config)
// 请求头增加token信息
_axios.interceptors.request.use(
  option => {
    option.headers['Content-Type'] = configHeaders[urlType]
    if (urlType === 'form' && option.method === 'post') {
      option.data = qs.stringify(option.data)
    }

    if (store.getters.token) {
      option.headers[store.getters.tokenName] = store.getters.token
    }
    return option
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求返回拦截信息
_axios.interceptors.response.use(
  function(response) {
    const res = response.data

    if (`${response.status}` === '200') {
      return response.data
    }

    message(res.message)
    // Message({
    //     message: "错了",
    //     showClose: true,
    //     type: "error",
    //     duration: 5 * 1000
    // });
    return Promise.reject(res)
  },
  function(error) {
    const keys = Object.keys(errArr)
    if (keys.indexOf(`${error.response.status}`) > -1) {
      if (`${error.response.status}` == '403') {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      message(errArr[error.response.status])
      // Message({
      //     message: "错了",
      //     showClose: true,
      //     type: "error",
      //     duration: 5 * 1000
      // });
    } else {
      message('服务器出错')
      // Message({
      //     message: "错了",
      //     showClose: true,
      //     type: "error",
      //     duration: 5 * 1000
      // });
    }
    // if ("401" === `${error.response.status}`) {
    //   // window.location.href = http://10.1.8.165:8081/cas/login?service=http%3A%2F%2F10.1.9.166%3A8080%2Fspyware-voice-center%2Fspy%2FlistSpyResult?service=http://192.168.41.78:4201/voiceprint-application/home;
    //   window.location.href = `${
    //     error.response.data.loginCheckUri
    //   }?service=${encodeURIComponent(window.location.href)}`;
    // }
    // const serviceUrl = error.response.data.loginCheckUri;
    // const href = `${serviceUrl}?service=${encodeURIComponent(
    //   window.location.href
    // )}`;
    if (`${error}`.includes('401')) {
      window.location.href = href
    }
    return Promise.reject(error.response.status)
  }
)
const _http = {
  get: '',
  delete: '',
  post: '',
  put: ''
}
/**
 * @param {String} url     请求地址
 * @param {Object} param   请求参数必须为{}，只能有一层
 * @param {String} type    请求头类型json/form
 */
_http.get = (url, param, type) => {
  urlType = type
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  return new Promise((resolve, reject) => {
    _axios({
      url: url,
      method: 'get',
      params: param
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * 用于文件下载
 * @param {String} url     请求地址
 * @param {Object} param   请求参数必须为{}，只能有一层
 * @param {String} type    请求头类型export
 */

/**
 * @param {String} url    请求地址
 * @param {*} param       请求参数json/form表单
 * @param {Sring} type    请求头类型json/form
 */
_http.post = (url, param, type) => {
  urlType = type
  config.headers['Content-Type'] = configHeaders[type]
  // config.headers["Content-Type"] = "application/json; charset=UTF-8";
  config.headers['123'] = 'application/json; charset=UTF-8'

  return new Promise((resolve, reject) => {
    _axios({
      url: url,
      method: 'post',
      data: param
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * @param {String} url     请求地址
 * @param {Object} param   请求参数必须为{}，只能有一层
 * @param {String} type    请求头类型json/form
 */
_http.delete = (url, param, type) => {
  config.headers['Content-Type'] = configHeaders[type]
  exportType = type
  return new Promise((resolve, reject) => {
    _axios({
      url: url,
      method: 'delete',
      params: param
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios
      }
    },
    $http: {
      get() {
        return _http
      }
    }
  })
}

Vue.use(Plugin)

export default {
  $axios: _axios,
  $http: _http
}
