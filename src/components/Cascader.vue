<template>
  <div>
    <el-cascader
      v-model="selectedValue"
      :options="options"
      :props="cascaderProps"
      filterable
      clearable
      placeholder="请输入搜索内容"
      :before-filter="beforeFilter"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: [],
      options: [], // 级联选择的数据
      cascaderProps: {
        checkStrictly: false, // 只能选择叶子节点
        label: "label",
        value: "id",
        children: "children"
      }
    };
  },
  methods: {
    // **模拟远程搜索 API**
    fetchOptions(query) {
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
        }, 500); // 模拟网络延迟
      });
    },

    // **before-filter 远程搜索**
     beforeFilter(query) {
      return new Promise( (resolve, reject) => {
        if (!query) {
          resolve(true); // 输入为空时不执行搜索
        } else {
          try {
            console.log("搜索关键字:", query);
            const result = await this.fetchOptions(query); // 远程获取数据
            this.options = result; // 更新级联数据
            resolve(true); // 确保 el-cascader 继续执行搜索
          } catch (error) {
            console.error("远程搜索失败", error);
            reject(error); // 让 el-cascader 处理异常
          }
        }
      });
    },

    handleChange(value) {
      console.log("选中的值:", value);
    }
  }
};
</script>
