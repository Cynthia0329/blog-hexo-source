---
title: Axios使用技巧总结（持续更新）
author: Cynthia
categories:
  - HTTP网络
tags:
  - "\U0001F353无\U0001F353"
date: 2019-05-24 17:44:07
---

🐰
...
<!--more-->

## GET 请求

## POST 请求

### 默认

> 官方的一个最简单的post请求的示例
>
> 默认的post请求的格式是 `application/json`

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```



### application/x-www-form-urlencoded

> 这应该是最常见的 POST 提交数据的方式了，**浏览器的原生 form 表单**
>
> 如果不设置 enctype 属性，那么最终就会以 `application/x-www-form-urlencoded` 方式提交数据

在aixos设置这种格式时，必须设置请求头，并引入qs转换格式

```js
import axios from 'axios'
import qs from 'qs'

axios.post('/url', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
  .then(res => {
    _this.msg = res.data
  }, err => {
    console.log(err)
  })
  .catch(function (error) {
    console.log(error);
  })
```



**在浏览器中的格式：**

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190524182215.png)

```http
POST http://www.example.com HTTP/1.1 

Content-Type: application/x-www-form-urlencoded;charset=utf-8 

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3 
```

首先，Content-Type 被指定为 `application/x-www-form-urlencoded；`

其次，提交的数据按照 `key1=val1&key2=val2` 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。



### multipart/form-data

> 这又是一个常见的 POST 数据提交的方式。
>
> 我们使用表单上传文件时，必须让 form 的 enctyped 等于这个值 （当然也可以直接传递参数）

```js
var fd = new formData()	// 创建form对象
fd.append('file',file)	// 通过append向form对象添加数据

axios.post('/user', fd, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})
  .then(res => {
    _this.msg = res.data
  }, err => {
    console.log(err)
  })
  .catch(function (error) {
    console.log(error);
  })
```









### application/json（默认）

> 这又是一个常见的 POST 数据提交的方式。
>
> 我们**使用表单上传文件时**，必须让 form 的 enctyped 等于这个值。

json

```js
import axios from 'axios'

axios.post('/url', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => {
    _this.msg = res.data
  }, err => {
    console.log(err)
  })
  .catch(function (error) {
    console.log(error);
  })
```



**在浏览器中格式：**

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190524182425.png)







## 实用demo

### 下载文件

```js
// 电子书下载调用的api
export function download(book, onSucess, onError, onProgress) {
  // 如果只传入三个参数
  if (onProgress == null) {
    onProgress = onError
    onError = null
  }
  // 可以使用自定义配置新建一个 axios 实例
  // axios.create([config])
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob', // 下载电子书是一个blob对象，这里定义了可以省去我们自己转换blob对象
    timeout: 180 * 1000, // 超时时间
    onDownloadProgress: progressEvent => { // 如果第4个参数onProgress存在，则返回progressEvent
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      // 将获取到的图书blob格式的文件保存到 indexDB 中（key值为书名）
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob,
        () => onSucess(book), // 保存成功，则将图书
        err => onError(err)) // 保存失败，则将错误信息传递给第三个参数onError
    }).catch(err => { // 出现异常，则将错误信息传递给第三个参数onError
      if (onError) onError(err)
    })
}
```

