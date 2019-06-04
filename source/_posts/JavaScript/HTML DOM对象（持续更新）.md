---
title: HTML DOM对象（持续更新）
author: Cynthia
categories:
  - JavaScript
tags: []
date: 2019-05-09 09:40:01
---

🐰

...

<!--more-->

## 概述

### 背景

> ​	文档对象模型（Document Object Model，简称**DOM**），是[W3C](https://baike.baidu.com/item/W3C)组织推荐的处理可扩展标志语言的标准编程接口。在网页上，组织页面（或文档）的对象被组织在一个树形结构中，用来表示文档中对象的标准模型就称为DOM。



- DOM= Document Object Model，文档对象模型，DOM可以以一种独立于平台和语言的方式访问和修改一个文档的内容和结构。换句话说，这是表示和处理一个HTML或XML文档的常用方法。
- 有一点很重要，DOM的设计是以对象管理组织（OMG）的规约为基础的，因此可以用于任何编程语言。
- 最初人们把它认为是一种让JavaScript在浏览器间可移植的方法，不过DOM的应用已经远远超出这个范围
- Dom技术使得用户页面可以动态地变化，如可以动态地显示或隐藏一个元素，改变它们的属性，增加一个元素等，Dom技术使得页面的交互性大大地增强。

 

- DOM实际上是以面向对象方式描述的文档模型。DOM定义了表示和修改文档所需的对象、这些对象的行为和属性以及这些对象之间的关系。可以把DOM认为是页面上数据和结构的一个树形表示，不过页面当然可能并不是以这种树的方式具体实现。

- 通过 JavaScript，您可以重构整个 HTML 文档。您可以添加、移除、改变或重排页面上的项目。

- 要改变页面的某个东西，JavaScript 就需要获得对 HTML 文档中所有元素进行访问的入口。这个入口，连同对 HTML 元素进行添加、移动、改变或移除的方法和属性，都是通过文档对象模型来获得的（DOM）。



### DOM

DOM 是遵循 W3C（万维网联盟）的标准。

DOM 定义了访问 HTML 和 XML 文档的标准：

"W3C 文档对象模型 （DOM） 是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。"

W3C DOM 标准被分为 3 个不同的部分：

- 核心 DOM - 针对任何结构化文档的标准模型
- XML DOM - 针对 XML 文档的标准模型
- HTML DOM - 针对 HTML 文档的标准模型



### XML DOM

XML DOM 是： [1] 

- 用于 XML 的标准对象模型
- 用于 XML 的标准编程接口
- 中立于平台和语言
- W3C 标准

XML DOM 定义了所有 XML 元素的**对象和属性**，以及访问它们的**方法**（接口）。

换句话说：**XML DOM 是用于获取、更改、添加或删除 XML 元素的标准。**



### HTML DOM

HTML DOM 是： [2] 

- HTML 的标准对象模型
- HTML 的标准编程接口
- W3C 标准

**HTML DOM 定义了所有 HTML 元素的对象和属性，以及访问它们的方法（接口）**。

换言之，HTML DOM 是**关于如何获取、修改、添加或删除 HTML 元素的标准**。



**HTML DOM 节点**

在 HTML DOM (Document Object Model) 中 , 每一个元素都是 **节点**:

- 文档对象：文档是一个文档节点。
- 元素对象：所有的HTML元素都是元素节点。
- 属性对象：所有 HTML 属性都是属性节点。
- 文本插入到 HTML 元素是文本节点。
- 注释是注释节点。



## 文档对象

当浏览器载入 HTML 文档, 它就会成为 **Document 对象**。

Document 对象是 HTML 文档的根节点。

Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

**提示：**Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。



⭐ [Document 对象属性和方法](https://www.runoob.com/jsref/dom-obj-document.html)





## 元素对象

在 HTML DOM 中, **元素对象**代表着一个 HTML 元素。

元素对象 的 **子节点**可以是, 可以是元素节点，文本节点，注释节点。

**NodeList 对象** 代表了节点列表，类似于 HTML元素的子节点集合。

元素可以有属性。属性属于属性节点



⭐ [元素对象 属性和方法](https://www.runoob.com/jsref/dom-obj-all.html)



## 属性对象

在 HTML DOM 中, **Attr 对象** 代表一个 HTML 属性。

HTML属性总是属于HTML元素



⭐ [属性对象 方法](https://www.runoob.com/jsref/dom-obj-attributes.html)







## 事件对象

HTML DOM 事件允许Javascript在HTML文档元素中注册不同事件处理程序。

事件通常与函数结合使用，函数不会在事件发生前被执行！ (如用户点击按钮)。



⭐ [HTML 事件对象：不同事件对象的属性和方法](https://www.runoob.com/jsref/dom-obj-event.html)

> 内容如果过多，就整理成新的文章

- [javaScript事件（二）事件处理程序](https://www.cnblogs.com/starof/p/4067121.html)
- 

















































