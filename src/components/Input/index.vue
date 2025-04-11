<template>
  <div class="smart-input">
    <el-checkbox
      v-if="type === 'boolean'"
      v-model="internalValue"
      :disabled="disabled"
      @change="handleChange"
    >
      {{ label }}
    </el-checkbox>

    <el-input
      v-else
      v-model="internalValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
    >
      <template v-if="type === 'decimal'" #append>
        <span class="precision-indicator">{{ precision }}位小数</span>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SmartInput',
  props: {
    value: { type: [String, Number, Boolean, null], default: null },
    type: {
      type: String,
      default: 'string',
      validator: v => ['long', 'string', 'boolean', 'decimal'].includes(v)
    },
    precision: { type: Number, default: 2 },
    allowNegative: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '请输入' },
    label: { type: String, default: '' }
  },
  data() {
    return {
      internalValue: this.value ?? this.getEmptyValue()
    }
  },
  watch: {
    value(newVal) {
      this.internalValue = newVal ?? this.getEmptyValue()
    }
  },
  methods: {
    // 新增空值处理方法
    getEmptyValue() {
      switch(this.type) {
        case 'long':
        case 'decimal':
          return null
        case 'boolean':
          return false
        default:
          return ''
      }
    },

    handleInput(value) {
      this.internalValue = this.validateInput(value)
      this.$emit('input', this.internalValue)
    },

    handleBlur() {
      const formatted = this.formatValue(this.internalValue)
      this.internalValue = formatted === null ? '' : formatted
      this.$emit('change', this.internalValue)
    },

    handleChange(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },

    validateInput(value) {
      if (value === '') return null
      
      if (this.type === 'long') {
        return this.processInteger(value)
      }
      if (this.type === 'decimal') {
        return this.processDecimal(value)
      }
      return value
    },

    processInteger(value) {
      if (value === '' || value === '-') return null
      
      const filtered = value
        .replace(/[^\d-]/g, '')
        .replace(/(?!^-)-/g, '') // 只允许一个负号

      if (filtered === '-' && this.allowNegative) return filtered
      
      const num = parseInt(filtered)
      return isNaN(num) ? null : num
    },

    processDecimal(value) {
      if (value === '' || value === '-' || value === '.') return value
      
      let filtered = value
        .replace(/[^\d.-]/g, '')
        .replace(/(\..*)\./g, '$1') // 限制单个小数点
      
      if (!this.allowNegative) {
        filtered = filtered.replace(/-/g, '')
      }

      // 拆分整数和小数部分
      const parts = filtered.split('.')
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, this.precision)
        return parts.join('.')
      }
      return filtered
    },

    formatDecimal(value) {
      if (value === '' || value === '-' || value === '.') return null
      
      const parts = value.split('.')
      const integerPart = parts[0] || '0'
      const decimalPart = parts[1] ? parts[1].slice(0, this.precision) : ''
      
      let result = integerPart
      if (decimalPart.length > 0) {
        result += `.${decimalPart}`
      }
      
      return result === '-' ? null : result
    },

    formatValue(value) {
      if (value === null || value === '') return null
      
      if (this.type === 'boolean') {
        return !!value
      }
      if (this.type === 'long') {
        const num = parseInt(value)
        return isNaN(num) ? null : (this.allowNegative ? num : Math.abs(num))
      }
      if (this.type === 'decimal') {
        const num = parseFloat(value)
        return isNaN(num) ? null : this.formatDecimalValue(num)
      }
      return value
    },

    formatDecimalValue(num) {
      const fixed = num.toFixed(this.precision)
      return this.allowNegative ? fixed : Math.abs(fixed)
    }
  }
}
</script>

<style scoped>
/* 保持原有样式不变 */
.precision-indicator {
  font-size: 12px;
  color: #999;
  padding: 0 8px;
}

.smart-input {
  display: inline-block;
  width: 100%;
}

.el-checkbox {
  line-height: 32px;
}
</style>