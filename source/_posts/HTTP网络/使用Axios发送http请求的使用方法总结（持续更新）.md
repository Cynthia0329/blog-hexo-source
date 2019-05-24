---
title: 使用Axios发送http请求的使用方法总结（持续更新）
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

> 这应该是最常见的 POST 提交数据的方式了。**浏览器的原生 form 表单**，如果不设置 enctype 属性，那么最终就会以 `application/x-www-form-urlencoded` 方式提交数据

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







### application/json

> 这又是一个常见的 POST 数据提交的方式。我们**使用表单上传文件时**，必须让 form 的 enctyped 等于这个值。

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



### 总结

form的enctype属性为编码方式，常用有两种：

- application/x-www-form-urlencoded
- multipart/form-data
- 默认为application/x-www-form-urlencoded









## 封装实例





