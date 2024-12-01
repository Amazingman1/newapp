<template>
  <div>
    <div v-for="(item, index) in treeDataList" :key="index" class="selecet-con">
      <RecursiveComponent :node="item" @update="updateTree" />
      <el-button @click="deleteItem(index)" type="primary">删除</el-button>
    </div>
    <el-button @click="save" type="primary">保存</el-button>
    <el-button @click="addItem" type="primary">增加</el-button>

  </div>
</template>

<script>
import RecursiveComponent from "../components/treeItem.vue";

export default {
  components: { RecursiveComponent },
  data () {
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
    updateTree (updatedNode) {
      console.log(updatedNode, '更新数据');
      // this.treeData = updatedNode;
    },
    save () {
      console.log(this.treeDataList, '加载结果');
    },
    addItem () {
      this.treeDataList.push({
        name: "",
        type: "",
        children: [],
      });
    },
    deleteItem (index) {
      this.treeDataList.splice(index, 1);
    }
  },
};
</script>
<style lang='scss' scoped>
.selecet-con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}


</style>
