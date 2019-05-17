---
title: sass使用总结（持续更新）
author: Cynthia
categories:
  - HTML和CSS
  - 🐰未分类🐰
date: 2018-09-06 10:29:22
tags: 布局
---

🐰

<!-- more -->

> {% post_link HTML和CSS/doc/sass官方文档整理  sass官方文档整理%}
>
> ↑没事就去整理看看




## 常用语法

### @mixins

> [常用mixins汇总](doc/mixins方法汇总.md)

#### 直接使用公共样式

不带变量

```scss
  @mixin right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
```



#### 需要自定义样式


- 带参数变量

    ```scss
    // 文字超过xx行省略显示
    @mixin ellipsis2($line) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: $line;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
    }
    ```

- 带参数变量并设定默认值

    ```scss
    @mixin button($background: green) { 
        font-size: 1em; 
        padding: 0.5em 1.0em; 
        text-decoration: none; 
        color: #fff; 
        background: $background; 
    }
    ```

- [使用@content](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190506163656.png)
  - 该方法可以新加入新的样式进去（跟使用@include后添加样式一样的效果）
  - 也可以写原本就有的样式，不同的值，覆盖原本的样式
    - 这样编译出来的css代码不够优雅，谨慎使用



### @extend

> 看 [sass文档整理](doc/Sass文档整理.md) 7.3

sass 将一个选择器下的所有样式继承给另一个选择器

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```





## 易混淆

- [sass中的占位符%，@extend，@mixin（@include）的编译区别和使用场景](https://www.cnblogs.com/yaoyao-sun/p/10813125.html)
- [Sass:@mixin和extend的选择](https://blog.csdn.net/weixin_39987434/article/details/88419187)













## 官方教程重点

### & 的妙用

`&` 必须作为选择器的第一个字符，**其后可以跟随后缀生成复合的选择器**，例如

```scss
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```

编译为

```css
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```

当父选择器含有不合适的后缀时，Sass 将会报错。

### 属性嵌套

> 试试？但感觉用处不大

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family, font-size, font-weight` 都以 `font` 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如：

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

编译为

```css
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```

命名空间也可以包含自己的属性值，例如：

```scss
.funky {
  font: 20px/24px {
    family: fantasy;
    weight: bold;
  }
}
```

编译为

```css
.funky {
  font: 20px/24px;
    font-family: fantasy;
    font-weight: bold; }
```

### 符号

@mixin 可以用 = 表示

@include 可以用 + 表示



### @mixin相关指令











### sass语法

#### 字符串

> 下面这个传入id选择器变量的用法可以参考下？

SassScript 支持 CSS 的两种字符串类型：

- **有引号字符串** (quoted strings)，如 `"Lucida Grande"` `'http://sass-lang.com'`；
- **无引号字符串** (unquoted strings)，如 `sans-serif` `bold`
  - 在编译 CSS 文件时不会改变其类型。
  - 只有一种情况例外，使用 `#{}` (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
```

编译为

```css
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

#### 循环

> 这个-的命名方式可以借鉴

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

编译为

```css
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

### 

## 【待】

- [自定义的Sass混合宏](https://github.com/tylergaw/tylergaw.com/blob/pre-postcss/src/css/scss/modules/_prefixed.scss)来处理浏览器所需的私有前缀



## 一些优秀文章

- [官方文档](https://www.sass.hk/docs/) ↑官方的目录太乱，看自己整理的那个
- [sass揭秘之@mixin，%，@function](https://www.w3cplus.com/preprocessor/sass-mixins-function-placeholder.html)






## Sass和compass

- [Sass & Compass 初步使用](https://segmentfault.com/a/1190000008282901)
- [在Vue中使用Compass](https://segmentfault.com/a/1190000013474614)
- [慕课网课](https://www.imooc.com/learn/371)



## 目前遇到过的指令

- @
  - @function
  - @mixin   @include
- 未
  - & ：表示和父级同级 





## 一些运用的例子

在vue里 当使用 `:class` 给当前div绑定一个class类的时候

- `":class:'绑定的类名': xxxx"`  xxxx可以是一个值，也可以是一个返回布尔值的方法

- 在sass中，要在 当前div的类 的里面：

  用 `&.绑定的class类名` 来表示与当前div的类同级



- 某个类的伪类设置可以 `&:hover {}` 进行单独设置
- 同理，某个类的选择器可以 `&:nth-child(3n+1) {}` 进行单独设置