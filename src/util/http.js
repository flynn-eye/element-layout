import axios from 'axios';
import { Message } from "element-ui";
import router from '../router/index'
const service = axios.create({
  //baseURL: 'http://172.20.10.8:8083/', // url = base url + request url
 baseURL: 'http://localhost:8081/',
  //baseURL: 'http://192.168.43.190:8088/',
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});
// token设置
const TokenKey = 'LocalToken';
export function getToken() { // 获取TokenKey值
  return localStorage.getItem(TokenKey);
}
export function setToken(tokenData) { // 设置TokenKey值
  return localStorage.setItem(TokenKey, JSON.stringify(tokenData));
}

export function removeToken() { //
  return window.localStorage.removeItem(TokenKey);
}
// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    // 不传递默认开启loading
    config['headers'] = {
      token: localStorage.getItem('token')
    }
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      // config.data = JSON.stringify(config.data)
    }
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  },
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    if (response.headers['token'])
      localStorage.setItem('token', response.headers['token'])
    if (response.status && (response.status <200||response.status>299)) {
      return Promise.reject(res || 'error');
    }
    const res = response.data;
    return Promise.resolve(res);
  },
  (error,res) => {
    let errstr = error.toString()
    let flag = errstr.slice(errstr.length-3,errstr.length)
    if(flag==='403'){
      router.replace('/403')
    }
    if(flag==='401'){
      router.replace('/')
    }
    return Promise.reject(error)
  },
);
// 对token进行处理
export function get(url, params, headers) {
  const options = {};

  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.get(url, options);
}
export function post(url, data, params, headers) {
  const options = {};

  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.post(url, data, options);
}
export function put(url, data, params, headers) {
  const options = {};
  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.put(url, data, options);
}
export function del(url, params, headers) {
  const options = {};
  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.delete(url, options);
}
export default service;