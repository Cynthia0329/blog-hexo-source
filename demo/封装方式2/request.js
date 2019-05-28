/**
 * httpGet: 一个参数是请求的url,一个就携带的请求参数，返回promise对象
 */

// get 请求
export function httpGet({
  url,
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * httpPost: 原理和get差不多，需要注意，这里多了个data参数，post请求提交前需要对它进行序列号操作，这里是通过transformRequest做处理；
 * 另外两个参数url,params和get请求的一样；
 */

// post请求
export function httpPost({
  url,
  data = {},
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      // 发送的数据
      data,
      // url参数
      params

    }).then(res => {
      resolve(res.data)
    })
  })
}
