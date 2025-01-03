<template>
  <div>

    <el-input
      v-model="inputValue"
      placeholder="请输入正数、负数或小数"
      @input="validateInput"
    />
    <el-button-group>
      <el-button>输入参数</el-button>
      <el-button>过程参数</el-button>
      <el-button>输出参数</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '', // 输入框绑定的值
    };
  },
  watch: {
    formatNumber(value) {
      return value.toFixed(2);
      
    }
  },
  filters: {
    
  },
  methods: {
    validateInput(value) {
      this.inputValue = value
        .replace(/[^0-9.-]/g, '') // 移除非法字符，只允许数字、负号和小数点
        .replace(/(?!^)-/g, '') // 只保留第一个负号
        .replace(/(\..*)\./g, '$1') // 只保留第一个小数点
        .replace(/^(-?)0+(\d)/, '$1$2'); // 修正前导零
    },
  },
};
</script>
