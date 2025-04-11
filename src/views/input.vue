<template>
  <div>
    <!-- 允许空值的数字输入 -->
    <smart-input 
      v-model="intValue" 
      type="long"
      placeholder="请输入整数（可选）"
    />

    <!-- 必填项示例 -->
    <smart-input
      v-model="requiredValue"
      type="decimal"
      :precision="2"
      placeholder="请输入必须的小数"
      required
    />
  </div>
</template>
<script>
import SmartInput from '@/components/Input'
export default {
  components: {
    SmartInput
  },
  data() {
    return {
      intValue: null,    // 初始为空
      requiredValue: 0.0 // 必须项初始值
    }
  }
}
</script>