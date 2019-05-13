---
title: JS异步函数
author: Cynthia
categories:
  - JavaScript
tags: []
date: 2019-05-06 09:35:09
---

🐰
...
<!--more-->

## 待整理文章

- [深入理解 promise：promise的三种状态与链式调用](https://www.jianshu.com/p/dc61ea153874)
  - 只整理了第一节，后面的看不懂（等之后深入理解之后再继续看）



## 同步与异步

我们知道，JavaScript的执行环境是**「单线程**」。 
所谓单线程，是指JS引擎中负责解释和执行JavaScript代码的线程只有一个，也就是一次只能完成一项任务，这个任务执行完后才能执行下一个，它会「阻塞」其他任务。这个任务可称为**主线程**。 
但实际上还有其他线程，如事件触发线程、ajax请求线程等。

这也就引发了同步和异步的问题。

### 同步

同步模式，即上述所说的单线程模式，**一次**只能执行**一个**任务，函数调用后需等到函数执行结束，返回执行的结果，才能进行下一个任务。如果这个任务执行的时间较长，就会导致「**线程阻塞**」。

```js
/* 例2.1 */
var x = true;
while(x);
console.log("don't carry out");    //不会执行复制代码
```

上面的例子即同步模式，其中的while是一个死循环，它会阻塞进程，因此第三句console不会执行。 
同步模式比较简单，也较容易编写。但问题也显而易见，如果请求的时间较长，而阻塞了后面代码的执行，体验是很不好的。因此对于一些耗时的操作，异步模式则是更好的选择。

### 异步

下面就来看看异步模式。 
异步模式，即与同步模式相反，可以一起执行**多个任务**，函数调用后不会立即返回执行的结果，如果任务A需要等待，可先执行任务B，等到任务A结果返回后再继续回调。 
最常见的异步模式就数定时器了，我们来看看以下的例子。

```js
/* 例2.2 */
setTimeout(function() {
    console.log('taskA, asynchronous');
}, 0);
console.log('taskB, synchronize');
//while(true);

-------ouput-------
taskB, synchronize
taskA, asynchronous复制代码
```

我们可以看到，定时器延时的时间明明为0，但taskA还是晚于taskB执行。这是为什么呢？由于定时器是异步的，**异步任务会在当前脚本的所有同步任务执行完才会执行**。如果同步代码中含有死循环，即将上例的注释去掉，那么这个异步任务就不会执行，因为同步任务阻塞了进程。



## 回调函数

提起异步，就不得不谈谈回调函数了。上例中，`setTimeout`里的`function`便是回调函数。可以简单理解为：（执行完）回（来）调（用）的函数。
以下是WikiPedia对于`callback`的定义。

> In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time.

可以看出，回调函数是一段可执行的代码段，它以「参数」的形式传递给其他代码，在其合适的时间执行这段（回调函数）的代码。

WikiPedia同时提到

> The invocation may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback.

也就是说，回调函数不仅可以用于异步调用，一般同步的场景也可以用回调。在同步调用下，回调函数一般是最后执行的。而异步调用下，可能一段时间后执行或不执行（未达到执行的条件）。

```
/* 例2.3 */
/******************同步回调******************/
var fun1 = function(callback) {
    //do something
    console.log("before callback");
    (callback && typeof(callback) === 'function') && callback();
    console.log("after callback");
}
var fun2 = function(param) {
    //do something
    var start = new Date();
    while((new Date() - start) < 3000) { //delay 3s
    }
    console.log("I'm callback");
}
fun1(fun2);

-------output--------
before callback
//after 3s
I’m callback
after callback复制代码
```

由于是同步回调，会阻塞后面的代码，如果fun2是个死循环，后面的代码就不执行了。

上一小节中`setTimeout`就是常见的异步回调，另外常见的异步回调即ajax请求。

```
/* 例2.4 */
/******************异步回调******************/
function request(url, param, successFun, errorFun) {
    $.ajax({
        type: 'GET',
        url: url,
        param: param,
        async: true,    //默认为true,即异步请求；false为同步请求
        success: successFun,
        error: errorFun
    });
}
request('test.html', '', function(data) {
    //请求成功后的回调函数，通常是对请求回来的数据进行处理
    console.log('请求成功啦, 这是返回的数据:', data);
},function(error) {
    console.log('sorry, 请求失败了, 这是失败信息:', error);
});
```









## promise

什么是`Promise`呢？ 
以下是MDN对`Promise`的定义

> The Promise object is used for asynchronous computations. A Promise represents a single asynchronous operation that hasn't completed yet, but is expected in the future.
>
> 译文：Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。

### 为什么要使用promise？



### 三种状态

用new Promise实例化的Promise对象有三个状态：

- “has-resolution” - **Fulfilled**
  - reslove(成功时)，调用 `onFulfilled`
- "has-rejection" - **Rejected**
  - reject(失败时)。调用 `Rejected`
- "unresolve" - **Pending**
  - 既不是 resolve 也不是 reject 状态，也就是 Promise 刚刚被创建后的初始化状态。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190506094413.png)





**note：**

- 在Chrome中输出 `resolve` 可以得到 `Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}` 
  可以看出 `[[PromiseStatus]]` 中存储的就是 **Promise 的状态**，但是并没有公开访问 `[[PromiseStatus]]` 的用户API
  所以暂时还无法查询其内部状态。

- Promise 中的 `then` 的回调只会被调用一次
 因为 Promise 的状态只会从 `Pending` 变为 `Fulfilled` 或者 `Rejected` ，不可逆。



<br>

> promise有三种状态：pending/reslove/reject 。
>
> pending就是未决，resolve可以理解为成功，reject可以理解为拒绝。

一个简易的promise例子:

```js
let promiseDemo = new Promise((resolve, reject) => {
  // code
  resolve('success')
  // code 
  reject('failed') 
})

promiseDemo.then((result) => {
  console.log(result)
}, (result) => {
  console.log(result)
})
```

**promise的最终状态会凝固，成功了以后即便再执行 `reject('failed')` 状态也不会改变。**




### 方法


#### then与catch返回新的Promise

>  在Promise中无论是then还是catch方法，都会返回返回一个新的Promise对象。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190506095049.png)



```js
var aPromise = new Promise(function(resolve) {
  resolve(100)
})
var thenPromise = aPromise.then(function(value) {
  console.log(value)
})
var catchPromise = thenPromise.catch(function(error) {
  console.error(error)
})
console.log(aPromise !== thenPromise) // => true 
console.log(thenPromise !== catchPromise); // => true
```



所以像下面这样将链式调用分开写是不成功的

```js
// 1: 对同一个promise对象同时调用 then 方法
var aPromise = new Promise(function(resolve) {
  resolve(100)
})
aPromise.then(function(value) {
  return value * 2
})
aPromise.then(function(value) {
  return value * 2
})
aPromise.then(function(value) {
  console.log('1: ' + value) // => 100
})

```

由于每次调用then方法都会返回一个新的Promise，所以导致最终输出100而不是100 2 2。



#### Promise.all()

有时候需要多个彼此没有关联的多个异步任务全部执行完成后再执行后面的操作，这时候就需要用到`Promise.all()`，它接收一个Promise的对象的数组作为参数，当这个数组里的所有Promise对象全部变成 `resolve` 或者 `reject` 的时候，它才会去调用后面的 `.then()` 

这里需要说明一点，两个彼此无关的异步操作会同时执行，每个Promise的结果（即每个返回的Promise的resolve或reject时传递的参数）和传递给 `Promise.all` 的 Promise数组 的顺序一致。也就是说，假设有两个异步操作TaskA和TaskB，如果传入顺序为 `Promise.all([TaskA,TaskB])` ，则执行完成后传给 `.then`的顺序为`[TaskA,TaskB]` 

```js
 function setTime(time){
 return new Promise((resolve)=>{
 setTimeout(()=>resolve(time),time);
  })
 }
let startTime = Date.now();
Promise.all([setTime(1),setTime(100),setTime(200)])

   .then((value)=>{
     console.log(value);    //[1,100,200]
     console.log(Date.now() - startTime); //203
   });
```

从上面函数的输出值可以看出 `Promise.all()` 里的异步操作是同时执行的而且传给 `.then()`` 的顺序和Promise.all()` 里的顺序一样。

最终执行时间约为200ms，为什么不是200ms，这里涉及到关于 `setTimeout` 的精准问题，具体原因查看**JS的异步机制**相关文章



#### Promise.race()

`Promise.rance()` 的用法与 `Promise.all()` 类似，不同的地方在于 

- `Promise.all()` 是在接收到的**所有**Promise都变为 `FulFilled` 或者 `Rejected` 状态之后才会继续进行后面的处理
- 而 `Promise.race()` **只要有一个**Promise对象进入 `FullFilled` 或者 `Rejected` 状态，就会继续进行后续处理
- 这相当于 `Promise.all()` 进行**且运算** 而 `Promise.rance()` 进行**或运算**

但是这里有一点需要注意一下：

```js
var taskA = new Promise(function (resolve) {
    setTimeout(function () {
        console.log('this is taskA');
        resolve('this is taskA');
    }, 4);
});
var taskB = new Promise(function (resolve) {
    setTimeout(function () {
        console.log('this is taskB');
        resolve('this is taskB');
    }, 1000);
});

Promise.race([winnerPromise, loserPromise]).then(function (value) {
console.log(value);
 });

 /*
 输出结果：
this is taskA
this is taskA
this is taskB
*/
```

从这里可以看出，在第一个Promise变为 `FulFiled` 状态运行 `then` 里的回调后，后面的Promise并没有停止运行，而是接续执行。

也就是说， `Promise.race` 在第一个promise对象变为 `Fulfilled` 之后，并不会取消其他promise对象的执行。

#### Promise.resolve()

在Promise的链式调用中，有可能各个task之间存在相互依赖，例如TaskA想给TaskB传递一个参数，像下面这样：

```js
/*例1.使用Promise.resolve()启动*/
let task1 = (value1)=>value1+1;
let task2 = (value2)=>value2+2;
let task3 = (value3)=>{console.log(value3+3)};

Promise.resolve(1).then(task1).then(task2).then(task3);//console => 7

/*例2.普通的返回一个Promise*/
function task1(value1){
return new Promise((resolve,reject)=>{
 if(resolve){
  resolve(value1+1);
}else{
  throw new Error("throw Error @ task1");
}
});
}

function task2(value2){
return new Promise((resolve,reject)=>{
 if(resolve){
  resolve(value2+2);
}else{
  throw new Error("throw Error @ task1");
}
});
}
function task3(value3){
return new Promise((resolve,reject)=>{
 if(resolve){
  console.log(value3+3);
}else{
  throw new Error("throw Error @ task1");
}
});
}

 task1(1).then(task2).then(task3);//console => 7
```



关于 `reslove` 与 `reject` 有以下两点说明：

- `reslove` 函数的作用是将Promise对象的状态从“未完成”变为“成功”（即从**Pending**变为**Resolved**），在异步操作**成功时**调用，并将异步操作的**结果**作为参数传递出去；

- `reject` 函数的作用是将Promise对象状态从“未完成”变为“失败”（即从**Pending**变为**Rejected**），在异步操作**失败时**调用，并将异步操作报出的**错误**作为参数传递出去；



所以从上面的例子和它们的用法可以看出，如果想要传递给后面task有两种方法：

- 如果**使用 `Promise.resolve()` 启动Promise**，则像例1中那样在需要传递的参数前面加 `return` 即可。

- 如果是**利用Promise包装了任务**，则把想要传递给下一个task的参数传入 `resolve()` 即可。



**特别说明：**
如果需要 `resolve()` 往后传递多个参数，不能直接写 `resolve(a1,a2,a3)`，这样只能拿到第一个要传的参数，需要以数组或对象去传递

```js
let obj = {a1:a1,a2:a2,a3:a3};
resolve(obj)
//or
let arr =[a1,a2,a3];
resolve(arr);
```







### Promise的reject和异步操作error的理解

```js
function ReadEveryFiles(file){
return new Promise((resolve,reject)=>{
    if(resolve){
        fs.readFile(`${__dirname}/jQuery/${file}`,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                let obj = {data:data,file:file};
                resolve(obj);
            }
        });
    }else{
        //promise reject error
    }
 });
}
```

这里的readFile的error和Promise的reject不一样，一个是readFile过程中导致的错误，而另一个是Promise做处理的时候导致的错误
可以这样理解，**假设读取文件成功了**，但是Promise还需要讲这个异步操作得到的数据拿到处理，在Promise做这些操作的时候可能出错。


































<br>

---

> 参考文章：
>
> <https://www.jianshu.com/p/dc61ea153874>
>
> <https://www.jianshu.com/p/4e6be72236d6>
>
> <https://juejin.im/post/5cc3c54751882525166c4636#heading-2>