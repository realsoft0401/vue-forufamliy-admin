import axios from 'axios'
import { getToken } from '~/utils/cookies'
import { notification } from '~/utils/notification'
// import qs from "qs"
const service = axios.create({
    baseURL: "/api",
    timeout: 5000

})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 往head头自动添加token
  const token = getToken('sys-token')
  if(token){
    config.headers['token'] = token
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data.data;
}, function (error) {
  notification('错误提示',error.response.data.msg || "服务器请求失败",'error')
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service