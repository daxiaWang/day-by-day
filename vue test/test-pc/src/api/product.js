import http from '@/utils/axios'
import BaseUrl from '@/utils/baseUrl'

/* 保存  数据*/

/* 查询  数据*/
export function getData(type, params) {
  // console.log("type getData", type, params)
  return http.$http.get(BaseUrl[type], {}, 'form')
}

/* 删除  数据*/
// export function deleteForm(type, params) {
//   // console.log("type deleteForm", type, params)
//   return http.$http.get(BaseUrl[type], params, 'form')
// }
