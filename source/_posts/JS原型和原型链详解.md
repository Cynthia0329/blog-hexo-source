---
title: JS原型和原型链详解
author: Cynthia
categories:
  - "\U0001F430未分类\U0001F430"
tags:
  - "\U0001F353无\U0001F353"
date: 2019-06-13 08:56:50
---

🐰
...
<!--more-->



## 普通对象和函数对象

> Object 、Function 是 JS 自带的函数对象。

```js
var o1 = {}; 
var o2 =new Object();
var o3 = new f1();

function f1(){}; 
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

console.log(typeof Object); //function 因为Object本身为构造函数，new出来的才是对象
console.log(typeof Function); //function  

console.log(typeof o1); //object 
console.log(typeof o2); //object 
console.log(typeof o3); //object

console.log(typeof f1); //function 
console.log(typeof f2); //function 
console.log(typeof f3); //function   
```



**如何区分普通对象（object）和函数对象（function）？**

凡是通过 new Function() 创建的对象都是函数对象，其他的都是普通对象。



注意：

**Function Object 也都是通过 New Function()创建的。**



### 普通对象

```js
最普通的对象：有__proto__属性（指向其原型链），没有prototype属性。

原型对象(Person.prototype 原型对象还有constructor属性（指向构造函数对象）)
```





### 函数对象

```js
凡是通过new Function()创建的都是函数对象。

拥有__proto__、prototype属性（指向原型对象）。
```











## 构造函数

我们先复习一下构造函数的知识：

```js
function Person(name, age, job) {
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = function() { alert(this.name) } 
}
var person1 = new Person('Zaxlct', 28, 'Software Engineer');
var person2 = new Person('Mick', 23, 'Doctor');
```

上面的例子中 person1 和 person2 都是 Person 的实例。这两个实例都有一个 constructor （构造函数）属性，该属性（是一个指针）指向 Person。 即：

```js
  console.log(person1.constructor == Person); //true
  console.log(person2.constructor == Person); //true
```

我们要记住两个概念（构造函数，实例）：

> person1 和 person2 都是 构造函数 Person 的实例

一个公式：

> 实例的构造函数属性（constructor）指向构造函数。



### 结合原型概念理解

拥有了描述事物的能力，却没有创造事物的能力，显然是不完整的，因此需要一个Object的生成器来进行对象的生成。 

**JS将生成器以构造函数constructor来表示，构造函数是一个指针，指向了一个函数**。 *函数（function） 函数是指一段在一起的、可以做某一件事的程序*。

**构造函数是一种创建对象时使用的特殊函数**。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190613134954.png)





对象的构造函数function Object同时也是一个对象，因此需要一个能够描述该对象的原型，该原型便是Function.prototype，函数的原型用来描述所有的函数。对象的构造函数的**proto**指向该原型。 



> 在默认情况下，所有的原型对象都会自动获得一个 constructor（构造函数）属性，这个属性（是一个指针）指向 prototype 属性所在的函数









## 原型对象

在 JavaScript 中，每当定义一个对象（函数也是对象）时候，对象中都会包含一些预定义的属性。

> 其中每个函数对象都有一个 `prototype` 属性，这个属性相当于一个指针，指向**他本身**的原型对象，这个原型对象里包含着**自定义的方法属性**

```js
function Person() {}

Person.prototype.name = 'Zaxlct';
Person.prototype.age  = 28;
Person.prototype.job  = 'Software Engineer';
Person.prototype.sayName = function() {
  alert(this.name);
}
  
var person1 = new Person();
person1.sayName(); // 'Zaxlct'

var person2 = new Person();
person2.sayName(); // 'Zaxlct'

console.log(person1.sayName == person2.sayName); //true
```

我们得到了本文第「定律」：

> 1.每个对象都具有一个名为 `__proto__` 的属性；
>
> 2.每个构造函数（构造函数标准为大写开头，如Function()，Object()等等JS中自带的构造函数，以及自己创建的）都具有一个名为 `prototype` 的方法（注意：既然是方法，那么就是一个对象（JS中函数同样是对象），所以 `prototype` 同样带有 `__proto__` 属性）；
>
> 3.每个对象的 `__proto__` 属性指向自身构造函数的 `prototype` ；
>
> 4.每个对象都有 `__proto__`  属性，但只有函数对象才有 `prototype` 属性



### **prototype和\__proto__的区别**

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190613130843.png)







**`_proto_` 是对象的属性、`prototype` 是函数的属性**

```js
函数.__proto__ ===Function.prototype
Function.__proto__ === Function.prototype
Object.__proto__ === Function.prototype //Objec也是个函数，函数都是由Function构造出来的。
Number.__proto__ === Function.prototype

构造函数.prototype.__proto__ ===Object.prototype
Function.prototype.__proto__ ===Object.prototype
Number.prototype.__proto__ ===Object.prototype
Object.__proto__ .__proto__ ===null
```













### \_proto_属性指向谁？

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190613131318.png)

```js
/*1、字面量方式*/
var a = {};
console.log(a.__proto__);  //Object {}

console.log(a.__proto__ === a.constructor.prototype); //true

/*2、构造器方式*/
var A = function(){};
var a = new A();
console.log(a.__proto__); //A {}

console.log(a.__proto__ === a.constructor.prototype); //true

/*3、Object.create()方式*/
var a1 = {a:1}
var a2 = Object.create(a1);
console.log(a2.__proto__); //Object {a: 1}

console.log(a.__proto__ === a.constructor.prototype); //false（此处即为图1中的例外情况）
```



**总结：**

> 大部分时候，`_proto_` 指向构造器的原型
>
> 即： `_proto_` === `constructor.prototype`
>
> 每个对象的 `__proto__` 只会指向它的构造函数的 `prototype` 对象，`Object.__proto__` 除外，它指向 `null`。



### 隐式原型和显式原型

- 显式原型（explicit prototype property ）每一个函数在创建之后都会拥有一个名为 `prototype` 的属性，这个属性指向函数的原型对象。用来实现基于原型的继承与属性的共享。
- 隐式原型 （implicit prototype link） JS中任意对象都有一个内置属性 `_proto_`（部分浏览器为`[[prototype]]` ），指向创建这个对象的函数（即构造函数）constructor的prototype。用来构成原型链，同样用于实现基于原型的继承。



### Function.prototype

> **每创建一个函数都会有一个prototype属性，这个属性是一个指针，指向一个对象（通过该构造函数创建实例对象的原型对象）**。 
>
> *原型对象是包含特定类型的所有实例共享的属性和方法。原型对象的好处是，可以让所有实例对象共享它所包含的属性和方法*。
>
> 原型对象属于普通对象。Function.prototype是个例外，它是原型对象，却又是函数对象，作为一个函数对象，它又没有prototype属性。

- Function.prototype === Function.\_proto_
- Function.prototype 是函数，其他所有prototype 都是对象
- Function.prototype函数没有prototype （Function.prototype.prototype === undefined），其他函数都有prototype



### 原型的原型

- `构造函数.prototype` 也是对象啊，它指向谁？
- 既然是对象，那么里面就有 `__proto__` 属性

```js
Person.prototype.__proto__ === ???
```

问号填什么呢，原型是由谁构造的呢，我们想到了所有对象的根----------`Object`

在控制台验证如下

```js
Person.prototype.__proto__ === Object.prototype
true
Array.prototype.__proto__ === Object.prototype
true
String.prototype.__proto__ === Object.prototype
true
```



既然引出了Object，我们来看一下所有对象的祖宗的原型吧

```js
Object.prototype.__proto__ === null
true
```



![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190614131602.png)







### **特殊的Function**

前面我们看到了Function构造方法构造除了所有的函数，包括普通的构造函数。

那么他自身也是一个函数，所以也是由Function构造函数构造的。所以由总结的公式可以知道

```text
Function.__proto__ === Function.prototype
```



而且，**下面这个很重要，易错**

```text
Function.prototype === Object.__proto__ //哈哈，这个老别扭了吧，还给你倒过来写，很容易错的
```

解释：Object也是构造函数啊，属于对象。Object构造函数也是由Function把它构造出来的，所以是结果是`true`


  ![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190614131723.png)





### 总结

- 当你new一个构造函数的时候，创建一个函数实例，那么 『 `函数实例.__proto__ === 该构造函数.prototype`』
- 所有的函数都是由`Function`构造出来的，那么 『`被构造出来的其他函数.__proto__ === Function.prototype`』
- 所有的构造函数的原型对象都是由Object构造出来的，那么 『`所有的构造函数.prototype.__proto__ === Object.prototype`』















## 原型链

JavaScript对象是动态的属性“包”（指其自己的属性）。JavaScript对象有一个指向一个原型对象的链。
当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依此层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190613133705.png)







当我们「读取」 obj.toString 时，JS 引擎会做下面的事情：

- 看看 obj 对象本身有没有 toString 属性。没有就走到下一步。
- 看看 obj.**proto** 对象有没有 toString 属性，发现 obj.**proto** 有 toString 属性，于是找到了
- 如果 obj.**proto** 没有，那么浏览器会继续查看 obj.**proto**.**proto**,如果 obj.**proto**.**proto** 也没有，那么浏览器会继续查,obj.**proto**.**proto**.proto__

**直到找到 toString 或者 proto 为 null**（不管你从那个属性开始，连续引用**proto**的指针，最后输出的那个值就是null）。

上面的过程，就是「读」属性的「搜索过程」。

而这个「搜索过程」，是连着由 **proto** 组成的链子一直走的。

这个链子，就叫做「原型链」。



**MDN 的定义**

> 每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（`prototype` ）。
> 该原型对象也有一个自己的原型对象( `__proto__` ) ，层层向上直到一个对象的原型对象为 `null`。
> 根据定义，`null` 没有原型，并作为这个原型链中的最后一个环节





## instanceof 运算符本质

首先这有几个题

```text
Object instanceof Function
Function instanceof Object
Function instanceof Function
Object instanceof Object
```

- 能不假思索的说出来吗，大声告诉我，答案是什么。
- 没错，全是`true`

虽然 `instanceof`运算符算是我们的老朋友了，不过背后是咋判断的呢

规范是这么写的

> object instanceof constructor

**参数：**

- `object`

要检测的对象.

- `constructor`

某个构造函数

`instanceof`运算符用来检测 `constructor.prototype`是否存在于参数 `object`的原型链上



- 对于 **Object instanceof Function** ，`Object.__proto__ === Function.prototype` 为`true`，解决
- 对于 **Function instanceof Object** ， `Function.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype`为`true`，解决。
- 对于 **Function instanceof Function** ，`Function.__proto__ === Function.prototype` 为`true`，解决
- 对于 **Object instanceof Object** , `Object.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype` 为`true`，解决



在上面的各种原型的变换中，其实难点就在于

- `Function`

-  `Object` 

- `构造函数也是对象`

- `原型对象等所有对象都由Object构造`

这四个点。



## 面试题

### instanceof 的实现原理

如果 `left instanceof right` ，那么会沿着 `left` 的原型链一直往上找，如果找到 `right.prototype`，就 return true，否则就 return false。说白了就是一个链表的的遍历。

（检测left是否出现在right的原型链中）



### 原型的作用？

- 用来理解对象上属性访问的过程
- 用来判断对象实例是否由某个函数创建





















## 总结



### 原型对象、构造函数、实例对象之间的关系

推荐阅读《[深刻理解JavaScript基于原型的面向对象](http://www.iteye.com/topic/1126635)》

从一张图看懂原型对象、构造函数、实例对象之间的关系 

![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190613133042.png)



`constructor` ：原型对象中的属性，指向该原型对象的构造函数

`prototype` ：构造函数中的属性，指向该构造函数的原型对象。

`_proto_` ：实例中的属性，指向new这个实例的构造函数的原型对象



![](https://raw.githubusercontent.com/Cynthia0329/images/master/img/20190614113930.png)













### 几句话能解释一切关于原型方面的问题

- 当 new 一个函数的时候会创建一个对象，『函数.prototype』 等于 『被创建对象.**proto**』
- 每个对象的 `__proto__` 属性指向自身构造函数的 `prototype` 
- 一切函数都是由 Function 这个函数创建的，所以『Function.prototype === 被创建的函数.**proto**』
- 一切函数的原型对象都是由 Object 这个函数创建的，所以『Object.prototype === 一切函数.prototype.**proto**』





1. 每个对象（包括函数）都有 `__proto__` , 但 `null` 没有。
2. 每个对象的 `__proto__` 只会指向它的构造函数的 `prototype` 对象，`Object.__proto__` 除外，它指向 `null`。
3. 构造函数的 `prototype` 对象的 `constructor` 属性指回构造函数。









---

<br>

>参考文章：
>
><https://segmentfault.com/a/1190000017816152>
>
><https://segmentfault.com/a/1190000018308979>
>
><https://zhuanlan.zhihu.com/p/32887069>
>
><https://www.liuyiqi.cn/2019/06/01/js-prototype/>