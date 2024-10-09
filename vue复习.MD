# Vue复习

1.Vue中的`watch`和 `created`哪个先执行?为什么？

```js
  // vue中有个生命周期是init reactivity阶段，init reactivity早于 created 晚于 beforeCreate
  // watch 有个参数 immediate,当immediate 为true时，watch 会与init reactivity一同执行
  // 所以 watch会在 immediate为true时早于created执行，反之created先执行
```

2.axios 取消后序请求

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

3.vue项目从0-1的架构需要哪些目录

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

4.如何实现一个简单的双向绑定

```js
  // 1. 通过 Object.defineProperty() 实现数据劫持
  // 2. 通过发布订阅模式实现数据响应
  // 3. 通过递归遍历对象，将对象中的所有属性都进行数据劫持
  // 4. 通过 Proxy 实现数据劫持
```

5.v-model实现原理

```js
  // v-model是一个语法糖，最终还是 v-bind 绑定响应式数据
  // 触发input事件 并传递数据

```

6.Vue针对SEO优化的哪些方法？与渲染和服务端渲染

```js
  // vue-meta-info 与prerender-spa-plugin 预渲染
  // ssr 服务端渲染 nuxt.js

```

7.vue中data重置

```js
  // vm.$data 获取当前data值
  // vm.$options.data() 获取data初始值
  // Object.assign(vm.$data, vm.$options.data()) 重置data

```

8.babel-polyfill模块吗？主要是用来做什么的？

```js
  // babel-polyfill 是一个模块，用来 polyfill ES6 的一些特性，如 Promise、Set、Map 等等。
  // 主要是用来解决低版本浏览器不支持 ES6 的特性，如 Promise、Set、Map 等等。
  // babel-polyfill 会将这些特性转换为 ES5 的形式，以支持低版本浏览器。
  // babel-polyfill 只转换语法，不转换新的api，如果需要转换新的api需要使用对应的babel(如：babel-plugin-transform-runtime )来模拟新的api特性

```

9.vue中捕获错误

```js
  // 1. 全局捕获错误 vue.config.errorHandler(err, vm, info) {} 
  // 2. 捕获组件错误 errorCaptured(err, vm, info){}

```

10.在vue事件中传入$event，使用e.target和e.currentTarget有什么区别？

```js
  // e.target 是当前触发事件的元素，e.currentTarget 是当前绑定事件的元素
```

11.vue强制刷新组件

 ```js
  // 1. 通过修改组件的key值，强制刷新组件
  // 2. 通过修改组件的v-if指令，强制刷新组件
  // 3. $forceUpdate() 强制刷新组件

 ```

12.vue为什么必须有且一个跟节点

```js
  // 有且只有一个是因为vue的模板需要处理为vdom虚拟dom，vue通过这一个跟节点来遍历下面的所有节点，然后生成vdom，最后渲染到页面的正确位置
  // vdom是一个树形结构，所以需要一个跟节点
  // vue2 的时候如果没有跟节点 会报错，vue3 则会自动添加 fragment 作为跟节点

```

13.vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？

```js
  // 需要销毁原生监听事件，vue单页面应用，原生监听事件会一直存在，导致内存泄露

```

14.组件设计原则

```js
  // 1. 容错处理，做好边界值的和极端情况的处理，最好能够直接给出友好提示
  // 2. 默认值要有，避免不传或漏传导致报错，多数情况下组件都是取默认值
  // 3. 颗粒化，组件拆分要尽量小，避免一个组件做太多事情，导致组件代码臃肿，难以维护
  // 4. 灵活性要高，做到一切可配置
  // 5. 要场景化，不同场景应输出不同结果
  // 6. 有详细的文档/注释/变更历史 方便后续维护和升级
  // 7. 组件名称、props、emit 、slot 等要语义化
  // 8. 可推展，做好预留口子
  // 9. 规范化，事件、插槽、props、class 等命名要统一

```

15.首页加载速度

```js
  // 异步路由和异步加载
  // 分屏加载，先渲染可视区域，其他区域懒加载
  // 按需加载
  // cdn
  // 静态资源单独域名
  // ssr服务端渲染
  // 压缩js/html/css/图片

```

16.nextTick原理

```js
  // 1.任务队列，宏任务和微任务
  // 2.先执行一个宏任务，再执行微任务，清空任务队列，再执行下一个宏任务，微任务
  // 3.nextTick原理，将回调函数放入微任务队列，在微任务执行完之后，再执行回调函数

```

17.vue2与vue3的diff算法有什么不同？

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

18.什么事虚拟dom

```js
  // 虚拟dom是抽象的AST语法树，通过js对象来描述dom节点
  // dom节点上有非常多的属性，在操作dom时会频繁的访问属性，效率低，影响性能。
  // 虚拟dom就是将dom节点抽象成一个对象，通过操作对象来操作dom节点，减少dom节点上的属性访问，提高性能。

```

19.vue2的diff算法

 ```js
   // vue2的diff算法是采用双端比较的算法，从两端开始比较，如果前后两个节点类型相同，则比较属性，如果前后两个节点类型不同，则直接替换。
   // 新前与旧前，新后与旧后，新前与旧后，新后与旧前，暴力循环比较
   // 暴力循环
   //  1. 构建key与index的映射表，用新开始的key去表里差找，如果找到了就把该节点移动到最前面，原来的位置用undifind占为，防止数组塌陷和保持映射表不变，如果没找到就把新节点插入。
```
