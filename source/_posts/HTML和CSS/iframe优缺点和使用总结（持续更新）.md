---
title: iframe优缺点和使用总结（持续更新）
author: Cynthia
categories:
  - HTML和CSS
  - 🐰未分类🐰
tags: []
date: 2019-05-05 13:07:36
---

🐰
...
<!--more-->



## 基本概念和使用

### 基本属性

```html
<iframe src="demo.html" height="300" width="500" name="demo" scrolling="auto" sandbox="allow-same-origin"></iframe>
```

- `src` iframe页面地址，有同域跨域之分
- `height` iframe高度
- `width` iframe宽度
- `name` iframe命名，可通过window.frames[xxx]被调用
- `scrolling` iframe滚动模式
- `sandbox` html5新特性，用于限制iframe的功能



### 基本使用

我们可以通过 `contentWindow` 和 `contentDocument` 两个API获取iframe的window对象和document对象。

```js
let iframe = document.getElementById('demo');
let iwindow = iframe.contentWindow; // 获取iframe的window对象
let idoc = iframe.contentDocument; // 获取iframe的document对象
```

刚刚我们提到了iframe的name属性，我们也可以通过 `window.frames[iframeName]` 来调用iframe。

```js
let iframe = window.frames['demo']
```



**获取父级对象**

我们通过`window.self`，`window.parent`，`window.top`这三个属性分别获取自身window对象，父级window对象，顶级window对象。

```js
iframe1.self === iframe1			// 自身window对象
iframe2.parent === iframe1			// 父级window对象
iframe1.parent === window
iframe1.top === window				// 顶级window对象
```

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190505133000.png)



### 同域/跨域

#### 基本概念

什么是同域什么跨域咧？同域跨域的区别在哪咧？我们一般会使用iframe来进行父子页面的通信，然鹅父子页面是否同域决定了它们之间能否进行通信。

js遵循同源策略，即同协议，同域名，同端口号，否则都算跨域。

> 同源策略 是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript 的浏览器都会使用这个策略。实际上，这种策略只是一个规范，并不是强制要求，各大厂商的浏览器只是针对同源策略的一种实现。它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。

> 跨域 简单的来说，指的是两个资源非同源。（三个中有一个不同就算）
> 出于安全方面的考虑，页面中的JavaScript在请求非同源的资源时就会出 跨域问题 ——即跨域请求，这时，由于同源策略，我们的请求会被浏览器禁止。也就出现了 我们常说的 跨域 问题。



#### iframe跨域通讯之document.domain

对于主域相同子域不同的两个页面，我们可以通过document.domain + iframe来解决跨域通信问题。

举个🌰，网页a(<http://www.easonwong.com>)和网页b(<http://script.easonwong.com>)，两者都设置`document.domain = 'easonwong.com'`（这样浏览器就会认为它们处于同一个域下），然后网页a再创建iframe上网页b，就可以进行通信啦～！

网页a

```js
document.domain = 'easonwong.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.easonwong.com';
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = function(){
    let doc = ifr.contentDocument || ifr.contentWindow.document;
    // 在这里操纵b.html
};
```

网页b

```js
document.domain = 'easonwong.com';
```



#### iframe跨域通讯之postMessage

`postMessage` 是html5的新特性，具体介绍不在此赘述。

> postMessage介绍
>
> [MDN postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

> 兼容性 IE8以上
>
> [can I use](https://caniuse.com/#search=postmessage)

我们可以通过html5这个新特性进行iframe间的跨域通信
- 使用 `postMessage` 进行数据传递
- 通过 `Message` 监听通信事件。举个🌰

**网页a**

```js
document.domain = 'easonwong.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.easonwong.com';
ifr.style.display = 'none';
document.body.appendChild(ifr);
// 发送数据
ifr.postmessage('hello, I`m a', 'http://script.easonwong.com');
```

**网页b**

```js
// 监听message事件
window.addEventListener('message', receiver, false);
function receiver(e) {
    if (e.origin == 'http://www.easonwong.com') {
        if (e.data == 'hello, I`m a') {
            e.source.postMessage('hello, I`m b', e.origin);	// 信息
        }
    }
}
```















## iframe优缺点

### **优点**

- iframe能够把嵌入的网页原样展现出来；
- 模块分离，便于更改，如果有多个网页引用iframe，只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷；
- 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，增加代码的可重用；
- 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决；
- 重载页面时不需要重载整个页面，只需要重载页面中的一个框架页；
- 方便制作导航栏。

### **缺点** 

- 样式和脚本需要额外链入，调用外部页面,需要额外调用css,增加页面额外的请求次数，增加服务器的http请求
- 代码复杂，在网页中使用框架结构最大的弊病是搜索引擎的“蜘蛛”程序无法解读这种页面，会影响搜索引擎优化，不利于网站排名
- 框架结构有时会让人感到迷惑，滚动条除了会挤占有限的页面空间外会使iframe布局混乱，还会分散访问者的注意力，影响用户体验
- 链接导航疑问。运用框架结构时，必须保证正确配置所有的导航链接，否则，会给访问者带来很大的麻烦。比如被链接的页面出现在导航框架内，这种情况下访问者陷住了，因为此时他没有其他地点可去；
- 产生多个页面，不易管理
- 多数小型的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。



### 为什么尽量少用iframe

iframes提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。iframe的创建比其它包括scripts和css的 DOM 元素的创建慢了1-2个数量级。

使用iframe的页面一般不会包含太多iframe，所以创建DOM节点所花费的时间不会占很大的比重。

但带来一些其它的问题：onload事件以及连接池(connection pool)，**即**：

- iframe会阻塞主页面的Onload事件
- iframe和主页面共享连接池，会影响页面的并行加载。



- **iframes阻塞页面加载，影响网页加载速度**

    及时触发 window 的 onload 事件是非常重要的。onload 事件触发使浏览器的 “忙” 指示器停止，告诉用户当前网页已经加载完毕。当 onload事件加载延迟后，它给用户的感觉就是这个网页非常慢。

    window的onload 事件需要在所有 iframe 加载完毕后(包含里面的元素)才会触发，就会影响网页加载速度。

    > 通过 JavaScript 动态设置 iframe的SRC可以避免这种阻塞情况。



- **唯一的连接池**

    对每个 web 服务器来说，浏览器只打开极少的几个连接数。老的浏览器，包括 IE 6/7 和 Firefox 2，每个主机只有2个连接。在新的浏览器中，连接数增加了。Safari 3+和Opera 9+增至4个，Chrome 1+、IE 8及Firefox 3增至6个。

    在大多数浏览器中，连接被主页面和它的 iframe所共享，这意味着有可能iframe中的资源占用了可用连接而阻塞了主页面的资源加载。如果iframe中的内容同等重要，或比主页面更重要，这很好。然而在通常情况下iframe中的内容对页面来说不太重要，iframe 占用连接数是不可取的。
    
    > 一个解决方案是在优先级更高的资源下载完成后再动态的给iframe的src赋值。

总之，iframe会给你的页面性能带来冲击，尽可能不使用iframe，当确实需要时，谨慎地使用他们。目前框架的优点可以使用Ajax实现，这在某种角度也是一种替代方案。



## iframe的应用场景

iframe的页面和父页面（parent）是分开的，所以它意味着，这是一个独立的区域，不受 parent的CSS或者全局的JavaScript的影响。

- **异步请求**

  > 在很久很久很久以前，久到ajax还没出现的时候，人们会用iframe来进行异步请求。大概就是异步创建iframe，然后后台返回数据在iframe中，我们在从里面获取数据。
  >
  > 例如在我做过的一个项目中，通过iframe.src传入一个文件下载地址，实现无需打开新窗口下载文件。

- 典型的，比如所见即所得的**网页编辑器**

- **跨域通信**。JavaScript跨域总结与解决办法 ，类似的还有浏览器多页面通信，比如音乐播放器，用户如果打开了多个tab页，应该只有一个在播放

- **历史记录管理**，解决ajax化网站响应浏览器前进后退按钮的方案，在html5的history api不可用时作为一种替代

- 纯前端的**utf8和gbk编码互转**。比如在utf8页面需要生成一个gbk的encodeURIComponent字符串，可以通过页面加载一个gbk的iframe，然后主页面与子页面通信的实现转换

- 用iframe实现**无刷新文件上传**，在FormData不可用时作为替代方案

- **创建一个全新的独立的宿主环境**。iframe还可以用于创建新的宿主环境，用于隔离或者访问原始接口及对象，比如有些前端安全的防范会覆盖一些原生的方法防止恶意调用，通过创建一个iframe，然后从iframe中取回原始对象和方法来破解这种防范；

- 用来**加载广告**，例如联盟广告

- 一般**邮箱**使用iframe，如QQ邮箱

- 一些简单的**后台页面**。

- 需要独立样式和带有交互的内容，例如**幻灯片**

- **sandbox沙箱隔离**



















<br>

---

> 参考文章：
>
> <https://blog.csdn.net/baxiadsy_csdn/article/details/86245809>
>
> <https://www.jianshu.com/p/7ec986aa28a7>