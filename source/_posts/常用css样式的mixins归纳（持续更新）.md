---
title: 常用css样式的mixins归纳（持续更新）
author: Cynthia
categories:
  - "\U0001F430未分类\U0001F430"
tags:
  - "\U0001F353无\U0001F353"
date: 2019-10-18 15:45:33
---

🐰
...
<!--more-->





## 布局

### flex布局

- 水平
```scss
// 使flex布局的子元素 水平顺序排列 垂直居中显示
@mixin center {
    display: flex;
    justify-content: center;
    align-items: center;
}
// 使flex布局的子元素 水平从左排列 垂直居中显示
@mixin left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
// 使flex布局的子元素 水平从右排列 垂直居中显示
@mixin right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
// 使flex布局的子元素 水平顺序排列 垂直顶端对齐显示
@mixin top {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
```

- 垂直
```scss
// 使flex布局的子元素 整体垂直从上到下排列 水平居中显示
@mixin columnTop {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
// 使flex布局的子元素 整体垂直居中 水平居左显示
@mixin columnLeft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
// 使flex布局的子元素 整体垂直居中 水平居中显示
@mixin columnCenter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

```



## 文字

### 省略

```scss
// 文字超过一行省略显示
@mixin ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

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



## 计算转换

### rem

```scss
$ratio: 375 / 10;

@function px2rem($px) {
  @return $px / $ratio + rem;
}
```
