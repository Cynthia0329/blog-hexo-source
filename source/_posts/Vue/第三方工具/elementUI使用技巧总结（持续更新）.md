---
title: elementUI使用技巧总结（持续更新）
author: Cynthia
categories:
  - Vue
  - 第三方工具
tags: []
date: 2019-04-30 09:27:05
---

🐰
整理...
<!--more-->

> 官方文档：<https://element.eleme.cn/#/zh-CN/component/installation>
>
> GitHub源码：<https://github.com/ElemeFE/element>



## 起步

**安装**

```shell
$ npm i element-ui -S
```



**在项目中引用**

```js
import Vue from 'vue'
import ElementUI from 'element-ui'	// 引入组件库
import 'element-ui/lib/theme-chalk/index.css'	// 引入样式

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```



## 问题解决

element相关的问题解决方式：

- 去看文档再去issue里找找，再去看看源码，大部分问题都能解决了
- 一个诀窍其实大部分诡异的问题都可以通过加一个 `key` 或者 `Vue.nextTick`来解决



## Form 表单

> 官方教程：<https://element.eleme.cn/#/zh-CN/component/installation>

### 表单验证





















<br>

---

> 参考：
>
> <https://segmentfault.com/a/1190000015068613>
>
> <https://www.jianshu.com/p/b371db8fe66a>
>
> <https://www.jianshu.com/p/1743865309f2>