---
title: 用Vue写后台：学习和使用笔记
author: Cynthia
categories:
  - null
tags: []
date: 2019-04-29 09:43:12
---
...

<!--more-->

> 在正式上手 `vue-element-admin` 后台框架前，原作者的教程学习：
>
> <https://segmentfault.com/a/1190000009275424>

## 书签

### 进度

- [学习进度](https://segmentfault.com/a/1190000009506097#articleHeader3)：这节看完了了，但是从这里开始还没整理知识点
- 看到这里：<https://segmentfault.com/a/1190000009762198#articleHeader8>

### 登录权限篇

- 异步组件和路由懒加载
  - [vue异步组件(高级异步组件)使用场景及实践](https://segmentfault.com/a/1190000012138052)
- [两步验证](https://segmentfault.com/a/1190000009506097#articleHeader13)
  - 等待先看其他的知识点









## 登录权限篇

### 登录

[详细代码](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/login/index.vue)

#### **进入页面时**

先从 `cookie` 中查看是否存有 `token `

- 没有：进入登录页面
- 存在：将 `token` 返给后端获取用户信息 `user_info`

#### **点击登录的操作**

> 如果登录成功：
>
> - 服务端会返回一个 **token**（该token的是一个能唯一标示用户身份的一个key）
> - 然后**将token存储在本地cookie之中**（这样下次打开页面或者刷新页面的时候能记住用户的登录状态，不用再去登录页面重新登录了）

```js
// click事件触发登录操作:
this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
  this.$router.push({ path: '/' }); // 登录成功之后重定向到首页
}).catch(err => {
  this.$message.error(err); // 登录失败提示错误
});

// action:
LoginByUsername({ commit }, userInfo) {
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    loginByUsername(username, userInfo.password).then(response => {
      const data = response.data
      Cookies.set('Token', response.data.token) // 登录成功后将token存储在cookie之中
      commit('SET_TOKEN', data.token) // 登录成功后更新vuex中token字段的值
      resolve()
    }).catch(error => {
      reject(error)
    });
  });
}
```

#### 获取用户信息

> 在全局钩子 `router.beforeEach` 中拦截路由，**判断是否已获得token**
> 如果存在token=>**获取用户的基本信息**了
> 否则重新跳转到登录页面，重复上述操作

```js
//router.beforeEach
if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
  store.dispatch('GetInfo').then(res => { // 拉取user_info
    const roles = res.data.role;
    next();//resolve 钩子
  })
```

