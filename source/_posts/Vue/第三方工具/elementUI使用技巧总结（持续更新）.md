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

> 官方文档：<https://element.eleme.cn/#/zh-CN>
>
> GitHub源码：<https://github.com/ElemeFE/element>



## 标签使用

### el-scroll

[效果](https://segmentfault.com/a/1190000015068613#articleHeader2)

el-scrollbar接受的属性

```js
props: {
    native: Boolean,  // 如果为true就不显示el的bar，也就是el模拟出来的滚动条，如果为false就显示模拟的滚动条
    wrapStyle: {},	// 外层盒子的样式
    wrapClass: {},	// 外层盒子的class
    viewClass: {},	// 内层盒子的class
    viewStyle: {},	// 内层盒子的样式
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  }
```

[关于tag这个属性，可以看一下el的Select组件中的应用。](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190505165941.png)

view和wrap这两个区域的区别：

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190505170128.png)



[更改默认样式](https://www.jianshu.com/p/b371db8fe66a)

用例

```html
<template>
      <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="default-scrollbar__view">
        <!-- 需要滚动的内容 -->
      </el-scrollbar>
</template>
```













## 问题解决

element相关的问题解决方式：

- 去看文档再去issue里找找，再去看看源码，大部分问题都能解决了
- 一个诀窍其实大部分诡异的问题都可以通过加一个 `key` 或者 `Vue.nextTick`来解决

















<br>

---

> 参考：
>
> <https://segmentfault.com/a/1190000015068613>
>
> <https://www.jianshu.com/p/b371db8fe66a>