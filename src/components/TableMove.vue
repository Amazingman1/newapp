<template>
  <div>
    <el-button type="primary" @click="addIf">增加子条件</el-button>
    <el-button type="primary" @click="addRule">增加规则</el-button>
    <el-button type="primary" @click="saveTable">保存</el-button>
    <el-button type="primary" @click="sendDta">发送</el-button>
    <div>
      <!-- <iframe ref="myFrame" src="http://localhost:5173" width="100%" height="500px"></iframe> -->
    </div>
    <el-table :data="tableData" border style="width: 100%" :span-method="objectSpanMethod" @cell-click="handleClick" @row-contextmenu="handleContextmenu">
      <el-table-column prop="name" label="" width="120">
        <el-table-column v-for="item in colList" :key="item.label" :prop=item.prop :label=item.label
           :render-header="item.render">
          <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index][item.prop]"
              placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
        <template slot-scope="scope">
            <el-input v-model="tableData[scope.$index].province"
              placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120">
      </el-table-column>
      <el-table-column prop="result" label="输出结果" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addData(scope.$index, scope.row)">新增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <DalogForm ref="dalogForm" @save="saveData"></DalogForm>
    <DalogFormRule ref="DalogFormRule" @save="saveRule"></DalogFormRule>
  </div>
</template>

<script>
import DalogForm from './DalogForm.vue';
import DalogFormRule from './DalogFormRule.vue';
export default {

  components: { DalogForm, DalogFormRule },

  methods: {
    sendDta() {
      this.$refs.myFrame.contentWindow.postMessage('2323', '*')
    },
    getSpanArr (data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0,
          this.pos1 = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].id === data[i - 1].id) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else if (data[i].month === data[i - 1].month) {
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
      console.log('rowIndex:', rowIndex, 'columnIndex:',columnIndex, 'spanArr:', this.spanArr)
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        console.log('rowspan:', _row, 'colspan:', _col)
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

    addRule() {
      this.$refs.DalogFormRule.showDialog()
    },
    addData (index, row) {
      console.log(index)
      const data = {
        date: '2016-05-02',
        name: '王小虎',
        year: row.year,
        id: row.id,
        id1: [row.id1[0], row.id1[1]+1],
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
    saveRule(data){
      const dataFrom = {
        ...data,
        name: '王小虎',
        year: data.date,
        id: data.id,
        id1: [data.id, 0],
        month: '7',
        province: '苏州',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
      }
      this.tableData.push(dataFrom)
      this.spanArr = []
      // this.tableData.push(data)
      this.getSpanArr(this.tableData)
    },
    handleContextmenu (row, column, event) {
      event.preventDefault()
      console.log(row, column, event)
      // this.$refs.menu.open(event, row);
    },
    addIf () {
      this.$refs.dalogForm.showDialog()
      // this.colList.push({
      //   label: '天',
      //   prop: 'day',
      //   width: '100',
      // })
    },
    saveData(data){
      this.colList.push(data)
    },
    saveTable() {
      console.log(this.tableData)
    }
  },
  mounted () {
    this.getSpanArr(this.tableData)
    // window.addEventListener('message', (event) => {
    //   if(event.origin === 'http://localhost:8080') {
    //     console.log(event.origin === 'http://localhost:8080', 'event.data')
    //   }
    // })
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
          label: '条件',
          prop: 'month',
          width: '100',
        }
      ],
      spanArr: [],
      pos: 0,
      pos1: 0,
      tableData: [{
        id: 1,
        id1: [1, 0],
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
        id: 1,
        id1: [1,1],
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
       id: 2,
        id1: [2,0],
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200335
      }, {
        date: '2016-05-03',
        name: '王小宝',
        province: '上海',
        year: '2024',
        day: '2',
        id: 2,
        id1: [2,1],
        city: '普陀区',
        month: '6',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200335
      }]
    }
  }
}
</script>
