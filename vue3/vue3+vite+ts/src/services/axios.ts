import Axios from 'axios'
import { ElMessage } from 'element-plus'

const env = import.meta.env
// console.log("env", env)
// console.log("process.env", import.meta.env.VITE_APP_API_BASE_URL)
const baseURL = 'https://easy-mock.bookset.io/mock/609cd2083d39703cea415345/example'
const axios = Axios.create({
  baseURL: baseURL,
  timeout: 20000 // 请求超时 20s
})
// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use((response) => {
  /** * 根据你的项目实际情况来对 config 做处理 * 这里对 config 不做任何处理，直接返回 */
  return response
},
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use((response) => {
  /** * 根据你的项目实际情况来对 response 和 error 做处理 * 这里对 response 和 error 不做任何处理，直接返回 */
  return response
},
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${ code }, Message: ${ msg }`)
      console.error(error.response)
    } else {
      ElMessage.error(`${ error }`)
    } return Promise.reject(error)
  })

export default axios
