<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      :header-cell-style="{ textAlign: 'center', backgroundColor: '#F5F7FA' }"
    >
      <el-table-column prop="School" label="学校" align="center">
        <el-table-column v-for="item in colList" :key="item.label" :prop=item.prop :label=item.label
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="Name" label="姓名" align="center" />
      <el-table-column prop="Chinese" label="语文" align="center" />
      <el-table-column prop="Math" label="数学" align="center" />
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
  data() {
    return {
      colList: [
        {
          label: '年级',
          prop: 'School',
          width: '100'
        },
        {
          label: '班级',
          prop: 'Grade',
          width: '100',
        }
      ],
      // 存放所有的表头 一定要与tableData一致
      colFields: [
        "School",
        "Grade",
        "Class",
        "Name",
        "Chinese",
        "Math",
        "English",
      ],
      spanArr: [], //存储合并单元格的开始位置
      // 表格数据
      tableData: [
        // 一年级
        {
          School: "第一小学",
          Grade: "1年级",
          Class: "1班",
          Name: "张三",
          Chinese: "90",
          Math: "100",
          English: "80",
        },
        {
          School: "第一小学",
          Grade: "1年级",
          Class: "1班",
          
          Name: "qi伟",
          Chinese: "90",
          Math: "99",
          English: "89",
        },
        {
          School: "第一小学",
          Grade: "1年级",
          Class: "2班",
          Name: "李四",
          Chinese: "90",
          Math: "85",
          English: "80",
        },
        {
          School: "第一小学",
          Grade: "1年级",
          Class: "3班",
          Name: "王五",
          Chinese: "79",
          Math: "100",
          English: "80",
        },
        // 二年级
        {
          School: "第一小学",
          Grade: "2年级",
          Class: "1班",
          Name: "赵六",
          Chinese: "95",
          Math: "100",
          English: "80",
        },
        {
          School: "第一小学",
          Grade: "2年级",
          Class: "2班",
          Name: "钱八",
          Chinese: "98",
          Math: "85",
          English: "80",
        },
        {
          School: "第一小学",
          Grade: "2年级",
          Class: "3班",
          Name: "陈九",
          Chinese: "79",
          Math: "100",
          English: "100",
        },
        // 三年级
        {
          School: "第一小学",
          Grade: "3年级",
          Class: "1班",
          Name: "黄十",
          Chinese: "91",
          Math: "88",
          English: "80",
        },
        {
          School: "第一小学",
          Grade: "3年级",
          Class: "2班",
          Name: "魏一",
          Chinese: "90",
          Math: "86",
          English: "87",
        },
        {
          School: "第一小学",
          Grade: "3年级",
          Class: "3班",
          Name: "杨二",
          Chinese: "79",
          Math: "99",
          English: "80",
        },
        // 第二小学
        {
          School: "第二小学",
          Grade: "3年级",
          Class: "3班",
          Name: "袁零",
          Chinese: "79",
          Math: "99",
          English: "80",
        },
      ],
    };
  },
  methods: {
    /**
     * 分析每一列，找出相同的
     * @param data
     */
    getSpanArr() {
      for (let i = 0; i < this.tableData.length; i++) {
        let row = i;
        // let col = i % this.colCount;
        if (row === 0) {
          // i 表示行 j表示列
          for (let j = 0; j < this.colFields.length; j++) {
            this.spanArr[i * this.colFields.length + j] = {
              rowspan: 1,
              colspan: 1,
            };
          }
        } else {
          for (let j = 0; j < this.colFields.length; j++) {
            // 当前和上一次的一样
            //  合并所有列的相同数据单元格
            if (
              this.colFields[j] == "School" ||
              this.colFields[j] == "Grade" ||
              this.colFields[j] == "Class"
            ) { // 指定合并哪些列
              if (
                this.tableData[row]["School"] !==
                  this.tableData[row - 1]["School"]
              ) { // 哪些不合并:School不一样的,不合并
                this.spanArr[row * this.colFields.length + j] = {
                  rowspan: 1,
                  colspan: 1,
                };
              } else if (
                this.tableData[row][this.colFields[j]] ===
                this.tableData[row - 1][this.colFields[j]]
              ) {
                let beforeItem =
                  this.spanArr[(row - 1) * this.colFields.length + j];
                this.spanArr[row * this.colFields.length + j] = {
                  rowspan: 1 + beforeItem.rowspan,// 合并几列
                  colspan: 1,// 合并几行
                };
                beforeItem.rowspan = 0;
                beforeItem.colspan = 0;
              } else {
                // rowspan 和 colspan 都为1表格此单元格不合并
                this.spanArr[row * this.colFields.length + j] = {
                  rowspan: 1,
                  colspan: 1,
                };
              }
            }
          }
        }
      }
      // 对数据进行倒序
      let stack = [];
      for (let i = 0; i < this.colFields.length; i++) {
        for (let j = 0; j < this.tableData.length; j++) {
          // console.log("i=" + i + " j=" + j);
          // i 表示列 j表示行
          if (j === 0) {
            if (this.spanArr[j * this.colFields.length + i].rowspan === 0) {
              stack.push(this.spanArr[j * this.colFields.length + i]);
            }
          } else {
            if (this.spanArr[j * this.colFields.length + i].rowspan === 0) {
              stack.push(this.spanArr[j * this.colFields.length + i]);
            } else {
              stack.push(this.spanArr[j * this.colFields.length + i]);
              while (stack.length > 0) {
                let pop = stack.pop();
                let len = stack.length;
                this.spanArr[(j - len) * this.colFields.length + i] = pop;
              }
            }
          }
        }
      }
      // console.log(this.spanArr);
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      // console.log(this.spanArr[rowIndex * this.colFields.length + columnIndex]);
      return this.spanArr[rowIndex * this.colFields.length + columnIndex];
    },
    addData (index,row) {
      console.log(index)
      const data = {
        School:row.School,
          Grade: row.Grade,
          Class: row.Class,
        //   Name: '王小虎',
        //   Chinese: "79",
        //   Math: "99",
        //   English: "80",
      }
      this.tableData.splice(index + 1, 0, data)
      // 重置合并index
      this.spanArr = []
      // this.tableData.push(data)
      this.getSpanArr()
    },
  },
  mounted() {
    this.getSpanArr();
  },
};
</script>
<style lang="scss" scoped></style>