---
title: Vue-Cli3.x相关笔记（持续更新）
author: Cynthia
categories:
  - Vue
date: 2019-04-25 13:15:36
tags:
---

🐰

<!--more-->

<blockquote class="blockquote-center">
官方文档：https://cli.vuejs.org/zh/guide/
</blockquote>

## vue.config.js

> 配置文档：<https://cli.vuejs.org/zh/config/>

### 一个常用的配置

```js
// vue.config.js
module.exports = {
  baseUrl: '/',
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
}
```



