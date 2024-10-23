<!--
 * @Author: wangxuan 10590
 * @Date: 2024-08-27 21:46:24
 * @LastEditors: wangxuan 10590
 * @LastEditTime: 2024-08-27 21:52:41
 * @FilePath: \newapp\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
 <div>
    <TableMove/>
  </div>
</template>

<script>
import TableMove from '../components/TableMove.vue'

export default {
  components: {
    TableMove
  },  
  mounted() {
    const promise = new Promise (() => {
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
  }
}


</script>


