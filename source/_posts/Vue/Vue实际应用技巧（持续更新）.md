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

### 未分类

- 可以**利用 vue的 `computed()` 计算属性** 来给 `:style:"计算属性名字"` 内联样式动态绑定一个css对象方法
  - 因为计算属性得到的是 一个方法返回的值 可以在这个方法中根据不同的情况返回不同的值，达到动态绑定的效果

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



## 动画相关

- **一个dom中同时显示和隐藏 存在两个动画**
  - 参考 `Popup.vue` 组件中的处理方式：利用 `setTimeout() ` 来使两个动画都能得以实现
- **transition-group** 
  - 与 `<transition>` 的不同：`<transition-group>` 会给里面遍历的每一个item都添加一个class动画类
  - [api文档](https://cn.vuejs.org/v2/api/#transition-group)
  - [列表过渡教程](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1)
  - 具体应用案例：[ebook书架](https://github.com/Cynthia0329/ebook/blob/master/src/components/shelf/ShelfList.vue)





## DOM相关

[关于vue 的 this.$refs 打印为undefined解决办法](https://blog.csdn.net/changzhen11/article/details/84067816)

```js
如果写在method中，那么可以使用 this.$nextTick(() => {}) 等页面渲染好再调用
```



## 表单相关

[Vue.js 表单 实例](https://www.runoob.com/vue2/vue-forms.html)

- [vuejs使用FormData对象，ajax上传图片文件](https://www.cnblogs.com/yesyes/p/7299500.html)







## 数据相关

### vuex结合localStorage

> 合理运用vuex结合localstorage动态监听storage的变化

**需求：**

不同组件间共用同一数据，当一个组件将数据发生变化时，其他组件也可以响应该变化。

**分析：**

vue无法监听localstorage的变化。localstorage主要用于不同页面间传值，vue适合组件间传值。
对于组件间共用同一数据又想保存住信息或者再页面刷新的时候不丢失数据（vuex在页面刷新的时候存储的值会丢失，localstorage存储在本地浏览器中），可以采用vuex+localstorage的方式。



**区别：**

1.最重要的区别：vuex存储在内存，localstorage则以文件的方式存储在本地

2.应用场景：vuex用于组件之间的传值，localstorage则主要用于不同页面之间的传值。

3.永久性：当刷新页面时vuex存储的值会丢失，localstorage不会。

注：很多同学觉得用localstorage可以代替vuex, 对于不变的数据确实可以，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage无法做到，原因就是区别1。



## 指令相关

- `@keyup.enter.exact="search()" ` ：此处的 exact 表示只有按了 enter 键才会触发事件（不能组合按键）



## 过滤器

### 全局过滤器和本地过滤器

[官方文档](https://cn.vuejs.org/v2/guide/filters.html)

```js
// 全局
Vue.filter('filterName', function (value) {
    // 数据处理
    return ....
})

// 本地
filters: {
    filterName: function (value) {
        // 数据处理
   		return ....
    }
}
```





### 格式化时间

利用插件[Moment.js](http://momentjs.cn/)

```js
filters: {
    formDate: function(val) {
        if (!val) return ''
        return moment(val, 'YYYYMMDD').format('YYYY-MM-DD')
    },
},
```



## 组件相关

### 未分类

- **vue公共组件：使用 `插槽` 的标签来达到组件复用** [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

- **`:is` 点击不同的标签切换组件**

  ```html
  <component :is="tab"></component>
  <script>
      data() {
          return {
              tab: 传入已注册组件的名字	// 可以点击标签修改tab的值达到切换组件
          }
      }
  </script>
  
  
  如果只有两个标签
  <component :is="currentTab === 1 ? content : bookmark"></component>
  
  <script>
  data() {
      return {
          currentTab: 1,
          content: EbookSlideContents,
          bookmark: EbookSlideBookmark
      }
  }
  </script>
  ```



### 刷新当前组件

> 这个方法相比 `this.$router.go(0)` 而言不会出现白屏，用户体验比较好

html

```html
<router-view v-if="isRouterAlive" />
```

method

```js
// 刷新当前页面
reloadPage() {
    this.isRouterAlive = false
    this.$nextTick(function () {
        this.isRouterAlive = true
    })
},
```



### vue组件之间通信的方式

#### props和$emit

父组件向子组件传递数据是通过prop传递的，子组件传递数据给父组件是通过$emit触发事件来做到的



八种方式：<https://blog.csdn.net/lyr190/article/details/88355949>







## 路由相关

[*vue 监听路由变化*](https://www.baidu.com/link?url=CHPkW9IIYSIo9NttQ5q8JbuMeBKzx0yOeKDzDZHZIPvvBLvVs5evKothRlckXc0zhiM6oyrZihyMHn6mVKDrXK&wd=&eqid=9f682ced00031977000000065ceca628)





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















