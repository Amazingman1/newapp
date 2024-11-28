<template>
  <div class="tree-item">
    <div v-for="item in treeData" :key="item.id">
      <div class="item-title" @click="nodeClick(item)" style="display: flex;">
        <div>
          <span>{{ item.name }}</span>
        </div>
        <div style="display: flex;" v-for="(p,index) in item.args" :key="index">
          <SelectIem :selectValue.sync="p.num" @setArgs="getArgs" :addArgs="item"></SelectIem>
        </div>
      </div>
      <div
        v-if="item.children && item.children.length"
        class="item-childen"
      >
        <my-tree
          :treeData="item.children"
          @node-click="$emit('node-click', $event)"
        ></my-tree>
      </div>
    </div>
  </div>
</template>

<script>
import SelectIem from './SelectIem.vue';
export default {
  name: 'myTree',
  components: {
    SelectIem
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expandedKeys: [] // 当前展开的节点id组成的数组
    }
  },
  methods: {
    nodeClick(item) {
      this.$emit('node-click', item)
    },
    getArgs(val, node) {
      console.log(val, '函数有几个参数')
      this.$emit('addArgs', val, node)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-item {
  cursor: pointer;
  .item-title {
    padding: 4px 8px;
    &:hover {
      background: #eee;
    }
  }
  .item-childen {
    padding-left: 20px;
  }
}
</style>
