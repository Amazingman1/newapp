<template>
  <el-table :data="filteredData" style="width: 100%">
    <!-- 日期筛选列 -->
    <el-table-column prop="date" label="日期" width="200">
      <template slot="header">
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 8px;">日期筛选</span>
          <!-- 自定义下拉菜单 -->
          <custom-dropdown ref="dropdown">
            <!-- 触发按钮 -->
            <template #trigger>
              <i class="el-icon-date" style="cursor: pointer; color: #409EFF;"></i>
            </template>

            <!-- 下拉菜单内容 -->
            <div>
              <!-- 嵌入 el-date-picker -->
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                style="width: 100%; z-index: 1050;"
              ></el-date-picker>

              <!-- 操作按钮 -->
              <div style="margin-top: 10px; text-align: right;">
                <el-button size="mini" @click="resetFilter">重置</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="applyFilter"
                >筛选</el-button>
              </div>
            </div>
          </custom-dropdown>
        </div>
      </template>
      <template slot-scope="scope">
        {{ scope.row.date }}
      </template>
    </el-table-column>

    <!-- 其他列 -->
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
import CustomDropdown from "@/components/CustomDropdown.vue";

export default {
  components: {
    CustomDropdown,
  },
  data() {
    return {
      tableData: [
        { date: "2024-06-01", name: "张三", address: "北京市" },
        { date: "2024-06-05", name: "李四", address: "上海市" },
        { date: "2024-06-10", name: "王五", address: "广州市" },
        { date: "2024-06-15", name: "赵六", address: "深圳市" },
      ],
      dateRange: [], // 时间筛选范围
      filteredData: [], // 筛选后的数据
    };
  },
  created() {
    this.filteredData = this.tableData;
  },
  methods: {
    // 应用筛选
    applyFilter() {
      
      if (this.dateRange && this.dateRange.length === 2) {
        const [start, end] = this.dateRange.map(date => new Date(date).getTime());
        this.filteredData = this.tableData.filter(row => {
          const rowDate = new Date(row.date).getTime();
          return rowDate >= start && rowDate <= end;
        });
      }
      this.$refs.dropdown.closeDropdown(); // 关闭下拉菜单
    },
    // 重置筛选
    resetFilter() {
      this.dateRange = [];
      this.filteredData = this.tableData;
    },
  },
};
</script>

<style scoped>
.el-icon-date {
  font-size: 16px;
}
</style>
