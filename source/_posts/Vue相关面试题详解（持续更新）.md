---
title: Vue相关面试题详解（持续更新）
author: Cynthia
categories:
  - "\U0001F430未分类\U0001F430"
tags:
  - "\U0001F353无\U0001F353"
date: 2019-05-26 22:44:36
---

🐰
...
<!--more-->

## 原理

### 未

#### computed和methods的区别？

[浅析Vue中computed与method的区别](https://segmentfault.com/a/1190000014478664)

1. computed是**属性调用**，而methods是**函数调用**
2. computed带有**缓存功能**，而methods不是



#### Vue的双向数据绑定原理是什么？

vue.js 是采用数据劫持 结合**发布者-订阅者模式**的方式，通过`Object.defineProperty()`来劫持各个属性的**setter，getter**，在数据变动时发布消息给订阅者，**触发相应的监听回调**。





#### 请详细说下你对vue生命周期的理解？

总共分为8个阶段 **创建前/后，载入前/后，更新前/后，销毁前/后**

1. **创建前/后**： 在`beforeCreated`阶段，vue实例的挂载元素 `$el` 和数据对象`data`都为`undefined`，还未初始化。 在`created`阶段，vue实例的数据对象data有了，`$el`还没有。
2. **载入前/后**： 在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
3. **更新前/后**： 当data变化时，会触发beforeUpdate和updated方法。
4. **销毁前/后**： 在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在









## 实际运用

### `vue-router` 如何做用户登录权限？

实际上就是应用了vue-router提供的router.beforeEach来注册一个全局钩子 [官网导航守卫介绍](https://link.juejin.im/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fadvanced%2Fnavigation-guards.html)

具体查看文章：用Vue写后台：学习和使用笔记







## 路由

### 简单的一句话问题

#### vue-router 有哪几种导航钩子？

三种：

1. 全局钩子（一般定义在 `main.js` 文件中）
2. 某个路由的钩子（一般定义在 `router.js` 文件中）
3. 组件内钩子（一般定义的具体的 `.vue` 组件文件中，和 `data` , `methods` 平级）



