---
title: 一些不容易注意到的js知识点
author: Cynthia
categories:
  - JavaScript
tags: []
date: 2019-05-10 08:54:15
---

🐰
...
<!--more-->

```js
1eN	N表示多少个0
比如1e5=100000
此方法可以用来简写
```



**函数调用也可以用二元表达式简写**

简化前：

```js
`function x() {    console.log("x");}function y() {    console.log("y");}let z = 3;if (z == 3) {    x();} else {    y();}`
```

简化后：

```js
`function x() {    console.log("x");}function y() {    console.log("y");}let z = 3;(z == 3 ? x : y)();`
```





































<br>

---

> 参考：
>
> <https://mp.weixin.qq.com/s?__biz=MzI5ODM3MjcxNQ==&mid=2247486656&idx=1&sn=33431b4041c06089ac51d00b4dfec462>
>
> 