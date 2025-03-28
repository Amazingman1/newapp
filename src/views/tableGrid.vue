<template>
  <div class="table-container">
    <!-- 表头 -->
    <div class="table-header">
      <div class="table-cell">列1</div>
      <div class="table-cell">列2</div>
      <div class="table-cell">操作</div>
    </div>
    <!-- 表格内容 -->
    <div
      class="table-row"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="table-cell">{{ item.field1 }}</div>
      <div class="table-cell">{{ item.field2 }}</div>
      <div class="table-cell">
        <button @click="deleteItem(index)">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { field1: '数据1-1', field2: '数据1-2' },
        { field1: '数据2-1', field2: '数据2-2' },
        // 更多数据项...
      ],
    };
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.table-container {
  display: grid;
  grid-template-rows: auto;
  gap: 1px;
  background-color: #ccc;
}

.table-header,
.table-row {
  display: contents;
}

.table-cell {
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.table-header .table-cell {
  font-weight: bold;
  background-color: #f0f0f0;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
}

button {
  padding: 4px 8px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ff7875;
}
</style>
