<template>
  <div class="recursive-component">
    <div class="node">
      <!-- 显示当前节点 -->
      <select v-model="node.type" @change="onTypeChange">
        <option value="value">值</option>
        <option value="function">函数</option>
      </select>
      <select v-model="node.name" @change="emitUpdate">
        <option v-for="arg in args[node.type]" :key="arg.value" :value="arg.value" >{{arg.label}}</option>
        <!-- <option value="min">min</option> -->
      </select>
    </div>

    <!-- 如果当前节点是函数类型，则渲染其子节点 -->
    <div v-if="node.type === 'function'" class="children">
      <RecursiveComponent
        v-for="(child, index) in node.children"
        :key="index"
        :node="child"
        @update="updateChild(index, $event)"
      />
      <button @click="addChild">添加子节点</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecursiveComponent",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      args: {
        fun: [
        {
          label: 'max',
          value: 'max'
        },
        {
          label: 'min',
          value: 'min'
        }
        ],
        var: [
          {
            label: 'age',
            value: 'age'
          },
          {
            label: 'name',
            value: 'name'
          }
        ]
      },
    };
  },
  methods: {
    emitUpdate() {
      // 通知父组件当前节点发生了变化
      this.$emit("update", this.node);
    },
    onTypeChange() {
      // 当类型切换时，清空子节点
      if (this.node.type === "value") {
        this.node.name = "";
        this.node.children = [];
      }
      this.emitUpdate(); // 通知父组件
    },
    addChild() {
      // 添加一个新的子节点
      this.node.children.push({
        name: "新子节点1",
        type: "value",
        children: [],
      },{
        name: "新子节点2",
        type: "value",
        children: [],
      });
      this.emitUpdate(); // 通知父组件
    },
    updateChild(index, updatedChild) {
      // 更新子节点的数据
      this.node.children[index] = updatedChild;
      this.emitUpdate(); // 通知父组件
    },
  },
};
</script>

<style scoped>
.recursive-component {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
}
.children {
  margin-left: 20px;
  display: flex;

}
</style>
