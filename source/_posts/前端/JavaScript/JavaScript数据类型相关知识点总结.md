---
title: JavaScript数据类型相关知识点总结
author: Cynthia
categories:
  - 前端
  - JavaScript
tags: []
date: 2019-04-28 11:19:49
---

所有相关的笔记汇总一起，以后方便查看复习

<!--more-->

## JS 中的数据类型

### **基本数据类型**

> 5 种基本数据类型（Number, String, Boolean, Undefined, Null）
> 基本数据类型指的是简单的数据段

1、`Number` 数值类型：整数和浮点数

2、`String` 字符串类型：用引号括起来，可以双引号，也可以单引号

3、`Boolean` 布尔类型：true和false

4、`undefined` 类型：确定一个已经声明但是还没有赋值的变量

5、`null` 类型：表明某个变量的值为空



### **复杂数据类型（引用数据类型）**

> 3 种复杂（引用）数据类型（Object, Array, Function）
> 引用数据类型指的是有多个值构成的对象

1、对象：`Object `              

```
var car = {name：；length：；price：；}；
```

 

2、数组：`Array`

```
var a = [1,2,3,4];
```

 

3、函数：`Function`

```
 function f(){}
```



### 基本数据类型和引用数据类型的区别



#### 概念

> 基本数据类型指的是简单的数据段
>
> 引用数据类型指的是有多个值构成的对象

 



#### 与堆栈之间的联系

JavaScript的数据类型分为两大种： 

- **基本类型**：Undefined、Null、Boolean、Number 和 String，这5中基本数据类型可以直接访问，他们是按照值进行分配的，存放在**栈(stack)内存**中的简单数据段，数据大小确定，内存空间大小可以分配。 
- **引用类型**：即存放在**堆(heap)内存**中的对象，变量实际保存的是一个指针，这个指针指向另一个位置。

 

#### 具体区别

<https://www.cnblogs.com/cxying93/p/6106469.html>



### ES6 新增的数据类型

> ES6 新增的数据类型：
> - 基本数据类型：Symbol
> - 复杂数据类型：Set（类Array），Map（类Object）



### 总结

6种基本数据类型（Number, String, Boolean, Undefined, Null, Symbol）

5种复杂数据类型（Object, Array, Function, Set, Map）

一共11种数据类型



## JS 数据类型判断

### typeof

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

- 检测基本数据类型
    ```js
    typeof 3 // "number"
    typeof "abc" // "string"
    typeof true // "boolean"
    typeof undefined // "undefined"
    typeof null // "object"	此处显然是一个错误
    // 还可以检测es6新引入的Symbol 
    ```
- 检测复杂数据类型
    ```js
    typeof {} // "object"
    typeof function(){} // "function"
    ```

- 除此之外 `Object` 下还有很多细分的类型，比如 `Array`、`Date`、`RegExp`、`Error` 等。如果用 `typeof` 去检测这些类型

  ```js
  var array1 = []
  var array2 = new Array();
  var date = new Date();
  var error = new Error();
  console.log(typeof array1); // object
  console.log(typeof array2); // object
  console.log(typeof date); // object
  console.log(typeof error); // object
  
  ```

<br>

> **总结：**
>
> - `typeof` 可以区分基本数据类型（null除外）；
>
> - 可以区分复杂数据类型 Object 和 Function （Array不行）
> - 不能区分 Object，即对象下的不同类型



### Object.prototype.toString

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

 `Object.protototype.toString` 被调用时，执行下面的操作步骤：

1. 如果 `this` 的值为 `undefined`，则返回 "[`object Undefined`]" .
2. 如果this的值为 `null` ,则返回 "[`object Null`]" .
3. 让O成为调用 `ToObject(this)` 的结果.
4. 让class成为O的内部属性 `[[Class]]` 的值.
5. 最后返回由 `"[object "` 和 `class` 和 `"]"` 三个部分组成的字符串.

通过规范，了解调用 `Object.prototype.toString` 最终会返回一个由 `"[object "` 和 `class` 和 `"]"` 组成的字符串，而 `class` 是要判断的对象的内部属性。

> 为了每个对象都能通过 `Object.prototype.toString()` 来检测，需要以 `Function.prototype.call()` 或者 `Function.prototype.apply()` 的形式来调用，传递要检查的对象作为第一个参数，称为`thisArg`。

```js
console.log(Object.prototype.toString.call(3)) // [object Number]
console.log(Object.prototype.toString.call([1, 2, 3])) // [object Array]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
复制代码
```

这个 class 值就是识别对象类型的关键
因此可以用 `Object.prototype.toString` 方法识别出更多类型
那到底能识别多少种类型呢？

```js
var number = 1;          // [object Number]
var string = '123';      // [object String]
var bool = true;      // [object Boolean]
var unde = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {}         // [object Object]
var array = [];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkTypes() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkTypes(number, string, bool, unde, nul, obj, array, date, error, reg, func)

// 打印出

// 1.基本数据类型
[object Number]
[object String]
[object Boolean]
[object Undefined]
[object Null]
// 2.复杂数据类型
[object Object]
[object Function]
[object Array]

[object Date]
[object Error]
[object RegExp]
```

除了以上 11 种之外，还有3种：

```js
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

function a() {
    console.log(Object.prototype.toString.call(arguments)); 
}
a(); // [object Arguments]
```

这里看我们至少可以识别14 种类型，而[[class]] 属性数量至少有 12 个。

利用这个方法写成的类库[Axis.js](https://github.com/toddmotto/axis)：

[原理解析](https://juejin.im/post/5cc293e0e51d456e3a5f0864#heading-2)



### constructor

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

> 返回创建实例对象的 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造函数的引用。
> 注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。

如何判断一个变量是自定义对象类型？

javascript 的所有对象都有一个 `constructor` 属性，这个属性可以帮我们判断 object 数据类型

```js
//alert(1.constructor); //报错 数字常量无 constructor 属性   
var num = 1;   
console.log(num.constructor == Number); //true   
console.log("miqilin".constructor == String); //true   
var str = "miqilin";   
console.log(str.constructor == String); //true   
var obj= null;   
console.log(obj.constructor); //报错，null 没有 constructor 属性   
var none = undefined;   
console.log(obj.constructor); //报错，undefined 没有 constructor 属性  
```

可以看出，数字型常量，`null` 和 `undefined` 都没有 `constructor` 属性。

对于**原型链继承**的情况，`constuctor` 无法判断

```js
function Animal() {   
}   
function Cat() {   
}   
Cat.prototype = new Animal();   
Cat.prototype.CatchMouse = function () {   
//do some thing   
}   
var obj = new Cat();   
console.log(obj.constructor == Cat); //false ？？因为 Cat.prototype不在obj的原型链上   
console.log(obj.constructor == Animal); //true 理解 
```



### instanceof

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

> instanceof 运算符用于测试构造函数的 prototype 属性是否出现在对象的原型链中的任何位置

`instanceof` 运算符会告诉您对象是否是某种类型的实例， 这里所谓的“类型”其实就是构造函数。（可以用来判断）

```js
function Animal() {   
}   
function Cat() {   
}   
Cat.prototype = new Animal();   
Cat.prototype.CatchMouse = function () {   
//do some thing   
}   
var obj = new Cat();   
console.log(obj instanceof Cat); //true 毫无疑问   
console.log(obj instanceof Animal); //true 可以理解
```



- `instanceof` 适用于所有原生类型：

  ```js
  [1, 2, 3] instanceof Array // true
  /abc/ instanceof RegExp // true
  ({}) instanceof Object // true
  (function(){}) instanceof Function // true
  
  ```

- `instanceof` 不适用于原始类型：字符串，数字，布尔值：

  ```js
  3 instanceof Number // false
  true instanceof Boolean // false
  'abc' instanceof String // false
  ```



### 总结

- **typeof：**

    > - 识别所有变量的类型，返回number，boolean，string，undefined，function，object（ `Null` 除外）
    > - 对于内置的对象实例，只能返回"Object"字符串


- **Object.prototype.toString：**

  > - 获取每个对象的类型，可以识别基本数据类型及内置对象类型
  > - 不能识别自定义对象类型

- **instanceof：**

  > - 判断对象的实例，返回布尔值
  > - 不可判别基本数据类型
  > - 可判别内置对象类型
  > - 可判别自定义对象类型（可以判断原型链改变的情况）

- **constructor：**

  > - 返回创建实例对象的 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 构造函数的引用。
  > - 可以判别部分基本数据类型（ `Undefined`/`Null` 除外）
  > - 可识别内置对象类型
  > - 可识别自定义对象类型（无法判断原型链改变的情况）


#### typeof和instanceof的区别

- `typeof` 识别所有变量的类型，返回值有number，boolean，string，undefined，function，object（不能判断null）

- `typeof` 对于丰富的对象实例，只能返回"Object"字符串。

- `instanceof` 用来判断对象，代码形式为 `obj1 instanceof obj2`（obj1是否是obj2的实例），其返回值为布尔值。obj2必须为对象，否则会报错！（所以不可以判别基本数据类型）。

- `instanceof` 可以对不同的对象实例进行判断，判断方法是根据对象的原型链依次向下查询，如果obj2的原型属性存在obj1的原型链上，（obj1 instanceof obj2）值为true。





### 综合使用

- `typeof` 判别基本数据类型（null除外）结合 `instanceof` 判别内置对象类型

- `Object.prototype.toString` 结合类库















































<br>

> 参考文章：
>
> <https://juejin.im/post/5cc293e0e51d456e3a5f0864>