---
title: eslint使用技巧总结（持续更新）
author: Cynthia
categories:
  - 工具
  - 前端工具
tags: []
date: 2019-04-30 10:44:35
---

🐰
...
<!--more-->

<blockquote class="blockquote-center">
    官方地址：https://cn.eslint.org/
</blockquote>

## 在vue中使用eslint

`vue cli` 默认提供了`standard`和`airbnb` 两种 lint 规范，但是一个j检查校验的太松一个又太紧，而且每个团队的 lint 规范又是不同的

安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件,添加如下配置

```json
    "files.autoSave":"off",
    "eslint.validate": [
       "javascript",
       "javascriptreact",
       "html",
       { "language": "vue", "autoFix": true }
     ],
     "eslint.options": {
        "plugins": ["html"]
     }
```

这样每次保存的时候就可以根据根目录下.eslintrc.js你配置的eslint规则来检查和做一些简单的fix。

这里提供了一份我平时的eslint规则[地址](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js)，都简单写上了注释。每个人和团队都有自己的代码规范，统一就好了，去打造一份属于自己的eslint 规则上传到npm吧，如饿了么团队的 [config](https://www.npmjs.com/package/eslint-config-elemefe)，vue的 [config](https://github.com/vuejs/eslint-config-vue)。