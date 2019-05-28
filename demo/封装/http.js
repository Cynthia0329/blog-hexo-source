import axios from 'axios'
import qs from 'qs'

var BaseUrl = ""

// 利用node环境变量来作判断请求地址的前缀
if (process.env.NODE_ENV === 'development') {
  BaseUrl = '/proxyApi'
} else if (process.env.NODE_ENV === 'production') {
  BaseUrl = 'http://prod.xxx.com'
}

//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: BaseUrl,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
Service.interceptors.request.use(config => {
  // 每次发送请求之前判断是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
  token && (config.headers.Authorization = token)
  return config
},
error => {
  return Promise.error(error)
})


// 添加响应拦截器
Service.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response)
    }
  } else {  // 状态码不为200时抛出错误
    return Promise.reject(response)
  }
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})