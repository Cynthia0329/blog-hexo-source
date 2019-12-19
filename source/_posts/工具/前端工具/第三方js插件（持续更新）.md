---
title: 第三方js插件（持续更新）
author: Cynthia
categories:
  - 工具
  - 前端工具
tags:
  - "\U0001F353无\U0001F353"
date: 2019-12-19 10:00:46
---

🐰
...
<!--more-->



## 待分类

- [js-cookie](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=js-cookie&oq=vue-js-modal&rsv_pq=b3831c4400006399&rsv_t=a31fsazUzRuxTpF5KWAoTrfvJSoMiliKTZ9scIwAUvNnaJkuKLiw2sPZiEs&rqlang=cn&rsv_enter=1&inputT=647&rsv_n=2&rsv_sug3=4&bs=vue-js-modal) （一个轻量的JavaScript库来处理cookie）
- [clipboard.js](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=clipboard&oq=express%25E4%25B9%25A6%25E7%25B1%258D&rsv_pq=d915ef7400024d99&rsv_t=7d2aEHq3%2FOC2YdLgXT%2BasHo6VTX9zuQ8OZJL3nHPYaCeq7ZRJQH9xV9y1qk&rqlang=cn&rsv_enter=1&inputT=914&rsv_n=2&rsv_sug3=15&rsv_sug1=11&rsv_sug7=100&rsv_sug2=0&rsv_sug4=915)   （点击复制）
- [NProgress.js](http://ricostacruz.com/nprogress/)   （轻量的**全局**进度条控制）
- [FastClick](https://github.com/ftlabs/fastclick)   （*移动端点击事件消除300ms延迟* - 目前最佳方案）



## 具体使用

### Moment.js

> [Moment.js](https://www.jianshu.com/p/e5b7c0606a3f)     （时间处理工具库）

格式化date类型和字符串类型

```js
moment(new Date()).format('YYYYMMDD')
moment(new Date()).format('YYYY-MM-DD')
moment('20191025').format('YYYY-MM-DD')	// 2019-10-25
```





### lodash.js

> [官网](https://www.lodashjs.com/)
>
> 一个一致性、模块化、高性能的 JavaScript 实用工具库
>
> 使用时注意：很多工具方法[在新的ES中已经集成](https://www.zcfy.cc/article/10-lodash-features-you-can-replace-with-es6-467.html)，优先考虑原生函数，再使用工具库

#### 已使用汇总

- `_.round`
  - 根据精度，进行四舍五入



#### 数组Array
> 文档：https://www.lodashjs.com/docs/latest

- `_.chunk(array, [size=1])`
  - 返回一个包含拆分区块的新数组（相当于一个二维数组）
- `_.compact(array)`
  - 去除false, null, 0, "", undefined, 和 NaN 等假值，返回一个新数组





#### clone相关
> 文档：https://www.lodashjs.com/docs/latest

- `_.clone(value)`
  - 创建一个 value 的浅拷贝
- `_.cloneWith(value, [customizer])`
  - 类似 _.clone，除了它接受一个 customizer 定制返回的克隆值。
- `_.cloneDeep(value)`
  - 创建一个 value 的深拷贝
- `_.cloneDeepWith(value, [customizer])`
  - 类似 _.cloneWith，深拷贝











































