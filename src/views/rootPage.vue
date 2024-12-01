<template>
  <div style="padding: 20px;">
    <div v-for="(item, index) in rootList" :key="index"  style="padding: 20px;">
      <NestedSelect :dataSele="item" @update="updateRoot" />
    </div>
    <el-button @click="save" type="primary">保存</el-button>
  </div>
</template>

<script>
import NestedSelect from "./NestedSelect.vue";

export default {
  components: { NestedSelect },
  data () {
    return {
      root: {
        type: "fun", // 默认初始类型为 "value"
        num: '', // 默认初始值为空
        args: [], //  默认初始参数为空数组
        // children: [],
      },
      rootList: [
        {
          type: "fun", // 默认初始类型为 "value"
          num: '', // 默认初始值为空
          args: [], //  默认初始参数为空数组
        },
        {
          type: "fun", // 默认初始类型为 "value"
          num: '', // 默认初始值为空
          args: [], //  默认初始参数为空数组
        }
      ]
    };
  },
  methods: {
    save() {
      console.log(this.rootList, '保存数据');
    },
    updateRoot (newData) {
      this.root = newData; // 更新根节点数据
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
