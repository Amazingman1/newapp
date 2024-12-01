<template>
  <div>
    <my-tree :tree-data="treeData" @node-click="nodeClick" @addArgs="addArgs"></my-tree>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script>
const treeData = [
  { id: 1, name: '一级1', args: [{num: ''}]},
  {
    id: 2,
    name: '一级2',
    function: 'max', args:[{num: ''},{num: ''}],
    children: [
      { id: 3, name: '二级2-1',function: 'max', args:[{num: ''},{num: ''}] },
      { id: 4, name: '二级2-2', function: 'max', args:[{num: ''},{num: ''}],
      children: [
          { id: 7, name: '三级3-1-1',function: 'max', args:[{num: ''},{num: ''}] },
          { id: 8, name: '三级3-1-2',function: 'max', args:[{num: ''},{num: ''}] }
        ] }
    ]
  },
]
import myTree from '@/components/SelectTreeItem.vue'
// import SelectIem from '@/components/SelectIem.vue';
export default {
  components: {
    myTree
  },
  data() {
    return {
      treeData: treeData
    }
  },
  methods: {
    nodeClick(val) {
      console.log(val)
    },

    save() {
      console.log(this.treeData, '保存数据')
    },
    addArgs(val, data) {
      console.log(val, data,'添加参数')
      const newData = {
        id: data.id + 1,
        name: '新节点' + 1,
        args: [...val]
      }
      if (!data.children) {
        data.children = [];
      }
      data.children.push(newData);
      // data = [...data];
      // this.treeData = [...this.treeData];
    }
  }
}
</script>
