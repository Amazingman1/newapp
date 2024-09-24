<!--
 * @Author: wangxuan 10590
 * @Date: 2024-08-27 21:46:24
 * @LastEditors: wangxuan 10590
 * @LastEditTime: 2024-08-27 21:52:41
 * @FilePath: \newapp\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view />
    <!-- <TableMove msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TableMove from './components/TableMove.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // TableMove
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
