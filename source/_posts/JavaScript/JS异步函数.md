---
title: JS异步函数
author: Cynthia
categories:
  - JavaScript
tags: [异步, 回调函数]
date: 2019-05-06 09:35:09
---

🐰
...
<!--more-->

## 待整理文章

- [深入理解 promise：promise的三种状态与链式调用](https://www.jianshu.com/p/dc61ea153874)
  - 只整理了第一节，后面的看不懂（等之后深入理解之后再继续看）
- [[Javascript] Promise ES6 详细介绍](https://juejin.im/post/5cc3c54751882525166c4636#heading-12)
  - [.catch()](https://juejin.im/post/5cc3c54751882525166c4636#heading-11)
  - [.all()](https://juejin.im/post/5cc3c54751882525166c4636#heading-12)
- [Generator 异步](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=93380420_hao_pg&wd=Generator%20%E5%BC%82%E6%AD%A5&oq=Generator&rsv_pq=c960062e000697c5&rsv_t=0170vHYxrCJ3coY7RZdpEyMwy7lo5PBoZTGKCEUzY1vt8mgbEfiDIGC7kltaUnIEsWQbdhl6&rqlang=cn&rsv_enter=1&rsv_sug3=17&rsv_sug1=11&rsv_sug7=100&rsv_sug2=0&inputT=334298&rsv_sug4=334406)









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
console.log("don't carry out");    //不会执行
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
taskA, asynchronous
```

我们可以看到，定时器延时的时间明明为0，但taskA还是晚于taskB执行。这是为什么呢？由于定时器是异步的，**异步任务会在当前脚本的所有同步任务执行完才会执行**。如果同步代码中含有死循环，即将上例的注释去掉，那么这个异步任务就不会执行，因为同步任务阻塞了进程。



## 回调函数

提起异步，就不得不谈谈回调函数了。回调函数是实现异步的一种方式

上例中，`setTimeout` 里的 `function` 便是回调函数。
可以简单理解为：**（执行完）回（来）调（用）的函数**。
以下是WikiPedia对于`callback`的定义。

> In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time.

可以看出，回调函数是一段可执行的代码段，它**以「参数」的形式**传递给其他代码，在其合适的时间执行这段（回调函数）的代码。

WikiPedia同时提到

> The invocation may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback.

也就是说，回调函数不仅可以用于异步调用，一般同步的场景也可以用回调。

- 在同步调用下，回调函数一般是最后执行的。
- 而异步调用下，可能一段时间后执行或不执行（未达到执行的条件）。



### 同步回调

```js
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



### 异步回调

上一小节中 `setTimeout` 就是常见的异步回调，另外常见的异步回调即ajax请求。

```js
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



### 回调地狱

上面的ajax异步回调，如果我们在第一次ajax请求后，还要用它返回的结果再次请求呢？

```js
request('test1.html', '', function(data1) {
    console.log('第一次请求成功, 这是返回的数据:', data1);
    request('test2.html', data1, function (data2) {
        console.log('第二次请求成功, 这是返回的数据:', data2);
        request('test3.html', data2, function (data3) {
            console.log('第三次请求成功, 这是返回的数据:', data3);
            //request... 继续请求
        }, function(error3) {
            console.log('第三次请求失败, 这是失败信息:', error3);
        });
    }, function(error2) {
        console.log('第二次请求失败, 这是失败信息:', error2);
    });
}, function(error1) {
    console.log('第一次请求失败, 这是失败信息:', error1);
});
```

以上出现了多层回调嵌套，有种晕头转向的感觉。这也就是我们常说的厄运回调金字塔（Pyramid of Doom），编程体验十分不好。也被称作为回调地狱

为了解决这种状况，在ES6中引入了 `promise` ，在ES7中引入了更为优雅的 `async/await`

比如，用 `promise` 改写上述例子

```js
sendRequest('test1.html', '').then(function(data1) {
    console.log('第一次请求成功, 这是返回的数据:', data1);
    return sendRequest('test2.html', data1);
}).then(function(data2) {
    console.log('第二次请求成功, 这是返回的数据:', data2);
    return sendRequest('test3.html', data2);
}).then(function(data3) {
    console.log('第三次请求成功, 这是返回的数据:', data3);
}).catch(function(error) {
    //用catch捕捉前面的错误
    console.log('sorry, 请求失败了, 这是失败信息:', error);
});
```



## promise

什么是 `Promise` 呢？ 
以下是MDN对 `Promise` 的定义

> The Promise object is used for asynchronous computations. A Promise represents a single asynchronous operation that hasn't completed yet, but is expected in the future.
>
> 译文：Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。



### 三种状态

用new Promise实例化的Promise对象有三个状态：

- “has-resolution” - **Fulfilled**   代表操作成功
  - reslove(成功时)，调用 `onFulfilled`
- "has-rejection" - **Rejected**   代表操作失败
  - reject(失败时)。调用 `Rejected`
- "unresolve" - **Pending**   初始值
  - 既不是 resolve 也不是 reject 状态，也就是 Promise 刚刚被创建后的初始化状态。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190506094413.png)





**note：**

- 在Chrome中输出 `resolve` 可以得到 `Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}` 
  可以看出 `[[PromiseStatus]]` 中存储的就是 **Promise 的状态**，但是并没有公开访问 `[[PromiseStatus]]` 的用户API
  所以暂时还无法查询其内部状态。

- 注意：`Promise`一旦新建就会「立即执行」，无法取消。这也是它的缺点之一

- Promise 中的 `then` 的回调只会被调用一次

   > `Promise`有两种状态改变的方式，既可以从`pending`转变为`fulfilled`，也可以从`pending`转变为`rejected`。
   >
   > 一旦状态改变，就「凝固」了，会一直保持这个状态，不会再发生变化。
   >
   > 当状态发生变化，`promise.then`绑定的函数就会被调用。
   >
   > Promise 的状态只会从 `Pending` 变为 `Fulfilled` 或者 `Rejected` ，不可逆，所以 `then` 只会被调用一次



### 基本用法

- `resolve` 函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去； 
- `reject` 函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

一个简易的promise例子:

```js
let promiseDemo = new Promise((resolve, reject) => {
  /* 异步操作成功 */
  resolve('success')
  /* 异步操作失败 */
  reject('failed') 
})
```

**promise的最终状态会凝固，成功了以后即便再执行 `reject('failed')` 状态也不会改变。**

上述例子相当于

```js
let promiseDemo = new Promise((resolve, reject) => {
	if (/* 异步操作成功 */) {
        resolve(data);
    } else {
        /* 异步操作失败 */
        reject(error);
    }
})
```



<br>

---



Promise实例生成以后，可以用 `then` 方法指定 `resolved` 状态和 `reject` 状态的回调函数。

```js
promise.then(onFulfilled, onRejected);

promise.then(function(data) {
  // do something when success
}, function(error) {
  // do something when failure
});
```

> `then` 方法会返回一个Promise。
> 它有**两个参数**，分别为Promise从 `pending` 变为 `fulfilled` 和 `rejected` 时的回调函数（第二个参数非必选）。
> 这两个函数都**接受Promise对象传出的值作为参数**。

简单来说，`then` 就是定义 `resolve` 和 `reject` 函数的，其 `resolve` 参数相当于：

```js
function resolveFun(data) {
    //data为promise传出的值
}
```

而新建Promise中的 `resolve(data)` ，则相当于执行 `resolveFun` 函数。

**Promise新建后就会立即执行**。而 `then` 方法中指定的回调函数，将**在当前脚本所有同步任务执行完才会执行**。如下例：

```js
var promise = new Promise(function(resolve, reject) {
  console.log('before resolved');
  resolve();
  console.log('after resolved');
});

promise.then(function() {
  console.log('resolved');
});

console.log('outer');

-------output-------
before resolved
after resolved
outer
resolved

// 很明显可以看出：before resolved 和 after resolved 的输出顺序并不受 resolve() 的影响
// 而是直接执行
```

由于 `resolve` 指定的是异步操作成功后的回调函数，它需要等所有同步代码执行后才会执行，因此最后打印'resolved'










### 基本API

#### .then()

语法：`Promise.prototype.then(onFulfilled, onRejected)`

对promise添加 `onFulfilled` 和 `onRejected` 回调，并返回的是一个新的Promise实例（不是原来那个Promise实例），且返回值将作为参数传入这个新Promise的 `resolve` 函数。

因此，我们可以使用链式写法，如回调地狱中的例子

由于前一个回调函数，返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的**状态发生变化**，才会被调用。



#### .catch()

语法：`Promise.prototype.catch(onRejected)`

该方法是 `.then(undefined, onRejected)` 的别名，用于指定发生错误时的回调函数

[具体查看](https://juejin.im/post/5cc3c54751882525166c4636#heading-11)





#### .all()

语法：`Promise.all(iterable)`

该方法用于将多个Promise实例，包装成一个新的Promise实例。

```js
var p = Promise.all([p1, p2, p3]);
```

> 有时候需要多个彼此没有关联的多个异步任务全部执行完成后再执行后面的操作，这时候就需要用到`Promise.all()`
>
> 它接收一个Promise的对象的数组作为参数，当这个数组里的所有Promise对象全部变成 `resolve` 或者 `reject` 的时候，它才会去调用后面的 `.then()` 

这里需要说明一点，两个彼此无关的异步操作会同时执行，每个Promise的结果（即每个返回的Promise的resolve或reject时传递的参数）和传递给 `Promise.all` 的 Promise数组 的顺序一致。
也就是说，假设有两个异步操作TaskA和TaskB，如果传入顺序为 `Promise.all([TaskA,TaskB])` ，则执行完成后传给 `.then`的顺序为 `[TaskA,TaskB]` 

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

从上面函数的输出值可以看出 `Promise.all()` 里的异步操作是同时执行的而且传给 `.then()` 的，顺序和 `Promise.all()` 里的顺序一样。

最终执行时间约为200ms，为什么不是200ms，这里涉及到关于 `setTimeout` 的精准问题，具体原因查看 {% post_link JavaScript/JS的异步机制 JS的异步机制 %}



#### .race()

语法：`Promise.race(iterable)`

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

#### .resolve()

语法：

- `Promise.resolve(value);`
- `Promise.resolve(promise);`
- `Promise.resolve(thenable);`

它可以看做 `new Promise()` 的快捷方式。

```js
Promise.resolve('Success');

/*******等同于*******/
new Promise(function (resolve) {
    resolve('Success');
});
```

这段代码会让这个Promise对象立即进入 `resolved` 状态，并将结果 `success` 传递给 `then` 指定的  `onFulfilled` 回调函数。由于 `Promise.resolve()` 也是返回Promise对象，因此可以用 `.then()` 处理其返回值。

```js
// Resolving an value
Promise.resolve('success').then(function (value) {
    console.log(value);
});
-------output-------
Success


// Resolving an array
Promise.resolve([1,2,3]).then(function(value) {
  console.log(value[0]);    // => 1
});

// Resolving a Promise
var p1 = Promise.resolve('this is p1');
var p2 = Promise.resolve(p1);
p2.then(function (value) {
    console.log(value);     // => this is p1
});
```



<br>

---



`Promise.resolve()` 的另一个作用就是将 `thenable` 对象（即带有 `then` 方法的对象）转换为 promise 对象。

```js
var p1 = Promise.resolve({ 
    then: function (resolve, reject) { 
        resolve("this is an thenable object!");
    }
});
console.log(p1 instanceof Promise);     // => true

p1.then(function(value) {
    console.log(value);     // => this is an thenable object!
  }, function(e) {
    //not called
});
```



<br>

------



再看下面两个例子，无论是在什么时候抛异常，只要promise状态变成 `resolved` 或 `rejected` ，状态不会再改变，这和新建promise是一样的。

```js
//在回调函数前抛异常
var p1 = { 
    then: function(resolve) {
      throw new Error("error");
      resolve("Resolved");
    }
};

var p2 = Promise.resolve(p1);
p2.then(function(value) {
    //not called
}, function(error) {
    console.log(error);       // => Error: error
});

//在回调函数后抛异常
var p3 = { 
    then: function(resolve) {
        resolve("Resolved");
        throw new Error("error");
    }
};

var p4 = Promise.resolve(p3);
p4.then(function(value) {
    console.log(value);     // => Resolved
}, function(error) {
    //not called
});
```



<br>

### promise传递参数



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



所以从上面的例子和它们的用法可以看出，如果**想要传递给后面task有两种方法**：

- 如果**使用 `Promise.resolve()` 启动Promise**，则像例1中那样在需要传递的参数前面加 `return` 即可。

- 如果是**利用Promise包装了任务**，则把想要传递给下一个task的参数传入 `resolve()` 即可。



**特别说明：**
如果需要 `resolve()` 往后**传递多个参数**，不能直接写 `resolve(a1,a2,a3)`，这样只能拿到第一个要传的参数，需要以数组或对象去传递

```js
let obj = {a1:a1,a2:a2,a3:a3};
resolve(obj)
//or
let arr =[a1,a2,a3];
resolve(arr);
```





### 常见问题

#### then与catch返回新的Promise

> 在Promise中无论是then还是catch方法，都会返回返回一个新的Promise对象，而 `then` 内部只是返回的数据

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



所以可以查看下面两个例子的区别

```js
//方法1：对同一个promise对象同时调用 then 方法
var p1 = new Promise(function (resolve) {
    resolve(100);
});
p1.then(function (value) {
    return value * 2;
});
p1.then(function (value) {
    return value * 2;
});
p1.then(function (value) {
    console.log("finally: " + value);
});
-------output-------
finally: 100

//方法2：对 then 进行 promise chain 方式进行调用
var p2 = new Promise(function (resolve) {
    resolve(100);
});
p2.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("finally: " + value);
});
-------output-------
finally: 400

```

第一种方法中，`then` 的调用几乎是同时开始执行的，且传给每个then的value都是100，这种方法应当避免。
方法二才是正确的链式调用。









#### reject和异步操作error的区别

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



#### reject和catch的区别

- `promise.then(onFulfilled, onRejected)`
  在 `onFulfilled` 中发生异常的话，在 `onRejected` 中是捕获不到这个异常的。
- `promise.then(onFulfilled).catch(onRejected)`
  `.then` 中产生的异常能在 `.catch` 中捕获

> 一般情况，还是建议使用第二种，因为能捕获之前的所有异常。
>
> 当然了，第二种的 `.catch()` 也可以使用 `.then()` 表示，它们本质上是没有区别的
> `.catch === .then(null, onRejected)`

 

## Generator

[Generator 异步](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=93380420_hao_pg&wd=Generator%20%E5%BC%82%E6%AD%A5&oq=Generator&rsv_pq=c960062e000697c5&rsv_t=0170vHYxrCJ3coY7RZdpEyMwy7lo5PBoZTGKCEUzY1vt8mgbEfiDIGC7kltaUnIEsWQbdhl6&rqlang=cn&rsv_enter=1&rsv_sug3=17&rsv_sug1=11&rsv_sug7=100&rsv_sug2=0&inputT=334298&rsv_sug4=334406)







### 总结

#### 基本流程

总结一下创建promise的流程：

1. 使用`new Promise(fn)`或者它的快捷方式`Promise.resolve()`、`Promise.reject()`，返回一个promise对象
2. 在`fn`中指定异步的处理
   处理结果正常，调用`resolve`
   处理结果错误，调用`reject`

如果使用ES6的箭头函数，将会使写法更加简单清晰。





## 总结

实现JS异步编程的方法主要有：

- 回调函数
- promise
- async/await
- Generator
- 其他：参考文章 [Javascript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)

（其他里面没总结到的两种不是很常用，所以没有在此处总结）



### 不同方式的优缺点

####  回调函数（callback）

```js
setTimeout(() => {
    // callback 函数体
}, 1000)
```

**缺点：回调地狱，不能用 try catch 捕获错误，不能 return**

回调地狱的根本问题在于：

- 缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
- 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，即（**控制反转**）
- 嵌套函数过多的多话，很难处理错误

```js
ajax('XXX1', () => {
    // callback 函数体
    ajax('XXX2', () => {
        // callback 函数体
        ajax('XXX3', () => {
            // callback 函数体
        })
    })
})
```

**优点：解决了同步的问题**（只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。）

#### Promise

Promise就是为了解决callback的问题而产生的。

Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise，如果我们在 then 中 return ，return 的结果会被 Promise.resolve() 包装

**优点：解决了回调地狱的问题**

```js
ajax('XXX1')
  .then(res => {
      // 操作逻辑
      return ajax('XXX2')
  }).then(res => {
      // 操作逻辑
      return ajax('XXX3')
  }).then(res => {
      // 操作逻辑
  })
```

**缺点：无法取消 Promise ，错误需要通过回调函数来捕获**

#### Generator

**特点：可以控制函数的执行**，可以配合 co 函数库使用

```js
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

#### Async/await

async、await 是异步的终极解决方案

**优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题**

**缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。**

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch('XXX1')
  await fetch('XXX2')
  await fetch('XXX3')
}
```

下面来看一个使用 `await` 的例子：

```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，让我来解释下原因

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，**generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来**
- 因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise`的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。












<br>

---

> 参考文章：
>
> <https://www.jianshu.com/p/dc61ea153874>
>
> <https://www.jianshu.com/p/4e6be72236d6>
>
> <https://juejin.im/post/5cc3c54751882525166c4636>
>
> <https://github.com/sisterAn/blog/issues/29>