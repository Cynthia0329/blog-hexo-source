---
title: GreenSock动画平台（GSAP）学习笔记
author: Cynthia
categories:
  - HTML和CSS
  - 动画
tags: [GSAP]
date: 2019-05-07 10:17:38
---

🐰
...
<!--more-->

## 优秀文章

> 符号表示目前是否看完

- [GSAP - 专业的 Web 动画库](https://segmentfault.com/a/1190000005366176)   ✔
- [TweenMax 中文使用说明](https://www.cnblogs.com/vaney/p/4502480.html)   ✖



## GreenSock组成简介

### 组成

在[官网](https://greensock.com/)选择Download zip就可以拿到GSAP源码，解压后可以看到有这些文件：

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190507110900.png)

这里的 `TweenLite.js`、`TweenMax.js`、`TimelineLite.js` 和 `TimelineMax.js` 4个文件就是GSAP的一般引用库文件

**这4个文件分别包含了什么东西呢？**

- `TweenLite` ：是GSAP的**主体核心**，它用于创建基本动画，是其他各类模块的基础。一般都会搭配 `plugins/CSSPlugin` 以实现DOM元素的动画（也就是我们最熟悉的动画了）。
- `TimelineLite` ：是一个叫做**时间轴**的动画容器，它用于**对多个动画进行有序的组织与控制**。
- `TimeLineMax` ：是 `TimelineLite` 的升级版，在 `TimelineLite` 的基础之上，可以有更高级的组织与控制。
- `TweenMax` ：是**GSAP集合包**，除前面3个之外，还包括 `plugins` 里的常用插件以及 `easing` 里的缓动函数补充。

⭐ [一张图说明GSAP动画平台四个插件的不同功能](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190507104937.png)



### 关系

不过，这几个文件还有一些重叠和包含的关系，如下图：

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190507110933.png)

GSAP在Customize里是这样描述自己拥有的模块的：

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190507111048.png)

默认勾选的 `TweenLite` + `css plugin` 是最简单的应用组合



### **使用建议**

- 如果想要简单地引入GSAP的主体功能，使用 `TweenMax.js` 这一个文件即可（请看第一张图中反映出的这个文件的大小）。
- 而如果要争取更小的库文件大小，应该使用 `TweenLite.js`（必需）+ 其他文件的组合。



### 学习提示

`TweenMax` 是 `TweenLite` 的升级版，拥有其全部特性，只是增加了一些额外的高级控制。
它们的语法完全一致，使用时用全局搜索把所有 `TweenLite` 替换成 `TweenMax` ，不会有任何影响。
`TimelineMax` 和 `TimelineLite` 的关系也是如此。

（但是将Max替换成原本的要注意是否是Max中特有的语法）



**所以：** 我们直接学习 `TweenMax` 和 `TimelineMAX` 就可以了

后面的实际运用篇我们只选择了 `TimelineMax` ，但是第一次学习使用，建议还是先大概学一下 `TweenMax` 再学习 `TimelineMax` 

**原因：**因为 `TweenLite` 是整个GSAP最基础的部分，先理解这一部分对于后面的学习也能快速上手，并且可以理解得更加充分



## GSAP学习文档

最好的学习方式就是去将官方的两篇文档大概过一遍，然后再实际上手练习

- [TweenMax中文手册](https://www.tweenmax.com.cn/api/tweenmax/)
- [TimelineMax中文手册](https://www.tweenmax.com.cn/api/timelinemax/)

我在第一遍学习阅读的时候，对相关API进行了总结

{% post_link HTML和CSS/动画/GSAP官方文档总结 GSAP官方文档总结 %}



## 实际运用

### 为什么选择TimelineLite？

好像 `TweenLite` + `css plugin` 就已经足够用了，这个Timeline系列是做什么的呢？

想象你是一个动画的导演，你要按剧本安排演员在一个CUT里依次上场和退场。在 `TweenLite` 里，我们只有一个演员（`#ball1`），但现在，我们要拍一个有20+演员的动画大片，要怎么办呢？

你也许曾用css3的 `animation` 做过类似的事情，做法是，当转换到一个场景（CUT）后，为场景里的所有演员依次设定适当的 `delay` 。只要 `delay` 计划好，看起来就是漂亮精彩的大片。

不过，这可没有那么简单，假如你已经安排好了20位演员的上场时间，现在改了下剧本，来了第21位演员要在最开始上场，你会发现你可能要依次调整在它之后的所有演员的`delay`...

> GSAP的 `TweenLite` 也会有同样的问题，因此，我们需要有一个工具来**统一管理多个元素的多个动**画
>
> 如果你做过视频编辑，你一定很熟悉“时间轴”这个概念。简单来说，每一个元素的单次动画都是一段素材，我们需要把它们分别放置到同一个时间轴的适当位置，才能集合在一起得到有序的动画大片。
>
> 这就是`TimelineLite`。

然后通过上面两者官方API文档的总结我们可以发现，几乎所有 `TweenLite` 常用的API方法都可以在 `TimelineLite` 中找到。

而且明显的如果两者结合使用还不如只用 `TweenlineLite` 更加简便。

如下面的例子：

添加一个`TweenLite.to()`动画到时间轴，相当于`add(TweenLite.to(...))`，以下两行产生相同的结果：

```js
// 两者结合使用
myTimeline.add( TweenLite.to(element, 1, {left:100, opacity:0.5}) );

// 只使用TweenlineLite
myTimeline.to(element, 1, {left:100, opacity:0.5});
```

所以，目前我的实际运用中主要只使用了 `TimelineLite` 来实现动画效果（暂时我的使用过程中还未发现有什么单独用TimelineLite不行，而结合TweenLite可以的例子。如果有会再次更新进行相关的说明）



### animate和TweenlineMax的区别？

从上一节的分析我们就可以看得出来，这两者的区别除了一个是js一个是css之外和上面 `TweenLite` 和`TimelineLite` 的区别很像，主要是后者引入了时间轴的概念

下面我们来看分别用两种方法实现的例子

多个元素相同的动画：多个文字实现向下渐隐出现的效果

> tips：如果👇的示例没有出现，请多刷新几次或者直接点击标题链接进行查看（右上角可以查看源码）

#### [animate的实现方式](http://jsrun.net/SYyKp)

<script async src="//jsrun.net/SYyKp/embed/all/dark/"></script>

从上面示例可以看出，主要只添加了HTML部分的代码

#### [TweenlineMax中的实现方式](http://jsrun.net/LiyKp)

<script async src="//jsrun.net/LiyKp/embed/all/dark/"></script>

从上面示例可以看出，主要只添加了JS部分的代码

#### 总结

从上面代码我们可以看出

- 一个只添加了HTML代码的类名，一个只添加了js的方法
- 当只对单个（同时或者不考虑连续时间）不同的元素添加动画时，用**animate**比较方便
- 当对多个相同的元素添加动画时，用**GSAP**比较方便（可以通过js一次性获得所有相同元素的dom，然后一次性添加动画）
- 当对多个元素（无论是否相同），需要引入时间轴（或者时间比较复杂时），使用**GSAP**
  - animate只能通过延迟来把控时间，如果时间元素过多，不好把控
  - 而且容易出现“如果需要在开头新添一个元素的动画，可能需要修改全部元素的延迟时间”这种麻烦的事情



#### 两种相互转换

如果你想使用animate中的动画效果，可以分析animate的源码，找到相应动画的 `keyframe` 即可以将其转换成GSAP动画的模式（上面的实例就是根据这个方法实现的）

因为本质上两者都是用css3实现的动画，原理是相同的



### 项目顺序

在实际运用中，一定要切记一点！

我们最好是先把整个页面的最终排版布局样式都完成了再来进行相关的动画。千万不能一边布局一边进行动画，这样的话，如果其中某步的布局有问题需要调整，可能会影响整个动画结果。



下面是我建议的一个流程顺序：

- 对页面进行排版布局（包括细节的css样式）
- 确定整个页面时间轴的动画，梳理出一个大概顺序
- 通过以上顺序，（最好）先确定好一些必须要添加标记的地方，以及该标记先后的动画
  - [大概有这样一幅图在脑海中或者草稿先画出来](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190513163637.png)
- 最后再书写具体的动画



### 创建dom元素

从上面建议的项目顺序第一步，如果dom元素相对较少，就不需要采取下面的方式。

如果页面拥有特别多的dom元素（比如页面上有二三十个小球同时运动），那么这种建议使用js来进行创建dom

因为使用GSAP一般会默认引入jQuery，所以请善用jQuery来创建大量的dom元素！这样可以节省很多手写dom标签的时间。

并且对后面直接操控dom元素来添加动画也更加利于理解



### 常用的方法

```js
// 这个就不必解释了吧？创建动画的第一步
var tl = new TimelineMax();		

// 适用于样式需要变化时
tl.fromTo(元素, 时长, {初始样式}, {最终样式}, "标记名字或者相对时间（不填默认上个动画结尾处）")	

// 使用于简单的动画（最终还是回归初始样式）模仿animate的样式很多可以用这个方法
tl.from(元素, 时长, {初始样式})	

.to(".gold", 0.5, {scale: 0.7})
.addLabel("label1")
```




### 常用初始设置

```js
{
    repeat: true,	// 动画在第一次完成后应重复的次数
    yoyo: true		// 如果设置yoyo为true，那么重复的动画将往返进行。默认为false
    delay: 时长	   // 时间轴动画开始之前的延迟秒数（或帧数
}
```

#### CSSPlugin常用
[具体查看CSSPlugin文档](https://www.tweenmax.com.cn/CSSPlugin/)

- `width, height, margin, padding, top, left`
- `transforms (rotation, scaleX, scaleY, skewX, skewY, x, y, rotationX, and rotationY), colors, opacity` 等
- `alpha, autoAlpha, transformOrigin,className `

```js
tl.fromTo(元素, 时长, {初始css样式})

{
    scale: 1,	// 大小
    opacity: 0,
    top,bottom,left,right	// 绝对定位
    x,y		// 相当于CSS3的translateX和translateY
    xPercent: 10%,	// 水平方向位移，以百分比为单位  
    rotation: 10, // 旋转，相当于CSS3的rotate，默认是角度deg
    
}
```





### 一些注意点

**.play()的补充说明**

由于序列动画（staggerTo()等）分解成了一个个动画，因此不能简单的使用tween动画的play()控制。可将序列动画添加至时间轴，再使用timeline的play()方法来播放。

#### 动画结束后清空style属性

默认情况下，执行过动画的元素会留下`style`的内联样式，如果你担心这可能造成额外影响，可以设定`clearProps`参数清空它：

```js
TweenLite.to("#ball1", 2, {
    x: 200,
    clearProps: "all",
    autoAlpha: 0
});
```

如果只需要清理个别样式，单独写出来即可，如`clearProps: "opacity"`。

#### 指定默认缓动

如果你大部分动画都使用同一种缓动函数，那么用`TweenLite.defaultEase`会很方便，比如修改为`Expo.easeOut`：

```js
TweenLite.defaultEase = Expo.easeOut;
```





## 实例DEMO

> 这节所有的demo都是用的实际运用里所说的模式







<br>

---

> 参考文章：
>
> <https://segmentfault.com/a/1190000005366176>
>
> <http://svgtrick.com/book/greensock/>