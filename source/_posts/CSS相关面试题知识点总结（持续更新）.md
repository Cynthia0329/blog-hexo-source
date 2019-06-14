---
title: CSS相关面试题知识点总结（持续更新）
author: Cynthia
categories:
  - "\U0001F430未分类\U0001F430"
tags:
  - "\U0001F353无\U0001F353"
date: 2019-06-14 14:29:42
---

🐰
...
<!--more-->

## 未分类

### 说下几种常用选择器

五大类选择器：

#### 基本选择器

- 元素选择（直接获取元素名 `P、h1`）【过于直接】
- ID选择（`#id`）【取值唯一不能复用】
- 类选择（`.class`）【组合、复用】
- `*` 通用选择器(所有元素)



#### 关系选择器

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190614143130.png)





#### 伪类选择器

- :nth-child(n) ：  n可以是数字(4)、关键词(old,even)或公式(2n+1)
- :active: 将样式添加到被激活的元素
- :focus: 将样式添加到被选中的元素
- :hover: 鼠标悬浮在元素上时 添加样式
- `​:link`:​ 添加到未被访问过的链接
- :visited 添加到被访问过的链接
- :first-child: 添加到元素的第一个子元素
- :lang： 定义使用的语言



#### 伪元素选择器 

- :first-letter : 添加到文本的首字母 
- :first-line : 添加到文本的首行 
- :before : 某元素之前插入某些内容 
- :after : 某元素之后插入某些内容



#### 属性选择器

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190614143236.png)





## 布局

### flex布局

#### 设为 flex属性后，子元素的哪些属性会失效？

float、clear 和 vertical-align











## 移动端

### 响应式

#### 移动端开发 rem 布局的原理（rem 单位换算）

使用rem布局，实质都是根据设备屏幕通过动态改写html的font-size基准值，来实现不同设备下的良好统一适配



