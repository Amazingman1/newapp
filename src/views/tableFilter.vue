<template>
  <div id="app">
    <symmetric-table
      :table-data="tableData"
      @cellClick="cellClick"
    />
  </div>
</template>

<script>
import SymmetricTable from './components/SymmetricTable.vue'

export default {
  components: {
    SymmetricTable
  },
  data() {
    return {
      tableData: [
        { production: '分箱1', 分箱1: 1000, 分箱2: 400, 分箱3: 300, 其他: 500, 总计: 2200 },
        { production: '分箱2', 分箱1: 500, 分箱2: 1000, 分箱3: 200, 其他: 100, 总计: 1800 },
        { production: '分箱3', 分箱1: 100, 分箱2: 160, 分箱3: 1000, 其他: 450, 总计: 1710 },
        { production: '其他', 分箱1: 100, 分箱2: 460, 分箱3: 340, 其他: 1000, 总计: 1900 },
        { production: '总计', 分箱1: 1700, 分箱2: 2020, 分箱3: 1840, 其他: 2050, 总计: 7610 },
      ]
    }
  },
  methods: {
    cellClick(row, col) {
      console.log(row, col)
    }
  }
}
</script>