---
title: Vue实际应用技巧（持续更新）
author: Cynthia
categories:
  - Vue
tags: []
date: 2019-05-05 14:43:30
---

🐰
总结实际应用中vue的一些小技巧
<!--more-->



## 未分类

利用路由嵌套来实现【整个布局不改变，只改变主体内容】的效果
[链接](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/layout.html#layout)



**初始化时执行watch中的方法**

[详情](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader11)



**性能优化小技巧**

能用`v-show`的地方就不要用`v-if`，善用`keep-alive`和`v-once`，`Object.freeze()`处理 [vue big data](https://github.com/vuejs/vue/issues/4384) 问题等

