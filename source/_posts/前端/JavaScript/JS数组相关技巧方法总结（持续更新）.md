---
title: JS数组相关技巧方法总结（持续更新）
author: Cynthia
categories:
  - 前端
  - JavaScript
tags:
  - 数组
  - 算法
  - 面试
date: 2019-05-16 13:10:54
---

🐰
...
<!--more-->

[数组，算法，面试]

## 待看文章

- [JavaScript数组去重（12种方法，史上最全）](https://segmentfault.com/a/1190000016418021)
  - 目前只看了首尾的ES6的两种方法



## 未分类

- 利用 `apply` 将二维数组转换为一维数组

  ```js
  const c = [[1, 2, 3], [4, 5, 6]]
  
  // apply 会将传入的数组转换为参数传入
  const newArray = [].concat.apply([], c)
  console.log(newArray)   // [1, 2, 3, 4, 5, 6]
  ```

- 将树状的数组转换为一维数组 

  ```js
  export function flatten(array) {
    return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
  }
  
  // 将上面的代码结构化
  function flatten(array) {
      const newArray = array.map( item => {
          return [].concat(item, ...flatten(item.subitems))
      })
      return [].concat(...newArray)
  }
  ```

- `filter()` 结合 `indexOf()` ：从一个数组中过滤另一个数组

  ```js
  // 原理：indexOf() 方法可返回数组中某个指定的元素位置。如果在数组中没找到指定元素则返回 -1。
  // 过滤Array1中与Array2相等的部分
  
  NewArray = Array1.filter(item =>  Array2.indexOf(item) < 0)
  ```



## 具体方法运用

### Array.prototype.reduce()

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

相关文章：

  [Javascript中数组方法reduce的妙用之处](https://segmentfault.com/a/1190000019423048)







## 数组去重

### ES6

> ES6的两种方法如果不考虑兼容性，是目前最简洁最使用的数组去重的方法

#### Set + Array.from()

`Array.from(new Set(arr))`

例子：

```js
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```





#### ...[扩展符] + Set

`[...new Set(arr)] `

例子：

```js
// ...拓展运算符，是遍历Symbol.iterator 
// 和for...of一样的遍历方法

var tt  = [...new Set([5,5,6,6,8,])] // 5，6，8
```



#### 总结

两个方法中的 `Array.from()` 和 `[]` 都是为了将类数组去重后转换为数组















### ES5

es5的 `filter()`

```js
[1, 3, 4, 5, 1, 2, 3, 3, 4, 8, 90, 3, 0, 5, 4, 0].filter(function (elem, index, Array) {
  return index === Array.indexOf(elem);
})
```











### 原生JS







### 总结







## 综合

### 数组去重合并

```js
function combine(){ 
    let arr = [].concat.apply([], arguments);  // 1.拼接
    return Array.from(new Set(arr));	// 2.去重
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));                     // [1, 2, 3]
```

[该方法的解析](https://segmentfault.com/q/1010000019196569?_ea=11181550)



### 多层数组扁平化去重排序

```js
Array.from(new Set(arr.flat(Infinity))).sort((a,b) => a-b)
```



解析：

#### 解析

以上可以分步总结为以下步骤：

> 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
// 1.扁平化
let flatArr = arr.flat(4)
// 2.去重
let disArr = Array.from(new Set(flatArr))
// 3.排序
let result = disArr.sort((a, b) => a - b)
console.log(result)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

1. 拍平数组：const flatArray = arr => arr.reduce((a,b) => a.concat(Array.isArray(b) ? flatArray(b): b), []);
2. 去重+排序: […new Set(flatArray)].sort((a,b) => a-b);

#### 相关知识点

- [Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)























<br>

---

> 参考：
>
> <https://segmentfault.com/a/1190000016418021#articleHeader11>