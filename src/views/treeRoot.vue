<template>
  <div>
    <div v-for="(item, index) in treeDataList" :key="index" >
      <div class="selecet-con">
        <RecursiveComponent :node="item" @update="updateTree" />
        <slot :Node="item" :index="index" :parent="parent"></slot>
      </div>
      <div v-if="item.children.length > 0" class="selecet-con">
        <treeRoot
         :treeRoot="item.children"
         @update="updateTree"
        >
        <slot :Node="item" :index="index" :parent="parent"></slot>
        </treeRoot>
      </div>
    </div>

    <!-- <el-button @click="save" type="primary">保存</el-button> -->

  </div>
</template>

<script>
import RecursiveComponent from "../components/treeItem.vue";

export default {
  name: "treeRoot",
  components: { RecursiveComponent },
  props: {
    treeRoot: {
      type: Array,
      default: () => ([]),
    },
  },
  data () {
    return {
      // 树的初始数据
      parent: {}
    };
  },
  computed: {
    // 递归组件
    treeDataList: {
      get () {
        return this.treeRoot;
      },
      set (val) {
        this.$emit('update:treeRoot', val)
      }
    }
    
  },
  created () {
    this.parent = this.$parent['treeRoot'];
    console.log(parent, '父组件');
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
    addchild(treeDataList, item) {
      let parent = {id: 0};
      if(this.$parent.treeDataList&&this.$parent.treeDataList.length > 0) {
        parent = this.$parent.treeDataList[this.$parent.treeDataList.length - 1];
        console.log(parent, '父组件');
        console.log(treeDataList, item, '新增子规则');
      }
      item.children.push({
        parentId: parent? parent.id : 0,
        id: parent? parent.id + 1 : 1,
        name: "",
        type: "",
        children: [],
      })
      console.log(treeDataList, '新增子规则结果');
      this.$emit('updateTree')

    },
    addItem () {
      let id = this.treeDataList[this.treeDataList.length -1].id
      this.treeDataList.push({
        id: id + 1,
        name: "",
        type: "",
        children: [],
      });
      console.log(this.treeDataList, '增加');
      this.$emit('updateTree')
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
