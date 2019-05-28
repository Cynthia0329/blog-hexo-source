import { Service } from '@/utils/http.js'
import qs from 'qs'

export default {
  // 1.普通的get
  queryList1() {
    return Service.get('/get/list')
  },

  // 1.带参数的get
  queryList1(params) {
    return Service.get('/get/list', {
      params: params
    })
  },
  
  // 2.默认json传参的post请求
  queryList2(data) {
    return Service.post('/post/list', data)
  },
  
  
  // 3.multipart/form-data传参的post请求（params必须为fd格式）
  queryList3(fd) {
    return Service.post('/post/list', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  
  // 4.application/x-www-form-urlencoded传参的post请求
  queryList3(data) {
    return Service.post('/post/list', qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }
}