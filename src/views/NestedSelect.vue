<template>
  <div class="inline-input" style="display: flex;">
    <div v-if="!dataSele.num" style="display: flex;">
      <el-select v-model="fun" size="small" placeholder="请选择" style="margin-left: 10px; width: 60px"
        @change="changeFun">
        <el-option v-for="(item, index) in funList" :key="index" :value="item.value" :label="item.label" />
      </el-select>
      <el-select v-model="dataSele.num" size="small" placeholder="请选择" style="margin-left: 0px;width: 80px" @change="changeValue">
        <el-option v-for="(item, index) in args[fun]" :key="index" :value="item.value" :label="item.label" />
      </el-select>
    </div>
    <div v-else class="row-item">
      <div v-if="fun === 'fun'" style="display: flex;flex-wrap: wrap;" >
        <span @click="changeitem" class="foc-txt">{{ dataSele.num }}</span>
        <span>(</span>
          <span v-for="(item, index) in dataSele.args" :key="index" style="display: flex;">
            <RuleItem :dataSele="item" @update="updateChild(index, $event)" ></RuleItem>
            <div v-if="index !== dataSele.args.length - 1">,</div>
          </span>
        <span>)</span>
      </div>
      <div v-else>
        <span class="foc-txt" @click="changeitem">{{ dataSele.num }}</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'RuleItem',
  props: {
    selectValue: {
      type: String,
      default: ''
    },
    dataSele: {
      tyepe: Object,
      default: () => {
        return {
          type: "fun", // 默认初始类型为 "value"
          num: '', // 默认初始值为空
          args: [], //  默认初始参数为空数组
        }
      }
    }
  },
  computed: {
    // value: {
    //   get() {
    //     return this.selectValue
    //   },
    //   set(val) {
    //     // console.log(val, 999)
    //     this.$emit('update:selectValue', val)
    //   }
    // }

    // dataProps: {
    //   get() {
    //     return this.dataSele
    //   },
    //   set(val) {
    //     console.log(val, 999)
    //     this.$emit('update:dataSele', val)
    //   }
    // }
  },
  watch: {
    dataSele() {
      console.log(this.dataSele, 888)
    }
  },
  data() {
    return {
      value: '',
      fun: '',
      argsList: [
        {num: ''},
        {num: ''}
      ],
      args: {
        fun: [
        {
          label: 'max',
          value: 'max'
        },
        {
          label: 'min',
          value: 'min'
        }
        ],
        var: [
          {
            label: 'age',
            value: 'age'
          },
          {
            label: 'name',
            value: 'name'
          }
        ]
      },
      selectEmnData: [
        {
          label: 'max',
          value: 'max'
        },
        {
          label: 'min',
          value: 'min'
        }
      ],
      funList: [
        {
          value: 'fun',
          label: '函数'
        },
        {
          value: 'var',
          label: '值'
        }
      ]
    }
  },
  methods: {
    changeitem() {
      this.dataSele.num = ''
      this.fun = ''
      // this.dataSele.args = []
    },
    changeFun() {
      // this.value = ''
      // this.fun = val
      this.$emit("update", this.dataSele);
    },
    changeValue(val) {
      // this.value = val
      this.changeFun()
      if (this.dataSele.num === "var") {
        this.dataSele.args = [];
      } else {

        console.log(val)
        const obj = {
          // type: this.fun,
          num: '',
          args: []
        }
        this.dataSele.args.push(obj, obj)
      }
      // this.fun = 'value'
      this.changeFun(); // 通知父组件
    },
    updateChild(index, updatedChild) {
      // 更新子节点的数据
      this.dataSele.args[index] = updatedChild;
      this.changeFun(); // 通知父组件
    },
  }
}
</script>

<style lang="scss" scoped>
.foc-txt{
  color: #409eff;
  cursor: pointer;
  padding: 0 5px;
}
</style>