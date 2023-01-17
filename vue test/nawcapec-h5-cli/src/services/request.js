import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";
import store from "@/store";
import qs from "qs";

Vue.use(Toast);
const baseDevUrl = "https://lapp.wanmeiqiye.com";
const baseProdUrl = "";

const service = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? baseDevUrl : baseProdUrl,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

let reqNum = 0;
service.interceptors.request.use(
  (config) => {
    const { loadingText } = config.headers;
    const { noLoading } = config.headers;
    if (!noLoading) {
      Toast.loading({
        message: loadingText ? decodeURI(loadingText) : "加载中" + "...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      reqNum++;
    }
    if (store.getters.token) {
      config.headers.token = store.getters.token;
    }
    if (config.url.indexOf("/h5/") === -1 && config.method === "post") {
      const params = {
        token: store.getters.token,
      };
      const formType = config.headers["Content-Type"];
      if (formType === "application/json") {
        config.data = Object.assign(config.data || {}, params);
      } else {
        config.data = qs.stringify(Object.assign(config.data || {}, params));
      }
    }
    config.cancelToken = new axios.CancelToken(function(cancel) {
      store.commit("pushToken", { cancelToken: cancel });
    });
    return config;
  },
  (error) => {
    console.log(error);
    if (!error.config.headers.noLoading) {
      reqNum--;
    }
    if (reqNum <= 0) {
      Toast.clear();
    }
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    console.log(response);
    const res = response.data;
    if (!response.config.headers.noLoading) {
      reqNum--;
    }
    if (reqNum <= 0) {
      Toast.clear();
    }
    if (res.code !== 0) {
      Toast.fail(res.message);
      if (res.code === 1001) {
        //token过期
        window.sessionStorage.clear();
        store.commit("user/removeUserInfo");
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      try {
        if (res.data && typeof res.data === "string") {
          res.data = JSON.parse(res.data);
          if (res.data.result == false) {
            throw res.data.message;
          }
          if (res.data.result_ == false) {
            throw res.data.message_;
          }
          if (res.data._message) {
            //兼容前置到后台不通的时候报错
            throw res.data._message;
          }
        }
        if (res.data.body && typeof res.data.body === "string") {
          res.data.body = JSON.parse(res.data.body);
          if (res.data.body.result == false) {
            throw res.data.body.message;
          }
          if (res.data.body.result_ == false) {
            throw res.data.body.message_;
          }
          if (res.data.body._message) {
            //兼容前置到后台不通的时候报错
            throw res.data.body._message;
          }
        }
        if (response.config.url.indexOf("/h5/login") !== -1) {
          return res;
        } else {
          if (res.data.body) return res.data.body;
          return res.data;
        }
      } catch (error) {
        console.log(error);
        Toast.fail(error);
      }
    }
  },
  (error) => {
    try {
      if (!error.config.headers.noLoading) {
        reqNum--;
      }
    } catch (error) {
      reqNum--;
    }
    if (reqNum <= 0) {
      Toast.clear();
    }
    if (error.message.indexOf("timeout") !== -1) {
      Toast.fail("接口超时");
      return Promise.reject(error);
    }
    console.log(error);
    Toast.fail("网络异常");
  }
);

export default service;
