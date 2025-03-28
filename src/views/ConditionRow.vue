<template>
  <div class="condition-row">
    <select v-model="condition.field" @change="resetValue">
      <option value="">选择字段</option>
      <option 
        v-for="field in fields" 
        :value="field.key"
        :key="field.key"
      >
        {{ field.label }}
      </option>
    </select>

    <select v-model="condition.operator">
      <option 
        v-for="op in availableOperators" 
        :value="op.value"
        :key="op.value"
      >
        {{ op.label }}
      </option>
    </select>

    <!-- 值输入 -->
    <div class="value-input">
      <template v-if="selectedField">
        <!-- 枚举选择 -->
        <select 
          v-if="selectedField.type === 'enum'"
          v-model="condition.value"
          class="enum-select"
        >
          <option 
            v-for="opt in selectedField.options" 
            :value="opt"
            :key="opt"
          >
            {{ opt }}
          </option>
        </select>
        
        <!-- 日期选择 -->
        <input
          v-else-if="selectedField.type === 'date'"
          v-model="condition.value"
          type="date"
          class="date-input"
        >
        
        <!-- 数字输入 -->
        <input
          v-else-if="selectedField.type === 'number'"
          v-model.number="condition.value"
          type="number"
          class="number-input"
        >
        
        <!-- 默认文本输入 -->
        <input
          v-else
          v-model="condition.value"
          type="text"
          class="text-input"
        >
      </template>
    </div>

    <button @click="$emit('remove')" class="delete-btn">
      ×
    </button>
  </div>
</template>

<script>
const operatorLabels = {
  eq: '等于',
  neq: '不等于',
  gt: '大于',
  gte: '大于等于',
  lt: '小于',
  lte: '小于等于',
  contains: '包含',
  startsWith: '开头为',
  endsWith: '结尾为',
  between: '介于'
}

export default {
  name: 'ConditionRow',
  props: {
    condition: { type: Object, required: true },
    fields: { type: Array, required: true }
  },
  computed: {
    selectedField() {
      return this.fields.find(f => f.key === this.condition.field)
    },
    
    availableOperators() {
      const fieldType = this.selectedField?.type || 'string'
      const operatorMap = {
        string: ['eq', 'neq', 'contains', 'startsWith', 'endsWith'],
        number: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'between'],
        enum: ['eq', 'neq'],
        date: ['eq', 'neq', 'gt', 'lt', 'between']
      }
      return (operatorMap[fieldType] || []).map(op => ({
        value: op,
        label: operatorLabels[op] || op
      }))
    }
  },
  methods: {
    resetValue() {
      this.condition.value = ''
      this.condition.operator = 'eq'
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .condition-row {
    grid-template-columns: 1fr;
    position: relative;
    padding-right: 40px;
  }
  
  .delete-btn {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}



</style>
<!-- ConditionRow.vue 样式优化 -->
<style scoped>
.condition-row {
  display: grid;
  grid-template-columns: 180px 120px auto 32px;
  gap: 8px;
  align-items: center;
  padding: 8px;
  margin: 8px 0;
  background: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  transition: all 0.2s;
}

.condition-row:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transform: translateX(4px);
}

select, input {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: white;
  transition: border-color 0.2s;
}

select:focus, input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.value-input {
  display: flex;
  gap: 8px;
}

.enum-select {
  background: #f0f9eb;
  border-color: #e1f3d8;
}

.date-input {
  background: #f4f4f5;
}

.delete-btn {
  color: #ff4444;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.delete-btn:hover {
  background: #fee;
}
</style>