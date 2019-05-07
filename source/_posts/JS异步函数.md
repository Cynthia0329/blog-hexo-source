---
title: JS异步函数
author: Cynthia
categories:
  - null
tags: []
date: 2019-05-06 09:35:09
---

🐰
...
<!--more-->

## 待整理文章

- [深入理解 promise：promise的三种状态与链式调用](https://www.jianshu.com/p/dc61ea153874)
  - 只整理了第一节，后面的看不懂（等之后深入理解之后再继续看）





## promise

### 三种状态

用new Promise实例化的Promise对象有三个状态：

- “has-resolution” - **Fulfilled**
  - reslove(成功时)，调用 `onFulfilled`

- "has-rejection" - **Rejected**
  - reject(失败时)。调用 `Rejected`

- "unresolve" - **Pending**

既不是 resolve 也不是 reject 状态，也就是 Promise 刚刚被创建后的初始化状态。

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

**promise的最终状态会凝固，成功了以后即便再执行reject('failed')状态也不会改变。**




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