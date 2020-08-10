---
title: '技术标题2'
date: '2020-03-16 05:35:07'
category: '技术'
---

### 判断变量是否为对象
``` javascript
function isObject (val) {
  return val instanceof Object(val);
}
```


### 给传入的参数一个默认值
``` javascript
function fn (inputVal) {
  var val = inputVal || 'default';
}
```

***传入的值除了 `undefined` 以外 `0`,`''`,`null`等的布尔值也是`false`***

所以更精确的写法应该这样写

``` javascript
function fn (inputVal) {
  (inputVal !== undefined && inputVal !== null) ? inputVal = inputVal : inputVal = 'default';
}
```

ES6 写法

``` javascript
function fn (val = 'hi') {
  return val;
}

console.log(fn());     // hi
console.log('hello');  // hello

```

### 自定义随机数和字符串
``` javascript
Math.random() * (max - min) + min; // 任意范围的随机数
Math.floor(Math.random() * (max - min + 1)) + min; // 任意范围的随机整数

// --- 随机字符串
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';

  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }

  return str;
}

console.log(random_str(9)); // plZJ9muQL
```

### 判断一个变量是否在全局变量中声明过
``` javascript
if ('v' in window) {
  // 声明过
}
```

### 查看对象所有属性
`Object.keys` 它只返回可枚举的属性
`Object.getOwnPropertyNames` 它可以返回不可枚举的属性

***`Object.keys`和`Object.getOwnPropertyNames`会遍历对象自身属性，不包括继承的属性***

``` javascript
var obj = {
  k1: 1,
  k2: 2,
  k3: 3
};
var arr = ['hello', 'js'];

Object.keys(obj); // ['k1', 'k2', 'k3']
Object.getOwnPropertyNames(obj); // ['k1', 'k2', 'k3']

Object.keys(arr); // ["0", "1"]
Object.getOwnPropertyNames(arr); // ["0", "1", "length"]
```

### 查看对象属性是否存在
``` javascript
var obj = {
  attr: 'hello'
};

console.log(obj.hasOwnProperty('attr')); // true
console.log('attr' in obj); // true
console.log(obj.hasOwnProperty('toString')); // false hasOwnProperty 对继承属性不进行判断
console.log('toString' in obj); // true in 操作符对继承属性进行判断
```

### `slice` 的应用
``` javascript
var fn = function() {
  var argsArray = Array.prototype.slice.call(arguments); // 把 arguments 转化为真正的数组
};

Array.prototype.slice.call(document.querySelectorAll("div")); // 把页面中的 div 标签类数组转化为真正的数组
```

### `void` 运算符使用
``` html
<a href="javascript: void(fn())">Test</a> <!-- 禁止浏览器跳转 -->
<a href="javascript: void(document.form.submit())">FormTest</a> <!-- 会提交表单，但是不会产生页面跳转 -->
```

### 计算对象属性的个数
``` javascript
Object.keys(obj).length
```

### 精确判断类型函数
``` javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

console.log(type('hello')); // 'string'
console.log(type({})); // "object"
console.log(type([])); // "array"
console.log(type(3)); // "number"
console.log(type(null)); // "null"
console.log(type()); // "undefined"
console.log(type(/abcd/)); // "regex"
console.log(type(new Date())); // "date"
```

### 合并两个数组
``` javascript
var arr1 = [3, 6, 9];
var arr2 = [12, 15, 18];

Array.prototype.push.apply(arr1, arr2);
// 或者
arr1.push.apply(arr1, arr2);
```

### 将数组中的字符串转化为大写或者小写
``` javascript
String.prototype.toUpperCase.call(['a', 'b', 'c']); // ['A', 'B', 'C']
String.prototype.toLowerCase.call(['A', 'B', 'C']); // ['a', 'b', 'c']
```

### 找到数组中的最大数
``` javascript
Math.max.apply(null, [9, 6, 3])
```

### 返回某个数值整数部分的函数
``` javascript
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.3) // 3
ToInteger(6.6) // 6
ToInteger(9.9) // 9
```

### 计算今年还有多少天
``` javascript
function leftDays() {
  var today = new Date();
  var endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
  var msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
}

console.log(leftDays());
```

### 判断对象 `{}` 是否是空对象
``` javascript
let val1 = {};
let val2 = {name: '回滚滚'};
let val3 = [];
let val4 = [1];
let val5 = new Date();
let val6 = new String();

let emptyObject = (val) => {
  let valType = Object.prototype.toString.call(val);

  if (val instanceof Object && (valType === '[object Object]')) {

    if (Object.getOwnPropertyNames(val).length > 0) {
      return false;
    }
  } else {
    throw new Error(`输入类型错误，类型为 ${ valType }`);
  }

  return true;
};

console.log(emptyObject(val1));  // true
console.log(emptyObject(val2));  // false
console.log(emptyObject(val3));  // Uncaught Error: 输入类型错误，类型为 [object Array]
console.log(emptyObject(val4));  // Uncaught Error: 输入类型错误，类型为 [object Array]
console.log(emptyObject(val5));  // Uncaught Error: 输入类型错误，类型为 [object Date]
console.log(emptyObject(val6));  // Uncaught Error: 输入类型错误，类型为 [object String]
```
