---
title: GreenSock动画平台（GSAP）学习笔记
author: Cynthia
categories:
  - null
tags: []
date: 2019-05-07 10:17:38
---

🐰
...
<!--more-->

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



## **TweenLite/TweenMax**

> **TweenLite/TweenMax** 是GreenSock 动画平台中的核心动画工具，可用来构建补间动画(tween)。
>
> 官方教程API文档：<https://www.tweenmax.com.cn/api/tweenmax/>

**补间**是flash时代的专业词汇，意思是在起始状态和终点状态之间补全中间过程。

虽然现在我们使用**动画**这个词，但是其本质是不变的，仍然要包含四个要素：
**动画目标（target）、起始状态、终点状态、补间效果**

例如将一个div从 `opacity:1` 经过5秒钟降低至 `opacity:0`

```js
TweenLite.fromTo('div', 5, {opacity:1}, {opacity:0});
//动画目标：div
//起始状态：opacity:1
//终点状态：opacity:0
//补间：5秒完成状态改变
```

**起点状态经常可以省略**，例如div以当前位置为起点，向右移动300px：

```js
TweenLite.to('div', 5, {x:300});
```

注意：例子中使用的CSS属性动画（opacity、x等）需要CSSPlugin插件支持，此插件包含在TweenMax.min.js中。如果你使用TweenLite.min.js，需另外加载CSSPlugin.min.js。

⭐**TweenLite和TweenMax区别**：

我们的API文档大部分以TweenMax为例。如果你使用的是简约版的TweenLite，把TweenMax改为TweenLite即可。

例如 `.to()` 方法是公用的

```js
TweenMax.to(obj, 1, {x:100});
TweenLite.to(obj, 1, {x:100});
```

我们已经在API上面标明了哪些方法是公用的，哪些是TweenMax独有的

[这里是一个简要的列表](https://raw.githubusercontent.com/Cynthia0329/images/master/img/fehelper-www-tweenmax-com-cn-api-tweenmax-1557208233547.png)



### 术语说明

| GSAP                             | GreenSock Animation Platform/GreenSock 动画平台 |
| -------------------------------- | ----------------------------------------------- |
| delayedCalls                     | 延迟执行函数                                    |
| eventCallback                    | 事件回调函数                                    |
| tween                            | 动画/补间动画                                   |
| starting value                   | 起点属性                                        |
| current values                   | 当前属性                                        |
| destination values/ending values | 终点属性                                        |
| stagger                          | 错开                                            |
| ease                             | 时间曲线/速度曲线                               |
| timeline                         | 时间轴                                          |
| TweenLite/TweenMax               | 动画实例                                        |
| TimelineLite/TimelineMax         | 时间轴实例                                      |
| label                            | 标记/标签                                       |
| obj/target                       | 动画目标/动画对象                               |
| kill                             | 删除/清除/杀死                                  |





### 动画结构

> 关于设置动画目标和起始、终点状态的动画的结构化方法
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/TweenMax()>

总结：（具体看文档👆）

| 方法                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| TweenMax()               | TweenMax的构造函数，用来构建一个TweenMax对象。               |
| TweenMax.to()            | 创建一个从当前属性到指定目标属性的TweenMax动画对象。         |
| TweenMax.from()          | 通过设置动画起始点来初始化一个TweenMax，相当于动画从设置点开始。 |
| TweenMax.fromTo()        | 通过设置动画起始点和结束点来初始化一个TweenMax，相当于动画从设置点到第二个设置点。 |
| TweenMax.staggerTo()     | stagger系列方法为多个目标制作一个有间隔的动画序列，相当于多个TweenMax的数组。<br/>需要设置每个动画的开始间隔。如不设置则为零，同时开始动画。 |
| TweenMax.staggerFrom()   | 通过设定序列动画的终点来初始化一组TweenMax。                 |
| TweenMax.staggerFromTo() | 通过设定序列动画的起点和终点来初始化一个TweenMax。           |
| TweenMax.delayedCall()   | 提供一种在设定的时间（或帧）后调用函数的简单方法。           |
| TweenMax.set()           | 立即设置目标的属性值而不产生过渡动画，相当于0的动画时间。<br/>返回TweenMax对象。 |



### 动画初始设置

> 对动画进行一些初始化设置，如重复次数(`repeat`)缓动方式(`ease`)等
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/delay>

总结：（具体看文档👆）

| 方法            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| delay           | 动画开始之前的延迟秒数（以帧为单位时则为帧数）。             |
| ease            | 过渡效果的速度曲线（缓动效果）。[时间曲线Easing](https://www.tweenmax.com.cn/Easing/) |
| paused          | 如果设置为true，动画将在创建时立即暂停。默认false            |
| immediateRender | 立即渲染，默认false。（`from()`方法的运动对象是立即渲染的，默认true） |
| overwrite       | 用来控制同一个对象上有多个动画时的覆盖之类的情况。           |
| useFrames       | 当设置为true时，对这个TweenMax对象的时间计算方式基于帧而不是秒，一般帧速约为16.66ms（60帧/秒）。 |
| lazy            | 延迟渲染（当动画第一次渲染并读取其起始值时，将默认自动“延迟渲染”该特定瞬间） |
| autoCSS         | 自动识别CSS属性，省略css:{}包装器。默认true。                |
| callbackScope   | 用于所有回调的范围（onStart，onUpdate，onComplete等）。范围是“this”在任何回调中引用的内容。 |
| repeat          | 动画在第一次完成后应重复的次数。                             |
| repeatDelay     | 每次重复之间的秒数（或帧）。                                 |
| yoyo            | 如果设置yoyo为true，那么重复的动画将往返进行。默认为false。  |
| yoyoEase        | 定义动画返回时，缓动效果如何，默认false，返回时的缓动效果按照前进时的反转。 |
| startAt         | 设置动画属性开始时的值                                       |
| cycle           | cycle 属性允许在stagger的相关方法中使用循环设定的属性值      |



### 动画事件

> 介绍动画的事件函数，如开始事件(`onStart`)、结束事件(`onComplete`)、返回事件(`onReverseComplete`)等
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/onComplete>

总结：（具体看文档👆）

| 方法                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| onComplete              | 在动画结束时触发此回调函数。                                 |
| onCompleteParams        | 传递给`onComplete`函数的参数数组                             |
| onCompleteScope         | 定义`onComplete`函数的作用域，即函数内this的指向。           |
| onReverseComplete       | 反向播放动画完成时执行此回调函数。                           |
| onReverseCompleteParams | 传递给`onReverseComplete`函数的参数数组                      |
| onReverseCompleteScope  | 定义`onReverseComplete`函数的作用域，即函数内`this`的指向。  |
| onStart                 | 当动画开始渲染时执行此事件函数，有可能会被执行多次，因为动画是可以重复开始的。 |
| onStartParams           | 传递给`onStart`事件函数的参数数组                            |
| onStartScope            | 定义`onStart`函数的作用域，即函数内this的指向。              |
| onUpdate                | 当动画发生改变时(动画进行中的每一帧)不停的触发此事件。       |
| onUpdateParams          | 传递给`onUpdate`事件函数的参数数组                           |
| onUpdateScope           | 定义`onUpdate`函数的作用域，即函数内`this`的指向。           |
| onOverwrite             | 当一个补间动画被另外一个补间动画覆盖时发生的事件。           |
| onRepeat                | 在每次动画重复时(`repeat`)执行此事件函数。                   |
| onRepeatParams          | 传递给`onRepeat`事件函数的参数数组                           |
| onRepeatScope           | 定义`onRepeat`函数的作用域，即函数内`this`的指向。           |
| .eventCallback()        | 获取或者设置事件，以及应传递给该回调的任何参数。             |



### 动画播放组件

> 介绍动画的事件函数，如开始事件(`onStart`)、结束事件(`onComplete`)、返回事件(`onReverseComplete`)等
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/play()>

总结：（具体看文档👆）

以下方法大部分都返回self，方便链式调用

| 方法         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| .play()      | 控制动画往正方向播放，可设定开始的时间点。                   |
| .pause()     | 暂停动画，可选择跳转到特定时间。                             |
| .paused()    | 获取或设置动画的暂停状态，该状态指示动画当前是否已暂停。     |
| .restart()   | 重新开始动画/重头开始。                                      |
| .resume()    | 恢复播放而不改变方向（前进或后退），可选择首先跳到特定时间。 |
| .reverse()   | 控制动画反向播放。动画的各种表现都会反转，例如ease。         |
| .reversed()  | 获取或设置动画的反转状态，指示是否应该反向播放动画。         |
| .seek()      | 不改变状态（播放、暂停、方向）的情况下直接跳转到某个时间点。 |
| .timeScale() | 获取/设定动画速度，默认为1。<br />如果设置则返回此动画实例便于链式调用。如不设置则返回时间调节比例。 |



### 动画属性调整

> 下面列出了你可以获取到的动画属性以及调整他们的方法，如动画时长（`time`）、播放进度（`progress`）等
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/duration()>

总结：（具体看文档👆）

| 方法             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| .duration()      | 获取或设置动画持续的时间。                                   |
| .totalDuration() | 获取或设定全部重复的动画的持续时间。                         |
| .time()          | 获取或设置当前动画时间。                                     |
| .totalTime()     | 获取或设置总的动画时长。                                     |
| .progress()      | 获取或者设置单次动画的进程（从0到1）                         |
| .totalProgress() | 获取或者设置总的动画进程（从0到1）                           |
| .delay()         | 获取或者设置动画的开始延迟秒数（帧）。                       |
| .invalidate()    | 刷新任何内部记录的开始/结束值，如果您想要重新启动动画而不恢复到以前记录的任何起始值，这将非常有用。 |
| .isActive()      | 指示动画当前是否处于活动状态                                 |
| .updateTo()      | 更新动画的值（当动画正在运行中）<br />updateTo()仅适合改变非插件值 |
| .startTime()     | 获取/设定动画在其父时间轴上的开始时间。                      |
| .endTime()       | 获取动画在父时间轴上的结束时间。                             |
| .repeat()        | 获取或者设定动画在第一次完成后的重复次数。                   |
| .repeatDelay()   | 获取或者设置每次重复动画之间的间隔时间（秒）                 |
| .yoyo()          | 获取或设置补间动画的yoyo的状态。<br/>如果你要使用yoyo的话，还需要设置repeat（动画重复次数） |



### 实例属性

> 介绍TweenLite/TweenMax实例的属性设置，如设置选择器、读取时间轴等
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/data>

总结：（具体看文档👆）

| 方法                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| .data                      | 可用于存储你需要的数据。                                     |
| TweenLite.defaultEase      | 用于更改`TweenLite`默认的缓动方式<br />默认是`Power1.easeOut`。 |
| TweenLite.defaultOverwrite | 设置TweenLite的默认overwrite模式。<br /> 默认是`"auto"`。    |
| TweenLite.onOverwrite      | 当一个补间动画被另外一个补间动画覆盖时产生的事件函数。       |
| TweenLite.selector         | 当动画接收字符串作为其目标时使用的选择器引擎                 |
| .target                    | 获取动画的目标对象。                                         |
| .timeline                  | 获取动画的父级时间轴对象（只读）。                           |
| .vars                      | 一个存储了传递给构造器的配置变量的对象。包含动画选项和回调函数等。 |
| TweenMax.ticker            | 设置动画核心引擎，每当引擎update时这个对象将分配tick事件，你可以添加你自己的lisener来运行自定义逻辑（非常适合游戏开发人员） 。 |



### 实例方法

> 介绍TweenLite/TweenMax实例的函数方法，如删除动画、动画渲染
>
> 官方文档：<https://www.tweenmax.com.cn/api/tweenmax/TweenMax.getTweensOf()>

总结：（具体看文档👆）

| 方法                          | 描述                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| TweenMax.getTweensOf()        | 用来获取某个物体上的所有TweenLite、TweenMax对象              |
| TweenMax.getAllTweens()       | 获取所有动画实例的数组（或时间轴，不包括根时间轴）。         |
| .kill()                       | 消灭整个动画或部分参数。返回self便于链式调用。               |
| TweenMax.killDelayedCallsTo() | 立刻杀死所有延迟执行函数。                                   |
| TweenMax.killTweensOf()       | 移除指定对象的所有动画（或特定动画属性）或移除延迟执行函数。 |
| TweenMax.killAll()            | 删除所有补间动画或延迟执行函数或时间轴，可选择强制它们先完成。 |
| TweenMax.killChildTweensOf()  | 删除/杀死（kill）特定DOM元素的子元素的所有补间动画，可选择强制它们首先完成。 |
| TweenLite.render()            | 强制渲染所有活动的补间动画。                                 |
| TweenMax.lagSmoothing()       | 卡顿平滑补偿机制，当你的动画卡住时平分卡顿的时间使其看起来不是很卡。 |
| TweenMax.globalTimeScale()    | 用来读取或设置所有动画的全局播放速率，例如1为正常速度，0.5为一半速度，2为2倍速度，能取的最小值为0.0001。 |
| TweenMax.isTweening()         | 判断一个元素是否处于动画激活状态，返回true或false。元素在时间轴上反方向移动或者加/减速时会出现错判。 |
| TweenMax.pauseAll()           | 暂停所有动画或时间轴或回调函数。                             |
| TweenMax.resumeAll()          | 恢复运行所有暂停的动画或时间轴或回调函数。                   |



## TimeLineMax/TimeLineLite

> **TimelineLite/TimelineMax**是GreenSock 动画平台中的动画组织、排序、管理工具，可创建时间轴（timeline）作为动画或其他时间轴的容器，这使得整个动画控制和精确管理时间变得简单。
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/>

我们已经在API上面标明了哪些方法是公用的，哪些是TimeLineMax独有的

[该页面的尾部总结了共有和独享的方法](https://www.tweenmax.com.cn/api/timelinemax/)



### 时间轴初始化及动画管理
> 介绍了创建时间轴及添加删除动画的各种方法
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/TimelineMax()>

总结：（具体看文档👆）

以下大部分方法：返回该时间轴以便链式调用。

| 方法              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| TimelineMax()     | 构建一个TimelineMax实例，创建时间轴。<br />配置你的TimelineMax，可配置时间轴选项和回调函数等 |
| .add()            | 向时间轴添加动画、其他时间轴、回调函数或标签（或它们的数组）。 |
| .addCallback()    | 在特定位置插入回调函数。                                     |
| .addLabel()       | 在时间轴上添加一个标记，便于标记重要位置/时间。              |
| .addPause()       | 在时间轴上添加一个暂停点。                                   |
| .remove()         | 从时间轴上移除一个动画、时间轴、函数或标签(或者他们的数组)。 |
| .removeCallBack() | 从特定位置移除回调函数。如果没有设置时间点或者标记，则移除所有该回调函数。 |
| .removeLabel()    | 从时间轴中删除标记。你也可以使用remove()方法来移除。         |
| .removePause()    | 删除通过`TimelineMax.addPause() `添加到时间轴的暂停点。      |
| .to()             | 添加一个`TweenLite.to()`动画到时间轴，相当于`add(TweenLite.to(...))` |
| .from()           | 添加一个`TweenLite.from()`动画到时间轴，相当于`add(TweenLite.from(...))` |
| .fromTo()         | 添加一个`TweenLite.fromTo()`动画到时间轴，相当于`add(TweenLite.fromTo(...))` |
| .staggerTo()      | 为一组目标设定相同的终点变化属性，但是错开一定的时间，创建成一个间隔均匀的动画序列。将此动画序列添加到时间轴。 |
| .staggerFrom()    | 为一组目标设定相同的起点变化属性，但是错开一定的时间，创建成一个间隔均匀的动画序列。将此动画序列添加到时间轴。 |
| .staggerFromTo()  | 为一组目标设定相同的起点和终点变化属性，但是错开一定的时间，创建成一个间隔均匀的动画序列。将此动画序列添加到时间轴。 |
| .set()            | 将零持续时间的动画添加到时间轴的末尾（或使用“位置”参数的其他位置）立即设置值（当虚拟播放头到达时间轴上的该位置时）。<br />这是一种方便的方法，可以完成同样类似于 `add( TweenLite.to(target, 0, {...}) ) `的事情，但代码较少。 |








### 时间轴初始设置
> 对时间轴进行一些初始化设置，如重复次数(`repeat`)缓动方式(`ease`)等
>
> 官方文档：

总结：（具体看文档👆）

| 方法               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| delay              | 时间轴动画开始之前的延迟秒数（或帧数）。`restart()` 无视delay。 |
| paused             | 如果设置为true，时间轴将在创建时立即暂停。默认false          |
| useFrames          | 当设置为true时，这个时间轴的时间模式基于帧而不是秒，一般帧速约为16.66ms（60帧/秒）。 |
| tweens             | 要将多个动画一起插入时间轴，可使用tweens属性，这比使用add()要简洁。<br />你可以将此选项与align 和stagger 属性结合使用，以使用最少的代码设置复杂序列。 |
| stagger            | 仅与tweens属性一起使用。它将tweens内的动画错开了一定的秒数（或帧），默认值为0。 |
| align              | 仅与tweens属性一起使用，设置tweens内的动画的对齐方式，默认为"normal"。 |
| autoRemoveChildren | 如果设置为true，则一旦子动画/时间轴完成，它们将自动被移除。 <br />这通常是不可取的，因为子动画可以防止时间后退（如果您想要reverse()或将进度设置得更低等等）。但是，它可以提高速度和内存管理。<br/>默认设置是：false（除了根时间轴）。 |
| smoothChildTiming  | 控制是否自动重新定位子动画/时间轴（更改其startTime），以便在动态更改属性时保持平滑播放。 |
| repeat             | 动画在第一次完成后应重复的次数。<br />要无限重复，请使用-1。 |
| repeatDelay        | 每次repeat之间的秒数（或帧）。                               |
| yoyo               | 如果设置yoyo为true，那么重复的动画将往返进行。默认为false。  |
| callbackScope      | 用于所有回调的范围（onStart，onUpdate，onComplete等）。<br />范围是“this”在任何回调中引用的内容。 |








### 时间轴事件
> 介绍了时间轴的事件函数，如开始事件(`onStart`)、结束事件(`onComplete`)、返回事件(`onReverseComplete`)等
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/onStart>

总结：（具体看文档👆）

| 方法    | 描述 |
| ------- | ---- |
| onStart |      |
|         |      |
|         |      |
|         |      |
|         |      |
|         |      |
|         |      |
|         |      |
|         |      |



### 时间轴播放组件
> 常用的时间轴播放组件，如播放（`play`）、暂停（`pause`）、重新播放（`restart`）等
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/play()>

总结：（具体看文档👆）

| 方法           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
|                |                                                              |
| .tweenTo()     | 创建一个线性动画，将时间轴播放到特定时间或标签，然后停止。   |
| .tweenFromTo() | 创建一个线性动画，将时间轴从某时间或标签播放到指定时间或标签，然后停止。 |
|                |                                                              |
|                |                                                              |
|                |                                                              |
|                |                                                              |
|                |                                                              |
|                |                                                              |


### 时间轴属性调整
> 列出了你可以获取到的时间轴属性以及调整他们的方法，如时间轴时长（`time`）、播放进度（`progress`）
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/delay()>

总结：（具体看文档👆）

| 方法         | 描述                                       |
| ------------ | ------------------------------------------ |
|              |                                            |
| .endTime()   | 获取时间轴的结束时间。                     |
| .startTime() | 获取或设置某个动画在其父时间轴上的起始时间 |
|              |                                            |
|              |                                            |
|              |                                            |
|              |                                            |
|              |                                            |
|              |                                            |


### 实例属性
> 介绍了TimelineLite/TimelineMax实例的属性设置，如设置数据、读取父时间轴等
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/.autoRemoveChildren>

总结：（具体看文档👆）

| 方法                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| .autoRemoveChildren | 如果设置为true，则子动画/时间轴在完成时会被自动移除（默认为false，除了根时间轴）。 |
|                     |                                                              |
| .smoothChildTiming  | 控制是否自动重新定位子动画/时间轴（更改其startTime），以便在动态更改属性时保持平滑播放。 |
| .timeline           | 获取父时间轴，所有的动画都依附于时间轴（默认是根时间轴），并只能有一个父时间轴 |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |



### 实例方法
> 介绍了TimelineLite/TimelineMax实例的函数方法，导出时间轴、清空时间轴等
>
> 官方文档：<https://www.tweenmax.com.cn/api/timelinemax/call()>

总结：（具体看文档👆）

| 方法                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| .call()                  | 在时间轴的末尾（或`position`位置）增加一个回调函数，作用类似于`add( TweenLite.delayedCall(...) )` |
| .clear()                 | 清空时间轴的所有动画，时间轴和回调函数（以及标签）。不会清除事件回调（如`onComplete`, `onUpdate`, `onStart`等）<br />如果你想清除可使用`eventCallback()`方法，如`myTimeline.eventCallback("onComplete", null);`。 |
| .currentLabel()          | 获取当前时间或之前最接近的`label`标记，或跳转到指定的`label`标记。<br/>如跳转则返回self（便于链式调用）。 |
| .eventCallback()         | 获取或设置一个事件，以及应传递给该回调事件的任何参数。       |
| TimelineMax.exportRoot() | 将全部动画、时间轴、函数（可选）从根时间轴导出至新的时间轴便于执行一些高级操作，并且不影响导出后创建的动画/时间轴。 |
| .getActive()             | 返回时间轴中当前处于活动状态的动画/时间轴，这意味着时间轴的播放头位于子动画/时间轴上，并且子项未暂停。 |
| .getChildren()           | 返回一个数组，其中包含嵌套在此时间轴中的所有动画和时间轴。   |
| .getLabelAfter()         | 返回time参数后面的下一个标签（如果有）。<br/>可配合`tweenTo()`使时间轴动画至该标记。 |
| .getLabelBefore()        | 返回在time参数之前发生的上一个label标记（如果有）。 <br />可配合`tweenTo()`使时间轴动画至该标记。 |
| .getLabelsArray()        | 返回一个标记对象数组，按时间轴中出现的顺序排列，每个标记对象有“time”和“name”属性。 |
| .getLabelTime()          | 返回特定标记的时间位置。                                     |
| .getTweensOf()           | 返回此时间轴内特定对象的动画（TweenLite和TweenMax）。        |
| .invalidate()            | 刷新任何内部记录的开始/结束值，如果您想要重新启动动画而不恢复到以前记录的任何起始值，这将非常有用。 |
| .isActive()              | 指示动画当前是否处于活动状态（意味着播放头在此实例的时间范围内正在活动，并且未暂停，也不是其任何祖先时间轴）。 |
| .kill()                  | 根据参数完全或部分kill时间轴。                               |
| .recent()                | 返回最近添加的子动画/时间轴/回调函数，无论其在时间轴中的位置如何。 |
| .shiftChildren()         | 将此时间轴的子项的开始时间（`startTime`）移动一定秒数或帧。当你想在某个点插入动画，将已存在的动画后移以腾出位置给新动画时，可以考虑使用此方法。 |
| .useFrames()             | 如果为true，则时间线的计时模式是基于帧而不是秒。             |






## 未

在GreenSock中，一些CSS属性对应到GreenSock中还是有些不同的。
- 比如transform中translate在GreenSock中使用x,y就对应着translate(x,y)。
- 任何的CSS属性需要从有－的写法变为驼峰式的写法。
- 比如background-color修改为backgroundColor等。
- 以及CSS中的transform:rotate()变为rotation。



**3D效果**

在平时的动效开发中，为了使动效具有立体的效果，一般会用到CSS3中的3D transform这一属性。在TweenMax中也提供了3D transform功能，支持CSS3D的全部属性，使用起来比CSS3更加方便。
perspective和transformPerspective两个属性。它们是TweenMax中运行的基础，使用它们才能使元素具有一个3D空间透视的表现能力。

transformPerspective是针对单个元素使用的，而perspective则是使用在父级元素上，使用它会使改父级元素下的子元素具有3D空间透视的一个展现形式。
只需要在父级使用perspective的方法，可以同时使它的子元素都具有3D的展现。

**transformOrigin**

transformOrigin是用来设置元素在做transform位移变换时的原点的。默认值是元素的中心点即("50%,50%")。transformOrigin有三个值(x,y,z)，z值是一个可选项。

可以使用"top", "left", "right",或者是"bottom"值亦或是百分值(比如bottom right可以设置为 "100% 100%)。



**.play()的补充说明**

由于序列动画（staggerTo()等）分解成了一个个动画，因此不能简单的使用tween动画的play()控制。可将序列动画添加至时间轴，再使用timeline的play()方法来播放。



**一些链式写法示例**

```js
myAnimation.duration(2).repeat(3).timeScale(2).play(0.5);

myAnimation.yoyo(true).repeat(3).timeScale(2).play(0.5);
```





















































<br>

---

> 参考文章：
>
> <https://segmentfault.com/a/1190000005366176>
>
> <http://svgtrick.com/book/greensock/>