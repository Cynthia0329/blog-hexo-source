---
title: Vue中的DOM操作相关知识点和方法总结（持续更新）
author: Cynthia
categories:
  - 前端
  - Vue
  - 文档总结
tags: []
date: 2018-10-29 09:16:43
---

...

<!--more-->

## 未分类

### dom操作建议

我们现在虽然用 vue 写代码了，核心思想转变为用数据驱动 `view`，不用像`jQuery`时代那样，频繁的操作 DOM 节点。但还是免不了有些场景还是要操作 DOM 的。
我们在组件内选择节点的时候一定要切记避免使用 `document.querySelector()`等一系列的全局选择器。你应该使用`this.$el`或者`this.refs.xxx.$el`的方式来选择 DOM。这样就能将你的操作局限在当前的组件内，能避免很多问题。

### nextTick

[官方API文档](https://cn.vuejs.org/v2/api/#Vue-nextTick)

> 在下次 DOM 更新循环结束之后执行延迟回调。
> 在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

#### 使用示例

组件代码：

```html
<template>
  <div class="app">
    <div ref="msgDiv">{{ msg }}</div>
    <div>Message got outside $nextTick: {{ msg1 }}</div>
    <div>Message got inside $nextTick: {{ msg2 }}</div>
    <div>Message got outside $nextTick: {{ msg3 }}</div>
    <button @click="changeMsg">
      Change the Message
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue.',
      msg1: '点击前',
      msg2: '点击前',
      msg3: '点击前'
    }
  },
  methods: {
    changeMsg() {
      this.msg = 'Hello world.'
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
}
</script>
```

点击前后对比：

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190429092942.png)

明显看出：

- `msg1` 和 `msg3` 显示的值还是 `msg` 的 值变换之前的值：'Hello Vue.'
- `msg` 2显示的内容是 `msg` 变换之后的值：'Hello world.'
- 根本原因是：因为Vue中DOM更新是异步的





#### 应用场景

以下场景需要放在 `Vue.nextTick()` 的回调函数中：

- 在Vue生命周期的 `created()` 钩子函数进行的DOM操作

  > 在`created()`钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进`Vue.nextTick()`的回调函数中。与之对应的就是`mounted()`钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。

- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候

  > 具体原因在Vue的官方文档中详细解释：
  >
  > Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和`MessageChannel`，如果执行环境不支持，会采用 `setTimeout(fn, 0)`代替。
  >
  > 例如，当你设置`vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用`Vue.nextTick(callback)` 。这样回调函数在 DOM 更新完成后就会调用。



#### 源码解析

参考这篇文章：<https://www.jianshu.com/p/a7550c0e164f>







<br>

---



> 参考文章：
>
> <https://www.jianshu.com/p/a7550c0e164f>