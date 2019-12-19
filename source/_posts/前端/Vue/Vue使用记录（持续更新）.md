---
title: Vue使用记录（持续更新）
author: Cynthia
categories:
  - 前端
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



在scss等预处理器中 `>>>` 可能不生效，可以使用 `/deep/` 代替

```scss
<style lang="scss" scoped>
/deep/ {
    // 放你想修改的类样式
}
```

ssh://git@ops-gitlab.jrj.cn:62222/genius/broswer-web.git

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

### 未分类



### 修改对象或数组中的键，视图未发生变化

#### $set()

使用 `$set` 方法修改 [官方文档详情](https://cn.vuejs.org/v2/api/#Vue-set)

```html
<script>
  export default{
    data() {
      return {
        item: {
          title: '222'
        },
        options: [11, 22],
        list: [
          {
            title: '2222'
          }
        ]
      }
    },
    created() {
      /* 对于对象，第一个为要修改的对象，第二个参数为对象的键，第三个为要修改的键对应的值 */
      this.$set(this.item, 'title', '2200');
      /* 对于对象，第一个为要修改的数组，第二个参数为数组索引，第三个为要修改的索引对应的值 */
      this.$set(this.options, 0, 33);
      /* 对于数组里包含对象，可以利用循环对其进行修改 */
      this.list.forEach(item => {
        this.$set(item, '_disableExpand', true);
      });
      /* 对于数组里包含对象，也可以利用Object.assign对其进行修改 */
      this.list[0] = Object.assign({}, this.list[0], { num: 10 });
      this.$set(this.list, 0, this.list[0]);
    },
  }
</script>
```



#### $forceUpdata()

> 也可以直接进行修改后对页面进行强制刷新，使用 `$forceUpdate()` 方法
>
> 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

```js
this.options[0] = 100;
this.$forceUpdate();
```







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





## 可复用性 & 组合

### 插件相关

> 插件通常用来为 Vue 添加全局功能。
>
> 官方文档：https://cn.vuejs.org/v2/guide/plugins.html

插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者属性
2. 添加全局资源：指令/过滤器/过渡等
3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)



#### 开发插件

```js
export default {
    MyPlugin.install = function (Vue, options) {
      // 1. 添加全局方法或属性
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }

      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })

      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })

      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
}    
```



#### 使用插件

```js
// 在main.js中

// 引入文件
import MyPlugin from './utils/MyPlugin'

// 使用插件
Vue.use(MyPlugin)
```















































