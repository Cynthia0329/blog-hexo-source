---
title: 用Vue写后台：学习和使用笔记
author: Cynthia
categories:
  - Vue
  - 进阶
tags: [待整理,待复习]
date: 2019-04-29 09:43:12
---
...

<!--more-->

> 在正式上手 `vue-element-admin` 后台框架前，原作者的教程学习：
>
> <https://segmentfault.com/a/1190000009275424>

## 看我😄

> 此文档总结了很多教程学习过程中：不熟甚至是还未看的知识点，所以请多次查阅，查漏补缺和整理

### 进度

- [学习进度](https://segmentfault.com/a/1190000009506097#articleHeader3)：这节看完了了，但是从这里开始还没整理知识点
- 看到这里：<https://segmentfault.com/a/1190000009762198#articleHeader8>

### 待深究

- 异步组件和路由懒加载
  - [vue异步组件(高级异步组件)使用场景及实践](https://segmentfault.com/a/1190000012138052)
- [两步验证](https://segmentfault.com/a/1190000009506097#articleHeader13)
  - 等待先看其他的知识点
- [导航-问题探究](#question4.2)
- 









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



### 权限

> [本篇教程地址](https://segmentfault.com/a/1190000009506097#articleHeader3)

**该教程中权限的实现方式：**

- 创建vue实例的时候将 `vue-router` 挂载，但这个时候 `vue-router` 挂载一些登录或者不用权限的公用的页面
- 当用户登录后，获取用户 `role`，将 `role` 和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表
- 调用 `router.addRoutes` ( `store.getters.addRouters` )添加用户可访问的路由（动态挂载路由）
- 使用 `vuex` 管理路由表，根据 `vuex` 中可访问的路由渲染侧边栏组件



> 但其实很多公司的业务逻辑可能不是这样的，举一个例子来说，很多公司的需求是每个页面的权限是动态配置的，不像本项目中是写死预设的。但其实原理是相同的

比如，你可以这样实现：

- 在后台通过一个tree控件或者其它展示形式给每一个页面动态配置权限
- 然后将这份路由表存储到后端
- 当用户登录后根据role
  - 后端返回一个相应的路由表
  - 或者前端去请求之前存储的路由表
- =>动态生成可访问的路由表
- 最后通过 `router.addRoutes` 动态挂在到router上







## 实战篇

> [教程地址](https://segmentfault.com/a/1190000009762198)

### 富文本

<https://segmentfault.com/a/1190000009762198#articleHeader13>





### markdown

<https://segmentfault.com/a/1190000009762198>





### 导出Excel

<https://segmentfault.com/a/1190000009762198#articleHeader16>





### ECharts

<https://segmentfault.com/a/1190000009762198#articleHeader17>

注意点：（待整理，暂时具体看链接教程）

- 按需引入
- 远程获取data，动态改变ECharts的配置
  - 通过watch来触发setOptions方法



### 相同component 不同参数

<https://segmentfault.com/a/1190000009762198#articleHeader18>

两个组件或页面一样，但最后调用不同的接口实现不同的方法时的实现方式

如：区分新建和编辑页面





## vueAdmin

> 一个极简的后台模板基础
>
> 本篇教程地址：<https://segmentfault.com/a/1190000010043013>



### 控制路由懒加载

<https://segmentfault.com/a/1190000010043013#articleHeader1>

**原因：**

在页面较多的时候，使用路由懒加载在开发模式下热更新速度很慢

**解决办法：**

封装了一个`_import()`的方法，只有在正式环境下才使用懒加载

（具体看教程）



<span id="question4.2"></span>

### 导航

[本篇教程地址](https://segmentfault.com/a/1190000010043013#articleHeader3)

**侧边栏**

侧边栏是根据 router.js 配置的路由并且根据权限动态生成的

（可以之后深究下原理）

**面包屑**

本项目中也封装了一个面包屑导航，它也是通过`watch $route`动态生成的。[代码](https://github.com/PanJiaChen/vue-admin-template/blob/master/src/components/Breadcrumb/index.vue)

**vue-router路由信息对象拓展**

[自定义了一些属性](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)

（也可以深究下原理）



### 图标

[本篇教程原地址](https://segmentfault.com/a/1190000010043013#articleHeader4)

该项目中使用的是 [iconfont](https://www.iconfont.cn/) 中的Symbol方式引入

本项目中已经封装好了一个[svg component](https://github.com/PanJiaChen/vue-admin-template/blob/master/src/components/SvgIcon/index.vue) 方便大家直接使用

```html
<icon-svg icon-class="填入你需要的iconfont名字就能使用了"></icon-svg>
```





### favicon

<https://segmentfault.com/a/1190000010043013#articleHeader5>



### postcss

<https://segmentfault.com/a/1190000010043013#articleHeader6>



### babel-polyfill

[为什么要使用babel-polyfill？](https://www.jianshu.com/p/4822852792d1)

[本项目相关使用教程](https://segmentfault.com/a/1190000010043013#articleHeader8)







## v4.0新版本

> [手摸手，带你用vue撸后台 系列五(v4.0新版本)](https://segmentfault.com/a/1190000019122005?_ea=10839074)



### redirect 刷新页面

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader3)

在不刷新页面的情况下，更新页面。



### 删除动态添加的路由

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader4)





### mock方法优化

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader5)



### Attrs 和 Listeners

>  写二次封装组件或高阶组件的神器

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader12)



### Computed 的 get 和 set

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader14)



### Object.freeze

> 优化当数据量特别大的时候的卡顿现象

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader15)



### Sass 和 Js 之间变量共享

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader18)

**JS将变量传给sass：**

使用内联样式（此处只列出了最优方法，其余方法原教程）

```html
<div :style="{'background-color':color}" ></div>
```

**sass将变量传给JS**

利用`:export` 实现

```scss
// var.scss
$theme: blue;

:export {
  theme: $theme;
}
```

```js
// test.js
import variables from '@/styles/var.scss'
console.log(variables.theme) // blue
```



### 自动注册全局组件

> 适用场景：当自己封装了很多组件的时候（并且 在很多页面组件中都需要用到），每次使用都需要导入，太麻烦

[本教程原地址](https://segmentfault.com/a/1190000019122005?_ea=10839074#articleHeader19)





本教程原地址

本教程原地址























