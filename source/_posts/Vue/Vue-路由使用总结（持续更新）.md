---
title: Vue 路由使用总结（持续更新）
author: Cynthia
categories:
  - Vue
date: 2019-04-26 11:32:28
tags:
---

把官方文档通看了一遍，整理下注意点；之后有新的路由相关的也更新在这里

<!--more-->

> 官方教程：<https://router.vuejs.org/zh/>
> API文档：https://router.vuejs.org/zh/api/#router-link



## vue-router 属性

### name

> 我们定义路由时的 name 属性，如下面的例子

```js
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/other',
      component: other
    }
  ]
})
```

---

#### 根据name渲染组件

> 通过name属性，为一个页面中不同的router-view渲染不同的组件
> 如：将上面代码的Hello渲染在 name为Hello的router-view中，将text渲染在name为text的router-view中。
> 不设置name的将为默认的渲染组件。

```html
<template>
  <div id="app">
     <router-view></router-view>
     <router-view  name="Hello"></router-view>  // 将渲染Hello组件
     <router-view  name="text"></router-view>   // 将渲染text组件
  </div>
</template>
```

#### 获取组件的name值

> 使用 `$router.name` 获取组件name值

```html
 <template>
  <div id="app">
    <p>{{ $route.name }}</p> 		// 可以获取到渲染进来的组件的name值
    <router-view></router-view>
  </div>
</template>
```

#### 页面渲染时传递参数

```html
<template>
  <div id="app">
    // 向name为hello的组件传参数id，值为12
    <router-link ：to="{ name:'hello', params:{id: '12'} }">hello</router-link> 
    <router-view></router-view>
  </div>
</template>
```



### redirect 和 alias

[官方文档](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E9%87%8D%E5%AE%9A%E5%90%91)



### meta

[官方文档](https://router.vuejs.org/zh/guide/advanced/meta.html)

#### 用法：登陆验证

- <https://blog.csdn.net/cofecode/article/details/79181894>
- <https://www.jb51.net/article/143056.htm>



#### 用法：面包屑导航

- <https://blog.csdn.net/versionli/article/details/80866572>



#### 用法：根据meta信息展示不同的页面

这个有点儿类似于登录验证的扩展

- <http://www.cnblogs.com/goloving/p/9074410.html>



## 路由的跳转

### 声明式和编程式

当你点击 `<router-link>` 时，这个方法会在路由实例内部调用
所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

#### router-link

- 不带参数

  ```html
  <router-link :to="{name:'home'}">
  <router-link :to="{path:'/home'}">
  ```
  ❗ 注意：
  > name，path都行，建议用name
  > 注意：router-link中链接如果是'/'开始就是从根路由开始，如果开始不带'/'，则从当前路由开始

  

  

- 带参数（params）

  ```html
  <router-link :to="{name:'home', params: {id:1}}">
  ```

- 带参数（query）

  ```html
  <router-link :to="{name:'home', query: {id:1}}"> 
  ```



#### this.$router.push()

- 不带参数

  ```js
  this.$router.push('/home')
  this.$router.push({name:'home'})
  this.$router.push({path:'/home'})
  ```

- query传参

  ```js
  this.$router.push({ name:'home',query: {id:'1'} })
  this.$router.push({ path:'/home',query: {id:'1'} })
  this.$router.push({ path: `/home/${id}` })
  ```

- params传参

  ```js
  this.$router.push({ name:'home',params: {id:'1'} })  // 只能用 name
  ```



#### this.$router.replace()

> 跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录
> 而是跟它的方法名一样 —— 替换掉当前的 history 记录。



#### this.$router.go(n)

> 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

```js
// 向前或者向后跳转n个页面，n可为正整数或负整数
this.$router.go(n)

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```



### 区别

- `this.$router.push`
  跳转到指定url路径，并向history栈中添加一个记录，点击后退会返回到上一个页面
- `this.$router.replace`
  跳转到指定url路径，但是history栈中不会有记录，点击返回会跳转到上上个页面 (就是直接替换了当前页面)
- `this.$router.go(n)`
  向前或者向后跳转n个页面，n可为正整数或负整数

### **vue路由的传参方式**

> - [方式1-通过query字符串](https://raw.githubusercontent.com/chen1440731632/images/master/img/20190111164548.png)
> - [方式2-通过params参数](https://raw.githubusercontent.com/chen1440731632/images/master/img/20190111164941.png)

#### **query和params区别**

- query类似 get, 跳转之后页面 url后面会拼接参数,类似 `?id=1` , 非重要性的可以这样传, 密码之类还是用params刷新页面id还在
- params类似 post, 跳转之后页面 url后面不会拼接参数 , 但是刷新页面id 会消失

#### 取参

- query：
    > html 取参  `$route.query.id`
    > script 取参  `this.$route.query.id`

- params：
    > html 取参  `$route.params.id`
    > script 取参  `this.$route.params.id`



## 易混淆概念

### this.$router 和 this.$route 的区别

- `this.$router` 

  Vue-Router 的实例 (全局路由对象)，用来进行路由操作，包含一系列路由的处理方法

  ```js
  this.$router.push('/')   	  // 跳转到根目录，保留历史记录，可以返回
  this.$router.replace('/')	  // 跳转到根目录，替换掉当前历史记录，无法返回替换前的页面
  this.$router.back()  		  // 返回上一个页面
  this.$router.go(1)		  // 1 为向前跳转，-1 为返回(相当于back)
  ```
  <br>

- `this.$route `

  表示当前正在用于跳转的路由器对象，包含当前路由的 name、path、query、params 等属性

  ![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190426134046.png)

