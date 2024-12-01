<template>
  <div>
    <h3>递归组件示例</h3>
    <RecursiveComponent :node="treeData" @update="updateTree" />
    <!-- <pre>{{ JSON.stringify(treeData, null, 2) }}</pre> -->
    <el-button @click="save" type="primary">保存</el-button>

  </div>
</template>

<script>
import RecursiveComponent from "../components/treeItem.vue";

export default {
  components: { RecursiveComponent },
  data() {
    return {
      // 树的初始数据
      treeData: {
        name: "root",
        type: "function",
        children: [],
      },
    };
  },
  methods: {
    // 接收子组件传递的更新数据
    updateTree(updatedNode) {
      this.treeData = updatedNode;
    },
    save() {
      console.log(this.treeData, '加载结果');
    }
  },
};
</script>
