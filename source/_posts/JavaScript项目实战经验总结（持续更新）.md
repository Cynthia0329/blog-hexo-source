---
title: JavaScript项目实战经验总结（持续更新）
author: Cynthia
categories:
  - "\U0001F430未分类\U0001F430"
tags:
  - "\U0001F353无\U0001F353"
date: 2019-06-05 13:45:33
---

🐰
...
<!--more-->



## HTML标签

### 多用h5语义化标签

```html
<body>
    <header>
        <nav> …… </nav>
    </header>
    <aside>
        <nav> …… </nav>
    </aside>
    <section> …… </section>
    <section> …… </section>
    <section> …… </section>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <footer>
        <address>……</address>
    </footer>
</body>
```





## 事件对象

### onscroll滚动事件

[滚动条事件window.onscroll](https://www.cnblogs.com/miangao/p/9970846.html)

**处理页面滚动事件：**

```js
// vue环境下
handleScroll() {
    var _self = this
    var tur = true
    var appOffset = document.getElementsByClassName('app-main')

    // 条件判断+延迟执行阻止scroll事件多次执行
    function haha() {
        console.log('你滚动了页面，进入判断')
        _self.$nextTick(() => {
            _self.setIsLoginShow(true)
        })
        tur = true
    }

    var oldTop = document.documentElement.scrollTop || document.body.scrollTop

    window.onscroll = function() {
        var newTop = document.documentElement.scrollTop || document.body.scrollTop
        var OffTop = newTop - oldTop // 滚动的偏移量

        // 排除：1.当用户没有登录 2.登录框没有显示时 3.非处理页面
        if (!_self.isLogin && !_self.isLoginShow)  {
            if (_self.notHandlePath.indexOf(_self.$route.path) !== -1) {
                return
            } else {
                if (tur && OffTop > 50 || OffTop < -50) {
                    setTimeout(haha, 500);
                    tur = false
                } else {
                    return
                }
            }
        }
    }
},
```





## 方法封装

- 可以给封装的方法的形参中添加一个回调函数，以达到多种不同情况的额外应用

  ```js
  function test(call) {
      //...函数方法
      if(call) call()
  }
  
  // 调用的不同情况
  // 普通调用
  test()
  
  // 额外情况调用
  test(() => {
      // 这里放额外需要在这个方法中另外调用的函数方法
  })
  ```