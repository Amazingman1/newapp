<template>
  <div class="cross-table">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th rowspan="2" class="corner-header bgc">
              <div class="horizontal-text">实验</div>
                <div class="vertical-text">生产</div>
            </th>
            <!-- 动态列头保持原始顺序 -->
            <th v-for="header in dataHeaders" :key="header" class="bgc">{{ header }}</th>
            <!-- 固定总计列 -->
            <th class="total-column  bgc">总计</th>
          </tr>
        </thead>
        <tbody>
          <!-- 数据行保持原始顺序 -->
          <tr v-for="item in tableData" :key="item.production">
            <td class="row-header  bgc">{{ item.production }}</td>
            <td v-for="header in dataHeaders" :key="header" style="color: #0062FF;" @click="cellClick(item, header)">
              <span style="cursor: pointer;">{{ item[header] }}</span>
            </td>
            <td class="total-column" style="color: #0062FF;" @click="cellClick(item, '总计')">
              <span style="cursor: pointer;">{{ item.总计 }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
      validator: data => {
        // 验证所有行数据结构一致
        const firstKeys = Object.keys(data[0] || {})
        return data.every(item => 
          Object.keys(item).length === firstKeys.length &&
          Object.keys(item).every(k => firstKeys.includes(k))
        )
      }
    }
  },
  computed: {
    // 获取数据列头（保留原始顺序）
    dataHeaders() {
      if (this.tableData.length === 0) return []
      // 排除固定字段并保留原始顺序
      return Object.keys(this.tableData[0])
        .filter(key => !['production', '总计'].includes(key))
    }
  },
  methods: {
    cellClick(row, col) {
      this.$emit('cellClick', row, row[col])
    }
  }
}
</script>

<style scoped>
.bgc{
  background-color: #BFCCEB !important;;
}
/* 保持原有样式不变 */
.cross-table {
  margin: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  min-width: 600px;
  width: 100%;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  text-align: center;
  min-width: 100px;
}

.corner-header {
  background: linear-gradient(
    to top right,
    transparent 0%,
    transparent calc(50% - 1px),
    #e0e0e0 50%,
    transparent calc(50% + 1px),
    transparent 100%
  );
}

.vertical-text {
  text-align: left;
}

.horizontal-text {
  text-align: right;
}

.row-header {
  background-color: #f8f9fa;
  font-weight: 500;
  min-width: 80px;
}

.total-column {
  /* background-color: #f0f0f0; */
  /* font-weight: bold; */
}

tbody tr:nth-child(even) {
  background-color: #F7FDFF ;
}

tbody tr:hover {
  background-color: #f1f3f5;
}
</style>