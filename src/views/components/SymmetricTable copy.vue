<template>
  <div class="symmetric-table">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th rowspan="2" class="header">
              <div style="text-align: right;">生产</div>
              <div style="text-align: left;">实验</div>
            </th>
          </tr>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in matrixData" :key="rowIndex">
            <td class="row-header">{{ headers[rowIndex] }}</td>
            <td v-for="(col, colIndex) in row" :key="colIndex">
              {{ col.value }} ({{ col.percentage }}%)
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
    dimensionName: {
      type: String,
      default: '分箱'
    },
    rawData: {
      type: Array,
      required: true,
      validator: data => data.every(item => 
        typeof item === 'object' && 
        'production' in item &&
        Object.keys(item).every(key => 
          key === 'production' || key.startsWith('分箱') || key === '其他'
        )
      )
    }
  },
  computed: {
    // 自动提取所有维度标签（包含'其他'）
    headers() {
      const labels = new Set(['其他'])
      this.rawData.forEach(item => {
        Object.keys(item).forEach(key => {
          if (key.startsWith('分箱')) labels.add(key)
        })
      })
      return Array.from(labels).sort((a, b) => {
        const numA = parseInt(a.replace('分箱', '')) || 0
        const numB = parseInt(b.replace('分箱', '')) || 0
        return numA - numB
      })
    },

    // 生成矩阵数据结构
    matrixData() {
      return this.headers.map(rowLabel => {
        const sourceRow = this.rawData.find(item => item.production === rowLabel) || {}
        const rowTotal = this.headers.reduce((sum, colLabel) => 
          sum + (sourceRow[colLabel] || 0), 0
        )
        
        return this.headers.map(colLabel => {
          const value = sourceRow[colLabel] || 0
          return {
            value,
            percentage: rowTotal > 0 
              ? ((value / rowTotal) * 100).toFixed(2)
              : '0.00'
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(
    to top right,
    transparent 0%,
    transparent calc(50% - 1px),
    #e0e0e0 50%,
    transparent calc(50% + 1px),
    transparent 100%
  );
}
.symmetric-table {
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

tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

tbody tr:hover {
  background-color: #f1f3f5;
}
</style>