<template>
  <div class="node">
    <!-- 遍历当前节点的子节点 -->

    <div v-for="(childNode, childIndex) in node.children" :key="childNode.id">
      <div class="node-header">
        <span>{{ childNode.comp.name }}</span>
        <button @click="deleteChild(childIndex)">
          删除当前节点
        </button>
        <button @click="add">
          新增节点
        </button>
        <button @click="addChild">
          新增子节点
        </button>
      </div>
      <!-- 如果当前子节点还有子节点，递归调用 -->
      <div v-if="childNode.grop && Object.keys(childNode.grop).length > 0 && childNode.grop.children.length > 0"
        class="node-children">
        <recursive-node :node="childNode.grop" :childIndex="childIndex" :parentChildren="node.grop.children" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RecursiveNode",
  props: {
    node: {
      type: Object,
      required: true, // 当前节点对象
    },
    parentChildren: {
      type: Array,
      default: null, // 父节点的 children 数组
    },
    childIndex: {
      type: Number,
      default: null, // 当前节点在父节点中的索引
    },
  },
  computed: {
    isRootNode () {
      return this.parentChildren === null; // 判断是否为根节点
    },
  },
  created () {
    console.log(this.node, "当前节点");
  },
  methods: {

    flattenTreeWithReduce (tree, childrenKey = 'children') {
      return tree.reduce((acc, node) => {
        const { [childrenKey]: children, ...rest } = node; // 提取节点和子节点
        acc.push(rest);
        if (children) {
          acc.push(...this.flattenTreeWithReduce(children, childrenKey)); // 递归处理子节点
        }
        return acc;
      }, []);
    },

    deleteChild (index) {
      // const child = this.node.children[index];

      // 删除目标子节点
      // eslint-disable-next-line vue/no-mutating-props
      this.node.children.splice(index, 1);

      // 检查当前节点的 children 是否为空
      if (
        this.node.children.length === 0 &&
        !this.isRootNode &&
        this.parentChildren.length > 1 // 确保至少保留一个根节点
      ) {
        // 通知父组件删除当前节点
        // eslint-disable-next-line vue/no-mutating-props
        this.parentChildren.splice(this.childIndex, 1);
      } else if (this.isRootNode && this.node.children.length === 0) {
        console.warn("根节点的 children 已为空，无法删除根节点！");
      }
    },
    add () {
      // 新增同级节点
      // eslint-disable-next-line vue/no-mutating-props
      this.node.children.push({
        comp: {
          id: new Date().getTime(),
          name: "同级节点 " + new Date().getTime(),
        }
      });
    },
    addChild () {
      // 新增子节点
      // eslint-disable-next-line vue/no-mutating-props
      this.node.children.push({
        grop: {
          id: new Date().getTime(),
          children: [
            {
              comp: {
                id: new Date().getTime(),
                name: "子节点 3",
              }

            }
          ]

        }
      });
      console.log(this.node.children)
    },
  },
};
</script>

<style>
.node {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.node-children {
  margin-left: 20px;
}
</style>
