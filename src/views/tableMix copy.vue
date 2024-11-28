<template>
  <table>
    <thead>
      <tr>
        <th rowspan="2">Product</th>
        <th colspan="3">Quarter</th>
      </tr>
      <tr>
        <th>Q1</th>
        <th>Q2</th>
        <th>Q3</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td>{{ row.product }}</td>
        <td>{{ row.q1 }}</td>
        <td>{{ row.q2 }}</td>
        <td>{{ row.q3 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { product: 'Product A', q1: 10, q2: 20, q3: 30 },
        { product: 'Product B', q1: 15, q2: 25, q3: 35 },
      ],
    };
  },
};
</script>
