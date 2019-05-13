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



## css样式相关

### 深度选择器

> 当子组件使用了scope，但在父组件中又想修改子组件的样式时，可以使用深度选择器 `>>>` 来实现

```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

将会编译成

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```



所以你想**覆盖某个特定页面 `element` 的 button 的样式**，你可以这样做：

```scss
.xxx-container >>> .el-button{
  xxxx
}
```





## webpack项目构建相关

### 分析构建文件体积

如果你的构建文件很大，你可以通过 `webpack-bundle-analyzer` 命令构建并分析依赖模块的体积分布，从而优化你的代码。

```bash
npm run build:prod --report
```

运行之后你就可以在 http://127.0.0.1:8888 页面看到具体的体积分布

![img](https://wpimg.wallstcn.com/3fddf034-2b38-4299-b0d2-b748fb2abef0.jpg)

具体的优化可以参考 [Webpack 大法之 Code Splitting](https://zhuanlan.zhihu.com/p/26710831)

> TIP
>
> 强烈建议开启 gzip ，使用之后普遍体积只有原先 1/3 左右。打出来的 app.js 过大，查看一下是不是 Uglify 配置不正确或者 sourceMap 没弄对。 优化相关请看该 [Webpack Freestyle 之 Long Term Cache](https://zhuanlan.zhihu.com/p/27710902)















