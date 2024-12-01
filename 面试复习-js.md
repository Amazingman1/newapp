# js

1.js数据类型

- 原始类型：undefined,null,boolean,number,string,symbole
- 引用类型：object,array,function

2.数组深拷贝

```js
// 1. JSON.parse(JSON.stringify(arr))
const arr = [1,2,3,[4,5,[6,7]]]
const arrCopy = JSON.parse(JSON.stringify(arr))
arrCopy.push(8)
console.log(arrCopy) // [1,2,3,[4,5,[6,7]],8]
console.log(arr) // [1,2,3,[4,5,[6,7]]
// 2. 递归遍历/数组/对象
const deepClone = function(obj){
  let objCopy = Array.isArray(obj) ? [] : {}
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      objCopy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return objCopy
}

// 3. structureClone 新的api
const arr1 = [1,2,3]
const arrCopy1 = structuredClone(arr1)
arr1.push(4)
console.log(arr1) // [1,2,3,4]
console.log(arrCopy1) // [1,2,3]

```

3.原型与原型链

- 1.prototype是【函数的】的属性 （conosle.dir() 可以查看函数的属性）
- 2.protpotype是一个对象
- 3.函数创建时就会默认创建一个prototype属性

- ``__poto__`` 隐式原型
- 1.``__proto__``是【对象】的属性
- 2.指向构造函数的prototype属性
- 3.```Object.__proto__ === Function.prototype``` // true
- 4.原型连定层 ```Object.__proto__.__proto__ === null``` // true
- 4.原型链先从自身找，找不到再去父级，一直到原型链的顶端，如果没有找到就返回```undefined```

```js
function F() {}
F.prototype.name = 'xiaoming'
var f = new F()
console.log(f.name) // xiaoming
f.__proto__ === F.prototype // true
F.prototype = {}
var f2 = new F()
console.log(f2.name) // undefined
f2.__proto__ === F.prototype // true
F.prototype.__proto__ === Object.prototype // true
f2.__proto__.__proto__ === Object.prototype // true
```

4.闭包

- 闭包是指有权访问另一个函数作用域中的变量的函数
- 闭包的作用：1.延长变量的生命周期 2.私有化变量

```js
function F() {
  var a = 1
  return function() {
    console.log(a)
  }
}
var f = F()
f() // 1
```


### 递归组件vue2 + elment-ui



