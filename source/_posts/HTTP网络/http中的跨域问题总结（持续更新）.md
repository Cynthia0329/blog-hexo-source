---
title: http中的跨域问题总结（持续更新）
author: Cynthia
categories:
  - HTTP网络
tags: []
date: 2019-04-30 11:02:08
---

🐰
...
<!--more-->

## 待看文章

- [不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029)
- [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)



## 解决方案

### cors

> **cors**全称为 Cross Origin Resource Sharing（跨域资源共享）

这种方法对于前端来说和平时发请求写法上没有任何区别，工作量基本都在**后端**这里

原理：

- 每一次请求浏览器必须先以 OPTIONS 请求方式发送一个预请求=>获知服务器端对跨源请求所支持 HTTP 方法。
- 在确认服务器允许该跨源请求的情况下，以实际的 HTTP 请求方法发送那个真正的请求。





### 前端解决方案

但总有后端觉得cors麻烦不想这么搞。那前端也是有解决方案的

**在 `dev` 开发模式下：**

使用**webpack 的 proxy**

使用也是很方便的看一下文档就会使用了，个人项目可以采用这个方法



**在生产环境下：**

使用Nginx反向代理





### 总结

| 开发环境 | 生成环境 |
| :------- | :------- |
| cors     | cors     |
| proxy    | nginx    |































<br>

---

> 参考文章：
>
> <https://segmentfault.com/a/1190000010043013#articleHeader9>

