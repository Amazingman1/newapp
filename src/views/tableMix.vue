<template>
  <div>
    <table border="1">
      <!-- 表头 -->
      <thead>
        <tr>
          <th>Salesperson</th>
          <th v-for="month in months" :key="month">{{ month }}</th>
        </tr>
      </thead>
      
      <!-- 表体 -->
      <tbody>
        <tr v-for="(salesData, salesperson) in pivotData" :key="salesperson">
          <td>{{ salesperson }}</td>
          <td v-for="month in months" :key="month">
            {{ salesData[month] || 0 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 原始数据
      rawData: [
        { name: 'Alice', month: 'January', sales: 120 },
        { name: 'Bob', month: 'January', sales: 200 },
        { name: 'Alice', month: 'February', sales: 150 },
        { name: 'Bob', month: 'February', sales: 180 },
        { name: 'Alice', month: 'March', sales: 130 },
        { name: 'Bob', month: 'March', sales: 170 }
      ],
      months: ['January', 'February', 'March'],  // 假设已知的月份
    };
  },
  computed: {
    // 转换后的交叉表格数据
    pivotData() {
      const pivot = {};
      this.rawData.forEach(item => {
        if (!pivot[item.name]) {
          pivot[item.name] = {};
        }
        pivot[item.name][item.month] = item.sales;
      });
      return pivot;
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}
</style>
