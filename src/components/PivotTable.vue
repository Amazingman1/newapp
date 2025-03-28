<template>
  <div class="pivot-table-container">
    <div class="pivot-controls">
      <div class="control-group">
        <label>行字段:</label>
        <select v-model="rowField" @change="updatePivotTable">
          <option value="">(无)</option>
          <option v-for="field in availableFields" :key="'row-'+field" :value="field">{{ field }}</option>
        </select>
      </div>

      <div class="control-group">
        <label>列字段:</label>
        <select v-model="colField" @change="updatePivotTable">
          <option value="">(无)</option>
          <option v-for="field in availableFields" :key="'col-'+field" :value="field">{{ field }}</option>
        </select>
      </div>

      <div class="control-group">
        <label>值字段:</label>
        <select v-model="valueField" @change="updatePivotTable">
          <option value="">(无)</option>
          <option v-for="field in numericFields" :key="'val-'+field" :value="field">{{ field }}</option>
        </select>
      </div>

      <div class="control-group">
        <label>聚合方式:</label>
        <select v-model="aggregator" @change="updatePivotTable">
          <option value="sum">求和</option>
          <option value="count">计数</option>
          <option value="average">平均值</option>
          <option value="max">最大值</option>
          <option value="min">最小值</option>
        </select>
      </div>
    </div>

    <div class="pivot-table-wrapper" v-if="showTable">
      <table class="pivot-table">
        <thead>
          <tr>
            <th :rowspan="rowField ? 2 : 1">{{ rowHeader }}</th>
            <th :colspan="colValues.length" v-if="colField">{{ colField }}</th>
            <th rowspan="2" v-if="showGrandTotal">总计</th>
          </tr>
          <tr v-if="colField">
            <th v-for="col in colValues" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rowValues" :key="rowIndex">
            <td class="row-header">{{ row }}</td>
            <td v-for="col in colValues" :key="col">
              {{ getCellValue(row, col) }}
            </td>
            <td class="total-cell" v-if="showGrandTotal">{{ rowTotals[row] }}</td>
          </tr>
          <tr class="grand-total-row" v-if="showGrandTotal">
            <td class="row-header">总计</td>
            <td v-for="col in colValues" :key="'total-'+col">
              {{ colTotals[col] }}
            </td>
            <td class="total-cell">{{ grandTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-data-message">
      请选择行、列和值字段以生成透视表
    </div>
  </div>
</template>

<script>
export default {
  name: 'PivotTable',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    showGrandTotal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rowField: '',
      colField: '',
      valueField: '',
      aggregator: 'sum',
      pivotData: {},
      rowValues: [],
      colValues: [],
      rowTotals: {},
      colTotals: {},
      grandTotal: 0
    }
  },
  computed: {
    availableFields() {
      if (this.data.length === 0) return []
      return Object.keys(this.data[0])
    },
    numericFields() {
      if (this.data.length === 0) return []
      return Object.keys(this.data[0]).filter(key => {
        return typeof this.data[0][key] === 'number'
      })
    },
    rowHeader() {
      return this.rowField || '所有'
    },
    showTable() {
      return this.valueField && (this.rowField || this.colField)
    }
  },
  methods: {
    updatePivotTable() {
      if (!this.valueField || (!this.rowField && !this.colField)) {
        this.resetPivotData()
        return
      }

      this.calculatePivotData()
    },
    resetPivotData() {
      this.pivotData = {}
      this.rowValues = []
      this.colValues = []
      this.rowTotals = {}
      this.colTotals = {}
      this.grandTotal = 0
    },
    calculatePivotData() {
      const pivot = {}
      const rowVals = new Set()
      const colVals = new Set()
      const rowTotals = {}
      const colTotals = {}

      this.data.forEach(item => {
        const rowKey = this.rowField ? item[this.rowField] : '所有'
        const colKey = this.colField ? item[this.colField] : '所有'
        const value = item[this.valueField]

        // 初始化数据结构
        if (!pivot[rowKey]) {
          pivot[rowKey] = {}
          rowTotals[rowKey] = 0
        }
        if (!pivot[rowKey][colKey]) {
          pivot[rowKey][colKey] = {
            sum: 0,
            count: 0,
            max: -Infinity,
            min: Infinity,
            values: []
          }
        }

        // 更新聚合值
        const cell = pivot[rowKey][colKey]
        cell.sum += value
        cell.count++
        cell.max = Math.max(cell.max, value)
        cell.min = Math.min(cell.min, value)
        cell.values.push(value)

        // 更新行和列的总计
        rowTotals[rowKey] += value
        if (!colTotals[colKey]) colTotals[colKey] = 0
        colTotals[colKey] += value

        // 收集所有行和列的值
        rowVals.add(rowKey)
        colVals.add(colKey)
      })

      // 计算平均值
      for (const rowKey in pivot) {
        for (const colKey in pivot[rowKey]) {
          const cell = pivot[rowKey][colKey]
          cell.average = cell.sum / cell.count
        }
      }

      // 计算总计
      const grandTotal = Object.values(rowTotals).reduce((sum, val) => sum + val, 0)

      // 更新组件数据
      this.pivotData = pivot
      this.rowValues = Array.from(rowVals)
      this.colValues = Array.from(colVals)
      this.rowTotals = rowTotals
      this.colTotals = colTotals
      this.grandTotal = grandTotal
    },
    getCellValue(row, col) {
      const cell = this.pivotData[row] && this.pivotData[row][col]
      if (!cell) return '-'

      switch (this.aggregator) {
        case 'sum': return cell.sum.toFixed(2)
        case 'count': return cell.count
        case 'average': return cell.average.toFixed(2)
        case 'max': return cell.max.toFixed(2)
        case 'min': return cell.min.toFixed(2)
        default: return cell.sum.toFixed(2)
      }
    }
  },
  watch: {
    data() {
      this.updatePivotTable()
    }
  }
}
</script>

<style scoped>
.pivot-table-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.pivot-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  font-weight: bold;
  white-space: nowrap;
}

select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.pivot-table-wrapper {
  overflow-x: auto;
  margin-top: 10px;
}

.pivot-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.pivot-table th, .pivot-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: right;
}

.pivot-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
}

.row-header {
  font-weight: bold;
  text-align: left !important;
  background-color: #f9f9f9;
}

.total-cell {
  font-weight: bold;
  background-color: #f0f0f0;
}

.grand-total-row td {
  font-weight: bold;
  background-color: #e6e6e6;
}

.no-data-message {
  padding: 20px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border: 1px dashed #ddd;
  border-radius: 4px;
}
</style>