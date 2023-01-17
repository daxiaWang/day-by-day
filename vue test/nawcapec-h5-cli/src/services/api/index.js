import { post } from "../services";
/**
 * @params {url} 接口地址 默认网关地址
 * @params {data} 接口参数 默认{}
 * @params {text} Loading名称 默认`加载中`
 * @params {type} Content-Type 默认 `application/x-www-form-urlencoded`
 */
const api = {
  login: (data) =>
    post({ url: "/h5/login", data, text: "校验中", type: "application/json" }), //登录
  getIsAllowOut: (data) => post({ data }), //示例
};
export default api;
