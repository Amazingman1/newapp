# Vue2复习

## watch

1.`watch`和 `created`哪个先执行?为什么？

- vue中有个生命周期是init reactivity阶段，init reactivity早于 created 晚于 beforeCreate
- watch 有个参数 immediate,当immediate 为true时，watch 会与init reactivity一同执行 所以 watch会在 immediate为true时早于created执行，反之created先执行
- watch 会在 created之后执行，在watch中 immediate 为true时，watch 会早于created执行
-immediate 为true， watch为立即监听

```js

  watch: {
    a: {
      handler: function (val, oldVal) {
        console.log('watch a', val, oldVal)
      },
      immediate: true // 默认为false 为true时，watch会与init reactivity一同执行， init reactivity早于beforeCreate 晚于created
    }
  }
```

2.`watch`和`computed`的区别

- `watch` 和 `computed` 都是监听数据的变化，但是 computed 是在模板渲染的时候就计算好，而 watch 是在数据发生变化的时候才计算，所以 computed 更适合在模板中直接使用，而 watch 更适合在数据发生变化的时候执行一些操作。
- 一般接口请求会在`watch`中调用
- `computed` 缓存计算结果，一般用于模板渲染数据整合的操作。例如：数据的累加然后渲染，数据个数化等
- `wathc` 更强调`change`这一个变化的动作。

## axios

1.axios 取消后序请求

```js
  // 1. 在请求发起前，创建一个取消请求的 cancelToken
  const controller = new AbortController();
  controller.abort() // 取消请求
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  // 2. 在请求发起前，将source.token 传入请求中
  axios.get('/user', {
    cancelToken: source.token
  }).catch(function (thrown) {
    if (axios.isCancel(thrown)) { // 取消请求
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });
  // 3. 在请求发起后，取消请求
  source.cancel('Operation canceled by the user.');
```

## vue项目从0-1的架构需要哪些目录

```js
  // 通常使用 vue-cli 创建项目，项目目录结构如下：
  //    1. assets
  //    2. components
  //    3. pages
  //    4. router
  //    5. store
  //    6. utils
  //    7. views
  //    8. App.vue
  //    9. main.js 
  //    babel配置
  // 增加eslint 配置统一代码风格
  // postcss 浏览器css兼容性配置/或者一些设备适配问题
  // .dev 开发环境配置
  // .prod 生产环境配置
  // README.md 项目介绍必须写
  // 引入UI库，编写常用组件
  // 引入常用方法库，如：axios、lodash、dayjs等，编写常用方法
  // axios 请求/相应拦截
```

## vue2的响应式实现原理

- 1.通过 Object.defineProperty() 实现数据劫持
  - Object.defineProperty() 是 ES5 的新特性，用来给对象添加属性，并定义这个属性的配置。
  - Object.defineProperty() 可以给对象添加新的属性，也可以修改已有属性。
  - Object.defineProperty() 可以给属性添加 getter 和 setter，当属性的值发生变化时，会触发 setter，从而触发相应的操作。
  - Object.defineProperty() 可以给属性添加 configurable、enumerable、writable 等配置，用来控制属性的访问权限。
  - Object.defineProperty() 可以给属性添加 value，用来设置属性的值。
- 2.通过发布订阅模式实现数据响应
- 3.通过递归遍历对象，将对象中的所有属性通过 Object.defineProperty() 劫持，并添加 getter 和 setter，当属性的值发生变化时，会触发 setter，从而触发相应的操作。

## v-model实现原理/双向绑定的原理

- v-bind绑定数据
- 触发input事件 并传递数据
- 在组件传值时，也可哟实现双向绑定
  - 子组件通过`computed`中重写传进来的属性的`get`和`set`方法，实现双向绑定

  ```js
    // 子组件
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    computed: {
      inputValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  ```

## Vue针对SEO优化的哪些方法

- 服务端渲染 `ssr`，与vue配套的是`nuxt.js`
- 预渲染 `prerender-spa-plugin`、`vue-meta-info`插件，实现预渲染

## mixin的用途

1.`mixin`是vue的一个概念，它允许你分发组件的选项，让一个`mixin`对象可以包含多个选项，然后这些选项可以注入到任何使用这个`mixin`的对象中。
2.`mixin`可以用来复用代码，比如：复用组件的逻辑，复用组件的样式，复用组件的模板等。
3.`mixin`可以解决代码复用的问题，但是需要注意的是，`mixin`中的代码会覆盖被覆盖的组件中的代码，所以需要谨慎使用。
4.`vue3`取消了`mixin`，但是可以通过`provide`和`inject`实现类似功能。
5.确定很明显，代码量上来后，`mixin`维护很成本会大，因为到处可用，很难溯源，导出维护成本大。

## vue中data重置

```js
  // vm.$data 获取当前data值
  // vm.$options.data() 获取data初始值
  // Object.assign(vm.$data, vm.$options.data()) 重置data

```

## babel-polyfill模块吗？主要是用来做什么的？

```js
  // babel-polyfill 是一个模块，用来 polyfill ES6 的一些特性，如 Promise、Set、Map 等等。
  // 主要是用来解决低版本浏览器不支持 ES6 的特性，如 Promise、Set、Map 等等。
  // babel-polyfill 会将这些特性转换为 ES5 的形式，以支持低版本浏览器。
  // babel-polyfill 只转换语法，不转换新的api，如果需要转换新的api需要使用对应的babel(如：babel-plugin-transform-runtime )来模拟新的api特性

```

## vue中捕获错误

```js
  // 1. 全局捕获错误 vue.config.errorHandler(err, vm, info) {} 
  // 2. 捕获组件错误 errorCaptured(err, vm, info){}

```

## 在vue事件中传入$event，使用e.target和e.currentTarget有什么区别？

```js
  // e.target 是当前触发事件的元素，e.currentTarget 是当前绑定事件的元素
```

## vue强制刷新组件

 ```js
  // 1. 通过修改组件的key值，强制刷新组件
  // 2. 通过修改组件的v-if指令，强制刷新组件
  // 3. $forceUpdate() 强制刷新组件

 ```

## vue为什么必须有且一个跟节点

```js
  // 有且只有一个是因为vue的模板需要处理为vdom虚拟dom，vue通过这一个跟节点来遍历下面的所有节点，然后生成vdom，最后渲染到页面的正确位置
  // vdom是一个树形结构，所以需要一个跟节点
  // vue2 的时候如果没有跟节点 会报错，vue3 则会自动添加 fragment 作为跟节点

```

## vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？

需要销毁原生监听事件，vue单页面应用，原生监听事件会一直存在，导致内存泄露

## 组件设计原则

- 1.容错处理，做好边界值的和极端情况的处理，最好能够直接给出友好提示
- 2.默认值要有，避免不传或漏传导致报错，多数情况下组件都是取默认值
- 3.颗粒化，组件拆分要尽量小，避免一个组件做太多事情，导致组件代码臃肿，难以维护
- 4.灵活性要高，做到一切可配置
- 5.要场景化，不同场景应输出不同结果
- 6.有详细的文档/注释/变更历史 方便后续维护和升级
- 7.组件名称、props、emit 、slot 等要语义化
- 8.可推展，做好预留口子
- 9.规范化，事件、插槽、props、class 等命名要统一

如何设计组件？可以回答组件设计遵循以下原则

- 1.单一职责原则：每个组件应该只负责一个功能，避免组件过于复杂。
- 2.封装性原则：组件应该将内部实现细节隐藏起来，只暴露出必要的接口。
- 3.可复用性原则：组件应该能够被重复使用，避免重复编写相同的代码。
- 4.可维护性原则：组件应该易于维护，代码应该清晰、简洁、易于理解。
- 5.可扩展性原则：组件应该易于扩展，能够方便地添加新的功能或修改现有功能。
- 6.可测试性原则：组件应该易于测试，能够方便地编写单元测试和集成测试。
- 7.一致性原则：组件应该遵循一致的样式和布局，保持界面的一致性。
- 8.可访问性原则：组件应该遵循可访问性标准，确保所有用户都能使用。
- 9.性能优化原则：组件应该进行性能优化，避免不必要的渲染和计算。

组件封装是根据业务需要的，什么样的业务需求就可以封装什么样的组件。在封装组件的时候只要遵循，一些组件封装原则就行。比如

- 单一职责，一个组件值做一件事，做到充分解耦，方便维护和扩展
- 封装原则，隐藏细节，暴露必要接口
- 可复用，在理解需求的基础上，尽量做到通用，可复用
- 可维护性，代码要清晰，简洁，该注释的地方一定要注释，必要的时候还要写文档，在组件拓展或者更改的时候也要做好记录
- 组件要容易拓展，能够方便添加新功能或者修改现有功能
- 还要考虑性能，不要做无谓的渲染，不要做不必要的计算，不要做多余的dom操作

## vue组件通信

- 1.父组件向子组件传值：props
- 2.子组件向父组件传值：$emit
- 3.兄弟组件传值：provide/inject
- 4.跨级组件传值：事件总线（EventBus）
- 5.跨级组件传值：$parent/$children
- 6.跨级组件传值：$root
- 7.跨级组件传值：$refs
- 8.跨级组件传值：Vuex
- 9.跨级组件传值：Vuex-mapState

## 首页加载速度

```js
  // 异步路由和异步加载
  // 分屏加载，先渲染可视区域，其他区域懒加载
  // 按需加载
  // cdn
  // 静态资源单独域名
  // ssr服务端渲染
  // 压缩js/html/css/图片

```

## nextTick原理

```js
  // 1.任务队列，宏任务和微任务
  // 2.先执行一个宏任务，再执行微任务，清空任务队列，再执行下一个宏任务，微任务
  // 3.nextTick原理，将回调函数放入微任务队列，在微任务执行完之后，再执行回调函数

```

## vue2与vue3的diff算法有什么不同？

```js
  // 1.key的优先级，key的优先级比tag高，key相同，则认为是同一个节点，不会进行diff算法，直接复用，key不同，则认为是不同节点，进行diff算法
  // 2.diff算法，vue2是深度优先，vue3是广度优先，vue2是先比较两个节点的子节点，再比较父节点，vue3是先比较两个节点的父节点，再比较子节点
  // 3.vue3 diff算法
  // 无key时，diff算法，新旧节点对比，
  // 新dom替换掉旧dom，删除旧dom，新dom插入到旧dom位置，
  // 新dom如果多了，就新增dom
  // 旧dom多了旧删除dom
  // 有kéy时，diff算法，新旧节点对比，
  // 1.前序对比新旧dom，复用key和dom类型相同的节点，在不同的key和dom类型处停止对比，
  // 2.后序对比新旧dom，复用key和dom类型相同的节点，在不同的key和dom类型处停止对比
  // 3.新节点多出来了就新增
  // 4.旧节点多了就删除
  // 5.特殊情况乱序
  // 5.1 构建新节点的映射关系，记录新节点在旧节点中的位置，如果有多余的旧节点进行删除，新节点不包含在旧节点中的也删除
  // 5.2 节点出现交叉，需要移动， 求最长递增子序列，求出结果，在子序列中的进行移动，不在序列中跳过
```

## 什么事虚拟dom

```js
  // 虚拟dom是抽象的AST语法树，通过js对象来描述dom节点
  // dom节点上有非常多的属性，在操作dom时会频繁的访问属性，效率低，影响性能。
  // 虚拟dom就是将dom节点抽象成一个对象，通过操作对象来操作dom节点，减少dom节点上的属性访问，提高性能。

```

## vue2的diff算法

 ```js
   // vue2的diff算法是采用双端比较的算法，从两端开始比较，如果前后两个节点类型相同，则比较属性，如果前后两个节点类型不同，则直接替换。
   // 新前与旧前，新后与旧后，新前与旧后，新后与旧前，暴力循环比较
   // 暴力循环
   //  1. 构建key与index的映射表，用新开始的key去表里差找，如果找到了就把该节点移动到最前面，原来的位置用undifind占为，防止数组塌陷和保持映射表不变，如果没找到就把新节点插入。
```

## 兄弟选择器

```css
li + li {
    color: #f00;
}
.box:nth-child(2n+1) {
    background: #fff;
}
```

## 2个数组的交集

```js
function intersection(arr1, arr2) {
    let result = [];
    let obj = {};
    arr1.forEach(item => obj[item] = true);
    arr2.forEach(item => obj[item] && result.push(item));
    return result;
}
```

## promise 打印结果

```js

const promise = new Promise ((resolve, reject) => {
  console.log(1)
})

promise.then(() => {
  console.log(2)
}, () => {
  console.log(3)
}).catch(() => {
  console.log(4)
})

console.log(5)

// 1 5 
```
