<template>
  <div>
    <h2>树形结构</h2>
    <recursive-node v-if="treeData" :node="treeData" :parentChildren="null" :isDelete="treeData.children.length === 1"
      @delete-child="deleteRootNode" />
    <button @click="save">保存</button>
  </div>
</template>

<script>
import RecursiveNode from "./RecursiveNode.vue";

export default {
  components: { RecursiveNode },
  data () {
    return {
      treeData: {
        id: 1,
        children: [
          {
            comp: {
              id: 9,
              name: "子节点 1",
            }

          }
        ]
      }
    }
  },
  methods: {
    deleteRootNode () {
      this.treeData = null; // 删除根节点
    },
    save () {
      console.log(this.treeData, "保存数据");
    },
  },
};
</script>
