---
title: mockjs模拟数据技巧总结（持续更新）
author: Cynthia
categories:
  - 工具
  - 前端工具
tags: []
date: 2019-04-30 11:15:47
---

🐰
...
<!--more-->

> 官方文档：https://github.com/nuysoft/Mock/wiki
>
> 实时演示：http://mockjs.com/0.1/editor.html
>
> 例子demo演示：http://mockjs.com/examples.html



## mock工具

[使用RAP2和Mock.JS实现Web API接口的数据模拟和测试](https://www.cnblogs.com/wuhuacong/p/10213540.html)

（可以前后端一起写模拟接口）

- [阿里妈妈 RAP2](http://rap2.taobao.org/)
  - [github](https://github.com/thx/rap2-delos)

- [easy-mock](https://easy-mock.com/)
  - [相关文章](https://juejin.im/post/58ff1fae61ff4b0066792f6e)

## 代码demo

http://rap2.taobao.org/repository/editor?id=162580&mod=238378&itf=884374

### json格式

#### 对象数组

```js
// mock代码
var data = Mock.mock({
    'categorys|3-5': [{}]
})

//生成
{
    "categorys": [
        {},
        {},
        {},
        {}
    ]
}
```
