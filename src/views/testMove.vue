<template>
  <div>
    <DoubleHeaderTable
      :table-data="tableData"
      :top-header-key="topHeaderKey"
      :left-header-key="leftHeaderKey"
      :top-header="topHeader"
      :left-header="leftHeader"
      :columns="columns"
      border
      stripe
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <!-- 自定义列内容 -->
      <template v-slot:status="{ row }">
        <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
          {{ row.status }}
        </el-tag>
      </template>
    </DoubleHeaderTable>
  </div>
</template>

<script>
import DoubleHeaderTable from '../components/Table.vue';

export default {
  components: {
    DoubleHeaderTable
  },
  data() {
    return {
      // 表格数据
      tableData: [
        { id: 1, name: 'John', age: 25,height: 189, status: 'success' },
        { id: 2, name: 'Jane', age: 30,height: 179,status: 'danger' },
        { id: 3, name: 'Alice', age: 28,height: 169,status: 'success' }
      ],
      // 顶部表头的键名
      // topHeaderKey: 'id',
      // 左侧表头的键名
      leftHeaderKey: 'name',
      // 顶部表头的显示名称
      topHeader: 'ID',
      // 左侧表头的显示名称
      leftHeader: '姓名',
      // 其他列的配置
      columns: [
        { prop: 'age', label: '年龄', width: '100' },
        { prop: 'height', label: '身高', width: '100' },
        { prop: 'status', label: '状态', slot: 'status' },
      ]
    };
  },
  methods: {
    // 选中行变化事件
    handleSelectionChange(selection) {
      console.log('Selected:', selection);
    },
    // 行点击事件
    handleRowClick(row, column, event) {
      console.log('Row clicked:', row);
    }
  }
};
</script>