---
title: 用hexo写博客：相关标签和美化
author: Cynthia
categories:
  - Hexo博客
date: 2019-04-25 13:41:11
tags:
---

基于hexo + next6.0

<!-- more -->
## 主题原生支持

<span id="jump"></span>

### 文章中添加居中模块

- 方式一：
  
<blockquote class="blockquote-center">优秀的人，不是不合群，而是他们合群的人里面没有你</blockquote>

<details>
<summary>查看代码</summary> 
```html
<blockquote class="blockquote-center">优秀的人，不是不合群，而是他们合群的人里面没有你</blockquote>
```
</details>

<br>

- 方式二

{% cq %}
人生乃是一面镜子，
从镜子里认识自己，
我要称之为头等大事，
也只是我们追求的目的！
{% endcq %}

<details>
<summary>查看代码</summary> 
```
    {% cq %}
    人生乃是一面镜子，
    从镜子里认识自己，
    我要称之为头等大事，
    也只是我们追求的目的！
    {% endcq %}
```
</details>


### 引用站内文章

{% post_link Hexo博客/hexo相关的实用插件 %}

```scss

{% post_link 绝对路径 链接显示的文字（建议直接用文章名，当然不用也可以） %}

// 比如上面的示例
{% post_link 【记录和总结】/2019-04 Cynthia-的四月记录 %}
```



### 代码块红绿底色

```diff
/**
 * +为红色，-为绿色，设置为diff语言即可
*/
package l2f.gameserver.model;

+public abstract class L2Char extends L2Object {
-  public static final Short ERROR = 0x0001;
  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}
```



### note标签样式

```html
<div class="note default"><p>default</p></div>
```
<div class="note default"><p>default</p></div>


<br>
```html
<div class="note default"><p>default</p></div>
```
<div class="note primary"><p>primary</p></div>

<br>
```html
<div class="note default"><p>default</p></div>
```
<div class="note success"><p>success</p></div>

<br>
```html
<div class="note default"><p>default</p></div>
```
<div class="note info"><p>info</p></div>

<br>
```html
<div class="note default"><p>default</p></div>
```
<div class="note warning"><p>warning</p></div>

<br>
```html
<div class="note default"><p>default</p></div>
```
<div class="note danger"><p>danger</p></div>






## 利用html标签

### kbd标签

实现效果：

<kbd>Ctrl</kbd>

代码：

```html
<kbd>Ctrl</kbd>
```

### 折叠效果

实现效果：

<details>
<summary>查看代码</summary>
    ```html
    	我是代码块
    ```
</details>



代码：


```HTML
<details>
<summary>查看代码</summary>
    - 代码块
</details>
```

### 利用id进行页面跳转

[⬆ 回到顶部](#jump)

<details>
<summary>查看代码</summary>
    ```html
    <span id="jump"></span>
    [⬆ 回到顶部](#jump)
    ```
</details>



## 参考文章

- <https://sxxkearth.github.io/2018/11/30/Next%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F/>
  - 插入图标
  - 插入图片（调节位置和链接）
  - 自定义样式（比如蓝色的引用条）
  - 主题自带的note样式标签
  - 主题自带的label标签样式
  - 使用tabs标签样式（选项卡）
  - 插入音乐和视频
