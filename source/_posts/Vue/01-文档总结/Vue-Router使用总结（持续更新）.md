---
title: Vue-Router使用总结（持续更新）
author: Cynthia
categories:
  - Vue
  - 文档总结
date: 2018-10-10 11:32:28
tags:
---

把官方文档通看了一遍，整理下注意点；之后有新的路由相关的也更新在这里

<!--more-->

> 官方教程：<https://router.vuejs.org/zh/>
> API文档：https://router.vuejs.org/zh/api/#router-link



## <roter-link\>和<roter-view\>

### <roter-link\>

[API文档](https://router.vuejs.org/zh/api/#router-link)



### <router-view\>

[API文档](https://router.vuejs.org/zh/api/#router-view)









## Router 构建选项

[API文档](https://router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9)

### routes

```js
declare type RouteConfig = {
  path: string;	// 路径
  component?: Component; // 导入组件
  name?: string; // 命名路由
  components?: { [name: string]: Component }; // 命名视图组件（区别component）
  redirect?: string | Location | Function;	// 重定向
  props?: boolean | Object | Function;	// ？主要用于命名视图中
  alias?: string | Array<string>; // 路由别名
  children?: Array<RouteConfig>; // 嵌套子路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void;	// 某个路由的生命钩子函数
  meta?: any;	// 路由元信息

  // 2.6.0+
  caseSensitive?: boolean; // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object; // 编译正则的选项
}
```



#### name

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
<br>

- **根据name渲染组件**

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

- **获取组件的name值**

    > 使用 `$router.name` 获取组件name值

    ```html
     <template>
      <div id="app">
        <p>{{ $route.name }}</p> 		// 可以获取到渲染进来的组件的name值
        <router-view></router-view>
      </div>
    </template>
    ```

- **页面渲染时传递参数**

    ```html
    <template>
      <div id="app">
        // 向name为hello的组件传参数id，值为12
        <router-link ：to="{ name:'hello', params:{id: '12'} }">hello</router-link> 
        <router-view></router-view>
      </div>
    </template>
    ```



#### redirect 和 alias

[官方文档](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E9%87%8D%E5%AE%9A%E5%90%91)



#### meta

> [vue-router官方推荐](https://router.vuejs.org/en/advanced/meta.html) 的方法：通过meta标签来标示改页面能访问的权限有哪些。

定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true } // 表示访问该页面需要验证
        }
      ]
    }
  ]
})
```

> 一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。
>
> 因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

下面例子展示在全局导航守卫中检查元字段：

```js
router.beforeEach((to, from, next) => {
  // 通过判断元字段requiresAuth的布尔值, 来判断访问该页面是否需要验证
  if (to.matched.some(record => record.meta.requiresAuth)) { // 该页面需要验证
    if (!auth.loggedIn()) {	// 没有登陆=>跳转到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else { // 登录=>直接进入该页面
      next()
    }
  } else { // 该页面不需要验证，直接进入该页面
    next() 
  }
})
```



- 用法：登陆验证
  - https://blog.csdn.net/cofecode/article/details/79181894>
  - https://www.jb51.net/article/143056.htm>



- 用法：面包屑导航
  - https://blog.csdn.net/versionli/article/details/80866572>



- 用法：根据meta信息展示不同的页面
  - 这个有点儿类似于登录验证的扩展
  - http://www.cnblogs.com/goloving/p/9074410.html>



## Router 实例方法

> 出现形式：
>
> - router.方法名()
> - this.$router.方法名()

### 导航守卫

> 详情：
>
> - 官方文档
> - 本文：[全局路由钩子](#router-hooks)

```js
// 1.全局前置守卫
router.beforeEach((to, from, next) => {
  /* must call `next` */
})

// 2.全局解析守卫
router.beforeResolve((to, from, next) => {
  /* must call `next` */
})

// 3.全局后置钩子
router.afterEach((to, from) => {})
```



### 编程式导航

> 具体：
>
> - [官方文档](https://router.vuejs.org/zh/guide/essentials/navigation.html)
> - [本文：路由的跳转](#router)

```js
// 1.导航到不同的 url，向 history 栈添加一个新的记录
router.push(location, onComplete?, onAbort?)
// 2.导航到不同 url，替换 history 栈中当前记录
router.replace(location, onComplete?, onAbort?)
// 3. 指定前进/回退的步数（通过正负来判断前进）
router.go(n)
// 4.回退一步
router.back()
// 5.前进一步
router.forward()
```



<span id="router"></span>



## route 路由对象

### 概念

[官方文档](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)

> 一个**路由对象 (route object)** 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的**路由记录 (route records)**。
>
> 路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

**路由对象出现在多个地方:**

- 在组件内，即 `this.$route`

  > 当前激活的[路由信息对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它。

- 在 `$route` 观察者回调内

- `router.match(location)` 的返回值

- 导航守卫的参数：

  ```js
  router.beforeEach((to, from, next) => {
    // `to` 和 `from` 都是路由对象
  })
  ```

- `scrollBehavior` 方法的参数:

  ```js
  const router = new VueRouter({
    scrollBehavior (to, from, savedPosition) {
      // `to` 和 `from` 都是路由对象
    }
  })
  ```



### 属性

> 路由对象属性：this.$route.属性名

- **$route.path**

  - 类型: `string`

    字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`。

- **$route.params**

  - 类型: `Object`

    一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。

- **$route.query**

  - 类型: `Object`

    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。

- **$route.hash**

  - 类型: `string`

    当前路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串。

- **$route.fullPath**

  - 类型: `string`

    完成解析后的 URL，包含查询参数和 hash 的完整路径。

- **$route.matched**

  - 类型: `Array<RouteRecord>`

  > 一个数组，包含当前路由的所有嵌套路径片段的**路由记录** 。
  >
  > 路由记录就是 `routes` 配置数组中的对象副本 (还有在 `children` 数组)。

  ```js
  const router = new VueRouter({
    routes: [
      // 下面的对象就是路由记录
      { path: '/foo', component: Foo,
        children: [
          // 这也是个路由记录
          { path: 'bar', component: Bar }
        ]
      }
    ]
  })
  ```

  当 URL 为 `/foo/bar`，`$route.matched` 将会是一个包含从上到下的所有对象 (副本)。

- **$route.name**

  当前路由的名称，如果有的话。(查看[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html))

- **$route.redirectedFrom**

  如果存在重定向，即为重定向来源的路由的名字。(参阅[重定向和别名](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html))



## 路由的生命钩子函数

就是官方文档中的 [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

**在路由跳转的时候**，我们需要一些权限判断或者其他操作。这个时候就需要使用路由的钩子函数。

> 定义：路由钩子主要是给使用者在路由发生变化时进行一些特殊的处理而定义的函数。

⭐总体来讲vue里面提供了**三大类钩子：**

1. 全局钩子（一般定义在 `main.js` 文件中）
2. 某个路由的钩子（一般定义在 `router.js` 文件中）
3. 组件内钩子（一般定义的具体的 `.vue` 组件文件中，和 `data` , `methods` 平级）

<span id="router-hooks"></span>

### 类型1：全局路由钩子

在 `main.js` 入口文件中：

- `router.beforeEach()`
- `router.beforeResolve()`
- `router.afterEach()`

```js
// main.js

// 1.全局前置守卫：当一个导航触发时，全局前置守卫按照创建顺序调用。
// 守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中
router.beforeEach((to, from, next) => {
  /* must call `next` */
})

// 2.全局解析守卫：在导航被确认之前，同时在所有组件内守卫和异步路由组件被 resolve 之后
router.beforeResolve((to, from, next) => {
  /* must call `next` */
})

// 3.全局后置钩子：导航被确认（跳转）之后
router.afterEach((to, from) => {})
```



### 类型2：某个路由的钩子

> 参数和方法同全局钩子一样

```js
// router.js

const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
      beforeResolve: (to, from, next) => {
        // ...
      }
      afterEach: (to, from) => {
        // ...
      }
    }
  ]
})
```





### 类型3：组件内的路由钩子

[详细见：官方文档](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)

```js
// 某个vue组件中

export default {
  data() {},
  methods: {},
  // 1.在渲染该组件的对应路由被 confirm 前调用
  beforeRouteUpdate(to, from, next) {
    next()
  },
  // 2.在当前路由改变，但是该组件被复用时调用
  beforeRouteEnter(to, from, next) {
    next()
  },
  // 3.导航离开该组件的对应路由时调用
  beforeRouteLeave(to, from, next) {
    next()
  }
}
```



### 钩子函数的参数

每个守卫方法接收三个参数：

- **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **next(false)**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **next(error)**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

**确保要调用 next 方法，否则钩子就不会被 resolved。**



### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用**全局**的 `beforeEach` 守卫。
4. 在重用的**组件**里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在**路由配置**里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的**组件**里调用 `beforeRouteEnter`。
8. 调用**全局**的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用**全局**的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用（**组件**） `beforeRouteEnter` 守卫中传给 `next` 的回调函数。





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
// 向前或者向后跳转n个页面，n为正数的时候是前进；负数的时候是后退；0的时候是刷新当前页面
this.$router.go(n)

// 1.在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)

// 2.后退一步记录，等同于 history.back()
this.$router.go(-1)

// 3.刷新当前页面
this.$router.go(0)

// 4.前进 3 步记录
this.$router.go(3)

// 5.如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
```

#### forward和back

```js
// 后退
this.$router.back()

// 前进
this.$router.forward()
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





## 路由懒加载

[官方文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)

示例：

```js
// vue-cli 2.0 的懒加载
const Index = resolve => require(['./views/Index.vue'], resolve)

// vue-cli 3.0 的懒加载
const Index = () => import('./views/Index.vue')

// 在路由中
component: () => import('./views/Index.vue'), // vue路由懒加载  异步加载
```







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







## 待深入

- [路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E4%BC%A0%E5%8F%82)
  - routes中的props属性









<br>

---

> 参考文章：
>
> <https://www.cnblogs.com/WQLong/p/8135553.html>
>
> 