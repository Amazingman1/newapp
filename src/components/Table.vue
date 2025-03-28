<template>
  <el-table
    :data="tableData"
    :border="border"
    :stripe="stripe"
    :size="size"
    :height="height"
    :max-height="maxHeight"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <!-- 第一列：对角线分组的表头 -->
    <el-table-column
      :width="leftHeaderWidth"
      align="center"
    >
      <template v-slot:header>
        <div class="diagonal-header">
          <div class="top-header">{{ topHeader }}</div>
          <div class="left-header">{{ leftHeader }}</div>
        </div>
      </template>
      <template v-slot="{ row }">
        <div class="diagonal-cell">
          <!-- <span class="top-content">{{ row[topHeaderKey] }}</span> -->
          <span class="left-content">{{ row[leftHeaderKey] }}</span>
        </div>
      </template>
    </el-table-column>

    <!-- 其他列 -->
    <el-table-column
      v-for="(column, colIndex) in columns"
      :key="colIndex"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :align="column.align"
      :fixed="column.fixed"
      :sortable="column.sortable"
    >
      <!-- 自定义列内容 -->
      <template v-slot="{ row }" v-if="column.slot">
        <slot :name="column.slot" :row="row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'DoubleHeaderTable',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    // 顶部表头的键名（对应数据的字段）
    topHeaderKey: {
      type: String,
      required: true,
      default: 'id'
    },
    // 左侧表头的键名（对应数据的字段）
    leftHeaderKey: {
      type: String,
      required: true,
      default: 'name'
    },
    // 顶部表头的显示名称
    topHeader: {
      type: String,
      default: '顶部表头'
    },
    // 左侧表头的显示名称
    leftHeader: {
      type: String,
      default: '左侧表头'
    },
    // 左侧表头的宽度
    leftHeaderWidth: {
      type: String,
      default: '120'
    },
    // 其他列的配置
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否显示斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 表格尺寸
    size: {
      type: String,
      default: 'medium'
    },
    // 表格高度
    height: {
      type: [String, Number],
      default: null
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    // 选中行变化事件
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection);
    },
    // 行点击事件
    handleRowClick(row, column, event) {
      this.$emit('row-click', row, column, event);
    }
  }
};
</script>

<style scoped>
/* 对角线分组的表头样式 */
.diagonal-header {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background: linear-gradient(
    to top right,
    transparent 0%,
    transparent calc(50% - 1px),
    #ededef 50%,
    transparent calc(50% + 1px),
    transparent 100%
  )
}



.top-header {
  text-align: right;
  /* position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #909399; */
}

.left-header {
  position: relative;
  text-align: left;
  /* position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #606266; */
}
/* .left-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  transform: rotate(-45deg);
  transform-origin: 0 0;
} */

/* 对角线分组的单元格样式 */
.diagonal-cell {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>