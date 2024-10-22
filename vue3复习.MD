<!--
 * @Author: wangxuan wangxuanniu@yeah.net
 * @Date: 2024-06-19 15:07:16
 * @LastEditors: wangxuan wangxuanniu@yeah.net
 * @LastEditTime: 2024-07-15 10:34:36
 * @FilePath: /test/vue3复习.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
-->
# vue3 复习

1.ref()

- 响应式对象
- 顶级响应式对象，可以在模板中直接使用不用添加 `.value`,可以直接使用
- `ref()` 对像更新，Vue会自动检测更新，然后更新Dom
- 深层次的对象也可以是响应式，也会被追踪
- `shallowRef()` 是ref的浅层次表现，深层次的浅套不起作用
- `triggerRef()` 强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。
- `toRef()` 复制`reactive()`内的对象的属性变成 ref
- `toRefs()` 复制`reactive()`内的对象变成 ref`

```js
  const obj = reactive({
    name: 'wangxuan',
    age: 18
  })

  const rName = toRef(obj, 'name')
  // rName.value = 'wangxuan'

  const rObj = toRefs(obj)
  // rObj.name.value = 'wangxuan'
  // rObj.age.value = 18
```

2.reactive()

- `reactive()`本身具有响应式,不用添加 `.value`
- 深层次的对象也可以是响应式，也会被追踪
- 需要使用 `shallowReactive()`，退出深层次
- `reactive()`有局限性，所以推荐使用 `ref()`
  - 只对对象、数组、Set、Map等具有深层次的响应，不能对 `string`、`number`、`boolean`等基本类型进行响应式
  - 不能替换整个对象，整个替换会失去响应式
  - 对解构操作不友好。要想结构出到本地对象还是响应式，可以用`ref()` 对象包裹,例子：
  
  ```js
  const state = reactive({
    count: 0
  })
  // 结构出来的count就失去了响应式
  const { count } = state

  // 需要这样
  const state = reactive({
    count: ref(0)
  })
  // 结构出来的count是响应式
  const { count } = state
  ```

3.computed

- 计算属性的返回值也是一个`ref()`对象，具有响应式。
- 计算属性会缓存，只有当依赖的响应式发生变化时才会重新计算。
- 计算属里 **不要改变其他状态、在 getter 中做异步请求或者更改 DOM**，这些操作可以在`watch()`中完成
- 计算属性最好只作为一个**只读**的属性，官方推荐。
- 想要更改计算属性的返回值，需要重新写计算属性的`getter()`、`setter()`方法，一下例子：

```js
  const state = ref('已读')
  const state1 = ref('回复')
  // 更改计算属性的返回值
  const countRef = computed({
    get: () => {
      return state.value + ' ' + state1.value
    },
    set: (val) => {
      [state.value, state1.value] = val.split(' ')
    }
  })
  countRef.value = '已读 乱回'
  console.log(state.value) // 已读
  console.log(state1.value) // 乱回
```

4.watch

  -浅层监听

  ```js
    // 监听单个属性
    watch(state, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
    // 监听多个属性,多个属性的监听，newValue是一个位置与监听源一致的数组
    watch([state, state1], (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
    // 监听reactive对象, state对象的任意属性都会被监听
    // 监听响应式对象的单个属性值的时候需要用getter函数的形式监听
    watch(()=> state.value, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
    // 监听整个响应式对象
    watch(state, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
    // 监听getter函数,函数被调用就会执行
    watch(()=> sate.value + state1.value, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })

  ```
  
  -深层监听添加`{deep: true}`属性，一般不使用渐层监听其实已经带了，添加`{deep: true}`会遍历整个监听对象，降低性能没有必要的时候避免使用
  -`{immediate:true}`属性可以在创建监听起的时候就触发监听器
  -`{once:true}`属性只监听一次
  -`{flush:'pre'}`属性在DOM更新前执行监听器
  -`{flush:'post'}`属性在DOM更新后执行监听器
  -`{flush:'sync'}`属性在DOM更新前执行监听器

5.watchEffect

- 不需要指定监听源，在回调里被用到的响应式属性都会被监听
- 想要监听的对象，在回调中多个属性被用到都会触发监听
- 与`watch`的区别就在于不需要指定监听源，`watchEffect`会更高效，写法也会更简洁
- 在异步回调中使用监听器需要手动停止监听，返回一个停止函数，调用停止函数即可停止监听

```js
const stop = watchEffect(() => {
  console.log(state.value)
})
stop() // 手动停止监听

```

6.组件传值

- 模版引用可以 `<ChildComponent ref="childRef" />`, `childRef`就是子组件的引用,可以访问自组件所有属性， 子组件要通过`defineExpose`先暴露属性值
- 保持单项数据流

- 双向绑定，子组件使用`defineModel()`声明，父组件使用`v-model`绑定，子组件发生改变，父组件也会变化
- 父组件通过`props`属性传递数据给子组件

```js

// 父组件 -> 子组件
<ChildComponent :name="name" :age="age" />
// 子组件接收
const props = defineProps({
  name: String,
  age: Number,
  text: String,
  // 参数校验，必填与默认值
  text1: {
    type: String,
    default: 'hello',
    required: true
  }
})

// 子组件 -> 父组件
const emit = defineEmits({
  'change': null,
  // 事件校验
  'click': ()=> {
    return true
  }
  })
emit('change', 'hello')

// 子组件 -> 父组件
const emit = defineEmits(['change'])
emit('change', {
  name: 'hello',
  age: 18
})

```

7.provide/inject

- 父组件通过`provide`传递数据，子组件通过`inject`接收数据
- 子组件可以接收父组件传递的数据，也可以接收祖先组件传递的数据
- 保证数据流是单向的，也可以提供更改父组件数据的方法，在子组件中调用

```js
// 父组件
const state = reactive({
  name: 'hello',
  age: 18
})
provide('state', state)

// 子组件
const state = inject('state')

```

8.路由
9.状态管理
10.v-if vs v-for

- v-if 优先级更高，如果同时使用，v-if先执行
- 不推荐同时使用

11.v-for 也可以使用 `of`替代`in`这样写更接近js的迭代器的语法
