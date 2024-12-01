<template>
  <div style="display: flex;">
    <el-select v-model="value" placeholder="请选择" @change="setValue">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="selectFun" placeholder="请选择" @change="setArgs">
      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <!-- <div v-if="value === 'fun'">
      {{   }}
      <div></div>
    </div> -->
  </div>

</template>

<script>
export default {
  props: {
    selectValue: {
      type: String,
      default: ''
    },
    addArgs: {
      type: Object,
      default: () => {
        return {
          children: []
        }
      }
    }
  },
  computed: {
    selectFun: {
      get () {
        return this.selectValue
      },
      set (val) {
        this.$emit('update:selectValue', val)
      }
    },
    // item: {
    //   get () {
    //     return this.addArgs
    //   },
    //   set (val) {
    //     this.$emit('update:addArgs', val)
    //   }
    // }
  },
  data () {
    return {
      options: [{
        value: 'fun',
        label: '函数'
      }, {
        value: 'var',
        label: '变量'
      }, {
        value: 'const',
        label: '常量'
      }],
      value: '',
  
      options1: [{
          value: 'max',
          label: 'max',
          arg: 2
        }, {
          value: 'min',
          label: 'min',
          arg: 1
        }],
    }
    
  },
  methods: {
    setValue() {
      this.selectFun = ''

    },
    setArgs() {
      // const [obj] = this.options1.filter(item => item.value === val)

      if(this.value === 'fun') {
        // this.item = {
        //   children: [],
        //   ...this.item
        // }
        console.log(this.addArgs, '触发新曾')
        // this.item.children.push({
        //   type: 'fun',
        //   name: obj.value,
        //   args: new Array(obj.arg).fill({num: ''})
        // })
        // const newO = JSON.parse(JSON.stringify(this.addArgs))
        this.$emit('setArgs',this.addArgs)
      }

    }
  }
}
</script>