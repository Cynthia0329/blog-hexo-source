---
title: Vue常用弹出框类组件（持续更新）
author: Cynthia
categories:
  - 前端
  - Vue
  - 组件库和插件工具
tags:
  - "\U0001F353无\U0001F353"
date: 2019-05-23 16:39:08
---

🐰
...
<!--more-->

## 书签

- vue-js-modal
  - <https://www.npmjs.com/package/vue-js-modal#dialog>



## vue-js-modal

> npm：<https://www.npmjs.com/package/vue-js-modal>
>
> Demo: <http://vue-js-modal.yev.io/>

### basic

![img](https://media.giphy.com/media/3oKIPco1eNxAA1rD4Q/giphy.gif)

#### 安装

```shell
npm install vue-js-modal --save
```



#### 引入

`main.js` 文件

```js
import VModal from 'vue-js-modal'
 
Vue.use(VModal)
```


##### 自定义组件名

```js
// 默认组件名为 "modal"，如果需要自定义则：
Vue.use(VModal, { componentName: "foo-modal" })
```

组件中使用：

```html
<foo-modal name="bar"></foo-modal>
```



#### 在组件中使用

Create modal:

```html
<modal name="hello-world">
  hello, world!
</modal>
```

Call it from anywhere in the app:

```js
methods: {
  show () {
    this.$modal.show('hello-world');
  },
  hide () {
    this.$modal.hide('hello-world');
  }
}
```

------

You can easily send data into the modal:

```js
this.$modal.show('hello-world', { foo: 'bar' })
```

And receive it in `beforeOpen` event handler:

```js
<modal name="hello-world" @before-open="beforeOpen"/>
methods: {
  beforeOpen (event) {
    console.log(event.params.foo);
  }
}
```



### Dialog

![img](https://user-images.githubusercontent.com/1577802/29165216-ec62552c-7db9-11e7-807e-ef341edcc94d.png)

> 查看demo演示：<http://vue-js-modal.yev.io/>

npm：<https://www.npmjs.com/package/vue-js-modal#dialog>








```

```