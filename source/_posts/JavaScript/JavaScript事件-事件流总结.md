---
title: JavaScript事件-事件流总结
author: Cynthia
categories:
  - JavaScript
tags:
  - "\U0001F353无\U0001F353"
date: 2019-05-20 10:36:11
---

🐰
...
<!--more-->

## 事件

**事件是文档或者浏览器窗口中发生的，特定的交互瞬间。**

事件是用户或浏览器自身执行的某种动作，如 `click` , `load` 和 `mouseover` 都是**事件的名字**。

事件是javaScript和DOM之间交互的桥梁。

典型的例子有：

- 页面加载完毕触发 `load事件` ；
- 用户单击元素，触发 `click事件` 。



## 事件流

**事件流描述的是从页面中接收事件的顺序。**



### 事件流感性认识

问题：单击页面元素，什么样的元素能感应到这样一个事件？

答案：单击元素的同时，也单击了元素的容器元素，甚至整个页面。

[例子](http://jsrun.net/4gyKp)：有三个同心圆， 给每个圆添加对应的事件处理函数，弹出对应的文字。单击最里面的圆，同时也单击了外面的圆，所以外面圆的click事件也会被触发。
（如果下方例子没有出现，请多刷新几次页面或者直接点击例子链接查看）

<script async src="//jsrun.net/4gyKp/embed/all/dark/"></script>



### 事件流

事件传播的顺序对应浏览器的两种事件流模型：捕获型事件流和冒泡型事件流。

**冒泡型事件流**：事件的传播是从**最特定**的**事件目标**到最不特定的**事件目标**。即从DOM树的叶子到根。**【推荐】**

**捕获型事件流**：事件的传播是从**最不特定**的**事件目标**到最特定的**事件目标**。即从DOM树的根到叶子。

事件捕获的思想就是不太具体的节点应该更早接收到事件，而最具体的节点最后接收到事件。

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="myDiv">Click me!</div>
</body>
</html>
```

上面这段html代码中，单击了页面中的<div>元素，

在[冒泡型事件流](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190520105427.png)中click事件传播顺序为**<div>**—》**<body>**—》**<html>**—》**document**

在[捕获型事件流](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190520105512.png)中click事件传播顺序为**document**—》**<html>**—》**<body>**—》**<div>**



**note**:

- 所有现代浏览器都支持事件冒泡，但在具体实现中略有差别：IE5.5及更早版本中事件冒泡会跳过\<html>元素(从body直接跳到document)。

- IE9、Firefox、Chrome、和Safari则将事件一直冒泡到window对象。IE9、Firefox、Chrome、Opera、和Safari都支持事件捕获。尽管DOM标准要求事件应该从document对象开始传播，但这些浏览器都是从window对象开始捕获事件的。

- 由于老版本浏览器不支持，很少有人使用事件捕获。**建议使用事件冒泡**。



### DOM事件流

DOM标准采用捕获+冒泡。两种事件流都会触发DOM的所有对象，从document对象开始，也在document对象结束。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190520105950.png)



DOM标准规定事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

- 事件捕获阶段：**实际目标**（\<div>）在捕获阶段**不会接收事件**。也就是在捕获阶段，事件从document到\<html>再到\<body>就停止了。上图中为1~3.
- 处于目标阶段：事件在\<div>上发生并处理。**但是事件处理会被看成是冒泡阶段的一部分**。
- 冒泡阶段：事件又传播回文档。

**note**:

- 尽管“DOM2级事件”标准规范明确规定事件捕获阶段不会涉及事件目标，但是在IE9、Safari、Chrome、Firefox和Opera9.5及更高版本都会在捕获阶段触发事件对象上的事件。结果，就是有两次机会在目标对象上面操作事件。

- 并非所有的事件都会经过冒泡阶段 。所有的事件都要经过捕获阶段和处于目标阶段，但是有些事件会跳过冒泡阶段：如，获得输入焦点的focus事件和失去输入焦点的blur事件。

[两次机会在目标对象上面操作事件例子](http://jsrun.net/SgyKp)

（如果下方例子没有出现，请多刷新几次页面或者直接点击例子链接查看）

<script async src="//jsrun.net/SgyKp/embed/all/dark/"></script>



⭐ [该例子和上一个例子的区别](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190520110558.png)





## IE事件流和DOM事件流的区别

### **执行的顺序不一样**

```html
<body>
    <div>
        <button id="btn">点击</button>
    </div>
</body>
```



- 冒泡型事件模型： button->div->body (IE事件流)

- 捕获型事件模型： body->div->button (Netscape事件流)

- DOM事件模型： body->div->button->button->div->body (先捕获后冒泡)

 

### **事件侦听函数的区别** 

**IE使用:** 

```js
[Object].attachEvent("name_of_event_handler", fnHandler); //绑定函数 
[Object].detachEvent("name_of_event_handler", fnHandler); //移除绑定 
```

**DOM使用：** 

```js
[Object].addEventListener("name_of_event", fnHandler, bCapture); //绑定函数 
[Object].removeEventListener("name_of_event", fnHandler, bCapture); //移除绑定 
```



### 参数不一样和this指向不一样



#### IE下注册多个事件监听器与移除监听器方法

##### 注册多个事件监听器

```js
element.attachEvent('onclick', observer);
```

 

attachEvent接受**两个参数**。

> 第一个参数是事件名称
>
> 第二个参数observer是回调处理函数。

这里得说明一下，有个经常会出错的地方，IE下利用attachEvent注册的处理函数调用时this指向不再是先前注册事件的元素，这时的**this**为**window对象**了，笔者很奇怪IE为什么要这么做，完全看不出好处所在。

##### 移除先前注册的事件的监听器

```js
 element.detachEvent('onclick', observer);
```

 



#### DOM标准下注册多个事件监听器与移除监听器方法

##### 注册多个事件监听器

实现DOM标准的浏览器与IE浏览器中注册元素事件监听器方式有所不同，它通过元素的addEventListener方法注册，该方法既支持注册冒泡型事件处理，又支持捕获型事件处理。

```js
 element.addEventListener('click', observer, useCapture);
```

addEventListener方法接受**三个参数**。

> 第一个参数是事件名称，值得注意的是，这里事件名称与IE的不同，事件名称是没’on’开头的;
>
> 第二个参数observer是回调处理函数;
>
> 第三个参数注明该处理回调函数是在事件传递过程中的捕获阶段被调用还是冒泡阶段被调用

它可以在一个DOM元素上绑定多个事件处理器，并且在处理函数内部，**this**关键字仍然指向**被绑定的DOM元素**，另外处理函数参数列表的第一个位置传递事件event对象。

##### 移除先前注册的事件的监听器

```js
element.removeEventListener('click', observer, useCapture);
```



## 事件绑定和普通事件的区别

### 添加事件的方法不同

**普通添加事件的方法：**[onclick](https://www.runoob.com/jsref/event-onclick.html)

```js
var btn = document.getElementById("hello");
btn.onclick = function(){
    alert(1);
}
btn.onclick = function(){
    alert(2);
} 

// 执行上面的代码只会alert 2 
```



**事件绑定方式添加事件：**[addEventListener()](https://www.runoob.com/jsref/met-element-addeventlistener.html)

```js
var btn = document.getElementById("hello");
btn.addEventListener("click",function(){
    alert(1);
},false);
btn.addEventListener("click",function(){
    alert(2);
},false);

//  执行上面的代码会先alert 1 再 alert 2
```

👆关于这两者的区别：在上面事件流的章节里有更加详细的例子



### 是否可以添加多个事件

- 普通添加事件的方法不支持添加多个事件，最下面的事件会覆盖上面的
- 而事件绑定（addEventListener）方式添加事件可以添加多个，按照顺序依次执行。



### 是否支持DOM事件流

- 普通事件：不支持
- 事件绑定：支持



### 绑定的事件是否可以取消

- 普通方式绑定事件后，不可以取消
- addEventListener绑定后则可以用 removeEvenListener 取消



## 事件流的典型应用 -事件委托



### 什么是事件委托

它还有一个名字叫事件代理。

JavaScript高级程序设计上讲：
**事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。**

用取快递来解释这个现象，大家认真领会一下事件委托到底是一个什么原理：

> 有三个同事预计会在周一收到快递。为签收快递，有两种办法：
>
> 一是三个人在公司门口等快递；二是委托给前台MM代为签收。
>
> 现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

这里其实还有2层意思的：

> 第一，现在委托前台的同事是可以代为签收的，即程序中的现有的dom节点是有事件的；
>
> 第二，新员工也是可以被前台MM代为签收的，即程序中新添加的dom节点也是有事件的。



### 为什么要用事件委托

​	一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，**那如果是很多的dom需要添加事件处理呢？**比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li，然后给它们添加事件，那**这么做会存在什么影响呢？**

​	在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体**运行性能**，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起**浏览器重绘与重排**的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是**减少DOM操作**的原因；如果要用**事件委托**，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能**大大的减少与dom的交互次数，提高性能**；

​	每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了（内存不够用，是硬伤，哈哈），比如上面的100个li，就要占用100个内存空间，如果是1000个，10000个呢，那只能说呵呵了，如果用**事件委托**，那么我们就可以只**对它的父级（如果只有一个父级）这一个对象进行操作**，这样我们就**需要一个内存空间就够了**，是不是省了很多，自然性能就会更好。



> 总结：
>
> - 将多个事件处理器减少到一个，因为事件处理器要驻留内存，这样就提高了性能。
> - DOM更新无需重新绑定事件处理器，因为事件代理对不同子元素可采用不同处理方法。如果新增其他子元素（a,span,div等），直接修改事件代理的事件处理函数即可，不需要重新绑定处理器，不需要再次循环遍历。



### 事件委托的原理

事件委托是利用**事件的冒泡原理**来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件

举个例子：
> 页面上有这么一个节点树，div>ul>li>a;
> 比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div

有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，**这就是事件委托，委托它们父级代为执行事件**。



### 事件委托怎么实现？

#### 替代遍历循环

终于到了本文的核心部分了，哈哈，在介绍事件委托的方法之前，我们先来看一段**一般方法**的例子：

```html

<ul id="color-list">
    <li>red</li>
    <li>orange</li>
    <li>yellow</li>
    <li>green</li>
    <li>blue</li>
    <li>indigo</li>
    <li>purple</li>
</ul>
    
<script>
    var colorList=document.getElementById("color-list");
    var colors=colorList.getElementsByTagName("li");
    
    for(var i=0;i<colors.length;i++) {
       	colors[i].addEventListener('click',showColor,false);
    };
    
    function showColor(e) {
        e=e||window.event;
        var targetElement=e.target||e.srcElement;
        alert(targetElement.innerHTML);
    }
</script>
```

上面的代码的意思很简单，相信很多人都是这么实现的，我们看看有多少次的dom操作，首先要找到ul，然后遍历li，然后点击li的时候，又要找一次目标的li的位置，才能执行最后的操作，每次点击都要找一次li；

**那么我们用事件委托的方式做又会怎么样呢？**

```html
<ul id="color-list">
    <li>red</li>
    <li>orange</li>
    <li>yellow</li>
    <li>green</li>
    <li>blue</li>
    <li>indigo</li>
    <li>purple</li>
</ul>
    
<script>
    var colorList=document.getElementById("color-list");
    
    colorList.onclick = function() {
        alert(targetElement.innerHTML);
    }
</script>
```

这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发。

当然，这里当点击ul的时候，也是会触发的，那么问题就来了，**如果我想让事件代理的效果跟直接给节点的事件效果一样怎么办**，比如说只有点击li才会触发



**解决方法**

> li 的事件处理程序中检测 target 元素

**Event对象提供了一个属性叫target**，可以返回事件的目标节点，我们成为事件源。

也就是说，`target` 就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，**标准浏览器用e.target**，**IE浏览器用event.srcElement**，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用 `nodeName` 来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较

```js
var colorList=document.getElementById("color-list");

colorList.addEventListener('click',showColor,false);

function showColor(e) {
    e=e||window.event;
    var targetElement=e.target||e.srcElement;
    if(targetElement.nodeName.toLowerCase()==="li"){
        alert(targetElement.innerHTML);
    }
}
```

这样改下就只有点击li会触发事件了，且每次只执行一次dom操作，如果li数量很多的话，将大大减少dom的操作，优化的性能可想而知！

上面的例子是说li操作的是同样的效果，要是**每个li被点击的效果都不一样**，那么用事件委托还有用吗？

**一般的dom处理方式：**

```html
<div id="box">
    <input type="button" id="add" value="添加" />
    <input type="button" id="remove" value="删除" />
    <input type="button" id="move" value="移动" />
    <input type="button" id="select" value="选择" />
</div>

<script>
window.onload = function () {
    var Add = document.getElementById("add");
    var Remove = document.getElementById("remove");
    var Move = document.getElementById("move");
    var Select = document.getElementById("select");

    Add.onclick = function () {
        alert('添加');
    };
    Remove.onclick = function () {
        alert('删除');
    };
    Move.onclick = function () {
        alert('移动');
    };
    Select.onclick = function () {
        alert('选择');
    }
}
</script>
```

上面实现的效果我就不多说了，很简单，4个按钮，点击每一个做不同的操作，那么至少需要4次dom操作，**如果用事件委托，能进行优化吗？**

```js
window.onload = function(){
            var oBox = document.getElementById("box");
            oBox.onclick = function (ev) {
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.nodeName.toLocaleLowerCase() == 'input'){
                    switch(target.id){
                        case 'add' :
                            alert('添加');
                            break;
                        case 'remove' :
                            alert('删除');
                            break;
                        case 'move' :
                            alert('移动');
                            break;
                        case 'select' :
                            alert('选择');
                            break;
                    }
                }
            }
            
        }
```

用事件委托就可以只用**一次dom操作**就能完成所有的效果，比上面的性能肯定是要好一些的



#### 新添加的元素

现在讲的都是document加载完成的现有dom节点下的操作，那么如果是新增的节点，新增的节点会有事件吗？也就是说，一个新员工来了，他能收到快递吗？

**看一下正常的添加节点的方法：**

```html
<input type="button" name="" id="btn" value="添加" />
    <ul id="ul1">
        <li>111</li>
        <li>222</li>
        <li>333</li>
        <li>444</li>
    </ul>
```

现在是移入li，li变红，移出li，li变白，这么一个效果，然后点击按钮，可以向ul中添加一个li子节点

```js
window.onload = function(){
    var oBtn = document.getElementById("btn");
    var oUl = document.getElementById("ul1");
    var aLi = oUl.getElementsByTagName('li');
    var num = 4;

    //鼠标移入变红，移出变白
    for(var i=0; i<aLi.length;i++){
        aLi[i].onmouseover = function(){
            this.style.background = 'red';
        };
        aLi[i].onmouseout = function(){
            this.style.background = '#fff';
        }
    }
    //添加新节点
    oBtn.onclick = function(){
        num++;
        var oLi = document.createElement('li');
        oLi.innerHTML = 111*num;
        oUl.appendChild(oLi);
    };
}
```

这是一般的做法，但是你会发现，**新增的li是没有事件的**，说明添加子节点的时候，事件没有一起添加进去，这不是我们想要的结果，那怎么做呢？

**一般的解决方案会是这样**，将for循环用一个函数包起来，命名为mHover，如下：

```js
window.onload = function(){
    var oBtn = document.getElementById("btn");
    var oUl = document.getElementById("ul1");
    var aLi = oUl.getElementsByTagName('li');
    var num = 4;

    function mHover () {
        //鼠标移入变红，移出变白
        for(var i=0; i<aLi.length;i++){
            aLi[i].onmouseover = function(){
                this.style.background = 'red';
            };
            aLi[i].onmouseout = function(){
                this.style.background = '#fff';
            }
        }
    }
    mHover ();
    //添加新节点
    oBtn.onclick = function(){
        num++;
        var oLi = document.createElement('li');
        oLi.innerHTML = 111*num;
        oUl.appendChild(oLi);
        mHover ();
    };
}
```

虽然功能实现了，看着还挺好，但实际上无疑是**又增加了一个dom操作**，**在优化性能方面是不可取的**

那么有事件委托的方式，能做到优化吗？

```js
window.onload = function(){
    var oBtn = document.getElementById("btn");
    var oUl = document.getElementById("ul1");
    var aLi = oUl.getElementsByTagName('li');
    var num = 4;

    //事件委托，添加的子元素也有事件
    oUl.onmouseover = function(ev){
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            target.style.background = "red";
        }

    };
    oUl.onmouseout = function(ev){
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            target.style.background = "#fff";
        }

    };

    //添加新节点
    oBtn.onclick = function(){
        num++;
        var oLi = document.createElement('li');
        oLi.innerHTML = 111*num;
        oUl.appendChild(oLi);
    };
}
```

看，上面是用**事件委托的方式**，**新添加的子元素是带有事件效果的**，我们可以发现，当用事件委托的时候，**根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了**，其他的都是在js里面的执行，这样可以大大的**减少dom操作**，这才是事件委托的精髓所在。



### 实际应用例子

> 点击一个列表时，输出对应的索引

```js
<script>
    var ul=document.querySelector('ul');
    var lis=ul.querySelectorAll('ul li');
    ul.addEventListener('click', function (e) {
        var target= e.target;
        if(target.nodeName.toUpperCase()==='LI'){
            alert([].indexOf.call(lis,target));
        }
    },false)
</script>
```





### 总结

那什么样的事件可以用事件委托，什么样的事件不可以用呢？

适合用事件委托的事件：`click`，`mousedown`，`mouseup`，`keydown`，`keyup`，`keypress`。

值得注意的是，`mouseover` 和 `mouseout` 虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。

不适合的就有很多了，举个例子，`mousemove`，每次都要计算它的位置，非常不好把控，再比如说 `focus`，`blur` 之类的，本身就没用冒泡的特性，自然就不能用事件委托了。



















<br>

---

> 此文只做总结归纳，方便后续理解复习，并非全部原创，参考原文来自：
>
> <http://www.cnblogs.com/starof/p/4066381.html>
>
> https://www.cnblogs.com/nikiguo/p/8522317.html

```

```