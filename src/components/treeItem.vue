<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="recursive-component">
    <div v-if="!node.name" class="node">
      <!-- 显示当前节点 -->
      <select v-model="node.type" @change="onTypeChange">
        <option value="fun">函数</option>
        <option value="var">变量</option>
        <option value="const">常量</option>
      </select>
      <select v-if="node.type !== 'const'" v-model="node.name" @change="changeVaule">
        <option v-for="arg in args[node.type]" :key="arg.value" :value="arg.value">{{ arg.label }}</option>
      </select>
      <input v-else @blur="bulrFun"/>
    </div>
    <div v-else>
      <div v-if="node.type === 'fun'" class="children">
        <span @click="changeitem" :class="colorText[node.type]" class="foc-txt">{{ node.name }}</span>
        <span>(</span>
        <span v-for="(child, index) in node.children" :key="index" style="display: flex;">
          <RecursiveComponent :node="child" @update="updateChild(index, $event)" />
          <div v-if="index !== node.children.length - 1">,</div>
        </span>
        <span>)</span>
      </div>
      <div v-else>
        <span class="foc-txt"  :class="colorText[node.type]" @click="changeitem">{{ node.name }}</span>
      </div>
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
  data () {
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
      colorText: {
        var: 'var-text',
        const: 'const-text',
        fun: 'fun-text',
      },
  
    };
  },
  methods: {
    bulrFun(val) {

      console.log(val.target.value)
      // eslint-disable-next-line vue/no-mutating-props
      this.node.name = val.target.value
      // this.emitUpdate()
    },
    changeitem() {
      // eslint-disable-next-line vue/no-mutating-props
      this.node.name = ''
      // eslint-disable-next-line vue/no-mutating-props
      this.node.children = [];

      // this.dataSele.args = []
    },
    emitUpdate () {
      // 通知父组件当前节点发生了变化
      this.$emit("update", this.node);
      // this.addChild()
    },
    onTypeChange () {
      // 当类型切换时，清空子节点
      if (this.node.type === "value") {
      // eslint-disable-next-line vue/no-mutating-props
        this.node.name = "";
      // eslint-disable-next-line vue/no-mutating-props
        this.node.children = [];
      }
      this.emitUpdate(); // 通知父组件
    },
    changeVaule () {
      if (this.node.type === "fun") {
        this.addChild()
      }
      this.emitUpdate(); // 通知父组件
    },
    addChild () {
      // 添加一个新的子节点
      // eslint-disable-next-line vue/no-mutating-props  
      this.node.children.push({
        name: "",
        type: "",
        children: [],
      },{
        name: "",
        type: "value",
        children: [],
      });
      this.emitUpdate(); // 通知父组件
    },
    updateChild (index, updatedChild) {
      // 更新子节点的数据
      // eslint-disable-next-line vue/no-mutating-props
      this.node.children[index] = updatedChild;
      this.emitUpdate(); // 通知父组件
    },
  },
};
</script>

<style scoped>
.recursive-component {
  border-radius: 4px;
  display: flex;
}
.var-text{
  color:red
}
.const-text{
  color:blue
}
.fun-text{
  color: green
}
.children {
  margin-left: 10px;
  display: flex;

}
.foc-txt{
  /* color: #409eff; */
  cursor: pointer;
  padding: 0 5px;
}
</style>
