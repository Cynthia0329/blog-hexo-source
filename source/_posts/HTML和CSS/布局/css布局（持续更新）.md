---
title: css布局（持续更新）
author: Cynthia
categories:
  - HTML和CSS
  - 布局
tags: []
date: 2019-05-12 14:32:13
---

🐰
...
<!--more-->



## 两列布局

>  左侧固定宽右侧自适应

### 浮动布局

关键点：  

一、先让固定宽度的div浮动！使其脱离文档流。 

 二、margin-left的值等于固定div的宽度相等。 

[点击查看示例](http://jsrun.net/cpyKp)

关键代码：

```scss
margin-left: 200px;	// 固定div的宽度
```



### calc()计算属性

> 注意兼容性

注意：使用calc计算属性的时候 运算符(- +等等)两边必须有空格  

关键点：  

1. 注意两个div必须一左一右浮动。  
2. calc的宽度必须要减去的宽度要与固定宽度保持一致。 



[点击查看示例](http://jsrun.net/spyKp)

关键代码：

```scss
.right {
  float: right;
  width: calc(100% - 200px);	// calc计算属性
  height: 600px;
  background-color: lightblue;
}
```



### flex布局

> 注意兼容性

关键点：  

1. 需要给父级div设置display: flex属性。  
2. 固定宽度的div设置flex: 0 0 200px即可。  
3. 内容区域的div直接写出flex: 1即可。 



[点击查看示例](http://jsrun.net/dpyKp)



## 三栏布局

> 实现三栏布局最常见的有圣杯布局和双飞翼布局
> 两者的功能相同，都是为了实现：
> **两侧宽度固定，中间宽度自适应**的三栏布局

圣杯布局来源于文章[In Search of the Holy Grail](https://alistapart.com/article/holygrail)，而双飞翼布局来源于淘宝UED。虽然两者的实现方法略有差异，不过都遵循了以下要点：

- 两侧宽度固定，中间宽度自适应
- 中间部分在DOM结构上优先，以便先行渲染
- 允许三列中的任意一列成为最高列
- 只需要使用一个额外的`<div>`标签

 

### 圣杯布局



 

 

 

 

























<br>

---

> 参考文章：
>
> https://www.jianshu.com/p/81ef7e7094e8

