<template>
  <div>
    <div class="table-td-status" style="display: flex; justify-content: space-around;" v-for="item in routers"
      :key="item.name">
      <el-tag v-for="tag in item.children" :key="tag.name">
        <router-link :to="tag.path"> {{ tag.name }}</router-link>
      </el-tag>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import router from '../router'

export default {

  data () {
    return {
      routers: []
    }
  },
  mounted () {
    const { options } = router
    this.routers = options.routes
  },
  errorCaptured (err, vm, info) {
    console.log(err, vm, info)
  },
  methods: {
  


  }
}
</script>
<style scoped>
.table-td-status {
  padding: 0;
}
</style>