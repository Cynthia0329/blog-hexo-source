---
title: js常用工具类方法（持续更新）
author: Cynthia
categories:
  - JavaScript
tags: []
date: 2019-05-10 09:06:55
---

🐰
...
<!--more-->

## 待整理

**获取URL的查询参数**

这个获取URL的查询参数代码，是我见过最精简的 `QAQ`

```js
// ?foo=bar&baz=bing => {foo: bar, baz: bing}

q={};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
q;
```



**生成随机颜色**

```js
// 使用JavaScript简洁代码生成随机十六进制代码

'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
```





**数组去重**

这是一个原生的JS函数但是非常简洁，Set接受任何可迭代对象，如数组[1,2,3,3]，并删除重复项

```js
[...new Set(arr)]
```





