import request from "./request";
const APIURL = "/gateway/campus/cam_iface/invokFrontMethodForSys.action";
export function get({ url = APIURL, params = {}, headers = {} }) {
  return request({
    url: url,
    method: "get",
    params: params,
    headers: headers,
  });
}
export function post({
  url = APIURL,
  data = {},
  text = "加载中",
  type = "application/x-www-form-urlencoded",
}) {
  let isNoloading = false;
  return request({
    url: url,
    method: "post",
    data: data,
    headers: {
      "Content-Type": type,
      loadingText: encodeURI(text),
      noLoading: isNoloading,
    },
  });
}
