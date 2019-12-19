---
title: sass使用总结（持续更新）
author: Cynthia
categories:
  - 前端
  - HTML和CSS
  - 🐰未分类🐰
date: 2018-09-06 10:29:22
tags: 布局
---

🐰

<!-- more -->

> sass总文档：{% post_link 前端/HTML和CSS/doc/sass官方文档整理 %}



## 优秀文章

### 未分类

- [自定义的Sass混合宏](https://github.com/tylergaw/tylergaw.com/blob/pre-postcss/src/css/scss/modules/_prefixed.scss)来处理浏览器所需的私有前缀



### Sass和compass

- [Sass & Compass 初步使用](https://segmentfault.com/a/1190000008282901)
- [在Vue中使用Compass](https://segmentfault.com/a/1190000013474614)
- [慕课网课](https://www.imooc.com/learn/371)



### sass目录结构组织

- [组织你的Sass文件](https://www.w3cplus.com/preprocessor/organize-your-sass-files.html)
- [流行框架的 Sass 体系结构解析](https://www.w3cplus.com/preprocessor/look-different-sass-architectures.html)
- [基于Sass的BootStrap4的源码目录结构-学习笔记](https://www.jianshu.com/p/18ac212eef60)












## 常用指令

### @mixins

> 详细请看： {% post_link 前端/HTML和CSS/doc/sass官方文档整理 %} 第9章的内容

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



### @include

> 详细请看： {% post_link 前端/HTML和CSS/doc/sass官方文档整理 %} 9.2

在用 `@mixin` 声明了公共样式后，用 `@include` 引用公共样式

```scss
// 声明
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;	// 使用
  padding: 4px;
  margin-top: 10px;
}
```









### @extend

> 详细请看：{% post_link 前端/HTML和CSS/doc/sass官方文档整理 %} 7.3

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





## 常用语法

### 循环语法

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



### 变量 $

> 详情：{% post_link 前端/HTML和CSS/doc/sass官方文档整理 %}  6.2



### 变量定义 !default

> 详情：{% post_link 前端/HTML和CSS/doc/sass官方文档整理 %}  6.9

可以在变量的结尾添加 `!default` 给一个未通过 `!default` 声明赋值的变量赋值

- 如果变量**已经被赋值**，不会再被重新赋值

- 如果变量**还没有被赋值**，则会被赋予新的值

  ```scss
  $content: "First content";
  $content: "Second content?" !default;
  $new_content: "First time reference" !default;
  
  #main {
    content: $content;		// 已经被赋值
    new-content: $new_content;	//未被赋值
  }
  ```

  编译为

  ```scss
  #main {
    content: "First content";			// 为最初的值，没有发生改变
    new-content: "First time reference"; }	// 新赋的值
  ```

  变量是 null 空值时将视为未被 `!default` 赋值

  ```scss
  $content: null;
  $content: "Non-null content" !default;
  
  #main {
    content: $content;
  }
  ```

  编译为

  ```scss
  #main {
    content: "Non-null content"; 
  }
  ```

  






## 其他重点总结

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

> 可以了解，但是没有太大的必要...

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family, font-size, font-weight` 都以 `font` 作为属性的命名空间。

为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如：

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

### 符号代称

- @mixin ：可以用 `=` 表示
- @include ：可以用 `+` 表示



## 易混淆

- [sass中的占位符%，@extend，@mixin（@include）的编译区别和使用场景](https://www.cnblogs.com/yaoyao-sun/p/10813125.html)
- [Sass:@mixin和extend的选择](https://blog.csdn.net/weixin_39987434/article/details/88419187)





## 使用小demo

### 变量相关

#### 设置渐变主题色

```scss
$--color-primary: #409EFF !default;
$--color-white: #FFFFFF !default;
$--color-primary-light-1: mix($--color-white, $--color-primary, 10%) !default; /* 53a8ff */
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default; /* 66b1ff */
$--color-primary-light-3: mix($--color-white, $--color-primary, 30%) !default; /* 79bbff */
$--color-primary-light-4: mix($--color-white, $--color-primary, 40%) !default; /* 8cc5ff */
$--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default; /* a0cfff */
$--color-primary-light-6: mix($--color-white, $--color-primary, 60%) !default; /* b3d8ff */
$--color-primary-light-7: mix($--color-white, $--color-primary, 70%) !default; /* c6e2ff */
$--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default; /* d9ecff */
$--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default; /* ecf5ff */
```









