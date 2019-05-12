---
title: flex布局
author: Cynthia
categories:
  - null
tags: []
date: 2019-05-12 15:44:09
---

🐰
...
<!--more-->

## flex属性计算详解

```scss
flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
```

`Flex-grow`、`Flex-shrink`、`Flex-basis` 是**Flex属性**的分写模式；
如 `.box { flex: 4 3 100px; }` 等于 `.box { flex-grow: 4; flex-shrink: 3; flex-basis: 100px; }` 


- `flex-grow` 是扩展比率 
- `flex-shrink` 是收缩比率 
- `flex-basis` 伸缩基准值 


看以下例子
```html
<div class="flex-parent"> 
	<div class="flex-son"></div> 
	<div class="flex-son"></div> 
	<div class="flex-son"></div> 
</div> 

<style type="text/css"> 
	.flex-parent { width: 800px; } 
</style> 
```

### 第一种情况

> 当子元素的总量<父元素时

 `flex-parent` 是父级，而且他的宽度是固定为800px，不会改变； 

开始设置子级flex属性： 

```html
<style type="text/css"> 
	.flex-son:nth-child(1){ flex: 3 1 200px; } 
	.flex-son:nth-child(2){ flex: 2 2 300px; } 
	.flex-son:nth-child(3){ flex: 1 3 500px; } 
</style> 
```
`flex-basis` 总和加起来为 200px + 300px + 500px = 1000px； 

**那么 1000px > 800px (父级的宽度)；子元素势必要压缩；溢出了200px；** 

```scss
son1 = (flex-shrink) * flex-basis； // 1*200px = 200px
son2 = (flex-shrink) * flex-basis； // 2*300px = 600px
....
sonN = (flex-shrink) * flex-basis； // 3*500px = 1500px
```

如果 `flex-basis` 的总和加起来大于父级宽度，子级被压缩，最后的选择是 `flex-shrink` 来进行压缩计算 
**加权值 = son1 + son2 + …. + sonN；** 

所以最后的加权值是 
1\*200 + 2\*300 + 3\*500 = 2300px 

那么压缩后的计算公式就是 
**压缩后宽度 w = (  子元素flex-basis值 * (flex-shrink) / 加权值  ) * 溢出值** 

所以：
son1的扩展量：(200 * 1/ 2300) * 200，即约等于16px； 
son2的扩展量：(300 * 2/ 2300) * 200，即约等于52px； 
son3的扩展量：(500 * 3/ 2300) * 200，即约等于130px； 

最后son1、son2、son3，的实际宽度为： 
200 – 16 = 184px； 
300 – 52 = 248px； 
500 – 130 = 370px；  

### 第二种情况 

> 当子元素总量>父元素时

上面的例子已经说明，继续看第二个例子，同样上面的例子，我们改下父级宽度为1200px; 

`flex-basis` 的总和为 1000px，小于父级宽度，将有200px的剩余宽度； 
既然有剩余，我们就不要加权计算，剩余的宽度将根据 `flex-grow `值的总和进行百分比，那么200px就会根据份数比来分配剩余的空间；


**剩余后宽度 w = (  子元素flex-grow值 / 所有子元素flex-grow的总和  ) * 剩余值**

总分数为 total = 1 + 2 + 3； 
son1的扩展量：(3/total) * 200，即约等于100px； 
son2的扩展量：(2/total) * 200，即约等于67px；
son3的扩展量：(1/total) * 200，即约等于33px；

最后son1、son2、son3，的实际宽度为： 
200 + 100 = 300px； 
300 + 67 = 367px； 
500 + 33 = 533px；  

### 总结 

所以以上两种情况下：

- 第一种 `flex-grow`是不列入计算公式的 
- 第二种 `flex-basis` 和 `flex-shrink` 是不列入计算公式的；



ok，上面的两种情况总结完毕，但是很多时候我们的父级是不固定的，那么怎么办？
其实很简单了，对照上面的公式，前提是已经设置了 `flex-basis` 值的元素，如果宽度的随机值小于 `flex-basis` 的时候就按第一种计算，反之第二种；明白了吧。

但是在实际中，我们**有些子元素不想进行比例分配**，永远是固定的，那么 **`flex` 就必须设置为none**；
否则设置的宽度（width）将无效； 



**一些缩写表示的意思：**

- `flex: 1 ` 其计算值为 `flex: 1 1 0%` 
- `flex: auto  `其计算值为 `flex: 1 1 auto`
- `flex: none  `其计算值为 `flex: 0 0 auto`

根据上面的公式：

- `flex：1` 的时候第一种方式其实是无效的，因为加权值是0，所以只能是第二种方式计算；
- `flex：none` 的时候，两种都失效，子元素不参与父级剩余还是溢出的分配



















<br>

---

> 参考：
>
> https://zhidao.baidu.com/question/1950248018695262828.html