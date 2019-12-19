---
title: css布局（持续更新）
author: Cynthia
categories:
  - 前端
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
.left {
  float: left;
  width: 200px;
  height: 600px;
  background: pink;
}

.right {
  margin-left: 200px;
  height: 600px;
  background: lightblue;
}
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

```css
.main {
  display: flex;
}

.left {
  flex: 0 0 200px;
  height: 600px;
  background-color: pink;
}

.right {
  flex: 1;
  height: 600px;
  background-color: lightblue;
}
```





## 三栏布局

- 绝对定位 + 中间版块不给宽度
- 两侧浮动 + 中间自动撑开（使用 calc 动态计算宽度，设置对应宽度的 margin）
- flex，左右设置 flex-basis，中间设置 flex-grow



### flex布局

[点击查看示例](http://jsrun.net/U9yKp)

html

```html
 <div class="content">
     <div class="left">im left</div>
     <div class="main">im center</div>
     <div class="right"> im right</div>
</div>
```

css

```css
*{
    padding: 0px;
    margin:0px;
}
.content{
    width: 100%;
    height:300px;
    display: flex;
}
.left{
    background-color: bisque;
    width: 200px;
}
.right{
    background-color:bisque;
    width: 200px;
}
.main{
    flex: 1;
    background-color: cadetblue;
}
```





### float布局（两边float，中间自适应）

[点击查看示例](http://jsrun.net/99yKp)

html

```html
<div class="left">left 200px </div>
<div class="right">right 200px</div>
<div class="center">center</div><!-- 自适应的DIV一定要放在浮动DIV后面 -->
```

css

```css
body { margin: 0px; }

.left {
  float: left;
  width: 200px;
  height: 200px;
  background-color: lightblue;
}

.right {
  float: right;
  width: 200px;
  height: 200px;
  background-color: lightblue;
}

.center {
  margin-left: 200px;
  margin-right: 200px;
  height: 200px;
  background-color: pink;
}
```



[为什么自适应的DIV一定要放在浮动DIV后面？](https://blog.csdn.net/kevinkristoffer/article/details/17972125)



### float布局（float+calc）

中间宽度 计算出来 ： calc(100% - 左边宽度+右边宽度）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calc三列布局</title>
    <style type="text/css">
    body{
        margin: 0px;
    }
    .center{
        float: left;
        width: calc(100% - 400px);
        background: #ccc;
        height: 200px;
    }
    .left{
        float: left;
        width: 200px;
        height: 200px;
        background: red;
    }
    .right{
        float: left;
        width: 200px;
        height: 200px;
        background: blue;
    }
    </style>
</head>
<body> 
    <div class="left">left 200px </div>
    <div class="center">center=calc(100%-400px)</div>
    <div class="right">right 200px</div>
</body>
</html>
```



### position绝对定位布局

[点击查看示例](http://jsrun.net/E9yKp)

html

```html
<div class="mian">
  <div class="left">left</div>
  <div class="center">center</div>
  <div class="right">right</div>
</div>
```

css

```css
body { margin: 0 }
.main { width: 100%, height: 500px; position: relative; }

.left,.right,.center { position: absolute; }

.left {
  left: 0;
  width: 200px;
  height: 500px;
  background-color: lightblue;
}
.right {
  right: 0;
  width: 200px;
  height: 500px;
  background-color: lightblue;
}

.center {
  left: 200px;
  right: 200px;
  background-color: pink;
  height: 500px;
}
```








### 双飞翼布局(margin+float)

[点击查看示例](http://jsrun.net/89yKp)

 

 [圣杯布局中对left盒子设置负内边距-100%的一点解释](https://segmentfault.com/a/1190000014546205)

 















<br>

---

> 参考文章：
>
> https://www.jianshu.com/p/81ef7e7094e8

