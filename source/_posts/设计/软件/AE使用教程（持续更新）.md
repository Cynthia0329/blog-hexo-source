---
title: AE表达式使用教程（持续更新）
author: Cynthia
categories:
  - 设计
  - 软件
tags:
  - "\U0001F353无\U0001F353"
date: 2019-09-25 08:48:03
---

🐰
...
<!--more-->



> 官方指南：
>
> [After Effects 用户指南](https://helpx.adobe.com/cn/after-effects/user-guide.html?topic=/cn/zh-Hans/after-effects/morehelp/automation.ug.js)
>
> - [表达式和自动化](https://helpx.adobe.com/cn/after-effects/user-guide.html?topic=/cn/zh-Hans/after-effects/morehelp/automation.ug.js)
>   - [表达式基础知识](https://helpx.adobe.com/cn/after-effects/using/expression-basics.html#about_expressions)
>   - [表达式语言引用](https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html)
>   - [表达式示例](https://helpx.adobe.com/cn/after-effects/using/expression-examples.html)





## 表达式基础知识

> [表达式基础知识](https://helpx.adobe.com/cn/after-effects/using/expression-basics.html#about_expressions)

### [表达式语言](https://helpx.adobe.com/cn/after-effects/using/expression-basics.html#the_expression_language)



#### 索引和标签

> 在 After Effects 中从 1 开始为 Layer、Effect 和 Mask 元素建立索引。例如，“时间轴”面板中的第一个图层是 layer(1)。

通常，如果移动了图层、效果或蒙版，或者在产品更新和升级期间更改了参数，则**最好使用图层、效果或蒙版的名称而不是编号**，以避免混淆和错误。当您使用名称时，请始终将其括在直引号中。

```js
// 例如，这些表达式中的第一个比第二个更易于理解，即使您更改效果的顺序，第一个表达式也会继续运行

effect("Colorama").param("Get Phase From")  
effect(1).param(2)
```



#### 表达式时间

- 表达式中的时间始终采用**合成时间**（而不是图层时间）并且以秒计算。任何表达式的默认时间是将计算表达式的当前合成时间。

    下列表达式均使用默认合成时间并返回相同值： 

    ```js
      thisComp.layer(1).position 
      thisComp.layer(1).position.valueAtTime(time)
    ```

- 要使用**相对时间**，请向 time 参数添加增量时间值。例如，要在当前时间之前 5 秒获取位置值，请使用以下表达式： 

    ```js
      thisComp.layer(1).position.valueAtTime(time-5)
    ```

- 对**嵌套合成**中属性的默认时间引用使用原始默认合成时间，而不是重新映射的时间。但是，如果您使用 source 函数检索属性，则将使用重新映射的时间。

    例如，如果包含的合成中的图层源是嵌套合成，且包含的合成中有重新映射的时间，则当您使用以下表达式获取嵌套合成中图层的位置值时，位置值将使用合成的默认时间：

    ```js
      comp("nested composition").layer(1).position
    ```

    但是，如果您使用 source 函数访问图层 1，则位置值将使用重新映射的时间： 


<div class="note danger"><p>注意:
如果您在表达式中使用特定时间，After Effects 会忽略重新映射的时间。</p></div>

































