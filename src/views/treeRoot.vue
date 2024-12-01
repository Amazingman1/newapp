<template>
  <div>
    <RecursiveComponent v-for="(item, index) in treeDataList" :key="index" :node="item" @update="updateTree" />
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
        name: "",
        type: "",
        children: [],
      },
      treeDataList: [
        {
          name: "",
          type: "",
          children: [],
        },
        {
          name: "",
          type: "",
          children: [],
        },
        
      ]
    };
  },
  methods: {
    // 接收子组件传递的更新数据
    updateTree(updatedNode) {
      console.log(updatedNode, '更新数据');
      this.treeData = updatedNode;
    },
    save() {
      console.log(this.treeDataList, '加载结果');
    }
  },
};
</script>
