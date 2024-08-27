<!--
 * @Author: wangxuan 10590
 * @Date: 2024-08-27 21:46:24
 * @LastEditors: wangxuan 10590
 * @LastEditTime: 2024-08-28 00:27:20
 * @FilePath: \newapp\src\components\HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>

    <el-input v-model="val" placeholder="请输入内容" oninput="value=value.match(/^\d+(?:\.\d{0,4})?/)"></el-input>
    {{ val }}
    <el-button type="primary" @click="save">保存</el-button>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName1" @row-click="tableRowClassName">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="金额" width="120">
        <template slot-scope="scope">
          <el-input :disabled="tableData[scope.$index].child.length > 0" v-model="tableData[scope.$index].amount"
            placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            移除
          </el-button>
          <el-button @click.native.prevent="add(scope.$index, tableData)" type="text" size="small">
            新增
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-for="(item, index) in tableData" :key="item.date">
      <div v-if="curryIndex === index">
        <el-table :data="item.child" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="金额" width="120">
            <template slot-scope="scope">
              <el-input v-model="item.child[scope.$index].amount" placeholder="请输入内容"
                oninput="value=value.match(/^\d+(?:\.\d{0,4})?/)" @input="reduceAmont()"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, item.child)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

  </div>
</template>


<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
export default {
  methods: {

    reduceAmont () {
      const amount = this.tableData[this.curryIndex].child.reduce((pre, cur) => {
        console.log(cur.amount, '3232')
        return pre + Number(cur.amount)
      }, 0)
      this.$set(this.tableData[this.curryIndex], 'amount', amount)
    },
    add (index, rows) {
      rows[index].child.push({ name: '新儿子' })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
      this.reduceAmont()
    },
    tableRowClassName (row, column) {
      console.log('rowIndex ', row, column)
      this.curryIndex = row.index
    },
    tableRowClassName1 ({ row, rowIndex }) {
      row.index = rowIndex
    },
    save () {
      console.log(this.tableData)
    },
  },
  data () {
    return {
      val: '',
      curryIndex: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        amount: '',
        child: [
          { name: '1儿子1 ', amount: '' },
          { name: '1儿子1', amount: '' },
          { name: '1儿子2', amount: '' },
        ]
      }, {
        date: '2016-05-04',
        name: '王小虎',
        amount: '',
        child: [
          { name: '2儿子 ', amount: '' },
          { name: '2儿子1', amount: '' },
          { name: '2儿子2', amount: '' },
        ]

      }, {
        date: '2016-05-01',
        name: '王小虎',
        amount: '',
        child: [
          { name: '3儿子 ', amount: '' },
          { name: '3儿子1', amount: '' },
          { name: '3儿子2', amount: '' },
        ]

      }, {
        date: '2016-05-03',
        name: '王小虎',
        amount: '',
        child: [
          { name: '4儿子 ', amount: '' },
          { name: '4儿子1', amount: '' },
          { name: '4儿子2', amount: '' },
        ]

      }]
    }
  }
}
</script>