<template>
  <div>
    <el-button type="primary" @click="addIf">增加子条件</el-button>
    <el-button type="primary" @click="saveTable">保存</el-button>
    <el-table :data="tableData" border style="width: 100%" :span-method="objectSpanMethod" @cell-click="handleClick">
      <el-table-column prop="name" label="姓名" width="120">
        <el-table-column v-for="item in colList" :key="item.label" :prop=item.prop :label=item.label
          @click="handleContextmenu" :render-header="item.render">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index][item.prop]"
              placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="month" label="月"></el-table-column> -->
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addData(scope.$index, scope.row)">新增</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    getSpanArr (data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].year === data[i - 1].year) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod ({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },     // 向上移动
    moveUp (index, row) {
      this.tableData.splice(index, 1)
      this.tableData.splice(index - 1, 0, row)
    },
    moveDown (index, row) {
      this.tableData.splice(index, 1)
      this.tableData.splice(index + 1, 0, row)
    },
    deletRow (index, rows) {
      rows.splice(index, 1)
    },
    handleClick (row) {
      console.log(row);
    },
    lastIndex (index) {
      return this.tableData.length - 1 === index
    },
    addData (index, row) {
      console.log(index)
      const data = {
        date: '2016-05-02',
        name: '王小虎',
        year: row.year,
        month: '7',
        province: '苏州',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }
      this.tableData.splice(index + 1, 0, data)
      // 重置合并index
      this.spanArr = []
      // this.tableData.push(data)
      this.getSpanArr(this.tableData)
    },
    handleContextmenu (row, column, event) {
      console.log(row, column, event)
      // this.$refs.menu.open(event, row);
    },
    addIf () {
      this.colList.push({
        label: '天',
        prop: 'day',
        width: '100',
      })
    },
    saveTable() {
      console.log(this.tableData)
    }
  },
  mounted () {
    this.getSpanArr(this.tableData)
    // this.mergeBt();
  },
  computed: {

  },
  data () {
    return {
      colList: [
        {
          label: '年',
          prop: 'year',
          width: '100'
        },
        {
          label: '月',
          prop: 'month',
          width: '100',
        }
      ],
      spanArr: [],
      pos: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        year: '2023',
        month: '5',
        day: '5',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        year: '2023',
        month: '6',
        day: '4',

        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小宝',
        province: '上海',
        year: '2024',
        month: '5',
        day: '3',

        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200335
      }, {
        date: '2016-05-03',
        name: '王小宝',
        province: '上海',
        year: '2024',
        day: '2',
        city: '普陀区',
        month: '6',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200335
      }]
    }
  }
}
</script>
