---
title: 从一道题理解JS的事件循环（异步机制）
author: Cynthia
categories:
  - JavaScript
tags: [事件循环, 异步]
date: 2019-05-14 17:56:44
---

🐰
...
<!--more-->



## 相关待看文章

- js同步和异步  
  - [ ] [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
  - [ ] [理解 JavaScript 中的 macrotask 和 microtask](https://juejin.im/entry/58d4df3b5c497d0057eb99ff)
  - [ ] [setTimeout、Promise、Async/Await](https://blog.csdn.net/lunahaijiao/article/details/86716825)







## 题目

```js
//请写出输出内容
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');


/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```



## 涉及知识点

### 任务队列

首先我们需要明白以下几件事情：

- JS分为同步任务和异步任务
- 同步任务都在**主线程**上执行，形成一个**执行栈**
- 主线程之外，事件触发线程管理着一个**任务队列**，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦**执行栈**中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取**任务队列**，将可运行的异步任务添加到**可执行栈**中，开始执行。

根据规范，事件循环是通过[任务队列](https://www.w3.org/TR/html5/webappapis.html#task-queues)的机制来进行协调的。

- 一个 Event Loop 中，可以有一个或者多个**任务队列(task queue)**，一个任务队列便是一系列**有序任务(task)的**集合；
- 每个任务都有一个**任务源(task source)**，源自同一个任务源的 task 必须放到同一个任务队列，**从不同源来的则被添加到不同队列**。 
  - `setTimeout/Promise` 等API便是**任务源**，而进入任务队列的是他们**指定的具体执行任务**。



### 宏任务

**(macro)task**（又称之为宏任务），可以理解是**每次执行栈执行的代码**就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，会在一个(macro)task执行结束后，在下一个(macro)task 执行开始前，**对页面进行重新渲染**，流程如下：

```js
(macro)task->渲染->(macro)task->...
```

**(macro)task主要包含：**

- `script(整体代码)` 
- `setTimeout` 
- `setInterval `
- `I/O` `UI交互事件` 
- `postMessage` 
- `MessageChannel`
- `setImmediate(Node.js 环境)`



### 微任务

**microtask**（又称为微任务），**可以理解是在当前 task 执行结束后立即执行的任务**。
也就是说，在当前task任务后，下一个task之前，在渲染之前。

所以它的响应速度相比 `setTimeout`（setTimeout是task）会更快，因为**无需等渲染**。也就是说，在某一个macrotask 执行完后，就会**将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）**。

**microtask主要包含：**

- `Promise.then`
- `MutaionObserver`
- `process.nextTick(Node.js 环境)`



### 运行机制

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务[处理模型](https://www.w3.org/TR/html5/webappapis.html#event-loops-processing-model)是比较复杂的，但关键步骤如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

流程图如下：

[![mark](https://camo.githubusercontent.com/47479c8773d91e8eef4a359eca57bb1361183b9e/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643661353238626461662e6a7067)](https://camo.githubusercontent.com/47479c8773d91e8eef4a359eca57bb1361183b9e/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643661353238626461662e6a7067)

### Promise和async中的立即执行

我们知道 Promise 中的异步体现在 `then` 和 `catch` 中，所以**写在Promise中的代码是被当做同步任务立即执行的**。

而在 async/await 中，在出现 await 出现之前，其中的代码也是立即执行的。那么出现了 await 时候发生了什么呢？

### await做了什么

从字面意思上看 await 就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。

很多人以为 await 会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。
await里面的表达式会先执行一遍，**将await里面的代码加入到microtask中**，然后就会跳出整个async函数来执行后面的代码。

由于因为async await 本身就是promise+generator的语法糖。所以await后面的代码是microtask。所以对于下例中的

```js
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
```

等价于

```js
async function async1() {
	console.log('async1 start');
	Promise.resolve(async2()).then(() => {
                console.log('async1 end');
        })
}
```



## 回到本题

以上就本道题涉及到的所有相关知识点了，下面我们再回到这道题来一步一步看看怎么回事儿。

1. 首先，事件循环从宏任务(macrotask)队列开始，这个时候，宏任务队列中，只有一个script(整体代码)任务；当遇到任务源(task source)时，则会先分发任务到对应的任务队列中去。所以，上面例子的第一步执行如下图所示：

   [![img](https://camo.githubusercontent.com/15b3ae9733b0b5b6a144f519396ff88eaeca40fb/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643639623432316166332e706e67)](https://camo.githubusercontent.com/15b3ae9733b0b5b6a144f519396ff88eaeca40fb/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643639623432316166332e706e67)

2. 然后我们看到首先定义了两个async函数，接着往下看，然后遇到了 `console` 语句，直接输出 `script start`。输出之后，script 任务继续往下执行，遇到 `setTimeout`，其作为一个宏任务源，则会先将其任务分发到对应的队列中：

   [![img](https://camo.githubusercontent.com/0a6e6cd2cc52d18a0f97ec01659058e830305a45/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643639623432353530612e706e67)](https://camo.githubusercontent.com/0a6e6cd2cc52d18a0f97ec01659058e830305a45/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643639623432353530612e706e67)

3. script 任务继续往下执行，执行了async1()函数，前面讲过async函数中在await之前的代码是立即执行的，所以会立即输出`async1 start`。

   遇到了await时，会将await后面的表达式执行一遍，所以就紧接着输出`async2`，然后将await后面的代码也就是`console.log('async1 end')`加入到microtask中的Promise队列中，接着跳出async1函数来执行后面的代码。

   [![img](https://camo.githubusercontent.com/93ec5469b0846f0f161641fc718005dbe994d190/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f31382f356336616435383333376165642e706e67)](https://camo.githubusercontent.com/93ec5469b0846f0f161641fc718005dbe994d190/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f31382f356336616435383333376165642e706e67)

4. script任务继续往下执行，遇到Promise实例。由于Promise中的函数是立即执行的，而后续的 `.then` 则会被分发到 microtask 的 `Promise` 队列中去。所以会先输出 `promise1`，然后执行 `resolve`，将 `promise2` 分配到对应队列。

   [![img](https://camo.githubusercontent.com/6f617a237607ce7a71fabcab61d2952a8b412205/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f31382f356336616435383334376135652e706e67)](https://camo.githubusercontent.com/6f617a237607ce7a71fabcab61d2952a8b412205/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f31382f356336616435383334376135652e706e67)

5. script任务继续往下执行，最后只有一句输出了 `script end`，至此，全局任务就执行完毕了。

   根据上述，每次执行完一个宏任务之后，会去检查是否存在 Microtasks；如果有，则执行 Microtasks 直至清空 Microtask Queue。

   因而在script任务（宏任务）执行完毕之后，开始查找清空微任务队列。此时，微任务中， `Promise` 队列有的两个任务`async1 end`和`promise2`，因此按先后顺序输出 `async1 end，promise2`。当所有的 Microtasks （宏任务）执行完毕之后，表示第一轮的循环就结束了。

6. 第二轮循环依旧从宏任务队列开始。此时宏任务中只有一个 `setTimeout`，取出直接输出即可，至此整个流程结束。



## 原题拓展变式

### 变式一

在第一个变式中我将async2中的函数也变成了Promise函数，代码如下：

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    //async2做出如下更改：
    new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
    });
}
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();

new Promise(function(resolve) {
    console.log('promise3');
    resolve();
}).then(function() {
    console.log('promise4');
});

console.log('script end');
```

可以先自己看看输出顺序会是什么，下面来公布结果：

```js
script start
async1 start
promise1
promise3
script end
promise2
async1 end
promise4
setTimeout
```

在第一次macrotask执行完之后，也就是输出`script end`之后，会去清理所有microtask。所以会相继输出`promise2`，` async1 end` ，`promise4`，其余不再多说。

### 变式二

在第二个变式中，我将async1中await后面的代码和async2的代码都改为异步的，代码如下：

```js
async function async1() {
    console.log('async1 start');
    await async2();
    //更改如下：
    setTimeout(function() {
        console.log('setTimeout1')
    },0)
}
async function async2() {
    //更改如下：
	setTimeout(function() {
		console.log('setTimeout2')
	},0)
}
console.log('script start');

setTimeout(function() {
    console.log('setTimeout3');
}, 0)
async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

可以先自己看看输出顺序会是什么，下面来公布结果：

```js
script start
async1 start
promise1
script end
promise2
setTimeout3
setTimeout2
setTimeout1
```

在输出为`promise2`之后，接下来会按照加入setTimeout队列的顺序来依次输出，通过代码我们可以看到加入顺序为`3 2 1`，所以会按3，2，1的顺序来输出。

### 变式三

变式三是我在一篇面经中看到的原题，整体来说大同小异，代码如下：

```js
async function a1 () {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
})
console.log('script end')
```

无非是在微任务那块儿做点文章，前面的内容如果你都看懂了的话这道题一定没问题的，结果如下：

```js
script start
a1 start
a2
promise2
script end
promise1
a1 end
promise2.then
promise3
setTimeout
```

> tips：注意该题还涉及到promise的直接执行的顺序（具体请查看{% post_link  JavaScript/JS异步函数 JS异步函数-promise-基本用法%}）





<br>

---

> 本文只做整合理解，具体参考原文：
>
> <https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7>