# Vue复习

1. Vue中的`watch`和 `created`哪个先执行?为什么？

```js
  // vue中有个生命周期是init reactivity阶段，init reactivity早于 created 晚于 beforeCreate
  // watch 有个参数 immediate,当immediate 为true时，watch 会与init reactivity一同执行
  // 所以 watch会在 immediate为true时早于created执行，反之created先执行
```

2. 

