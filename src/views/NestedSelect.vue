<template>
  <div>
    <el-cascader
      ref="cascaderRef"
      v-model="selectedValue"
      :options="options"
      :props="cascaderProps"
      filterable
      clearable
      placeholder="请输入搜索内容"
      :before-filter="beforeFilter"
      @change="handleChange"
    />
    <el-button @click="getCheckedNodes">获取选中节点</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: [],
      options: [], // 级联数据
      cascaderProps: {
        label: "label",
        value: "id",
        children: "children"
      },
      originalOptions: [] // 用于存储原始数据
    };
  },
  methods: {
    // **模拟远程 API 获取数据**
    async fetchOptions(query) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = [
            {
              id: 1,
              label: `分类 ${query} A`,
              children: [
                { id: 11, label: `子分类 ${query} A1` },
                { id: 12, label: `子分类 ${query} A2` }
              ]
            },
            {
              id: 2,
              label: `分类 ${query} B`,
              children: [
                { id: 21, label: `子分类 ${query} B1` },
                { id: 22, label: `子分类 ${query} B2` }
              ]
            }
          ];
          resolve(data);
        }, 500);
      });
    },

    // **before-filter 远程搜索**
    beforeFilter(query) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        if (!query) {
          this.options = this.originalOptions; // 恢复原始数据
          return resolve(true);
        }

        try {
          console.log("搜索关键字:", query);
          const searchResults = await this.fetchOptions(query);

          // **合并原始数据，避免丢失选中状态**
          this.options = [...this.originalOptions, ...searchResults];

          resolve(true); // 让 el-cascader 继续搜索
        } catch (error) {
          console.error("远程搜索失败", error);
          resolve(false);
        }
      });
    },

    // **获取选中的节点**
    getCheckedNodes() {
      const checkedNodes = this.$refs.cascaderRef.getCheckedNodes();
      console.log("选中的节点:", checkedNodes);
    },

    handleChange(value) {
      console.log("选中的值:", value);
      this.getCheckedNodes();
    }
  },
  mounted() {
    // **初始加载数据**
    this.fetchOptions("").then((data) => {
      this.options = data;
      this.originalOptions = [...data]; // 备份数据
    });
  }
};
</script>
