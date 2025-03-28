<template>
  <div class="symmetric-table-with-total">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th rowspan="2">生产\实验</th>
            <th :colspan="headers.length">分箱维度</th>
          </tr>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- 普通数据行 -->
          <tr v-for="(row, rowIndex) in regularData" :key="rowIndex">
            <td class="row-header">{{ row.production }}</td>
            <td v-for="(header, colIndex) in headers" :key="colIndex">
              {{ row[header] }} ({{ getPercentage(row[header], row.总计) }})
            </td>
          </tr>
          
          <!-- 总计行 -->
          <tr class="total-row" v-if="totalRow">
            <td class="row-header">{{ totalRow.production }}</td>
            <td v-for="(header, colIndex) in headers" :key="colIndex">
              {{ totalRow[header] }} ({{ getTotalPercentage(totalRow[header]) }})
            </td>
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
      validator: data => data.some(item => item.production === '总计')
    }
  },
  computed: {
    // 提取所有分箱维度（自动排除'production'和'总计'）
    headers() {
      const excludeFields = ['production', '总计']
      return Object.keys(this.tableData[0])
        .filter(key => 
          !excludeFields.includes(key) && 
          (key.startsWith('分箱') || key === '其他')
        )
        .sort((a, b) => {
          const numA = parseInt(a.replace('分箱', '')) || 0
          const numB = parseInt(b.replace('分箱', '')) || 0
          return numA - numB
        })
    },

    // 分离普通数据和总计行
    regularData() {
      return this.tableData.filter(item => item.production !== '总计')
    },
    
    totalRow() {
      return this.tableData.find(item => item.production === '总计')
    },
    
    // 计算整体总计（取自总计行的总计列）
    grandTotal() {
      return this.totalRow ? this.totalRow.总计 : 0
    }
  },
  methods: {
    // 普通行百分比计算（基于当前行的总计）
    getPercentage(value, total) {
      return total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0.00%'
    },
    
    // 总计行百分比计算（基于整体总计）
    getTotalPercentage(value) {
      return this.grandTotal > 0 
        ? ((value / this.grandTotal) * 100).toFixed(2) + '%' 
        : '0.00%'
    }
  }
}
</script>

<style scoped>
.symmetric-table-with-total {
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
  min-width: 800px;
  width: 100%;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  text-align: center;
  min-width: 120px;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.row-header {
  background-color: #f1f3f5;
  font-weight: 500;
}

.total-row {
  background-color: #e9ecef;
  font-weight: bold;
}

.total-row td {
  background-color: #dee2e6;
}

tbody tr:nth-child(even):not(.total-row) {
  background-color: #f8f9fa;
}

tbody tr:hover {
  background-color: #f1f3f5;
}
</style>